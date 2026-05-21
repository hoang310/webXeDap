import {useState} from 'react'

function CreateOrUpdateUser() {
  const [dark, setDark] = useState(true);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="p-10">
        <button
          onClick={() => setDark(!dark)}
          className={`px-4 py-2 rounded-lg font-medium ${
            dark
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <h1 className="mt-6 text-3xl font-bold">
          React + Tailwind Theme
        </h1>

        <p className="mt-2 opacity-80">
          Đây là ví dụ dark/light mode đơn giản.
        </p>
      </div>
    </div>
  );
}

export default CreateOrUpdateUser