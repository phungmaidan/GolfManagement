import { useSelector, useDispatch } from 'react-redux'
import { setSelectedFunction, getItemAPI, selectFunctionList, selectSelectedFunction } from '~/redux/module/moduleSlice'
import { CheckCircle, BarChart, Settings, Menu } from 'lucide-react'
import { useState } from 'react'

function SideBar() {
  const selectedFunction = useSelector(selectSelectedFunction)
  const functionList = useSelector(selectFunctionList)
  const dispatch = useDispatch()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleFunctionClick = (functionType) => {
    if (selectedFunction !== functionType) {
      dispatch(setSelectedFunction(functionType))
      dispatch(getItemAPI())
    }
  }

  const functionIcons = {
    tasks: <CheckCircle size={20} />,
    reports: <BarChart size={20} />,
    setting: <Settings size={20} />
  }

  return (
    <div className="transition-all duration-300 w-20 sm:w-64">
      <div className="p-4 sm:p-6">
        {/* Header - only show on desktop */}
        <div className="hidden sm:block mb-8">
          <h1 className="text-xl font-semibold text-luxury-gold-400">
            Golf Management
          </h1>
        </div>

        {/* Navigation buttons */}
        <div className="space-y-3">
          {functionList.map((item) => (
            <button
              key={item.id}
              className={`
                w-full rounded-lg transition-all duration-200
                py-3 px-3 sm:px-4
                ${selectedFunction.id === item.id
              ? 'bg-luxury-gold-500 text-white shadow-md'
              : 'text-luxury-gold-300 hover:bg-luxury-gold-400/30'
            }
              `}
              onClick={() => handleFunctionClick(item)}
            >
              <span className="flex items-center justify-center sm:justify-start">
                <span className="text-center sm:mr-3">
                  {functionIcons[item.id]}
                </span>
                <span className="hidden sm:block">
                  {item.label}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
