import ManualTutorList from "./ManualTutorList";
import AutoResult from "./AutoResult";
import TutorDetail from "./TutorDetail";
import { useState } from 'react'
import { joinClass } from '../../Utils/studentUtil'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './dialog'
import { Button } from './button'

export default function TutorPanel({ selectedCourse, mode, setMode }) {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success'); 

  if (!selectedCourse) return <div className="tutor-panel empty">Chọn môn để xem tutor</div>;

  // console.log("selectedCourse", selectedCourse?.id);

  const handleJoinClass = async (tutor, schedule) => {
    if (!schedule || !schedule.id) {
      setMessage('Vui lòng chọn lịch học');
      setMessageType('error');
      return;
    }

    if (!selectedCourse || !selectedCourse.id) {
      setMessage('Vui lòng chọn môn học');
      setMessageType('error');
      return;
    }

    try {
      setLoading(true);
      const success = await joinClass(schedule.id, selectedCourse.id);

      if (success) {
        setMessage(`Đã tham gia lớp học thành công!\n\nTutor: ${tutor.name}\nLịch: ${schedule.label} (${schedule.day} ${schedule.start}-${schedule.end})`);
        setMessageType('success');
        setSelectedTutor(null);
      } else {
        setMessage('Không thể tham gia lớp học. Vui lòng thử lại.');
        setMessageType('error');
      }
      
    } catch (error) {
      const errorMessage = error.graphQLErrors?.[0]?.message || 
                          error.message || 
                          'Không thể tham gia lớp học. Vui lòng thử lại.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const MessageDialog = () => (
    <Dialog open={!!message} onOpenChange={(open) => !open && setMessage(null)}>
      <DialogContent className="max-w-md bg-white p-0 overflow-hidden" showCloseButton={false}>
        <div className={`${messageType === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-b p-6`}>
          <div className="flex items-center gap-4">
            {messageType === 'success' ? (
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <div className="flex-1">
              <DialogTitle className={`${messageType === 'success' ? 'text-green-800' : 'text-red-800'} text-xl font-bold mb-1`}>
                {messageType === 'success' ? 'Thành công!' : 'Không thành công'}
              </DialogTitle>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <DialogDescription className="whitespace-pre-line text-gray-700 text-base leading-relaxed">
            {message}
          </DialogDescription>
        </div>
        
        <DialogFooter className="p-6 pt-0">
          <Button 
            onClick={() => setMessage(null)}
            className={`w-full ${
              messageType === 'success' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            } font-medium py-2.5 rounded-lg transition-colors`}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // manual: show list; clicking detail sets selectedTutor
  if (mode === 'manual') {
    if (selectedTutor) {
      return (
        <>
          <div className="tutor-panel">
            <TutorDetail
              tutor={selectedTutor}
              onBack={() => setSelectedTutor(null)}
              onConfirm={handleJoinClass}
            />
          </div>
          <MessageDialog />
        </>
      )
    }

    return (
      <>
        <div className="tutor-panel">
          <ManualTutorList course={selectedCourse} setMode={setMode} onShowDetail={(t) => setSelectedTutor(t)} onConfirm={() => {/* confirm action */}} />
        </div>
        <MessageDialog />
      </>
    )
  }

  if (mode === 'auto') {
    if (selectedTutor) {
      return (
        <>
          <div className="tutor-panel">
            <TutorDetail
              tutor={selectedTutor}
              onBack={() => setSelectedTutor(null)}
              onConfirm={handleJoinClass}
            />
          </div>
          <MessageDialog />
        </>
      )
    }

    return (
      <>
        <div className="tutor-panel">
          <AutoResult course={selectedCourse} setMode={setMode} onShowDetail={(t) => setSelectedTutor(t)} onConfirm={() => {/* confirm action */}} />
        </div>
        <MessageDialog />
      </>
    )
  }

  return (
    <>
      <div className="tutor-panel empty">Chọn chế độ Thủ công hoặc Tự động</div>
      <MessageDialog />
    </>
  );
}
