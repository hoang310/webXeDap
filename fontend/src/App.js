import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from './pages/admin/product/Product';
import CreateOrUpdateProduct from './pages/admin/product/CreateOrUpdateProduct';
import Category from './pages/admin/category/Category';
import Order from './pages/admin/order/Order';
import User from './pages/admin/user/User';
import CreateOrUpdateCategory from './pages/admin/category/CreateOrUpdateCategory';
import CreateOrUpdateOrder from './pages/admin/order/CreateOrUpdateOrder';
import CreateOrUpdateUser from './pages/admin/user/CreateOrUpdateUser';
import Login from './pages/Login';
import Register from './pages/Register';
import NhapD from './components/nhap/NhapD';
import Statistical from './pages/admin/ai/Statistical';
import Ai from './pages/admin/ai/Ai';
import Search from './pages/Search';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/the-loai/:id/:name" element={<ProductList />} />
        <Route path="/san-pham/:id" element={<ProductDetail />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/thanh-toan" element={<Checkout />} />
        <Route path="/dang-nhap" element={<Login/>}/>
        <Route path="/dang-ky" element={<Register/>}/>
        <Route path="/tim-kiem/:query" element={<Search/>}/>
        <Route path="admin" element={<Product/>}/>

        <Route path="admin/quan-ly-san-pham" element={<Product/>}/>
        <Route path="admin/san-pham" element={<CreateOrUpdateProduct/>}/>
        <Route path="admin/san-pham/:id" element={<CreateOrUpdateProduct/>}/>

        <Route path="admin/quan-ly-danh-muc" element={<Category/>}/>
        <Route path="admin/danh-muc" element={<CreateOrUpdateCategory/>}/>
        <Route path="admin/danh-muc/:id" element={<CreateOrUpdateCategory/>}/>

        <Route path="admin/quan-ly-don-hang" element={<Order/>}/>
        <Route path="admin/don-hang" element={<CreateOrUpdateOrder/>}/>
        <Route path="admin/don-hang/:id" element={<CreateOrUpdateOrder/>}/>
        
        <Route path="admin/quan-ly-nguoi-dung" element={<User/>}/>
        <Route path="admin/nguoi-dung" element={<CreateOrUpdateUser/>}/>
        <Route path="admin/nguoi-dung/:id" element={<CreateOrUpdateUser/>}/>

        <Route path="admin/thong-ke" element={<Statistical/>}/>
        <Route path="admin/AI" element={<Ai/>}/>

        <Route path="nhap" element={<NhapD/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
