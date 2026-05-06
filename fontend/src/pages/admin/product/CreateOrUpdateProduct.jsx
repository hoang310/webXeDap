// pages/admin/AddProduct.jsx
import { useState, useEffect } from "react";
import {createProduct, getCategories, getProductsById, updateProduct} from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const CreateOrUpdateProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    category_id: ""
  });
  const [Categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories()
        setCategories(res.data)

        if (id) {
          const prodRes = await getProductsById(id);
          setForm(prodRes.data);
        }
      } catch (err) {
        setErr("Không thể tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id])
  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProduct(id, form)
    } else {
      await createProduct(form);
    }
    navigate("/admin/quan-ly-san-pham");
  };

  if (loading) return <p>Đang tải...</p>
  if (err) return <p>{err}</p>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập tên sản phẩm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ví dụ: 100000"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Số lượng</label>
          <input name="stock" placeholder="Số lượng" onChange={handleChange} className="border border-gray-300 p-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ảnh</label>
          <input name="image" placeholder="Image URL" onChange={handleChange} className="border border-gray-300 p-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Loại xe</label>
          <select
            name="category_id"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">--Vui lòng chọn--</option>
            {
              Categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))
            }
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập mô tả sản phẩm"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
        >
          {id ? "Cập nhật" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrUpdateProduct;