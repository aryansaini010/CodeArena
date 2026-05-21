import { Award, MapPin, Link as LinkIcon, Calendar, CodeXml, Briefcase } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import { useAppSelector } from '../../redux/hooks';

export default function ProfilePage() {
  const { user } = useAppSelector((s) => s.auth);

  const badges = ['🏆 Contest Winner', '🔥 30-Day Streak', '⭐ 100 Problems', '💎 Hard Solver'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12">
        {/* Profile Header */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt="avatar"
              className="h-28 w-28 rounded-2xl border-2 border-[var(--gradient-start)]/50 shadow-lg"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{user?.name || 'CodeArena User'}</h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">@{user?.name?.toLowerCase().replace(/\s+/g, '') || 'user'}</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Passionate developer | Algorithm enthusiast | Open source contributor
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-[var(--text-muted)] sm:justify-start">
                <span className="flex items-center gap-1"><MapPin size={12} /> San Francisco, CA</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="mt-3 flex justify-center gap-2 sm:justify-start">
                <a href="#" className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-white"><CodeXml size={14} /></a>
                <a href="#" className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-white"><Briefcase size={14} /></a>
                <a href="#" className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-white"><LinkIcon size={14} /></a>
              </div>
            </div>
            <div className="text-center">
              <div className="rounded-xl bg-gradient-to-br from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10 p-4">
                <div className="text-3xl font-bold text-[var(--text-primary)]">#{user?.ranking || 1247}</div>
                <div className="text-xs text-[var(--text-muted)]">Global Ranking</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Problems Solved', value: '142', color: 'text-[var(--gradient-start)]' },
            { label: 'Contests Attended', value: '23', color: 'text-[var(--accent)]' },
            { label: 'Current Streak', value: '12', color: 'text-orange-400' },
            { label: 'Contributions', value: '37', color: 'text-[var(--easy)]' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Award size={20} className="text-[var(--accent)]" />
            <h3 className="font-semibold text-[var(--text-primary)]">Badges & Achievements</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map((b, i) => (
              <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-3 text-center text-sm text-[var(--text-secondary)] transition hover:border-[var(--accent)]/50">
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Solve Distribution */}
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h3 className="mb-4 font-semibold text-[var(--text-primary)]">Solve Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Easy', solved: 75, total: 250, color: 'bg-[var(--easy)]' },
              { label: 'Medium', solved: 52, total: 400, color: 'bg-[var(--medium)]' },
              { label: 'Hard', solved: 15, total: 150, color: 'bg-[var(--hard)]' },
            ].map((d, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">{d.label}</span>
                  <span className="text-[var(--text-muted)]">{d.solved}/{d.total}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--bg-tertiary)]">
                  <div className={`h-full rounded-full ${d.color} transition-all`} style={{ width: `${(d.solved / d.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
