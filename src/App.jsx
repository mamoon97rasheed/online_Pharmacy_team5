import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import Admin from './pages/Admin.jsx'
import { AuthProvider, useAuth } from './state/AuthContext.jsx'
import { CartProvider, useCart } from './state/CartContext.jsx'

function Nav() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()  // 👈 get cart count from context

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-semibold">💊 Online Pharmacy</Link>
        <div className="flex-1" />
        <Link to="/catalog">Catalog</Link>
        {user && (
          <Link to="/cart">
            Cart {cartCount > 0 && <span className="ml-1 text-sm text-slate-600">({cartCount})</span>}
          </Link>
        )}
        {user && <Link to="/orders">Orders</Link>}
        {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && (
          <button
            onClick={logout}
            className="px-3 py-1 rounded bg-slate-800 text-white hover:bg-slate-900"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* 👈 wrap inside CartProvider */}
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 max-w-6xl mx-auto w-full p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/catalog" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
              <Route path="*" element={<div className="p-8">Not found</div>} />
            </Routes>
          </main>
          <footer className="py-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Online Pharmacy
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
