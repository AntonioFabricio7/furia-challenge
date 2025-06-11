import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registro" element={<RegistrationPage />} />
      <Route path="/painel" element={<DashboardPage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;