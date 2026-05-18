import Container from '../../../components/admin/Container'
import Aside from '../../../components/admin/Aside'
import Main from '../../../components/admin/Main'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../../services/api'
import { HiPlus, HiPencil, HiOutlineTrash, HiMagnifyingGlass, HiOutlineBuildingStorefront } from "react-icons/hi2";


function User() {

  const [users, setUser] = useState([])

  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  const fetchData = async () => {
    try {
      const getU = await getUser();
      setUser(getU.data)
      console.log(getU)
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
                Quản lý Người dùng
              </h1>
            </div>
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


            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold text-left">Người dùng</th>
                    <th className="px-6 py-4 font-semibold text-left">Vai trò</th>
                    <th className="px-6 py-4 font-semibold text-left">Ngày tham gia</th>
                    <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
        
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{user.name}</span>
                          <span className="text-xs text-gray-500">{user.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                          }`}>
                          {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString("vi-VN")}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => navigate(`/admin/nguoi-dung/${user._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <HiPencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handle_delete(user._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
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

export default User