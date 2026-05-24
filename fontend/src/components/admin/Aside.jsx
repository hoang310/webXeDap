import React from 'react'
import MenuItem from './MenuItem'
import { HiCpuChip, HiChartPie, HiComputerDesktop, HiOutlineCog6Tooth } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

function Aside() {

  const navigate = useNavigate()

  const handleLogout = () => {
        localStorage.clear()
        navigate('/dang-nhap')
  };

  return (
    <aside className="px-5 border-r hidden md:block min-h-screen bg-gray-900 text-white">
        <div className="w-64 p-8 text-2xl font-bold">HHAdmin</div>
        <div>
          <div className="p-2">
            <h2 className="text-xs text-gray-400 mb-4">DANH SÁCH</h2>
            <ul>
              <MenuItem title="Bảng điều khiển" icon={<HiComputerDesktop />}>
                <li className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center" onClick={() => navigate('/admin/quan-ly-san-pham')}>Quản lý sản phẩm</li>
                <li className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center" onClick={() => navigate('/admin/quan-ly-danh-muc')}>Quản lý danh mục</li>
                <li className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center" onClick={() => navigate('/admin/quan-ly-don-hang')}>Quản lý đơn hàng</li>
                <li className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center" onClick={() => navigate('/admin/quan-ly-nguoi-dung')}>Quản lý người dùng</li>
              </MenuItem>

              <MenuItem title="Cài đặt" icon={<HiOutlineCog6Tooth />}>
                <li>Cấu hình hệ thống</li>
                <li>Thông tin cá nhân</li>
              </MenuItem>

              <button 
                onClick={() => navigate('/admin/thong-ke')} 
                className="px-4 py-2 flex justify-center items-center gap-2"
              >
                <HiChartPie /> Thống kê
              </button>

              <button 
                onClick={() => navigate('/admin/AI')} 
                className="px-4 py-2 flex justify-center items-center gap-2"
              >
                <HiCpuChip /> AI
              </button>
              
            </ul>
            
          </div>
          <div>
            <h2 className="text-xs text-gray-400">HỖ TRỢ</h2>
          </div>
          <div>
            <h2 className="text-xs text-gray-400">KHÁC</h2>
            <button onClick={handleLogout} className="mt-3 px-4 py-2 border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 font-medium rounded-lg bg-white hover:bg-red-50 transition-all duration-200">Đăng xuất</button>
          </div>
          
        </div>
    </aside>
  )
}

export default Aside