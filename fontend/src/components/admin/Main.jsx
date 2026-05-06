import { HiMagnifyingGlass, HiBell } from "react-icons/hi2";

const Main = ({ children }) => {
  return (
    <div className="w-full">
        <div className="px-4 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg w-72">
            <HiMagnifyingGlass className="text-gray-500" />
            <input type="text" placeholder="Tìm kiếm ..." className="bg-transparent outline-none w-full" />
          </div>
          <div className="flex items-center gap-4">
            <HiBell className="text-gray-500 text-xl" />
            <img src="" alt="admin" className="rounded-full" />
          </div>
          </div>
        <div className="text-center">
          {children}
        </div>
    </div>
  );
};

export default Main;