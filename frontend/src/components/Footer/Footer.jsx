import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'

const Footer = ({ logo }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-golf-green-800 text-luxury-gold-50 pb-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 pt-4 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="Logo" className="h-15 mb-4" />
            </div>
            <p className="text-sm text-luxury-gold-100 mb-6">
              Trải nghiệm golf đẳng cấp với những sân golf tuyệt đẹp và dịch vụ chuyên nghiệp.
              Chúng tôi cam kết mang đến những giây phút thư giãn và niềm đam mê golf cho quý khách.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-luxury-gold-400 font-semibold text-lg mb-4">
              Liên kết nhanh
            </h6>
            <FooterLinks links={['Trang chủ', 'Về chúng tôi', 'Dịch vụ', 'Đặt lịch', 'Tin tức']} />
          </div>

          {/* Services */}
          <div>
            <h6 className="text-luxury-gold-400 font-semibold text-lg mb-4">
              Dịch vụ
            </h6>
            <FooterLinks links={['Sân tập Golf', 'Học Golf', 'Pro Shop', 'Nhà hàng', 'Sự kiện']} />
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-luxury-gold-400 font-semibold text-lg mb-4">
              Liên hệ
            </h6>
            <div className="space-y-4">
              <ContactInfo
                Icon={MapPin}
                text="123 Đường Golf, Quận 2, TP. Hồ Chí Minh"
              />
              <ContactInfo
                Icon={Phone}
                text="+84 123 456 789"
              />
              <ContactInfo
                Icon={Mail}
                text="info@golfclub.com"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-luxury-gold-800/30 my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-luxury-gold-200">
          © {currentYear} Golf Club. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

const FooterLinks = ({ links }) => (
  <ul className="space-y-2">
    {links.map((text) => (
      <li key={text}>
        <a
          href="#"
          className="text-luxury-gold-100 hover:text-luxury-gold-400
                     transition-colors duration-300"
        >
          {text}
        </a>
      </li>
    ))}
  </ul>
)

const ContactInfo = ({ Icon, text }) => (
  <div className="flex items-start space-x-3">
    <Icon size={20} className="text-luxury-gold-400 mt-1" />
    <span className="text-luxury-gold-100">{text}</span>
  </div>
)

export default Footer