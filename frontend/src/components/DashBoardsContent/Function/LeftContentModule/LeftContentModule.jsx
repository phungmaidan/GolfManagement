import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFunction, getItemAPI } from '~/redux/module/moduleSlice';

// Import các icon từ lucide-react
import { CheckCircle, BarChart, Settings } from 'lucide-react';

const LeftContentModule = () => {
    const selectedFunction = useSelector((state) => state.module.selectedFunction);
    const dispatch = useDispatch();

    const handleFunctionClick = (functionType) => {
        if (selectedFunction !== functionType) {
            dispatch(setSelectedFunction(functionType));
            dispatch(getItemAPI());
        }
    };

    // Định nghĩa icon tương ứng với mỗi chức năng
    const functionIcons = {
        Tasks: <CheckCircle />,
        Reports: <BarChart />,
        Setting: <Settings />,
    };

    return (
        <div className="h-full w-[30vh] flex-start flex-wrap">
            {['Tasks', 'Reports', 'Setting'].map((functionType) => (
                <button
                    key={functionType}
                    className={`w-[90%] h-12 m-2 flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
                        selectedFunction === functionType
                            ? 'bg-golf-green-500 text-white border border-luxury-gold-400'
                            : 'bg-gray-700 text-luxury-gold-50 border border-gray-600 hover:bg-golf-green-600 hover:text-white hover:scale-105'
                    }`}
                    onClick={() => handleFunctionClick(functionType)}
                >
                    <span className="mr-2">{functionIcons[functionType]}</span>
                    {functionType}
                </button>
            ))}
        </div>
    );
};

export default LeftContentModule;
