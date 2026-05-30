import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./context/AuthContext";


export default function App() {
  const { isLoggedIn } = useAuth()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <nav className="mx-auto flex max-w-3xl justify-between px-6 py-4">
          <h1 className="font-semibold">Auth App</h1>

          <div className="flex gap-4">
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            {isLoggedIn && <Link to='/profile'>Profile</Link>}


          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-6 py-8">
          <Routes>
            <Route path='/' element={<Navigate to='/register' replace />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}