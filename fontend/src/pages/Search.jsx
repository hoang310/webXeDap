import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { gSearch } from '../services/api';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

function Search() {

    const {query} = useParams()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetch = async () => {
          try {
            const res = await gSearch(query);
            setProducts(res.data.data)
          } catch (err) {
            console.log(err)
          }
        }
    
        fetch()
      }, [query])

    return (
        <>
            <Navbar/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(p => (
                <ProductCard key={p._id} item={p} />
                ))}
            </div>
            <footer/>
        </>
    )
}

export default Search