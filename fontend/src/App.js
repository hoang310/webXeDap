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
        <Route path="admin" element={<Product/>}/>
        <Route path="admin/quan-ly-san-pham" element={<Product/>}/>
        <Route path="admin/san-pham" element={<CreateOrUpdateProduct/>}/>
        <Route path="admin/san-pham/:id" element={<CreateOrUpdateProduct/>}/>
        <Route path="admin/quan-ly-danh-muc" element={<Category/>}/>
        <Route path="admin/quan-ly-don-hang" element={<Order/>}/>
        <Route path="admin/quan-ly-nguoi-dung" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
