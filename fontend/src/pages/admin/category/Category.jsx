import React, { useEffect, useState } from 'react'
import Container from '../../../components/admin/Container'
import Aside from '../../../components/admin/Aside'
import Main from '../../../components/admin/Main'
import { useNavigate } from 'react-router-dom'
import { HiPlus, HiPencil, HiOutlineTrash, HiMagnifyingGlass, HiOutlineBuildingStorefront } from "react-icons/hi2";
import { getCategories } from '../../../services/api'

function Category() {

  const [categories, setCategories] = useState([])

  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  const fetchData = async () => {
    try {
      const getCa = await getCategories();
      setCategories(getCa.data)
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
                Quản lý Danh mục
              </h1>
              <p className="text-gray-500">Xem, thêm và chỉnh sửa danh muc của bạn</p>
            </div>

            <button onClick={() => navigate('/admin/san-pham/')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
              <HiPlus className="w-5 h-5" />
              Thêm Danh mục
            </button>
          </div>

          <div className="max-w-8xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="relative max-w-sm text-gray-400">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">ID sản phẩm</th>
                    <th className="px-6 py-4 font-semibold">Danh mục</th>
                    <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{category._id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{category.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => navigate(`/admin/san-pham/${category._id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <HiPencil className="w-5 h-5" />
                          </button>
                          <button onClick={() => handle_delete(category._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

export default Category