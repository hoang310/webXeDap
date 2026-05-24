import React, { useState, useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineSearch,
} from "react-icons/hi";


const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const menuItems = [
    { name: 'TRANG CHỦ', link: '/' },

    {
      name: 'SẢN PHẨM',
      link: '#',
      submenu: [
        {
          name: 'Xe đạp địa hình',
          link: '/the-loai/69c3f29216b6cee7372b6be4'
        },
        {
          name: 'Xe điện',
          link: '/the-loai/69c3f29216b6cee7372b6be8'
        },
        {
          name: 'Xe đạp trẻ em',
          link: '/the-loai/69c3f29216b6cee7372b6be7'
        },
        {
          name: 'Xe touring',
          link: '/the-loai/69c3f29216b6cee7372b6be6'
        },
        {
          name: 'Xe đua',
          link: '/the-loai/69c3f29216b6cee7372b6be5'
        }
      ]
    },

    { name: 'LIÊN HỆ', link: '/lien-he' }
  ]

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">

        <div className="font-bold text-red-600 text-2xl">HHBIKE</div>

        <div className="hidden md:flex space-x-6 h-full items-center">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="relative group h-full flex items-center"
            >
              <a
                href={item.link}
                className="font-semibold hover:text-red-600"
              >
                {item.name} {item.submenu && '▾'}
              </a>

              {item.submenu && (
                <div className="absolute top-16 left-0 bg-white shadow-lg border-t-2 border-red-600 w-56 hidden group-hover:block z-50">
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.name}
                      href={`${sub.link}/${sub.name}`}
                      className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-50 last:border-0"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="relative">
            <button>
              <Link to={`/gio-hang`}><HiOutlineShoppingBag className="text-xl" /></Link>
            </button>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          <div>
            <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-red-600">
              <HiOutlineSearch className="text-xl cursor-pointer" />
            </button>
          </div>

        </div>

        <button className="md:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {searchOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-100 p-4 z-40 border-b">
          <div className="max-w-xl mx-auto flex gap-2">
            <input type="text" placeholder="Tìm kiếm sản phẩm..." className="w-full p-2 border rounded" autoFocus />
            <button className="bg-red-600 text-white px-4 rounded">Tìm</button>
          </div>
        </div>
      )}

      {isMobileOpen && (
        <>
          <div className="md:hidden bg-white border-t p-4 space-y-3">
            {menuItems.map((item) => (
              <div key={item.name}>
                <a
                  href={item.link}
                  className="font-bold text-red-600 block py-2"
                >
                  {item.name}
                </a>
                {item.submenu && (
                  <div className="pl-4 text-gray-600">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.name}
                        href={`${sub.link}/${sub.name}`}
                        className="block py-1 hover:text-red-500"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}

              </div>
            ))}

            <div className="flex gap-4">
              <div className="relative">
                <button>
                  <Link to={`/gio-hang`}><HiOutlineShoppingBag className="text-xl" /></Link>
                </button>

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div>
                <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-red-600">
                  <HiOutlineSearch className="text-xl cursor-pointer" />
                </button>
              </div>

            </div>

          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;