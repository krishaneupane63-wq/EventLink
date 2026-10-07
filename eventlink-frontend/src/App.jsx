import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterCustomerPage from './pages/RegisterCustomerPage'
import RegisterBusinessPage from './pages/RegisterBusinessPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import SearchPage from './pages/SearchPage'
import VendorProfilePage from './pages/VendorProfilePage'
import CustomerDashboardPage from './pages/CustomerDashboardPage'
import BusinessDashboardPage from './pages/BusinessDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import BusinessProfileEditorPage from './pages/BusinessProfileEditorPage'
import AIRecommendationsPage from './pages/AIRecommendationsPage'
import AccountSettingsPage from './pages/AccountSettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/customer" element={<RegisterCustomerPage />} />
        <Route path="/register/business" element={<RegisterBusinessPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/vendor/:id" element={<VendorProfilePage />} />
        <Route path="/dashboard/customer" element={<CustomerDashboardPage />} />
        <Route path="/dashboard/business" element={<BusinessDashboardPage />} />
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
        <Route path="/dashboard/business/edit-profile" element={<BusinessProfileEditorPage />} />
        <Route path="/recommendations" element={<AIRecommendationsPage />} />
        <Route path="/dashboard/settings" element={<AccountSettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
