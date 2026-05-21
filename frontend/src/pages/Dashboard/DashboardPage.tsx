import { useEffect, useState, useMemo } from 'react';
import { Flame, Target, Award, TrendingUp, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import API from '../../services/api';
import { useAppSelector } from '../../redux/hooks';

export default function DashboardPage() {
  const { user } = useAppSelector((s) => s.auth);
  const [stats, setStats] = useState({ easy: 0, medium: 0, hard: 0, total: 0 });
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [activity, setActivity] = useState<Record<string, number>>({});

  useEffect(() => {
    API.get('/users/stats').then((r) => setStats(r.data)).catch(() => {});
    API.get('/submissions/history').then((r) => setSubmissions(r.data.slice(0, 10))).catch(() => {});
    API.get('/submissions/activity').then((r) => setActivity(r.data)).catch(() => {});
  }, []);

  const totalPossibleProblems = 50; // Dynamic eventually
  const solvedPct = totalPossibleProblems > 0 ? ((stats.total / totalPossibleProblems) * 100).toFixed(1) : '0';

  // Generate heatmap data from real activity
  const heatmapData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        data.push(activity[key] || 0);
    }
    return data;
  }, [activity]);
  
  const heatColors = ['bg-[var(--bg-tertiary)]', 'bg-emerald-900', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-400'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-12">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Welcome back, <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">{user?.name || 'Coder'}</span>
          </h1>
          <p className="mt-1 text-[var(--text-muted)]">Track your progress and keep the streak going!</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">Total Solved</span>
              <Target size={20} className="text-[var(--gradient-start)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-primary)]">{stats.total}</div>
            <div className="mt-2 h-1.5 rounded-full bg-[var(--bg-tertiary)]">
              <div className="h-full rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" style={{ width: `${solvedPct}%` }} />
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">Easy</span>
              <div className="h-3 w-3 rounded-full bg-[var(--easy)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--easy)]">{stats.easy}</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">Medium</span>
              <div className="h-3 w-3 rounded-full bg-[var(--medium)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--medium)]">{stats.medium}</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">Hard</span>
              <div className="h-3 w-3 rounded-full bg-[var(--hard)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--hard)]">{stats.hard}</div>
          </div>
        </div>

        {/* Streak + Heatmap */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Streak Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Flame size={20} className="text-orange-400" />
              <h3 className="font-semibold text-[var(--text-primary)]">Current Streak</h3>
            </div>
            <div className="mb-2 text-5xl font-bold text-orange-400">{user?.streak || 7}</div>
            <p className="text-sm text-[var(--text-muted)]">days in a row</p>
            <div className="mt-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 p-3 text-xs text-orange-300">
              🔥 Keep going! You're on fire!
            </div>
          </div>

          {/* Heatmap */}
          <div className="col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-[var(--gradient-start)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">Activity Heatmap</h3>
            </div>
            <div className="flex flex-wrap gap-[3px]">
              {heatmapData.map((v, i) => (
                <div key={i} className={`h-3 w-3 rounded-sm ${heatColors[v]} transition hover:opacity-80`} title={`${v} submissions`} />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span>Less</span>
              {heatColors.map((c, i) => <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />)}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h3 className="mb-4 font-semibold text-[var(--text-primary)]">Recent Submissions</h3>
          {submissions.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No submissions yet. Start solving problems!</p>
          ) : (
            <div className="space-y-2">
              {submissions.map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3">
                  <div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {(s.problemId as any)?.title || 'Problem'}
                    </span>
                    <span className="ml-2 text-xs text-[var(--text-muted)]">{s.language}</span>
                  </div>
                  <span className={`text-xs font-semibold ${s.verdict === 'Accepted' ? 'text-[var(--easy)]' : 'text-[var(--hard)]'}`}>
                    {s.verdict}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
