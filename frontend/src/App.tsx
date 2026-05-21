import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchProfile } from './redux/slices/authSlice';
import Toast from './components/Toast/Toast';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProblemsPage from './pages/Problems/ProblemsPage';
import ProblemDetailPage from './pages/Problems/ProblemDetailPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ContestsPage from './pages/Contests/ContestsPage';
import DiscussionPage from './pages/Discussion/DiscussionPage';
import ProfilePage from './pages/Profile/ProfilePage';
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';

export default function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem/:slug" element={<ProblemDetailPage />} />
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/discuss" element={<DiscussionPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}
