import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { selectCurrentUser } from '~/redux/user/userSlice'; 
import { setSelectedModule } from '~/redux/module/moduleSlice'; 
import { getItemAPI } from '~/redux/module/moduleSlice';

const Module = () => { 
  const dispatch = useDispatch(); 
  const currentUser = useSelector(selectCurrentUser); 
  const userModules = currentUser?.userModule || []; 
  const selectedModule = useSelector((state) => state.module.selectedModule);
  
  useEffect(() => { 
    if (!selectedModule && userModules.length > 0) { 
      dispatch(setSelectedModule(userModules[0])); 
    } 
  }, [selectedModule, userModules, dispatch]);

  const handleModuleClick = (module) => { 
    if (selectedModule !== module) { 
      dispatch(setSelectedModule(module)); 
      dispatch(getItemAPI()); 
    } 
  };

  if (!currentUser || !userModules.length) { 
    return <div>Loading...</div>; 
  }

  return (
    <div className="h-[15vh] w-full rounded-lg flex items-center justify-center text-white">
      {userModules.map((module) => (
        <button
          key={module.ModuleID}
          className={`flex flex-col items-center justify-center p-4 border-2 border-solid rounded-lg text-center cursor-pointer m-1 w-[150px] h-[60px] 
            ${selectedModule?.ModuleName === module.ModuleName ? 
              'bg-luxury-gold-500 text-golf-green-50' : 
              'bg-golf-green-500 text-luxury-gold-50'} 
            transition-all duration-300 ease-in-out 
            transform hover:scale-105 hover:shadow-lg hover:shadow-luxury-gold-300`}
          onClick={() => handleModuleClick(module)}
        >
          <h6 className="text-lg font-semibold">
            {module.ModuleName}
          </h6>
        </button>
      ))}
    </div>
  );
};

export default Module;
