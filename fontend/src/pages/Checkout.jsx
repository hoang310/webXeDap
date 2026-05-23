import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext); // Đảm bảo bạn đã thêm clearCart vào Context
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => {
    const priceNumber = Number(String(item.price).replace(/[^0-9]/g, ""));
    return sum + priceNumber * item.qty;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi đơn hàng ở đây (ví dụ gửi API)
    setOrderPlaced(true);
    clearCart(); // Xóa giỏ hàng sau khi đặt xong
  };

  if (orderPlaced) {
    return (
      <div className="text-center p-20">
        <h2 className="text-3xl font-bold text-green-600 mb-4">ĐẶT HÀNG THÀNH CÔNG!</h2>
        <p>Cảm ơn bạn đã tin tưởng Xe Đạp Thống Nhất. Chúng tôi sẽ liên hệ sớm nhất.</p>
        <button onClick={() => window.location.href = '/'} className="mt-6 bg-red-600 text-white px-6 py-2">Tiếp tục mua sắm</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 shadow-sm border rounded">
          <h2 className="text-xl font-bold mb-6 border-b pb-2 uppercase text-red-600">Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Họ và tên *" className="w-full border p-3 rounded focus:outline-red-600" />
            <div className="grid grid-cols-2 gap-4">
              <input required type="tel" placeholder="Số điện thoại *" className="w-full border p-3 rounded focus:outline-red-600" />
              <input required type="email" placeholder="Email" className="w-full border p-3 rounded focus:outline-red-600" />
            </div>
            <input required type="text" placeholder="Địa chỉ nhận hàng *" className="w-full border p-3 rounded focus:outline-red-600" />
            <textarea placeholder="Ghi chú đơn hàng (không bắt buộc)" className="w-full border p-3 rounded h-24 focus:outline-red-600"></textarea>
            
            <h3 className="font-bold mt-6 mb-2">Phương thức thanh toán</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 border p-3 rounded cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" defaultChecked />
                <span>Thanh toán khi giao hàng (COD)</span>
              </label>
              <label className="flex items-center gap-2 border p-3 rounded cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" />
                <span>Chuyển khoản ngân hàng</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded mt-6 hover:bg-black transition">
              HOÀN TẤT ĐẶT HÀNG
            </button>
          </form>
        </div>

        <div className="bg-white p-6 shadow-sm border rounded h-fit">
          <h2 className="text-xl font-bold mb-6 border-b pb-2 uppercase">Đơn hàng của bạn</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name} <strong className="text-black">x{item.qty}</strong></span>
                <span className="font-semibold">{(Number(String(item.price).replace(/[^0-9]/g, "")) * item.qty).toLocaleString()}đ</span>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-6 pt-4 space-y-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng:</span>
              <span className="text-red-600 text-2xl">{total.toLocaleString()}đ</span>
            </div>
            <p className="text-xs text-gray-500 italic text-right">* Miễn phí vận chuyển cho đơn hàng nội thành.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;