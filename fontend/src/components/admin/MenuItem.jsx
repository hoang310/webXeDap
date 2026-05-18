import React, { useState } from 'react';

const MenuItem = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li classname="">
      <button 
        onClick={toggleSubMenu} 
        className="px-4 py-2 flex justify-center items-center gap-2"
      >
        {icon} {title}
      </button>
      
      {isOpen && (
        <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white space-y-1"> 
          {children}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;