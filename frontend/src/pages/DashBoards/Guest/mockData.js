// Weather data
export const weatherData = {
  temperature: 28,
  condition: 'Sunny',
  humidity: 65,
  wind: 7.2,
  forecast: [
    { day: 'Today', temp: 28, icon: 'Sun' },
    { day: 'Wed', temp: 27, icon: 'Cloud' },
    { day: 'Thu', temp: 26, icon: 'CloudDrizzle' },
    { day: 'Fri', temp: 29, icon: 'Sun' },
    { day: 'Saturday', temp: 28, icon: 'Sun' },
    { day: 'Sunday', temp: 28, icon: 'Sun' }
  ]
};

// Promotions data
export const promotions = [
  {
    id: 1,
    title: 'Mừng ngày quốc tế phụ nữ',
    description: 'Giảm 20% khi sử dụng dịch vụ golf và ăn uống tại hệ thống sân golf. Áp dụng từ 8/3 đến 15/3/2025.',
    image: 'https://songbegolf.com.vn/pictures/mobiles/banner/queens-on-the-greens-web-1.jpg',
    tag: 'Special Event'
  },
  {
    id: 2,
    title: 'Ưu đãi cho khách hàng mới',
    description: 'Giảm 15% cho lần đặt phòng đầu tiên và miễn phí 1 vòng golf khi đặt phòng 2 đêm liên tiếp.',
    image: 'https://songbegolf.com.vn/pictures/mobiles/banner/bg1.jpg',
    tag: 'New Customer'
  },
  {
    id: 3,
    title: 'Mừng Nhà Hàng Cọ Lên 3',
    description: 'Thêm nhiều món ăn đa dạng, nơi check-in lý tưởng, sự kiện rút thăm có thưởng với nhiều phần quà hấp dẫn.',
    image: 'https://songbegolf.com.vn/pictures/mobiles/banner/co-3-tuoi-web-2.jpg',
    tag: 'Family Package'
  }
];

// Services data
export const services = [
  {
    icon: 'Calendar',
    color: 'emerald',
    title: 'Đặt lịch chơi Golf',
    description: 'Đặt lịch chơi tại sân golf 36 lỗ tiêu chuẩn quốc tế',
    path: '/booking'
  },
  {
    icon: 'Soup',
    color: 'amber',
    title: 'Đặt lịch ăn uống',
    description: 'Thưởng thức các món ăn đặc sắc tại nhà hàng 5 sao',
    path: '/restaurant'
  },
  {
    icon: 'Hotel',
    color: 'blue',
    title: 'Đặt khách sạn',
    description: 'Trải nghiệm nghỉ dưỡng với 120 phòng view sân golf',
    path: '/hotel'
  },
  {
    icon: 'HelpCircle',
    color: 'purple',
    title: 'Hỏi đáp',
    description: 'Hỗ trợ và giải đáp mọi thắc mắc của khách hàng về dịch vụ, khuyến mãi 24/7',
    path: '/support'
  }
];