import { Link } from 'react-router-dom';
import { Code2, Zap, Trophy, Users, ArrowRight, CheckCircle, Brain, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const features = [
  { icon: <Code2 size={24} />, title: '1000+ Problems', desc: 'From easy to hard, covering every data structure and algorithm topic.' },
  { icon: <Zap size={24} />, title: 'Instant Execution', desc: 'Run code in C++, Java, Python & JavaScript with real-time results.' },
  { icon: <Trophy size={24} />, title: 'Weekly Contests', desc: 'Compete with developers worldwide and climb the leaderboard.' },
  { icon: <Brain size={24} />, title: 'Smart Analytics', desc: 'Track your progress with streaks, heatmaps, and solve statistics.' },
  { icon: <Users size={24} />, title: 'Community', desc: 'Discuss solutions, share approaches, and learn from each other.' },
  { icon: <Sparkles size={24} />, title: 'Daily Challenge', desc: 'A new problem every day to keep your skills sharp and consistent.' },
];

const popularProblems = [
  { title: 'Two Sum', difficulty: 'Easy', acceptance: '49.1%', slug: 'two-sum' },
  { title: 'Reverse Linked List', difficulty: 'Easy', acceptance: '73.4%', slug: 'reverse-linked-list' },
  { title: 'Valid Parentheses', difficulty: 'Easy', acceptance: '40.7%', slug: 'valid-parentheses' },
  { title: 'Maximum Subarray', difficulty: 'Medium', acceptance: '50.1%', slug: 'maximum-subarray' },
  { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', acceptance: '34.5%', slug: 'longest-substring-without-repeating-characters' },
];

const diffColor: Record<string, string> = {
  Easy: 'text-[var(--easy)]',
  Medium: 'text-[var(--medium)]',
  Hard: 'text-[var(--hard)]',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Gradient orbs */}
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[var(--gradient-start)]/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[var(--gradient-end)]/20 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-1.5 text-sm text-[var(--text-secondary)]">
            <Sparkles size={14} className="text-[var(--accent)]" />
            <span>Join 50,000+ developers leveling up</span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            <span className="text-[var(--text-primary)]">Master the Art of</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--gradient-start)] via-purple-400 to-[var(--gradient-end)] bg-clip-text text-transparent">
              Problem Solving
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--text-secondary)]">
            Practice coding problems, participate in contests, and prepare for technical interviews with our comprehensive platform.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Get Started Free
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/problems"
              className="rounded-xl border border-[var(--border)] px-8 py-3.5 font-semibold text-[var(--text-secondary)] transition hover:border-[var(--gradient-start)] hover:text-white"
            >
              Explore Problems
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/60 p-6 backdrop-blur-sm">
            <div>
              <div className="text-3xl font-bold text-[var(--text-primary)]">800+</div>
              <div className="text-sm text-[var(--text-muted)]">Problems</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--text-primary)]">50K+</div>
              <div className="text-sm text-[var(--text-muted)]">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--text-primary)]">1M+</div>
              <div className="text-sm text-[var(--text-muted)]">Submissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              Everything You Need to <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-[var(--text-secondary)]">A complete platform designed to accelerate your coding journey.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all hover:border-[var(--gradient-start)]/50 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-start)]/20 to-[var(--gradient-end)]/20 text-[var(--gradient-start)] transition group-hover:from-[var(--gradient-start)] group-hover:to-[var(--gradient-end)] group-hover:text-white">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Problems */}
      <section className="border-t border-[var(--border)] py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Popular Problems</h2>
            <p className="text-[var(--text-secondary)]">Start with these frequently asked interview questions.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            {popularProblems.map((p, i) => (
              <Link
                key={i}
                to={`/problem/${p.slug}`}
                className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4 transition last:border-0 hover:bg-[var(--bg-tertiary)]"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-[var(--text-muted)]" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{p.title}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-xs font-semibold ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
                  <span className="text-xs text-[var(--text-muted)]">{p.acceptance}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--gradient-start)] transition hover:underline"
            >
              View all problems <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contest CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10 p-12 text-center">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--gradient-start)]/10 blur-[80px]" />
            <Trophy size={48} className="mx-auto mb-6 text-[var(--accent)]" />
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Weekly Coding Contests</h2>
            <p className="mb-8 text-[var(--text-secondary)]">
              Compete with thousands of developers, improve your speed, and earn your spot on the global leaderboard.
            </p>
            <Link
              to="/contests"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl"
            >
              View Contests <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
