import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { Button } from './components/Button'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import BrandPage from './pages/BrandPage'
import ServiceExplorer from './pages/ServiceExplorer'
import LoginPage from './pages/LoginPage'
import UserDashboard from './pages/UserDashboard'
import SellPhonePage from './pages/SellPhonePage'
import AdminDashboard from './pages/AdminDashboard'
import AdminLoginPage from './pages/AdminLoginPage'


function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">404</p>
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Page not found</h1>
      <p className="max-w-md text-sm text-slate-600">
        The page you requested does not exist. Go back to the homepage.
      </p>
      <Button as="a" href="/" variant="primary">
        Go to Home
      </Button>
    </section>
  )
}



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/brand/:brandName" element={<BrandPage />} />
              <Route path="/services/:serviceType" element={<ServiceExplorer />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/sell-phone" element={<SellPhonePage />} />
              <Route path="/landing" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  )
}
