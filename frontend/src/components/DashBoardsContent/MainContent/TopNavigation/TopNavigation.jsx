import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserModule } from '~/redux/user/userSlice'
import { setSelectedModule, selectSelectedModule } from '~/redux/module/moduleSlice'
import { getItemAPI } from '~/redux/module/moduleSlice'
function TopNavigation() {
  const dispatch = useDispatch()
  const userModule = useSelector(selectUserModule)
  const selectedModule = useSelector(selectSelectedModule)

  useEffect(() => {
    if (!selectedModule && userModule?.length > 0) {
      dispatch(setSelectedModule(userModule[0]))
    }
  }, [selectedModule, userModule, dispatch])

  const handleModuleClick = (item) => {
    if (selectedModule !== item) {
      dispatch(setSelectedModule(item))
      dispatch(getItemAPI())
    }
  }

  if (!userModule?.length) {
    return (
      <div className="bg-golf-green-100 flex items-center justify-center bg-opacity-50 backdrop-blur-md h-16 shadow-lg">
        <div className="text-lg font-semibold text-golf-green-500">No Module Found</div>
      </div>
    )
  }

  return (
    <nav className="bg-golf-green-100 rounded bg-opacity-50 backdrop-blur-md h-16 shadow-lg">
      {/* Container với overflow-x-auto cho phép cuộn ngang trên mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        {/* Thêm min-width để đảm bảo nội dung không bị đè trên mobile */}
        <div className="px-6 h-16 flex items-center min-w-max">
          {userModule.map((item) => (
            <button
              key={item.ModuleID}
              className={`
                whitespace-nowrap
                cursor-pointer 
                px-4 
                text-lg 
                font-semibold 
                transition-all 
                duration-300 
                relative
                ${
                  selectedModule?.ModuleID === item.ModuleID
                    ? 'text-luxury-gold-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-luxury-gold-500'
                    : 'text-golf-green-800 hover:text-luxury-gold-400 hover:scale-105'
                }
              `}
              onClick={() => handleModuleClick(item)}
            >
              {item.ModuleName}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation
