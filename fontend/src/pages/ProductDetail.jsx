import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { getProductsById } from "../services/api";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useState(() => {
    const fetchPro = async () => {
      try {
        const res = await getProductsById(id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPro();
  }, [id]);

  const { addToCart } = useContext(CartContext);

  if (!product) return <div>Not found</div>;

  return (
    <div className="bg-white min-h-screen">
          <Navbar />
    
          {/* Breadcrumb */}
          <div className="bg-gray-100 py-3">
            <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500">
              TRANG CHỦ / XE ĐẠP ĐỊA HÌNH / <span className="text-gray-800">{product.name}</span>
            </div>
          </div>
    
          <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-12 mt-4">
            
            {/* Bên trái: Hình ảnh */}
            <div className="border rounded-lg overflow-hidden sticky md:top-24 h-fit">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
    
            {/* Bên phải: Thông tin */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 uppercase mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-red-600">
                  {product.price}₫
                </span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    {product.oldPrice}₫
                  </span>
                )}
              </div>
    
              <p className="text-gray-600 leading-relaxed mb-6 border-b pb-6">
                {product.desc}
              </p>
    
              {/* Chọn số lượng */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex border border-gray-300 p-2">
                  <p><Link to={`/thanh-toan`}>Thanh toán</Link></p>
                </div>
                
                <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-red-600 text-white font-bold py-3 hover:bg-black transition-colors uppercase">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
    
          {/* Footer mồi */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="border-t pt-8 text-center text-gray-400 text-sm">
              Giao hàng toàn quốc - Bảo hành chính hãng 12 tháng
            </div>
          </div>
    
          <Footer/>
        </div>
  );
};

export default ProductDetail;