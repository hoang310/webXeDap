import { Link } from "react-router-dom";

const ProductCard = ({ item }) => (
  <div className="group border border-gray-100 p-4 bg-white hover:shadow-xl transition-all duration-300 relative">
    {item.tag && (
      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 font-bold z-10">
        {item.tag}
      </span>
    )}
    <div className="overflow-hidden mb-4">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500" 
      />
    </div>
    <h3 className="text-sm font-bold text-gray-800 mb-2 truncate uppercase">{item.name}</h3>
    <p className="text-red-600 font-bold">{item.price.toLocaleString()}</p>
    <button className="mt-4 w-full py-2 border border-red-600 text-red-600 text-xs font-bold group-hover:bg-red-600 group-hover:text-white transition">
      <Link to={`/san-pham/${item._id}`}>XEM CHI TIẾT</Link> 
    </button>
  </div>
);

export default ProductCard;