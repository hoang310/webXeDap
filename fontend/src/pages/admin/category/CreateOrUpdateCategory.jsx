import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom'
import { createCategory, getCategoriesById, updateCategory } from "../../../services/api";

function CreateOrUpdateCategory() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  const [form, setForm] = useState({
    name: ""
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const prodRes = await getCategoriesById(id);
          setForm({ ...prodRes.data })
        } catch (err) {
          setErr("Không thể tải dữ liệu")
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }

  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { name: form.name };

    try {
      if (id) {
        await updateCategory(id, categoryData);
        navigate("/admin/quan-ly-danh-muc", {
          state: { message: "Cập nhật danh mục thành công!" }
        });
      } else {
        await createCategory(categoryData);
        navigate("/admin/quan-ly-danh-muc", {
          state: { message: "Thêm danh mục thành công!" }
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  //if (loading) return <p>Đang tải...</p>
  if (err) return <p>{err}</p>

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {id ? "Cập nhật danh mục" : "Thêm danh mục"}
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nhập tên danh mục</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            placeholder="Nhập tên danh mục"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to={'/admin/quan-ly-danh-muc'}
            className="bg-gray-100 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-200 transition duration-200 font-semibold text-sm"
          >
            Quay lại
          </Link>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-sm shadow-md shadow-blue-200"
          >
            {id ? "Cập nhật danh mục" : "Thêm danh mục"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default CreateOrUpdateCategory