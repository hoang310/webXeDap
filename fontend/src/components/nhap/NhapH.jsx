

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src="https://thongnhat.com.vn/wp-content/uploads/2025/06/xe-dap-thong-nhat-cover-2025a.webp"
        alt="banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content (optional) */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Xe Đạp Thống Nhất
          </h1>
          <p className="text-lg md:text-xl">
            Xe đạp Việt Nam chất lượng cao
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;