import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép Vite sử dụng được process.env, mặc định thì không mà phải dùng import.meta.env
  define: {
    'process.env': process.env
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'named'
      }
    }),
    tailwindcss()
  ],
  // base: './'
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  },
  server: {
    host: '0.0.0.0', // Change true to '0.0.0.0' to expose to all network interfaces
    port: 5173 // Có thể thay đổi port nếu muốn
  }
})
