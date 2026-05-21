import { useEffect, useState } from 'react';
import { Trophy, Clock, Users, Calendar, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchContests } from '../../redux/slices/contestSlice';
import Navbar from '../../components/Navbar/Navbar';
import API from '../../services/api';

export default function ContestsPage() {
  const dispatch = useAppDispatch();
  const { contests, loading } = useAppSelector(s => s.contests);
  const [tab, setTab] = useState<'upcoming' | 'live' | 'past'>('upcoming');

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  const now = new Date();
  const upcoming = contests.filter((c) => new Date(c.startTime) > now);
  const live = contests.filter((c) => new Date(c.startTime) <= now && new Date(c.endTime) > now);
  const past = contests.filter((c) => new Date(c.endTime) <= now);
  
  const display = tab === 'upcoming' ? upcoming : tab === 'live' ? live : past;

  const shown = display;

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const getTimeUntil = (d: string) => {
    const diff = new Date(d).getTime() - Date.now();
    if (diff < 0) return 'Started';
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return `${days}d ${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-12">
        <div className="mb-8 flex items-center gap-3">
          <Trophy size={28} className="text-[var(--accent)]" />
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Contests</h1>
            <p className="text-[var(--text-muted)]">Compete and climb the leaderboard</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2">
          {(['upcoming', 'live', 'past'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-5 py-2 text-sm font-medium capitalize transition ${
                tab === t ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white' : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-white'
              }`}>
              {t} {t === 'live' && live.length > 0 && <span className="ml-1 inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Contest Cards */}
        <div className="space-y-4">
          {shown.map((c) => (
            <div key={c._id} className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition hover:border-[var(--gradient-start)]/50">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{c.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(c.startTime)}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> 90 min</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {c.participants?.length || 0} registered</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="rounded-lg bg-[var(--bg-tertiary)] px-4 py-2 text-center">
                    <div className="text-xs text-[var(--text-muted)]">Starts in</div>
                    <div className="text-sm font-bold text-[var(--accent)]">{getTimeUntil(c.startTime)}</div>
                  </div>
                  <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-5 py-2 text-sm font-medium text-white transition hover:shadow-lg">
                    Register <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
