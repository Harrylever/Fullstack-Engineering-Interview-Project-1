import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/shared/sections'
import {
  DashboardPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from './view'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="auth/login" element={<LoginPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
