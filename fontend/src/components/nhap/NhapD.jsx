import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Dùng để lấy ID sản phẩm từ URL nếu có
import { HiStar, HiShoppingCart, HiShieldCheck, HiTruck, HiArrowPath } from 'react-icons/hi2';
import Navbar from '../Navbar';
import { Link } from "react-router-dom";

export default function NhapD() {
  const { id } = useParams(); // Lấy ID từ URL (Ví dụ: /products/:id)

  // State lưu trữ dữ liệu
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Giả lập gọi API (Bạn hãy thay URL bằng API thật của bạn)
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        // 1. Fetch thông tin sản phẩm
        // const productRes = await fetch(`/api/products/${id}`);
        // const productData = await productRes.json();

        // 2. Fetch danh sách đánh giá của sản phẩm đó
        // const reviewsRes = await fetch(`/api/reviews?product_id=${id}`);
        // const reviewsData = await reviewsRes.json();

        // DỮ LIỆU MOCK ĐỂ KHỚP VỚI SCHEMA CỦA BẠN:
        const mockProduct = {
          _id: "65f1234567890abcdef12345",
          name: "Bàn Phím Cơ Không Dây Cực Chất",
          price: 1250000,
          stock: 15,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60",
          desc: "Đây là mô tả chi tiết sản phẩm. Bàn phím cơ mang lại trải nghiệm gõ phím tuyệt vời với switch cao cấp, dung lượng pin trâu và đèn LED RGB cá tính. Phù hợp cho cả lập trình viên và game thủ.",
          category_id: "65f9876543210fedcba54321",
          created_at: "2026-01-15T08:30:00.000Z"
        };

        const mockReviews = [
          { _id: "r1", user_id: { name: "Nguyễn Văn A" }, rating: 5, comment: "Sản phẩm tuyệt vời, đóng gói cẩn thận, phím gõ rất đầm tay!", created_at: "2026-02-18" },
          { _id: "r2", user_id: { name: "Trần Thị B" }, rating: 4, comment: "Giao hàng nhanh, đúng mô tả, tuy nhiên đèn LED hơi tối một chút.", created_at: "2026-03-01" }
        ];

        setProduct(mockProduct);
        setReviews(mockReviews);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Hàm xử lý tăng/giảm số lượng mua
  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'increase' && quantity < product.stock) setQuantity(quantity + 1);
  };

  if (loading) return <div className="text-center py-20 font-medium text-gray-500">Đang tải dữ liệu sản phẩm...</div>;
  if (error) return <div className="text-center py-20 text-red-500 font-medium">{error}</div>;
  if (!product) return <div className="text-center py-20 text-gray-500">Không tìm thấy sản phẩm.</div>;

  return (
    <>
      <Navbar />

      <div className="py-3">
        <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500">
          <Link to={`/`}>TRANG CHỦ</Link> / <Link to={`/the-loai/${product.category_id._id}/${product.category_id.name}`}>{product.category_id.name}</Link> / <span className="text-gray-800">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        {/* Khối chính: Ảnh + Thông tin */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Cột trái: Hình ảnh sản phẩm */}
          <div className="flex flex-col justify-center bg-gray-100 rounded-xl overflow-hidden aspect-square max-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Cột phải: Chi tiết sản phẩm */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Tên sản phẩm */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
                {product.name}
              </h1>

              {/* Giá tiền (Được format sang VND) */}
              <div className="text-3xl font-extrabold text-red-600 my-4">
                {product.price.toLocaleString('vi-VN')} ₫
              </div>

              {/* Trạng thái kho hàng */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Còn lại trong kho: {product.stock} sản phẩm
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    Hết hàng
                  </span>
                )}
              </div>

              <hr className="border-gray-200 my-4" />

              {/* Mô tả sản phẩm */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Mô tả sản phẩm</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {product.desc}
                </p>
              </div>
            </div>

            <div>
              {/* Bộ chọn số lượng (Chỉ hiện khi còn hàng) */}
              {product.stock > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-gray-900 font-semibold text-sm w-12 text-center select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Các nút bấm hành động */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={product.stock === 0}
                  className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99]"
                >
                  <HiShoppingCart size={20} />
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* Cam kết ngắn đi kèm */}
              <div className="grid grid-cols-3 gap-2 mt-6 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex flex-col items-center gap-1"><HiShieldCheck size={18} className="text-green-600" /> 100% Chính hãng</div>
                <div className="flex flex-col items-center gap-1"><HiTruck size={18} className="text-blue-600" /> Freeship toàn quốc</div>
                <div className="flex flex-col items-center gap-1"><HiArrowPath size={18} className="text-orange-600" /> Đổi trả trong 7 ngày</div>
              </div>
            </div>

          </div>
        </div>

        {/* Khối phụ: Đánh giá từ khách hàng */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Khách hàng đánh giá ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Chưa có đánh giá nào cho sản phẩm này.</p>
          ) : (
            <div className="space-y-6 divide-y divide-gray-100">
              {reviews.map((review) => (
                <div key={review._id} className="pt-6 first:pt-0">
                  <div className="flex items-center justify-between mb-2">
                    {/* Tên User */}
                    <span className="font-semibold text-gray-800 text-sm">
                      {review.user_id?.name || "Người dùng ẩn danh"}
                    </span>
                    {/* Ngày đánh giá */}
                    <span className="text-xs text-gray-400">
                      {new Date(review.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  {/* Số sao nhận được */}
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        size={16}
                        className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  {/* Bình luận */}
                  <p className="text-gray-600 text-sm pl-0.5">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}