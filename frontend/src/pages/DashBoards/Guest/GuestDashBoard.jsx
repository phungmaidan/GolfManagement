import React from 'react'
import { Sun, Calendar, Hotel, HelpCircle, Cloud, CloudDrizzle, Wind, MapPin, User, Soup } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectUserDetails } from '~/redux/user/userSlice'
import { weatherData as mockWeatherData, promotions, services as mockServices } from './mockData'
import { Link } from 'react-router-dom'

function GuestDashBoard() {
  const guestName = useSelector(selectUserDetails)?.DisplayName || 'Guest'

  // Map icon strings to actual icon components
  const iconMap = {
    Sun, Cloud, CloudDrizzle, Wind, Calendar, Hotel, HelpCircle, Soup
  }

  // Process weather data to include actual icon components
  const weatherData = {
    ...mockWeatherData,
    forecast: mockWeatherData.forecast.map(day => ({
      ...day,
      icon: React.createElement(iconMap[day.icon], { className: 'h-5 w-5' })
    }))
  }

  return (
    <div className="container mx-auto p-6">
      {/* Weather Widget */}
      <div className="mb-8">
        <h1 className="text-3xl text-luxury-gold-100 font-bold text-left py-6">Welcome, {guestName}</h1>
        <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider opacity-90">Current Weather</p>
                <div className="mt-2 flex items-baseline">
                  <span className="text-5xl font-bold">{weatherData.temperature}°</span>
                  <span className="ml-2 text-lg">{weatherData.condition}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 opacity-75" />
                    <span>Wind: {weatherData.wind} km/h</span>
                  </div>
                  <div className="flex items-center">
                    <Cloud className="h-4 w-4 mr-2 opacity-75" />
                    <span>Humidity: {weatherData.humidity}%</span>
                  </div>
                </div>
              </div>
              <Sun className="h-16 w-16 text-yellow-300" />
            </div>

            <div className="mt-6 border-t border-white pt-4">
              <div className="flex justify-between">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs font-medium">{day.day}</div>
                    {day.icon}
                    <div className="font-medium mt-1">{day.temp}°</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-luxury-gold-100 pb-3">Các chương trình ưu đãi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map(promo => (
            <div key={promo.id} className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="inline-block px-2 py-1 mb-3 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                  {promo.tag}
                </div>
                <h3 className="text-lg font-semibold mb-2">{promo.title}</h3>
                <p className="text-sm text-gray-600">{promo.description}</p>
                <button className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                    Xem thêm →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Services */}
      <div>
        <h2 className="text-2xl font-bold text-luxury-gold-100 pb-3">Dịch vụ có tại SONG BE GOLF RESORT</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={React.createElement(iconMap[service.icon])}
              color={service.color}
              title={service.title}
              description={service.description}
              path={service.path}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Service Card Component
function ServiceCard({ icon, color, title, description, path }) {
  const colorClasses = {
    emerald: 'bg-emerald-500 text-white',
    amber: 'bg-amber-500 text-white',
    blue: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white'
  }

  return (
    <Link to={path} className="block">
      <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className={`${colorClasses[color]} p-3 rounded-xl mb-4 inline-flex`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  )
}

export default GuestDashBoard