import React from 'react';
import './App.css';
import './assets/styles/global.css';

// User Pages
import HomePage from './pages/user/Home/HomePage';
import FeedbackPage from './pages/user/Feedback/FeedbackPage';
import ThankYouPage from './pages/user/ThankYou/ThankYouPage';
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
import UserDirectoryPage from './pages/admin/UserDirectoryPage';

function App() {
  const path = window.location.pathname;

  // Simple routing logic (replace with react-router-dom in production)
  let component;

  // User Routes
  if (path === '/') component = <HomePage />;
  else if (path === '/feedback') component = <FeedbackPage />;
  else if (path === '/thank-you') component = <ThankYouPage />;
  else if (path === '/user/dashboard') component = <UserDashboardPage />;
  else if (path === '/user/summary') component = <UserSummaryPage />;
  else if (path === '/user/summary/detail') component = <UserSummaryDetailPage />;
  else if (path === '/user/summary/detail/question') component = <UserDetailQuestionPage />;
  else if (path === '/user/feedback') component = <UserFeedbackPage role="Mentor" />;
  else if (path === '/management/feedback') component = <UserFeedbackPage role="Management" />;

  // Admin Routes
  else if (path === '/admin/dashboard') component = <DashboardPage />;
  else if (path === '/admin/summary') component = <SummaryPage />;
  else if (path === '/admin/summary/detail') component = <DetailAnalysisPage />;
  else if (path === '/admin/create-question') component = <CreateQuestionPage />;
  else if (path === '/admin/user-directory') component = <UserDirectoryPage />;

  // Default
  else component = <HomePage />;

  return (
    <div className="App">
      {component}
    </div>
  );
}

export default App;