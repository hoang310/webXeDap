import {useState} from "react";
import { registerAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerAPI(form);
        navigate("/dang-nhap");
    };


  return (
    <div className="bg-gray-900 min-h-screen px-6 flex items-center justify-center">
        <div className=" bg-white max-w-md w-full border rounded-lg p-8">
            <div className=" text-center mb-5">
                <h1 className="text-2xl font-bold mb-2">Đăng ký</h1>
                <p className="text-sm">Bắt đầu với tài khoản mới của bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 mb-2">
                <div>
                    <label className="block mb-1">Họ và tên</label>
                    <input name="name"  onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder='Nguyễn Văn A' type="text" />    
                </div>  

                <div>
                    <label className="block mb-1">Email</label>
                    <input name="email" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder='a@gmail.com' type="text" />    
                </div>  

                <div>
                    <label className="block mb-1">Mật khẩu</label>
                    <input name="password" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" type="password" />    
                </div>  

                <div>
                    <label className="block mb-1">Xác nhận mật khẩu</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="password" />    
                </div>  

                <div className="flex itemscenter gap-2  text-sm">
                    <input type="checkbox" name="" id="" />
                    <span>
                        <a href="">Bạn đồng ý với điều khoản</a>
                    </span>
                </div>

                <button className="px-4 py-2 bg-gray-400 hover:bg-gray-300 w-full border rounded-lg">Đăng ký</button>
            </form>
        </div>
        
    </div>
  )
}

export default Register