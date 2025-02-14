import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFunction, getItemAPI, selectFunctionList, selectSelectedFunction } from '~/redux/module/moduleSlice';
import { CheckCircle, BarChart, Settings } from 'lucide-react';

function SideBar() {
    const selectedFunction = useSelector(selectSelectedFunction);
    const functionList = useSelector(selectFunctionList)
    const dispatch = useDispatch();

    const handleFunctionClick = (functionType) => {
        if (selectedFunction !== functionType) {
            dispatch(setSelectedFunction(functionType));
            dispatch(getItemAPI());
        }
    };

    const functionIcons = {
        tasks: <CheckCircle size={20} />,
        reports: <BarChart size={20} />,
        setting: <Settings size={20} />,
    };

    return (
        <div className="w-64 bg-golf-green-700 bg-opacity-90">
            <div className="p-6">
                <h1 className="text-xl font-semibold text-luxury-gold-400 mb-8 pl-4">
                    Golf Management
                </h1>
                <div className="space-y-2">
                    {functionList.map((item) => (
                        <button
                            key={item.id}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                                ${selectedFunction.id === item.id
                                    ? 'bg-luxury-gold-500 text-white'
                                    : 'text-luxury-gold-300 hover:bg-luxury-gold-400/30'
                                }`}
                            onClick={() => handleFunctionClick(item)}
                        >
                            <span className="flex items-center">
                                <span className="mr-3">{functionIcons[item.id]}</span>
                                <span>{item.label}</span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
