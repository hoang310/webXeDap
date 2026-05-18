import Container from '../../../components/admin/Container'
import Aside from '../../../components/admin/Aside'
import Main from '../../../components/admin/Main'
import { useState, useEffect } from 'react'
import { getOrders } from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import { HiPlus, HiPencil, HiOutlineTrash, HiMagnifyingGlass, HiOutlineBuildingStorefront } from "react-icons/hi2";

function Order() {

  const [orders, setOrder] = useState([])

  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  const fetchData = async () => {
    try {
      const getOrder = await getOrders();
      setOrder(getOrder.data.data)
    } catch (err) {
      setErr("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handle_delete = () => {

  }

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
                Quản lý đơn hàng
              </h1>
              <p className="text-gray-500">Xem, thêm và chỉnh sửa đơn hàng của bạn</p>
            </div>

            <button onClick={() => navigate('/admin/don-hang/')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
              <HiPlus className="w-5 h-5" />
              Thêm đơn hàng
            </button>
          </div>

          <div className="max-w-8xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="relative max-w-sm text-gray-400">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm ..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>


            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold">Mã đơn</th>
                    <th className="px-6 py-4 font-semibold">Khách hàng</th>
                    <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                    <th className="px-6 py-4 font-semibold text-center">SL</th>
                    <th className="px-6 py-4 font-semibold">Tổng tiền</th>
                    <th className="px-6 py-4 font-semibold">Trạng thái</th>
                    <th className="px-6 py-4 font-semibold">Ngày đặt</th>
                    <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">

                      <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                        {order._id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{order.user_id?.name}</span>
                          <span className="test-sx text-gray-500">{order.user_id?.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-900 max-w-xs truncate">
                        {order.items?.map((item) => (
                          <div key={item._id}>
                            {item.product_id?.name}
                          </div>
                        ))}
                      </td>

                      <td className="px-6 py-4 text-center text-gray-900">
                        {order.items?.reduce((total, item) => total + item.quantity, 0)}
                      </td>

                      <td className="px-6 py-4 font-semibold text-red-600">
                        {order.total_price?.toLocaleString("vi-VN")}đ
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              order.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                                order.status === "shipping" ? "bg-indigo-100 text-indigo-700" :
                                  order.status === "completed" ? "bg-green-100 text-green-700" :
                                    "bg-red-100 text-red-700" // mặc định cho cancelled
                            }`}
                        >
                          {order.status === "pending" && "Chờ xử lý"}
                          {order.status === "confirmed" && "Đã xác nhận"}
                          {order.status === "shipping" && "Đang giao"}
                          {order.status === "completed" && "Hoàn thành"}
                          {order.status === "cancelled" && "Đã huỷ"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/don-hang/${order._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <HiPencil className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handle_delete(order._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
          </div>
        </div>
      </Main>
    </Container>
  )
}

export default Order