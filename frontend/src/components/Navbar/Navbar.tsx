import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Menu, X, User, LogOut, Trophy, MessageSquare, LayoutDashboard } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            CodeArena
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/problems" className="text-sm text-[var(--text-secondary)] transition hover:text-white">
            Problems
          </Link>
          <Link to="/contests" className="text-sm text-[var(--text-secondary)] transition hover:text-white">
            Contests
          </Link>
          <Link to="/discuss" className="text-sm text-[var(--text-secondary)] transition hover:text-white">
            Discuss
          </Link>
          <Link to="/leaderboard" className="text-sm text-[var(--text-secondary)] transition hover:text-white">
            Leaderboard
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-sm text-[var(--text-secondary)] transition hover:text-white">
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-sm transition hover:border-[var(--gradient-start)]"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                  alt="avatar"
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-[var(--text-primary)]">{user?.name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-1 shadow-xl">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-[var(--bg-tertiary)]"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:border-[var(--gradient-start)] hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[var(--text-secondary)]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/problems" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Code2 size={16} /> Problems
            </Link>
            <Link to="/contests" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Trophy size={16} /> Contests
            </Link>
            <Link to="/discuss" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[var(--text-secondary)]">
              <MessageSquare size={16} /> Discuss
            </Link>
            <Link to="/leaderboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Trophy size={16} /> Leaderboard
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 rounded-lg border border-[var(--border)] py-2 text-center text-sm text-[var(--text-secondary)]">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-2 text-center text-sm text-white">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
