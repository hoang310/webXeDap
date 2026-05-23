const Hero = () => {

  const urlI = process.env.REACT_APP_IMAGE
  const img = "webxedap.webp"


  return (
    <div className="relative w-full h-screen">
      <img
        src={`${urlI}${img}`}
        alt="banner"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Xe Đạp HHBIKE
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