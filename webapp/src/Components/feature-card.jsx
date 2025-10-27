export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      
      {/* BẮT ĐẦU SỬA */}

      {/* 1. Thêm div này để làm nền đen, bo góc (rounded-lg) 
             và căn icon ra giữa (flex, items-center, justify-center)
      */}
      <div className="mb-4 w-12 h-12 bg-black rounded-lg flex items-center justify-center">
        <img 
          src={icon || "/placeholder.svg"} 
          alt={title} 
          width="24"  
          height="24" 
          // 2. Thêm filter để đổi icon (màu đen) thành màu trắng
          className="filter brightness-0 invert" 
        />
      </div>
      
      {/* KẾT THÚC SỬA */}

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}