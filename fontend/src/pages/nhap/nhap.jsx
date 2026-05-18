import React, { useState, useEffect } from "react";
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { getProducts } from "./api"; // Đường dẫn đến file API của bạn

export default function ProductTable({ navigate, handle_delete }) {
  // 1. Các State quản lý dữ liệu từ API
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 10; // Đặt limit cố định là 10 mục/trang

  // 2. Hàm gọi dữ liệu từ API theo số trang hiện tại
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await getProducts(page, itemsPerPage);
      
      // Giả sử API trả về cấu trúc: response.data = { products: [], total: 25, page: 1, totalPages: 3 }
      // Hãy điều chỉnh response.data cho đúng với thực tế API của bạn
      const { data } = response; 
      
      setProducts(data.products || []);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setTotalItems(data.total);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tự động gọi API mỗi khi trạng thái currentPage thay đổi
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // 3. Hàm xử lý chuyển trang khi bấm nút
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Cuộn lên đầu bảng để có trải nghiệm tốt hơn
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* KHỐI 1: BẢNG DỮ LIỆU */}
      <div className="overflow-x-auto relative">
        {/* Hiệu ứng loading mờ khi đang tải dữ liệu từ API */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <span className="text-sm font-medium text-blue-600">Đang tải...</span>
          </div>
        )}

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Tên sản phẩm</th>
              <th className="px-6 py-4 font-semibold text-center">Ảnh</th>
              <th className="px-6 py-4 font-semibold">Danh mục</th>
              <th className="px-6 py-4 font-semibold">Giá</th>
              <th className="px-6 py-4 font-semibold">Tồn kho</th>
              <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <img 
                        className="h-12 w-12 rounded-md object-cover border border-gray-200 shadow-sm bg-gray-50" 
                        src={product.image || "https://placehold.co"} 
                        alt={product.name} 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 font-medium rounded-full text-xs">
                      {product.category_id?.name || "Chưa phân loại"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                    {product.price?.toLocaleString()}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-xs ${
                      product.stock < 10 ? 'text-red-700 bg-red-50' : 'text-green-700 bg-green-50'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => navigate(`/admin/san-pham/${product._id}`)} 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <HiPencil className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handle_delete(product._id).then(() => fetchProducts(currentPage))} 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                  {!loading ? "Không có sản phẩm nào để hiển thị." : "Đang tải dữ liệu..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* KHỐI 2: THANH PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị trang <span className="font-medium">{currentPage}</span> trên tổng số{" "}
                <span className="font-medium">{totalPages}</span> trang (Tổng số{" "}
                <span className="font-medium">{totalItems}</span> sản phẩm)
              </p>
            </div>

            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {/* Nút Trước */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lsaquo;
                </button>

                {/* Tạo các nút số trang dựa vào totalPages từ API */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                      currentPage === i + 1
                        ? "z-10 bg-blue-600 text-white ring-blue-600"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Nút Sau */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &rsaquo;
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
