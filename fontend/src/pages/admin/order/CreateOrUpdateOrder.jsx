import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getOrderById, createOrder, updateOrder } from '../../../services/api';

function CreateOrUpdateOrder() {

  const { id } = useParams()
  const [form, setForm] = useState({
    name: "",
    email: "",
    total_price: 0,
    status: "pending",
    created_at: "",
    items: []
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const fetchOrderDetail = async () => {
        try {
          const response = await getOrderById(id);
          setForm(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
          alert("Không thể tải dữ liệu đơn hàng!");
        }
      };

      fetchOrderDetail();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      status: form.status,
    };

    try {
      if (id) {
        await updateOrder(id, orderData);
        navigate("/admin/quan-ly-don-hang", {
          state: { message: "Cập nhật trạng thái đơn hàng thành công! 🎉" }
        });
      } else {
        const newOrderData = {
          name: form.name,
          email: form.email,
          status: form.status,
          total_price: form.total_price,
          items: form.items
        };

        await createOrder(newOrderData);

        navigate("/admin/quan-ly-don-hang", {
          state: { message: "Tạo mới đơn hàng thành công!" }
        });
      }
    } catch (error) {
      console.error("Lỗi khi xử lý đơn hàng:", error);
      alert("Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu hoặc hệ thống!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-100"
      >

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {id ? "Chi tiết & Cập nhật đơn hàng" : "Tạo đơn hàng mới"}
          </h2>
          {id && <p className="text-xs text-gray-400 mt-1">Mã ĐH: {form._id}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-blue-600 border-b pb-2">Thông tin khách hàng</h3>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Tên khách hàng</label>
              <input
                type="text"
                name="name"
                value={form.user_id?.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed focus:outline-none"
                disabled
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Email liên hệ</label>
              <input
                type="email"
                name="email"
                value={form.user_id?.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed focus:outline-none"
                disabled
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Trạng thái đơn hàng</label>
              <select
                name="status"
                value={form.status || 'pending'}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white font-medium text-gray-800"
              >
                <option value="pending">Đang xử lý (Pending)</option>
                <option value="confirmed">Đã xác nhận (Confirmed)</option>
                <option value="shipping">Đang giao (Shipping)</option>
                <option value="completed">Đã hoàn thành (Completed)</option>
                <option value="cancelled">Đã hủy (Cancelled)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">Thông tin thanh toán</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ngày đặt hàng:</span>
                  <span className="font-medium text-gray-800">
                    {form.created_at ? new Date(form.created_at).toLocaleString('vi-VN') : 'Vừa xong'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                  <span className="text-base font-bold text-gray-700">Tổng thanh toán:</span>
                  <span className="text-xl font-extrabold text-red-600">
                    {form.total_price?.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 italic bg-blue-50 text-blue-700 p-3 rounded-lg border border-blue-100">
              * Lưu ý: Chỉ có trường "Trạng thái đơn hàng" là có thể cập nhật để thay đổi tiến độ đơn hàng.
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-md font-semibold text-gray-700 mb-3 block">Danh sách sản phẩm mua ({form.items?.length || 0})</h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm font-semibold">
                  <th className="p-3">Tên sản phẩm</th>
                  <th className="p-3 text-center">Số lượng</th>
                  <th className="p-3 text-right">Đơn giá</th>
                  <th className="p-3 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {form.items && form.items.length > 0 ? (
                  form.items.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-gray-50/70 transition">
                      <td className="p-3 font-medium text-gray-900">{item.product_id?.name}</td>
                      <td className="p-3 text-center font-semibold text-gray-600">{item.quantity}</td>
                      <td className="p-3 text-right">{item.price?.toLocaleString('vi-VN')} đ</td>
                      <td className="p-3 text-right font-bold text-blue-600">
                        {(item.price * item.quantity)?.toLocaleString('vi-VN')} đ
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-400 italic">Không có sản phẩm nào trong đơn hàng</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
          <Link
            to={'/admin/quan-ly-don-hang'}
            className="bg-gray-100 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-200 transition duration-200 font-semibold text-sm"
          >
            Quay lại
          </Link>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-sm shadow-md shadow-blue-200"
          >
            {id ? "Cập nhật trạng thái" : "Tạo đơn hàng"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrUpdateOrder