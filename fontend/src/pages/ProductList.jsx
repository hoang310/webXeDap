import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "../services/api";


const ProductList = () => {

  const {id} = useParams()
  const {name} = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchPro = async () => {
      try {
        const res = await getProductsByCategory(id, 20);
        setProducts(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPro()
  }, [id])
 
  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold p-6">{name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
        {products.map(p => (
          <ProductCard key={p._id} item={p} />
        ))}
      </div>
    </>
  );
};

export default ProductList;