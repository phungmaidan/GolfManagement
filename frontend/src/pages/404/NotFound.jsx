import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-golf-green-50 p-4">
      <h1 className="text-8xl font-bold text-luxury-gold-500">404</h1>
      <p className="mt-4 text-xl text-golf-green-700">Page not found</p>
      <p className="mt-2 text-golf-green-600">Sorry, we couldn't find the page you're looking for.</p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-golf-green-600 text-white rounded-md hover:bg-golf-green-700
                     transition-colors duration-200"
        >
          Go Home
        </Link>
        <a
          href="#"
          className="px-6 py-2 text-golf-green-600 hover:text-luxury-gold-500 transition-colors"
        >
          Support →
        </a>
      </div>
    </div>
  )
}
