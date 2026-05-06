import Container from '../../../components/admin/Container'
import Aside from '../../../components/admin/Aside'
import Main from '../../../components/admin/Main'
import { useEffect, useState, useMemo } from "react";
import { HiPlus, HiPencil, HiOutlineTrash, HiMagnifyingGlass, HiOutlineBuildingStorefront } from "react-icons/hi2";
import { getProducts, deleteProduct } from '../../../services/api';
import { useNavigate } from "react-router-dom";

function Product() {

  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const mockResponse = await getProducts();
      setProducts(mockResponse.data.data);
      setPagination({
        total: mockResponse.data.total,
        page: mockResponse.data.page,
        totalPages: mockResponse.data.totalPages
      });
    } catch (err) {
      setErr("Không thể tải dữ liệu sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hetHang = useMemo(() => {
    console.log("Đang tính toán lại số lượng tồn kho thấp...");
    return products.filter(item => item.stock < 10).length;
  }, [products]); // Chỉ tính lại khi mảng products thay đổi     

  const totalValue = useMemo(() => {
    return products.reduce((sum, item) => sum + (item.price * item.stock), 0);
  }, [products]);

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
          {/* Header Section */}
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

          {/* Stats Quick View */}
          <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-800"><b>{products.length}</b> / <b>{pagination.total}</b></p>
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

          {/* Main Table Section */}
          <div className="max-w-8xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Search Bar */}
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Tên sản phẩm</th>
                    <th className="px-6 py-4 font-semibold text-center">Ảnh</th>
                    <th className="px-6 py-4 font-semibold">Danh mục</th>
                    <th className="px-6 py-4 font-semibold">Giá</th>
                    <th className="px-6 py-4 font-semibold">Tồn kho</th>
                    <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                      <td><div className="flex justify-center">
                        <img className="p-2 text-gray-700 h-16 w-16 rounded-full object-cover border" src={product.image} alt="err" srcset="" />
                      </div></td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {product.category_id.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{product.price.toLocaleString()}đ</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => navigate(`/admin/san-pham/${product._id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <HiPencil className="w-5 h-5" />
                          </button>
                          <button onClick={() => handle_delete(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Main>
    </Container>
  )
}

export default Product