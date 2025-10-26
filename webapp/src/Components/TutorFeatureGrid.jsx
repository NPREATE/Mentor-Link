import FeatureCard from "./feature-card.jsx"

// Data mới cho Tutor, dựa trên ảnh mockup
const features = [
  {
    id: 1,
    icon: "/note.svg", // (Icon giống "Đăng ký môn học")
    title: "Thiết lập Lịch dạy",
    description: "Mở và quản lý các khung giờ bạn sẵn sàng dạy để sinh viên có thể đặt lịch.",
  },
  {
    id: 2,
    icon: "/calendar.svg", // (Icon giống "Quản lý lịch")
    title: "Quản lý Buổi học & Điểm danh",
    description: "Bắt đầu buổi học, cập nhật trạng thái, và thực hiện điểm danh sinh viên tham gia.",
  },
  {
    id: 3,
    icon: "/document.svg", // (Icon giống "Tài liệu")
    title: "Quản lý Tài liệu học tập",
    description: "Tải lên, chỉnh sửa hoặc xóa các tài liệu học tập (slide, bài tập) cho môn học của bạn.",
  },
  {
    id: 4,
    icon: "/star.svg", // (Icon giống "Đánh giá")
    title: "Đánh giá Sinh viên",
    description: "Gửi nhận xét và đánh giá về thái độ và tiến bộ của sinh viên sau khi kết thúc môn học.",
  },
  {
    id: 5,
    icon: "/note.svg", // (Icon giống "Đăng ký môn học")
    title: "Tạo Chương trình Học",
    description: "Thiết kế và công bố các chương trình học thuật hoặc thực tiễn để sinh viên đăng ký.",
  },
]

export default function TutorFeatureGrid() {
  return (
    <section className="py-12">
      {/* Class grid-cols-3 vẫn hoạt động tốt cho 5 items.
        Nó sẽ tự động tạo 1 hàng 3 cột, và 1 hàng 2 cột, 
        trông giống hệt thiết kế của bạn.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  )
}