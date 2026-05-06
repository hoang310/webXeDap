import { useContext } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  // Lấy dữ liệu giỏ hàng và các hàm điều khiển từ Context
  const { cart, updateQty, removeFromCart } = useContext(CartContext);

  // Chuyển giá từ chuỗi "4.500.000đ" thành số 4500000 để tính toán
const total = cart.reduce((sum, item) => {
  const priceNumber = Number(String(item.price).replace(/[^0-9]/g, ""));
  return sum + priceNumber * item.qty;
}, 0);

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center">
          <p className="text-xl mb-4">Giỏ hàng của bạn đang trống.</p>
          <Link to="/" className="text-red-600 underline">Quay lại mua sắm</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 uppercase border-b-2 border-red-600 inline-block">
          Giỏ hàng của bạn
        </h1>

        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4 items-center">
              <img src={item.image} className="w-24 h-24 object-contain bg-gray-50" alt={item.name} />

              <div className="flex-1">
                <h2 className="font-bold text-gray-800">{item.name}</h2>
                <p className="text-red-600 font-semibold">{item.price.toLocaleString()}đ</p>
                
                {/* Bộ tăng giảm số lượng */}
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-2 bg-gray-200"
                  >-</button>
                  <span>{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 bg-gray-200"
                  >+</button>
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-600"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 text-right">
          <h2 className="text-2xl font-bold text-gray-900">
            Tổng cộng: <span className="text-red-600">{total.toLocaleString()}đ</span>
          </h2>
          
          <Link
            to="/thanh-toan"
            className="inline-block mt-4 bg-red-600 text-white px-8 py-3 font-bold hover:bg-black transition"
          >
            TIẾN HÀNH THANH TOÁN
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;