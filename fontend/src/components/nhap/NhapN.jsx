import React, { useState } from 'react';
import {
  HiOutlineShoppingBag,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
  HiChevronDown
} from "react-icons/hi";

const Navbar = () => {
  // Dữ liệu mẫu cho menu
  const menuItems = [
    { title: 'Trang chủ', link: '#' },
    {
      title: 'Sản phẩm',
      link: '#',
      submenu: [
        { title: 'Thiết kế Web', link: '#' },
        { title: 'Phát triển App', link: '#' },
        { title: 'SEO Marketing', link: '#' },
      ],
    },
    {
      title: 'Tin tức',
      link: '#',
      submenu: [
        { title: 'Phần mềm A', link: '#' },
        { title: 'Phần mềm B', link: '#' },
      ],
    },
    { title: 'Liên hệ', link: '#' },
  ];

  const [menu, setMenu] = useState(false)


  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-green-600">
          ThongNhat
        </h1>

        <div className="hidden md:flex space-x-4">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <a href={item.link} className=" hover:text-green-600 px-3 py-2 rounded-md font-medium flex items-center ">
                {item.title}
                {item.submenu && (
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://w3.org"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                )}
              </a>
              {item.submenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {item.submenu.map((subItem, subIndex) => (
                    <a key={subIndex} href={subItem.link} className="block px-4 py-2 hover:text-green-600">
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <input type="text" placeholder="Tìm kiếm..." className="mt-2 border px-3 py-1 rounded w-48 outline-none" />

        <div className="hidden md:flex gap-4">
          <div className="relative">
            <HiOutlineSearch className="text-xl cursor-pointer"/>
          </div>
          <HiOutlineShoppingBag className="text-xl" />
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMenu(!menu)}>
            {menu ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>
      {menu && (
        <>
          {menuItems.map((item, index) => (
            
              <div key={index} className="relative group">
                <a href={item.link} className=" hover:text-green-600 px-3 py-2 rounded-md font-medium flex items-center font-semibold" >
                  {item.title}
                  {item.submenu && (
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://w3.org"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  )}
                </a>

                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ">
                    {item.submenu.map((subItem, subIndex) => (
                      <a key={subIndex} href={subItem.link} className="block px-4 py-2 hover:text-green-600">
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
          ))}
          <div className="mt-4 flex gap-4">
            <div className="relative">
              <HiOutlineSearch className="text-xl cursor-pointer"/>
            </div>
            <HiOutlineShoppingBag className="text-xl" />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
