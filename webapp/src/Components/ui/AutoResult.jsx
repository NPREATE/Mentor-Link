import { useState, useEffect } from 'react';
import { getTutorAutomic } from '../../Utils/tutors'

export default function AutoResult({ course, setMode, onShowDetail, onConfirm }) {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTutors() {
      if (!course?.id) {
        setTutors([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const tutorData = await getTutorAutomic(course.id);
        
        if (tutorData) {
          const schedules = (tutorData.classes || []).map((cls, idx) => ({
            id: cls.id || `schedule-${idx}`,
            label: `Lịch ${idx + 1}`,
            day: cls.day || '',
            start: cls.start || '',
            end: cls.end || ''
          }));

          const mappedTutor = {
            id: tutorData.classes?.[0]?.tutorId || 'tutor-auto',
            name: tutorData.name || '',
            desc: tutorData.desc || '',
            schedules: schedules.length > 0 ? schedules : [
              { id: 'default', label: 'Lịch mặc định', day: 'Chưa có', start: '', end: '' }
            ]
          };

          setTutors([mappedTutor]);
        } else {
          setTutors([]);
        }
      } catch (err) {
        console.error('Failed to fetch automatic tutor:', err);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTutors();
  }, [course?.id]);

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Đang tìm tutor phù hợp...</div>;
  }

  if (!tutors || tutors.length === 0) {
    return <div className="text-center text-gray-500 py-4">Không có tutor phù hợp.</div>;
  }

  return (
    <div className="auto-result">
      <h2 className="text-center text-2xl font-bold mb-4">Kết quả ghép tự động</h2>

      <div className="space-y-4">
        {tutors.map(t => (
          <div key={t.id} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className="font-bold text-base">{t.name}</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t.desc}</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-1.5 rounded-full bg-yellow-200 text-yellow-800 text-sm font-medium" onClick={() => onShowDetail && onShowDetail(t)}>Chi tiết</button>
              <button className="px-4 py-1.5 rounded-full bg-green-200 text-green-800 text-sm font-medium" onClick={() => onConfirm && onConfirm(t)}>Đồng ý</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
