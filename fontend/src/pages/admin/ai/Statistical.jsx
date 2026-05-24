import { useEffect, useState, useMemo } from 'react'
import Container from '../../../components/admin/Container';
import Aside from '../../../components/admin/Aside';
import Main from '../../../components/admin/Main';
import { getProducts } from '../../../services/api';

function Statistical() {
  const [products, setProducts] = useState([])
  const [totalItems, setTotalItems] = useState(0)

  const hetHang = useMemo(() => {
    return products.filter(item => item.stock < 10).length;
  }, [products])

  const totalValue = useMemo(() => {
    return products.reduce((sum, item) => sum + (item.price * item.stock), 0);
  }, [products]);

  const fetchData = async () => {
    try {
      const mockResponse = await getProducts(1, 50)
      setProducts(mockResponse.data.data)
      setTotalItems(mockResponse.data.total)
    } catch (err) {
      console.log("Không thể tải dữ liệu sản phẩm")
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container>
      <Aside />
      <Main>
        <div className="p-8">
          <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Tổng sản phẩm hiện tại</p>
                <p className="text-2xl font-bold text-gray-800">
                  {products.length} <span className="text-sm font-normal text-gray-400">/ {totalItems}</span>
                </p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Tỷ lệ danh mục</span>
                  <span>{totalItems > 0 ? Math.round((products.length / totalItems) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${totalItems > 0 ? (products.length / totalItems) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Tổng giá trị vốn kho</p>
                <p className="text-2xl font-bold text-emerald-600">{totalValue.toLocaleString()}đ</p>
              </div>

              <div className="mt-4">
                <div className="w-full bg-slate-100 rounded-lg h-5 p-0.5 overflow-hidden flex items-center relative">
                  <div
                    className="bg-emerald-500 h-full rounded-md transition-all duration-500"
                    style={{ width: '100%' }} 
                  ></div>
                  <span className="absolute right-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                    Đang vận hành
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Sắp hết hàng (&lt;10)</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-red-600">{hetHang}</p>
                  <span className="text-xs text-gray-400">sản phẩm</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Mức độ rủi ro kho</span>
                  <span className="text-red-500 font-medium">
                    {products.length > 0 ? Math.round((hetHang / products.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500 animate-pulse"
                    style={{ width: `${products.length > 0 ? Math.min((hetHang / products.length) * 100, 100) : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Main>
    </Container>
  )
}

export default Statistical