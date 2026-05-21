import { useEffect, useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Send, Plus } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import API from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDiscussions, createDiscussion } from '../../redux/slices/discussionSlice';

export default function DiscussionPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const { discussions: threads, loading } = useAppSelector((s) => s.discussions);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchDiscussions());
  }, [dispatch]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await dispatch(createDiscussion({ title, content }));
    setTitle(''); setContent(''); setShowCreate(false);
  };

  const handleVote = async (id: string, type: 'upvote' | 'downvote') => {
    // Voting logic could also be in Redux if needed
    await API.post(`/discussions/${id}/${type}`);
    dispatch(fetchDiscussions());
  };

  // Mock threads if none
  const shown = threads;

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Discussion</h1>
            <p className="mt-1 text-[var(--text-muted)]">Share ideas, ask questions, and learn together</p>
          </div>
          {isAuthenticated && (
            <button onClick={() => setShowCreate(!showCreate)}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-5 py-2.5 text-sm font-medium text-white">
              <Plus size={16} /> New Post
            </button>
          )}
        </div>

        {/* Create Form */}
        {showCreate && (
          <form onSubmit={handleCreate} className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title..."
              className="mb-3 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--gradient-start)]" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post (Markdown supported)..." rows={4}
              className="mb-3 w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--gradient-start)]" />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)]">Cancel</button>
              <button type="submit" className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-5 py-2 text-sm font-medium text-white">
                <Send size={14} /> Post
              </button>
            </div>
          </form>
        )}

        {/* Thread List */}
        <div className="space-y-3">
          {shown.map((t) => (
            <div key={t._id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--gradient-start)]/30">
              <div className="flex gap-4">
                {/* Vote buttons */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <button onClick={() => handleVote(t._id, 'upvote')} className="rounded p-1 text-[var(--text-muted)] transition hover:bg-[var(--bg-tertiary)] hover:text-[var(--easy)]">
                    <ThumbsUp size={16} />
                  </button>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{(t.upvotes?.length || 0) - (t.downvotes?.length || 0)}</span>
                  <button onClick={() => handleVote(t._id, 'downvote')} className="rounded p-1 text-[var(--text-muted)] transition hover:bg-[var(--bg-tertiary)] hover:text-[var(--hard)]">
                    <ThumbsDown size={16} />
                  </button>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--gradient-start)]">{t.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)] line-clamp-2">{t.content}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <img src={t.author?.avatar} alt="" className="h-4 w-4 rounded-full" />
                      <span>{t.author?.name}</span>
                    </div>
                    <span>{timeAgo(t.createdAt)}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={12} /> {t.replies?.length || 0} replies</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
