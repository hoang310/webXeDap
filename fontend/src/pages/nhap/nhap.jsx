import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(localStorage.getItem('username') || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const url = isLoginView 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';

    try {
      const response = await axios.post(url, { username, password });
      
      if (isLoginView) {
        // Nếu đăng nhập thành công, lưu token và username vào LocalStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        setUser(response.data.username);
      } else {
        // Nếu đăng ký thành công, chuyển sang giao diện đăng nhập
        setIsLoginView(true);
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setMessage('Đã đăng xuất!');
  };

  // Giao diện sau khi ĐÃ ĐĂNG NHẬP
  if (user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Chào mừng, {user}! 🎉</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Đăng xuất</button>
      </div>
    );
  }

  // Giao diện ĐĂNG NHẬP / ĐĂNG KÝ
  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isLoginView ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '5px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '8px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {isLoginView ? 'Đăng nhập' : 'Đăng ký'}
        </button>
      </form>

      {message && <p style={{ color: 'blue', marginTop: '10px' }}>{message}</p>}

      <p style={{ marginTop: '15px', fontSize: '14px', textAlign: 'center' }}>
        {isLoginView ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'} {' '}
        <span 
          onClick={() => { setIsLoginView(!isLoginView); setMessage(''); }} 
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLoginView ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
        </span>
      </p>
    </div>
  );
}

export default App;