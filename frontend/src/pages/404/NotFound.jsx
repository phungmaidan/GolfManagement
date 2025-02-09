import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import particles from '~/assets/404/particles.png'; // Đảm bảo đường dẫn đúng

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-[#25344C] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-repeat bg-contain animate-stars"
        style={{ backgroundImage: `url(${particles})` }}
      ></div>

      {/* Nội dung 404 */}
      <h1 className="text-[100px] font-extrabold relative z-10">404</h1>
      <p className="text-lg leading-6 font-normal max-w-[350px] text-center relative z-10">
        LOST IN
        <span className="relative inline-block px-1">
          <span className="absolute bottom-[43%] left-0 w-full border-b-2 border-[#fdba26]"></span>
          SPACE
        </span>
        ? <br /> Hmm, looks like that page doesn&apos;t exist.
      </p>

      {/* Chỗ trống cho animation hoặc hình ảnh */}
      <div className="w-[390px] h-[390px] relative z-10"></div>

      {/* Nút Go Home */}
      <Link to="/" className="relative z-10">
        <button className="flex items-center gap-2 text-white border border-white px-4 py-2 mt-4 rounded-md hover:text-[#fdba26] hover:border-[#fdba26]">
          <Home size={20} /> Go Home
        </button>
      </Link>

      {/* Animation Background */}
      <style>
        {`
          @keyframes stars {
            0% { background-position: -100% 100%; }
            100% { background-position: 0 0; }
          }
          .animate-stars { animation: stars 12s linear infinite alternate; }
        `}
      </style>
    </div>
  );
}
