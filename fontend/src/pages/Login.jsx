import { useState } from "react";
import { loginAPI } from "../services/api";
import { useNavigate } from "react-router-dom";



function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Vui lòng nhập đầy đủ email và mật khẩu!');
            return;
        }

        setMessage('');
        setIsLoading(true);

        try {
            const response = await loginAPI({ email, password });
            if (response && response.data && response.data.token) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', user?.username || '');
                setUser(user?.name || '');
                //navigate('/admin');
                console.log(user)
            } else {
                setMessage('Phản hồi từ hệ thống không hợp lệ!');
            }
        } catch (error) {
            console.error("Login Error:", error)

            const errorMsg = error.response?.data?.message
                || error.message
                || 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau!';

            setMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        setMessage('Đã đăng xuất!');
    };

    if (user) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Chào mừng, {user}! 🎉</h2>
                <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Đăng xuất</button>
            </div>
        );
    }

    return (

        <div class="min-h-screen flex items-center justify-center bg-gray-900 px-6">
            <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">

                <div class="text-center mb-8">
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <h2>Chào mừng, {user}! 🎉</h2>
                        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Đăng xuất</button>
                    </div>
                    <h1 class="text-2xl font-bold mb-2">Đăng nhập</h1>
                    <p class="text-sm text-gray-500">Chào mừng bạn quay trở lại</p>
                </div>

                <form onSubmit={handleSubmit} class="space-y-5">

                    <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@example.com"
                            class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Mật khẩu</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div class="text-right">
                        <a href="#" class="text-sm text-gray-500 hover:text-black">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        type="submit"
                        class="w-full py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                    >
                        Đăng nhập
                    </button>

                </form>

                {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

                <p class="mt-6 text-center text-sm text-gray-500">
                    Chưa có tài khoản?
                    <a href="#" class="text-black font-medium hover:underline">
                        Đăng ký
                    </a>
                </p>

            </div>
        </div>
    )
}

export default Login