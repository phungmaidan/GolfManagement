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

  const functionsList = ['Tasks', 'Reports', 'Setting'];

  return (
    <div className="h-full w-[30vh] flex flex-col items-center p-4 space-y-4">
      {functionsList.map((functionType, index) => (
        <button
          key={functionType}
          onClick={() => handleFunctionClick(functionType)}
          className={`relative group w-full flex items-center justify-center h-12 px-4 py-2 rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${
            selectedFunction === functionType
              ? 'bg-golf-green-500 text-white border border-luxury-gold-400'
              : 'bg-gray-700 text-luxury-gold-50 border border-gray-600 hover:bg-golf-green-600 hover:text-white'
          } opacity-0 animation-show`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {/* Hiệu ứng background gradient xuất hiện khi hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-golf-green-500 to-luxury-gold-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="relative flex items-center">
            <span className="mr-2">{functionIcons[functionType]}</span>
            <span>{functionType}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default LeftContentModule;
