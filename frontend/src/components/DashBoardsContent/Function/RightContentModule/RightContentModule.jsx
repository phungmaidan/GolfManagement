import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemAPI, setSelectedItem } from "~/redux/module/moduleSlice";
import { useNavigate } from "react-router-dom";
// Giả sử hàm slugify đã được export từ '~/utils/formatter'
import { slugify } from "~/utils/formatter";

const RightContentModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.module);

  const [loading, setLoading] = useState(true);

  const handleFunctionClick = (item) => {
    dispatch(setSelectedItem(item));
    const pathName = slugify(item.ItemName);
    navigate(`/dashboards/${pathName}`);
  };

  // Gọi API khi component mount và tạo hiệu ứng loading
  useEffect(() => {
    dispatch(getItemAPI());
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="h-full w-full flex flex-col items-center ">
      {loading ? (
        <div className="flex mt-10 justify-center h-full w-full">
          {/* Spinner loading */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {items.map((item, index) => (
            <button
              key={item.ItemID}
              onClick={() => handleFunctionClick(item)}
              className="relative group h-16 flex items-center justify-center rounded-xl overflow-hidden bg-golf-green-50 shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl animation-show opacity-0"
              style={{
                animationDelay: `${index * 0.05}s`, // Tạo hiệu ứng stagger cho các nút
              }}
            >
              {/* Background gradient hiện ra khi hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-golf-green-500 to-luxury-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              {/* Nội dung của nút */}
              <span className="relative text-lg font-medium text-golf-green-700 group-hover:text-gray-800 transition-colors duration-300">
                {item.ItemName}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightContentModule;
