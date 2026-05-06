import { useState } from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
  HiChevronDown
} from "react-icons/hi";

const Nhap = () => {
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        <h1 className="text-2xl font-extrabold text-green-600">
          ThongNhat
        </h1>

        <div className="hidden md:flex items-center gap-6 text-gray-700 font-semibold">
          <div>
            <button
              onClick={() => setOpenProduct(!openProduct)}
              className="hover:text-green-600 flex items-center gap-1 relative"
            >
              Sản phẩm <HiChevronDown />
            </button>
          </div>
                              
          <a href="#" className="hover:text-green-600">Tin tức</a>
          <a href="#" className="hover:text-green-600">Liên hệ</a>

          <div className="relative">
            <HiOutlineSearch
              onClick={() => setOpenSearch(!openSearch)}
              className="text-xl cursor-pointer"
            />

            {openSearch && (
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="mt-2 border px-3 py-1 rounded w-48 outline-none"
              />
            )}
          </div>
          <HiOutlineShoppingBag className="text-xl cursor-pointer" />
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>



        {openProduct && (
          <div className="bg-white shadow px-6 py-4 flex gap-6 absolute z-10">
            <a href="#" className="hover:text-green-600">Xe đạp thể thao</a>
            <a href="#" className="hover:text-green-600">Xe đạp địa hình</a>
            <a href="#" className="hover:text-green-600">Xe đạp đường phố</a>
            <a href="#" className="hover:text-green-600">Xe đạp trẻ em</a>
          </div>
        )}

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-gray-700 font-semibold">
          <a href="#" className="hover:text-green-600">Trang chủ</a>
          <div className="relative">
            <button
              onClick={() => setOpenProduct(!openProduct)}
              className="hover:text-green-600 font-semibold"
            >
              Sản phẩm
            </button>

            {openProduct && (
              <div className="mt-2 bg-white shadow-lg rounded-lg p-2 w-48">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Xe đạp thể thao</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Xe đạp địa hình</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Xe đạp đường phố</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Xe đạp trẻ em</a>
              </div>
            )}
          </div>
          <a href="#" className="hover:text-green-600">Tin tức</a>
          <a href="#" className="hover:text-green-600">Liên hệ</a>

          <div className="flex gap-4">
            <div className="relative">
            <HiOutlineSearch
              onClick={() => setOpenSearch(!openSearch)}
              className="text-xl cursor-pointer"
            />

            {openSearch && (
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="mt-2 border px-3 py-1 rounded w-48 outline-none"
              />
            )}
            </div>
            <HiOutlineShoppingBag className="text-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nhap;