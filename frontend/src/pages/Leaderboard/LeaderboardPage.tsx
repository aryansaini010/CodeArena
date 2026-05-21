import { useEffect, useState } from 'react';
import { Trophy, Medal, User, ArrowUp, ArrowDown } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import API from '../../services/api';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/users/all')
      .then((r) => {
        setUsers(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12">
        <div className="mb-8 flex items-center gap-3">
          <Trophy size={28} className="text-[var(--accent)]" />
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Leaderboard</h1>
            <p className="text-[var(--text-muted)]">Global rankings of top performers</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <div className="grid grid-cols-12 bg-[var(--bg-tertiary)] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            <div className="col-span-1">Rank</div>
            <div className="col-span-6">User</div>
            <div className="col-span-3 text-right">Rating</div>
            <div className="col-span-2 text-right">Solved</div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--gradient-start)] border-t-transparent" />
            </div>
          ) : (
            users.map((u, i) => (
              <div key={u._id} className="grid grid-cols-12 items-center border-b border-[var(--border)] px-6 py-5 last:border-0 hover:bg-[var(--bg-tertiary)]/50">
                <div className="col-span-1">
                  {i < 3 ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-sm font-bold text-white">
                      {i + 1}
                    </div>
                  ) : (
                    <span className="ml-2 text-sm text-[var(--text-muted)]">{i + 1}</span>
                  )}
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  <img src={u.avatar} alt="" className="h-9 w-9 rounded-full border border-[var(--border)]" />
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{u.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">Joined {new Date(u.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="text-sm font-bold text-[var(--accent)]">{u.ranking || 1200}</div>
                  <div className="flex items-center justify-end gap-0.5 text-[10px] text-emerald-500">
                    <ArrowUp size={10} /> 12
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="text-sm font-medium text-[var(--text-primary)]">{u.solvedProblems?.length || 0}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
