import Container from '../../../components/admin/Container'
import Aside from '../../../components/admin/Aside'
import Main from '../../../components/admin/Main'
import { useEffect, useState, useMemo } from "react";
import { HiPlus, HiPencil, HiOutlineTrash, HiMagnifyingGlass, HiOutlineBuildingStorefront } from "react-icons/hi2";
import { getProducts, deleteProduct } from '../../../services/api';
import { useNavigate, useLocation } from "react-router-dom";

function Product() {

  const urlI = process.env.REACT_APP_IMAGE
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate();
  const location = useLocation()

  const fetchData = async (page) => {
    try {
      const mockResponse = await getProducts(page, 10);
      setProducts(mockResponse.data.data);
      setCurrentPage(mockResponse.data.page);
      setTotalPages(mockResponse.data.totalPages);
      setTotalItems(mockResponse.data.total);
    } catch (err) {
      setErr("Không thể tải dữ liệu sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const hetHang = useMemo(() => {
    return products.filter(item => item.stock < 10).length;
  }, [products])

  const totalValue = useMemo(() => {
    return products.reduce((sum, item) => sum + (item.price * item.stock), 0);
  }, [products]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);

      navigate(location.pathname, { replace: true, state: {} })

      setTimeout(() => setMessage(""), 3000);
    }
  }, [location, navigate]);

  const handle_delete = async (id) => {
    try {
      await deleteProduct(id)
      setMessage("Xóa sản phẩm thành công");
      setTimeout(() => setMessage(""), 3000);
      fetchData()
    } catch (error) {
      setMessage("Xóa thất bại");
      setTimeout(() => setMessage(""), 3000);
      fetchData()
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p>Đang tải...</p>
  if (err) return <p>{err}</p>

  return (
    <Container>
      <Aside />
      <Main>
        <div className="p-8">
          {message && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
              {message}
            </div>
          )}

          <div className="max-w-8xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <HiOutlineBuildingStorefront className="w-8 h-8 text-blue-600" />
                Quản lý Sản phẩm
              </h1>
              <p className="text-gray-500">Xem, thêm và chỉnh sửa kho hàng của bạn</p>
            </div>

            <button onClick={() => navigate('/admin/san-pham/')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
              <HiPlus className="w-5 h-5" />
              Thêm sản phẩm
            </button>
          </div>


          <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-800"><b>{products.length}</b> / <b>{totalItems}</b></p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Tổng giá trị kho</p>
              <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString()}đ</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Sắp hết hàng (&lt;10)</p>
              <p className="text-2xl font-bold text-red-600">{hetHang}</p>
            </div>
          </div>


          <div className="max-w-8xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="relative max-w-sm text-gray-400">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tên sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
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
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50/70 transition-colors">

                      <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                        {product.name}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <img
                            className="h-12 w-12 rounded-md object-cover border border-gray-200 shadow-sm bg-gray-50"
                            src={`${urlI}${product.image}` || "https://placehold.co"}
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
                        <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-xs ${product.stock < 10
                          ? 'text-red-700 bg-red-50'
                          : 'text-green-700 bg-green-50'
                          }`}>
                          {product.stock}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/san-pham/${product._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Sửa"
                          >
                            <HiPencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handle_delete(product._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Xóa"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        &lsaquo;
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${currentPage === i + 1
                            ? "z-10 bg-blue-600 text-white ring-blue-600"
                            : "text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}

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
        </div>
      </Main>
    </Container>
  )
}

export default Product