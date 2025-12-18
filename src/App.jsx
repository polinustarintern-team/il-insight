import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import './assets/styles/global.css';

// Protected Route
import ProtectedRoute from './components/common/ProtectedRoute';

// User Pages (for both Mentor and Management roles)
import HomePage from './pages/Home/HomePage';
import ThankYouPage from './pages/ThankYou/ThankYouPage';
import UserDashboardPage from './pages/user/Dashboard/UserDashboardPage';
import UserSummaryPage from './pages/user/Summary/UserSummaryPage';
import UserSummaryDetailPage from './pages/user/Summary/UserSummaryDetailPage';
import UserDetailQuestionPage from './pages/user/Summary/UserDetailQuestionPage';
import UserFeedbackPage from './pages/user/Feedback/UserFeedbackPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import SummaryPage from './pages/admin/SummaryPage';
import DetailAnalysisPage from './pages/admin/DetailAnalysisPage';
import CreateQuestionPage from './pages/admin/CreateQuestionPage';
import CreateQuestionDetailPage from './pages/admin/CreateQuestionDetailPage';
import FormBuilderPage from './pages/admin/FormBuilderPage';
import UserDirectoryPage from './pages/admin/UserDirectoryPage';

// Feedback Pages
import FeedbackFormPage from './pages/feedback/FeedbackFormPage';
import SelectReceiverPage from './pages/feedback/SelectReceiverPage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Auth Route - Public */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* User Routes - For both Mentor & Management */}
        <Route path="/user/dashboard" element={
          <ProtectedRoute allowedRoles={['mentor', 'manajemen']}>
            <UserDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/user/summary" element={
          <ProtectedRoute allowedRoles={['mentor', 'manajemen']}>
            <UserSummaryPage />
          </ProtectedRoute>
        } />
        <Route path="/user/summary/detail" element={
          <ProtectedRoute allowedRoles={['mentor', 'manajemen']}>
            <UserSummaryDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/user/summary/detail/question" element={
          <ProtectedRoute allowedRoles={['mentor', 'manajemen']}>
            <UserDetailQuestionPage />
          </ProtectedRoute>
        } />
        <Route path="/user/feedback" element={
          <ProtectedRoute allowedRoles={['mentor', 'manajemen']}>
            <UserFeedbackPage />
          </ProtectedRoute>
        } />

        {/* Feedback Routes - For both Mentor & Management */}
        <Route path="/feedback/select" element={
          <ProtectedRoute allowedRoles={['mentor', 'manajemen']}>
            <SelectReceiverPage />
          </ProtectedRoute>
        } />
        <Route path="/feedback/form" element={
          <ProtectedRoute allowedRoles={['mentor', 'manajemen']}>
            <FeedbackFormPage />
          </ProtectedRoute>
        } />

        {/* Admin Routes - Protected */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/summary" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SummaryPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/summary/detail/:userId" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DetailAnalysisPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/create-question" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateQuestionPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/create-question/form" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateQuestionDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/create-question/edit" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <FormBuilderPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/user-directory" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserDirectoryPage />
          </ProtectedRoute>
        } />

        {/* Fallback - Redirect to Login */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;