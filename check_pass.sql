USE BTL_CNPM;

-- Cho phép xóa mà không bị lỗi ràng buộc
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa tất cả bảng có liên quan
DROP TABLE IF EXISTS 
  LessonFeedback,
  LessonSchedule,
  MatchingCourse,
  StudentCourse,
  Student,
  TutorAvailability,
  Tutor,
  User;

-- Bật lại ràng buộc
SET FOREIGN_KEY_CHECKS = 1;
