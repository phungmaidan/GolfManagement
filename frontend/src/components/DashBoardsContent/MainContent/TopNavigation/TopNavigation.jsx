import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';
import { setSelectedModule, selectSelectedModule } from '~/redux/module/moduleSlice';
import { getItemAPI } from '~/redux/module/moduleSlice';
function TopNavigation() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const userModules = currentUser?.userModule || [];
    const selectedModule = useSelector(selectSelectedModule);

    useEffect(() => {
        if (!selectedModule && userModules.length > 0) {
            dispatch(setSelectedModule(userModules[0]));
        }
    }, [selectedModule, userModules, dispatch]);

    const handleModuleClick = (item) => {
        if (selectedModule !== item) {
            dispatch(setSelectedModule(item));
            dispatch(getItemAPI());
        }
    };

    if (!currentUser || !userModules.length) {
        return <div>Loading...</div>;
    }


    return (
        <nav className="bg-golf-green-100 bg-opacity-50 backdrop-blur-md h-16 shadow-lg">
            <div className="px-6 h-full flex space-x-8 items-center">
                {userModules.map((item) => (
                    <button
                        key={item.ModuleID}
                        className={`cursor-pointer px-4 text-lg font-semibold transition-all duration-300 relative
                  ${selectedModule?.ModuleID === item.ModuleID
                                ? 'text-luxury-gold-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-luxury-gold-500'
                            : 'text-golf-green-800 hover:text-luxury-gold-400 hover:scale-109'}`}
                        onClick={() => { handleModuleClick(item) }}
                    >
                        {item.ModuleName}
                    </button>
                ))}
            </div>
        </nav>
    )
}

export default TopNavigation
