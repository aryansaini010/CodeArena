import { Code2, CodeXml, Share2, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
                CodeArena
              </span>
            </Link>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Master algorithms, ace your coding interviews, and level up your programming skills.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] transition hover:border-[var(--gradient-start)] hover:text-white">
                <CodeXml size={16} />
              </a>
              <a href="#" className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] transition hover:border-[var(--gradient-start)] hover:text-white">
                <Share2 size={16} />
              </a>
              <a href="#" className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] transition hover:border-[var(--gradient-start)] hover:text-white">
                <Briefcase size={16} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Product</h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><Link to="/problems" className="transition hover:text-white">Problems</Link></li>
              <li><Link to="/contests" className="transition hover:text-white">Contests</Link></li>
              <li><Link to="/discuss" className="transition hover:text-white">Discuss</Link></li>
              <li><Link to="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Resources</h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><a href="#" className="transition hover:text-white">Documentation</a></li>
              <li><a href="#" className="transition hover:text-white">API Reference</a></li>
              <li><a href="#" className="transition hover:text-white">Blog</a></li>
              <li><a href="#" className="transition hover:text-white">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Legal</h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><a href="#" className="transition hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="transition hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} CodeArena. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
