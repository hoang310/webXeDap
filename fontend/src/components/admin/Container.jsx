const Container = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {children}
    </div>
  );
};

export default Container;