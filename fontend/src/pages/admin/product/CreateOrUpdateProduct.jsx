// pages/admin/AddProduct.jsx
import { useState, useEffect } from "react";
import { createProduct, getCategories, getProductsById, getImages, updateProduct } from "../../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateOrUpdateProduct = () => {

  const urlI = process.env.REACT_APP_IMAGE

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
    desc: "",
    category_id: ""
  });
  const [Categories, setCategories] = useState([])
  const [img, setImg] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [sta, setSta] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const image = await getImages()
        setImg(image.data)
      } catch (err) {
        setErr("Không thể tải dữ liệu")
      } finally {
        setLoading(false);
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories()
        setCategories(res.data)
        if (id) {
          const prodRes = await getProductsById(id);
          setForm({
            ...prodRes.data,
            category_id: prodRes.data.category_id._id
          });

        }
      } catch (err) {
        setErr("Không thể tải dữ liệu sản phẩm")
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id])


  const handleChange = (e) => {

    if (e.target.type === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category_id", form.category_id);
    formData.append("image", form.image);
    formData.append("desc", form.desc);

    try {
      if (id) {
        await updateProduct(id, formData)
        navigate("/admin/quan-ly-san-pham", {
          state: { message: "Cập nhật sản phẩm thành công!" }
        });
      } else {
        await createProduct(formData);
        navigate("/admin/quan-ly-san-pham", {
          state: { message: "Thêm sản phẩm thành công!" }
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  }

  if (loading) return <p>Đang tải...</p>
  if (err) return <p>{err}</p>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            placeholder="Nhập tên sản phẩm"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Giá (VNĐ)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Ví dụ: 100000"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Số lượng</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Số lượng"
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ảnh sản phẩm</label>

          {form.image && (
            <div className="mb-3">
              <img src={`${urlI}${form.image}`} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setSta(!sta)}
            className="py-2 px-4 border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg mb-3 text-sm font-medium transition"
          >
            {sta ? "Đóng thư mục" : "Chọn từ thư mục ảnh"}
          </button>

          {sta && (
            <div className="flex flex-wrap gap-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-3">
              {img.map((i) => (
                <img
                  key={i}
                  src={`${urlI}/${i}`}
                  alt="Selectable"
                  className={`w-12 h-12 object-cover rounded cursor-pointer hover:scale-105 transition ${form.image === i ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => { setForm({ ...form, image: i }) }}
                />
              ))}
            </div>
          )}

          {!sta && (
            <input
              name="image"
              onChange={handleChange}
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          )}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Loại xe</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent block p-2.5 transition"
          >
            <option value="">{id ? form.category_id.name : "--Vui lòng chọn--"}</option>
            {Categories.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            placeholder="Nhập mô tả chi tiết về sản phẩm..."
            rows="5"
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Link
            to={'/admin'}
            className="bg-gray-100 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-200 transition duration-200 font-semibold text-sm"
          >
            Quay lại
          </Link>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-sm shadow-md shadow-blue-200"
          >
            {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrUpdateProduct;