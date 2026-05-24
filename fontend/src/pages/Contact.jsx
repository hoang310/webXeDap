import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Liên hệ</h1>

          <p><b>Địa chỉ:</b> 182 Lê Duẩn, Phường Trường Vinh, Tỉnh Nghệ An</p>
          <p><b>Email:</b> HHbike@gmail.com.vn</p>
          <p><b>Hotline:</b> 0123456789</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-3">
          <input className="border p-2" placeholder="Tên" />
          <input className="border p-2" placeholder="Email" />
          <textarea className="border p-2" placeholder="Nội dung" />

          <button className="bg-black text-white py-2">
            Gửi
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;