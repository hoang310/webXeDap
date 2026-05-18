import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { getProductsByCategory } from "../services/api";
import { HiBarsArrowUp } from "react-icons/hi2";


const ProductList = () => {

  const { id } = useParams()
  const { name } = useParams()
  const [products, setProducts] = useState([])

  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const priceOptions = [
    { label: 'Từ 1 - 2 triệu', min: 1000000, max: 2000000 },
    { label: 'Từ 2 - 3 triệu', min: 2000000, max: 3000000 },
    { label: 'Từ 3 - 7 triệu', min: 3000000, max: 7000000 },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedPriceRange) {
      result = result.filter(p => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max);
    }

    if (sortOrder === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedPriceRange, sortOrder]);

  useEffect(() => {
    const fetchPro = async () => {
      try {
        const res = await getProductsByCategory(id, 20);
        setProducts(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPro()
  }, [id])

  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold p-6">{name}</h1>

      <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">

        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white p-5 rounded-lg shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-6 border-b pb-2 text-gray-800">
              Lọc sản phẩm
            </h2>

            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Khoảng giá</h3>
              <div className="space-y-2">
                {priceOptions.map((range) => (
                  <label key={range.label} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                    <input
                      type="radio"
                      name="priceRange"
                      className="w-4 h-4 text-blue-600"
                      onChange={() => setSelectedPriceRange(range)}
                      checked={selectedPriceRange?.label === range.label}
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Sắp Xếp</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => setSortOrder('low-to-high')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Giá Thấp - Cao</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => setSortOrder('high-to-low')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Giá Cao - Thấp</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => { setSelectedPriceRange(null); setSortOrder(null); }}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-all font-medium mt-2"
            >
              Xóa tất cả lọc
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(p => (
              <ProductCard key={p._id} item={p} />
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Không có xe nào trong tầm giá này!
            </div>
          )}
        </main>

      </div>

    </>
  );
};

export default ProductList;