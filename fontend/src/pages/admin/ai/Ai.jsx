import { useState } from 'react'
import { aiGen } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

function Ai() {
  const [specs, setSpecs] = useState(`Tên: Giant ATX 830\nLoại: MTB\nKhung: Nhôm\nPhanh: Đĩa dầu`);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!specs.trim()) return alert('Vui lòng nhập thông số!');

    setLoading(true);
    setDescription('');

    try {
      const res = await aiGen(specs);
      console.log(res)
      if (res.data?.description) {
        setDescription(res.data?.description);
      } else {
        setDescription(res.data?.error || 'Có lỗi xảy ra.');
      }
    } catch (error) {
      console.error(error);
      setDescription('Không thể kết nối đến server.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            AI Product Generator
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            Tự động biến thông số kỹ thuật thô thành bài viết mô tả sản phẩm cuốn hút.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Thông số sản phẩm</h3>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Admin Input
                </span>
              </div>
              <textarea
                rows="10"
                className="w-full p-4 block rounded-xl border-slate-300 bg-slate-50 text-slate-800 font-mono text-sm focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white resize-none transition-all shadow-inner border"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="Nhập thông số (Ví dụ: Tên, chất liệu, tính năng...)"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`mt-6 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  AI đang viết nội dung...
                </>
              ) : (
                'Tạo sản phẩm tự động'
              )}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Mô tả từ AI</h3>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Gemini AI Generated
              </span>
            </div>

            <div className="flex-1 w-full p-4 rounded-xl bg-slate-50 border border-slate-100 overflow-y-auto max-h-[290px] md:max-h-none shadow-inner min-h-[240px]">
              {description ? (
                <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
                  {description}
                </p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                  <svg className="w-12 h-12 mb-3 opacity-60 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-8.982M18 13.653V16.5m0-4.5V4.75A2.25 2.25 0 0015.75 2.5H4.25A2.25 2.25 0 002 4.75v14.5A2.25 2.25 0 004.25 21.5h7.453m4.3-10.5c.995 0 1.833.722 1.986 1.705l.392 2.522a1.25 1.25 0 01-1.24 1.442h-3.32a1.25 1.25 0 01-1.24-1.442l.393-2.522a1.987 1.987 0 011.986-1.705z" />
                  </svg>
                  <p className="text-sm italic">Nội dung marketing sẽ hiển thị tại đây...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/admin')} className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
          Trở về
        </button>

      </div>
    </div>
  )
}

export default Ai