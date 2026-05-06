import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from './pages/admin/product/Product';
import CreateOrUpdateProduct from './pages/admin/product/CreateOrUpdateProduct';

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
        <Route path="admin/quan-ly-san-pham" element={<Product/>}/>
        <Route path="admin/san-pham" element={<CreateOrUpdateProduct/>}/>
        <Route path="admin/san-pham/:id" element={<CreateOrUpdateProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
