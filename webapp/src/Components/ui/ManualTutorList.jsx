import { useState, useEffect } from 'react';
import { getTutorofCourse } from '../../Utils/tutors'

export default function ManualTutorList({ course, setMode, onShowDetail, onConfirm }) {
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
        const data = await getTutorofCourse(course.id);
        
        const mappedTutors = (data || []).map((tutor, index) => {
          const schedules = (tutor.classes || []).map((cls, idx) => ({
            id: cls.id || `schedule-${idx}`,
            label: `Lịch ${idx + 1}`,
            day: cls.day || '',
            start: cls.start || '',
            end: cls.end || ''
          }));

          return {
            id: tutor.classes?.[0]?.tutorId || `tutor-${index}`,
            name: tutor.name || '',
            desc: tutor.desc || '',
            schedules: schedules.length > 0 ? schedules : [
              { id: 'default', label: 'Lịch mặc định', day: 'Chưa có', start: '', end: '' }
            ]
          };
        });

        setTutors(mappedTutors);
      } catch (err) {
        console.error('Failed to fetch tutors:', err);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTutors();
  }, [course?.id]);

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Đang tải...</div>;
  }

  if (!tutors || tutors.length === 0) {
    return <div className="text-center text-gray-500 py-4">Không tìm thấy tutor cho môn này.</div>
  }

  return (
    <div className="manual-tutor-list">
      <h2 className="text-center text-2xl font-bold mb-4">Danh sách giáo viên</h2>

      <div className="space-y-4">
        {tutors.map(t => (
          <div key={t.id} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className="font-bold text-base">{t.name}</div>
              {/* <div className="text-sm text-gray-700 font-semibold">GPA: {t.gpa} &nbsp; Kinh nghiệm: {t.exp} năm</div> */}
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
