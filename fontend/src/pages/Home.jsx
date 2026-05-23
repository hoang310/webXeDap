import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getCategories, getProductsByCategory } from "../services/api"

const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getCategories();
        const categories = catRes.data;

        const result = await Promise.all(
          categories.map(async (c) => {
            const prodRes = await getProductsByCategory(c._id, 4);
            return {
              category: c,
              products: prodRes.data.data,
            };
          })
        );

        setProducts(result);
      } catch (err) {
        setErr("Không thể tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Đang tải...</p>
  if (err) return <p>{err}</p>

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <Hero />

      {products.map(p => (
        <>
        <div className="max-w-7xl mx-auto py-12 px-4 text-center" key={p.category._id}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 relative inline-block">
            {p.category.name}
            <span className="block w-20 h-1 bg-red-600 mx-auto mt-2"></span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Khám phá những mẫu xe mới nhất từ HHBIKE - Thương hiệu uy tín.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {p.products.map(ps => (
              <ProductCard key={ps._id} item={ps} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border-2 border-black px-10 py-3 font-bold hover:bg-black hover:text-white transition">
              <Link to={`/the-loai/${p.category._id}/${p.category.name}`}>XEM TẤT CẢ SẢN PHẨM</Link>
            </button>
          </div>
        </div>
        </>
      ))}

      <Footer />

    </div>
  );
};

export default Home;