

import AuthContext from '../ContextAPI/AuthContext'

export default function HomePage() {
    
    return (
        <div className="font-poppins">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mt-20 border-b pb-4">
                    <div className="text-[40px] font-bold">
                        <span className="relative inline-block group py-1">
                            Học tập thông minh
                            <span className="absolute bottom-0 left-0 block w-0 h-[4px] bg-black transition-all duration-500 group-hover:w-full"></span>
                        </span>
                        <br />
                        <span className="relative inline-block group py-1">
                            phát triển không giới hạn
                            <span className="absolute bottom-0 left-0 block w-0 h-[4px] bg-black transition-all duration-500 group-hover:w-full"></span>
                        </span>
                    </div>
                    <div className="flex space-x-4 flex-shrink-0">
                        <button className="text-[16px] text-white bg-black rounded border-[2px] border-black py-4 px-4 transition-colors hover:bg-gray-500">
                            Find Tutor
                        </button>
                        <button className="text-[16px] rounded border-[2px] border-black py-4 px-4 transition-colors hover:bg-gray-200">
                            Register courses
                        </button>
                    </div>
                </div>
            </div>
           
        </div>
                
            
    )
}