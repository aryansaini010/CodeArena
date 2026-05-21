import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle, Circle, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProblems } from '../../redux/slices/problemSlice';
import Navbar from '../../components/Navbar/Navbar';

const diffColor: Record<string, string> = {
  Easy: 'text-[var(--easy)] bg-[var(--easy)]/10',
  Medium: 'text-[var(--medium)] bg-[var(--medium)]/10',
  Hard: 'text-[var(--hard)] bg-[var(--hard)]/10',
};

export default function ProblemsPage() {
  const dispatch = useAppDispatch();
  const { problems, loading } = useAppSelector((s) => s.problems);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  useEffect(() => { dispatch(fetchProblems()); }, [dispatch]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    problems.forEach((p) => p.tags?.forEach((t: string) => s.add(t)));
    return Array.from(s).sort();
  }, [problems]);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (diffFilter && p.difficulty !== diffFilter) return false;
      if (tagFilter && !p.tags?.includes(tagFilter)) return false;
      return true;
    });
  }, [problems, search, diffFilter, tagFilter]);

  const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Problems</h1>
          <p className="mt-1 text-[var(--text-muted)]">{filtered.length} problems available</p>
        </div>

        {/* Filters Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search problems..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--gradient-start)]"
            />
          </div>
          <select value={diffFilter} onChange={(e) => { setDiffFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--gradient-start)]">
            <option value="">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={tagFilter} onChange={(e) => { setTagFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--gradient-start)]">
            <option value="">All Tags</option>
            {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {(diffFilter || tagFilter || search) && (
            <button onClick={() => { setDiffFilter(''); setTagFilter(''); setSearch(''); setCurrentPage(1); }}
              className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-xs text-[var(--text-muted)] hover:text-white">
              Clear Filters
            </button>
          )}
        </div>

        {/* Problem Table */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          {/* Header Row */}
          <div className="grid grid-cols-12 border-b border-[var(--border)] bg-[var(--bg-tertiary)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            <div className="col-span-1">Status</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Tags</div>
            <div className="col-span-2 text-right">Acceptance</div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-[var(--text-muted)]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--gradient-start)] border-t-transparent" />
            </div>
          ) : paged.length === 0 ? (
            <div className="py-20 text-center text-[var(--text-muted)]">No problems found.</div>
          ) : (
            paged.map((p, i) => (
              <Link
                key={p._id || i}
                to={`/problem/${p.slug}`}
                className="grid grid-cols-12 items-center border-b border-[var(--border)] px-6 py-4 transition last:border-0 hover:bg-[var(--bg-tertiary)]"
              >
                <div className="col-span-1">
                  <Circle size={16} className="text-[var(--text-muted)]" />
                </div>
                <div className="col-span-5">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {(currentPage - 1) * perPage + i + 1}. {p.title}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${diffColor[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                </div>
                <div className="col-span-2 flex flex-wrap gap-1">
                  {p.tags?.slice(0, 2).map((t: string) => (
                    <span key={t} className="rounded bg-[var(--bg-tertiary)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">{t}</span>
                  ))}
                </div>
                <div className="col-span-2 text-right text-sm text-[var(--text-muted)]">
                  {(Math.random() * 40 + 30).toFixed(1)}%
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white'
                    : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
