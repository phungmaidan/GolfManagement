import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemAPI, setSelectedItem } from "~/redux/module/moduleSlice";
import { useNavigate } from "react-router-dom";
// Giả sử hàm slugify đã được export từ '~/utils/formatter'
import { slugify } from "~/utils/formatter";

const RightContentModule = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, selectedItem } = useSelector((state) => state.module);

    const [loading, setLoading] = useState(true); // State cho hiệu ứng loading

    const handleFunctionClick = (item) => {
        // Cập nhật selectedItem trong Redux
        dispatch(setSelectedItem(item));
        // Sử dụng hàm slugify để chuyển đổi tên item thành dạng slug
        const pathName = slugify(item.ItemName);
        // Chuyển hướng đến trang tương ứng, ví dụ: /dashboards/daily-operation
        navigate(`/dashboards/${pathName}`);
    };

    // Gọi API khi component mount
    useEffect(() => {
        dispatch(getItemAPI());
        // Khi API trả về dữ liệu, cập nhật state loading
        setLoading(true);
        setTimeout(() => {
            setLoading(false); // Dừng loading khi dữ liệu đã được fetch
        }, 1000); // Đặt thời gian chờ cho việc hiển thị loading
    }, [dispatch]);

    return (
        <div className="h-full w-full flex-start items-center justify-center flex-wrap">
            {loading ? (
                <div className="flex mt-50 justify-center h-full w-full">
                    {/* Hiệu ứng loading */}
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
                </div>
            ) : (
                <div className="h-1/2 w-[90%] grid grid-cols-2 gap-2 flex-wrap">
                    {items.map((item, index) => (
                        <button
                            key={item.ItemID}
                            className={`h-12 m-2 bg-white text-primary-500 border border-secondary-500 flex items-center justify-center rounded-md hover:bg-primary-500 hover:text-primary-500 hover:scale-105 hover:shadow-lg transition-all opacity-0 animation-show`}
                            style={{
                                animationDelay: `${index * 0.05}s`, // Thêm độ trễ giữa các nút
                            }}
                            onClick={() => handleFunctionClick(item)}
                        >
                            <span className="text-lg">{item.ItemName}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RightContentModule;
