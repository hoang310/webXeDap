import { useState } from "react";
import { HiMagnifyingGlass, HiBell } from "react-icons/hi2";
import Aside from "./Aside";
import MenuItem from "./MenuItem";
import { HiCpuChip, HiChartPie, HiComputerDesktop, HiOutlineCog6Tooth } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';


const Main = ({ children }) => {
  const urlI = process.env.REACT_APP_IMAGE
  const img = "anh.jpg"
  const navigate = useNavigate()
  const [aside, setAside] = useState(false)
  const username = localStorage.getItem('username') || 'Admin';
  return (
    <div className="w-full bg-gray-900">
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <button className="md:hidden" onClick={() => setAside(!aside)}>{aside ? '✕' : '☰'}</button>
        <div className="hidden md:flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg w-72">
          <HiMagnifyingGlass className="text-gray-500" />
          <input type="text" placeholder="Tìm kiếm ..." className="bg-transparent outline-none w-full" />
        </div>
        <div className="flex items-center gap-4">
          <HiBell className="text-gray-500 text-xl" />
          <span className="text-gray-700 font-medium">{username}</span>
          <img src={`${urlI}${img}`} alt="admin" className="w-12 h-12 rounded-full border-2 border-gray-300" />
        </div>
      </div>

      {
        aside && (
          <div className="">
            <aside className="px-5 border-r">
              
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

                    <MenuItem title="Thống kê" icon={<HiChartPie />}>
                      <li>Thống kê</li>
                    </MenuItem>

                    <MenuItem title="AI" icon={<HiCpuChip />}>
                      <li>AI</li>
                    </MenuItem>

                  </ul>

                </div>
                <div>
                  <h2 className="text-xs text-gray-400">HỖ TRỢ</h2>
                </div>
                <div>
                  <h2 className="text-xs text-gray-400">KHÁC</h2>
                </div>

              </div>
            </aside>
          </div>
        )
      }

      <div className="text-center">
        {children}
      </div>
    </div>
  );
};

export default Main;