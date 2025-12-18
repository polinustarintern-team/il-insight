import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import './assets/styles/global.css';

// User Pages
import HomePage from './pages/Home/HomePage';
import FeedbackPage from './pages/Feedback/FeedbackPage';
import ThankYouPage from './pages/ThankYou/ThankYouPage';
import UserDashboardPage from './pages/user/Dashboard/UserDashboardPage';
import UserSummaryPage from './pages/user/Summary/UserSummaryPage';
import UserSummaryDetailPage from './pages/user/Summary/UserSummaryDetailPage';
import UserDetailQuestionPage from './pages/user/Summary/UserDetailQuestionPage';
import UserFeedbackPage from './pages/user/Feedback/UserFeedbackPage';
import MentorToMentorFeedbackPage from './pages/user/Feedback/MentorToMentorFeedbackPage';
import MentorToManagementFeedbackPage from './pages/user/Feedback/MentorToManagementFeedbackPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import SummaryPage from './pages/admin/SummaryPage';
import DetailAnalysisPage from './pages/admin/DetailAnalysisPage';
import CreateQuestionPage from './pages/admin/CreateQuestionPage';
import CreateQuestionDetailPage from './pages/admin/CreateQuestionDetailPage';
import FormBuilderPage from './pages/admin/FormBuilderPage';
import UserDirectoryPage from './pages/admin/UserDirectoryPage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Auth Route */}
        <Route path="/" element={<LoginPage />} />

        {/* User Routes */}
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/feedback" element={<FeedbackPage />} /> */}
        <Route path="/thank-you" element={<ThankYouPage />} />

        <Route path="/user/dashboard" element={<UserDashboardPage />} />
        <Route path="/user/summary" element={<UserSummaryPage />} />
        <Route path="/user/summary/detail" element={<UserSummaryDetailPage />} />
        <Route path="/user/summary/detail/question" element={<UserDetailQuestionPage />} />
        <Route path="/user/feedback" element={<UserFeedbackPage role="Mentor" />} />

        <Route path="/management/feedback" element={<UserFeedbackPage role="Management" />} />

        {/* Specific Feedback Forms */}
        <Route path="/feedback/mentor-to-mentor" element={<MentorToMentorFeedbackPage />} />
        <Route path="/feedback/mentor-to-management" element={<MentorToManagementFeedbackPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/summary" element={<SummaryPage />} />
        <Route path="/admin/summary/detail" element={<DetailAnalysisPage />} />
        <Route path="/admin/create-question" element={<CreateQuestionPage />} />
        <Route path="/admin/create-question/form" element={<CreateQuestionDetailPage />} />
        <Route path="/admin/create-question/edit" element={<FormBuilderPage />} />
        <Route path="/admin/user-directory" element={<UserDirectoryPage />} />

        {/* Fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;