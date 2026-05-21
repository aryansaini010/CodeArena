import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Send, ChevronDown, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProblemBySlug } from '../../redux/slices/problemSlice';
import { fetchSubmissions } from '../../redux/slices/submissionSlice';
import API from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', monacoLang: 'javascript', judgeId: 63 },
  { id: 'python', label: 'Python', monacoLang: 'python', judgeId: 71 },
  { id: 'cpp', label: 'C++', monacoLang: 'cpp', judgeId: 54 },
  { id: 'java', label: 'Java', monacoLang: 'java', judgeId: 62 },
];

const diffColor: Record<string, string> = {
  Easy: 'text-[var(--easy)] bg-[var(--easy)]/10',
  Medium: 'text-[var(--medium)] bg-[var(--medium)]/10',
  Hard: 'text-[var(--hard)] bg-[var(--hard)]/10',
};

export default function ProblemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { currentProblem: problem, loading } = useAppSelector((s) => s.problems);
  const { submissions, loading: subLoading } = useAppSelector((s) => s.submissions);

  const [langIdx, setLangIdx] = useState(0);
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState('');
  const [verdict, setVerdict] = useState('');
  const [runtime, setRuntime] = useState<number | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'submissions'>('description');
  const [outputTab, setOutputTab] = useState<'output' | 'input'>('output');
  const [splitPos, setSplitPos] = useState(50);
  const [fullscreen, setFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    if (slug) dispatch(fetchProblemBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (problem?.starterCode) {
      const currentLang = LANGUAGES[langIdx].id;
      const starter = problem.starterCode.find((s) => s.language === currentLang);
      const saved = localStorage.getItem(`code_${problem.slug}_${currentLang}`);
      setCode(saved || starter?.code || '// Start coding here...');
    }
  }, [problem, langIdx]);

  useEffect(() => {
    if (problem && code) {
      localStorage.setItem(`code_${problem.slug}_${LANGUAGES[langIdx].id}`, code);
    }
  }, [code, problem, langIdx]);

  useEffect(() => {
    if (activeTab === 'submissions' && problem?._id) {
      dispatch(fetchSubmissions(problem._id));
    }
  }, [activeTab, problem?._id, dispatch]);

  const handleRun = async () => {
    setRunning(true);
    setOutput('');
    setVerdict('');
    setRuntime(null);
    setMemory(null);
    try {
      const { data } = await API.post('/submissions/run', {
        languageId: LANGUAGES[langIdx].judgeId,
        code,
        input: customInput,
      });
      setOutput(data.stdout || data.stderr || 'No output');
      setVerdict(data.status?.description || '');
      setRuntime(data.time);
      setMemory(data.memory);
    } catch {
      setOutput('Error running code');
    }
    setRunning(false);
    setOutputTab('output');
  };

  const handleSubmit = async () => {
    if (!problem) return;
    setSubmitting(true);
    setOutput('');
    setVerdict('');
    try {
      const { data } = await API.post('/submissions/submit', {
        problemId: problem._id,
        languageId: LANGUAGES[langIdx].judgeId,
        code,
      });
      setVerdict(data.verdict);
      setRuntime(data.runtime);
      setMemory(data.memory);
      setOutput(data.verdict === 'Accepted' ? '✅ All test cases passed!' : `❌ ${data.verdict}`);
      if (data.verdict === 'Accepted') {
        dispatch(fetchSubmissions(problem._id));
      }
    } catch {
      setOutput('Submission failed');
    }
    setSubmitting(false);
    setOutputTab('output');
  };

  const handleReset = () => {
    if (problem?.starterCode) {
      const starter = problem.starterCode.find((s) => s.language === LANGUAGES[langIdx].id);
      setCode(starter?.code || '');
      localStorage.removeItem(`code_${problem.slug}_${LANGUAGES[langIdx].id}`);
    }
  };

  // Drag to resize
  const onMouseDown = () => { dragging.current = true; };
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPos(Math.max(25, Math.min(75, pct)));
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--gradient-start)] border-t-transparent" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center text-[var(--text-muted)]">Problem not found</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-[var(--bg-primary)] ${fullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      <Navbar />

      {/* Main Split */}
      <div ref={containerRef} className="flex flex-1 pt-16" style={{ height: fullscreen ? '100vh' : 'calc(100vh - 64px)' }}>
        {/* LEFT — Problem Description */}
        <div className="overflow-y-auto border-r border-[var(--border)]" style={{ width: `${splitPos}%` }}>
          <div className="p-6">
            {/* Tabs */}
            <div className="mb-6 flex gap-4 border-b border-[var(--border)]">
              {(['description', 'editorial', 'submissions'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`border-b-2 pb-3 text-sm font-medium capitalize transition ${
                    activeTab === tab ? 'border-[var(--gradient-start)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <>
                <div className="mb-4 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-[var(--text-primary)]">{problem.title}</h1>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${diffColor[problem.difficulty]}`}>
                    {problem.difficulty}
                  </span>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {problem.tags?.map((t) => (
                    <span key={t} className="rounded-lg bg-[var(--bg-tertiary)] px-3 py-1 text-xs text-[var(--text-muted)]">{t}</span>
                  ))}
                </div>

                <div className="prose prose-invert mb-6 max-w-none text-sm leading-relaxed text-[var(--text-secondary)]">
                  {problem.description.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>

                {problem.examples?.map((ex, i) => (
                  <div key={i} className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-4">
                    <h4 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">Example {i + 1}:</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-[var(--text-muted)]">Input: </span><code className="text-[var(--text-primary)]">{ex.inputText}</code></div>
                      <div><span className="text-[var(--text-muted)]">Output: </span><code className="text-[var(--text-primary)]">{ex.outputText}</code></div>
                      {ex.explanation && <div><span className="text-[var(--text-muted)]">Explanation: </span><span className="text-[var(--text-secondary)]">{ex.explanation}</span></div>}
                    </div>
                  </div>
                ))}

                <div className="mt-6">
                  <h4 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">Constraints:</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">
                    {problem.constraints?.map((c, i) => <li key={i}><code>{c}</code></li>)}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'editorial' && (
              <div className="text-sm text-[var(--text-secondary)]">
                <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">Editorial</h3>
                <p>{problem.editorial || 'No editorial available yet.'}</p>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-3">
                {subLoading ? (
                  <div className="flex justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--gradient-start)] border-t-transparent" /></div>
                ) : submissions.length === 0 ? (
                  <div className="py-8 text-center text-sm text-[var(--text-muted)]">No submissions yet.</div>
                ) : (
                  submissions.map((s) => (
                    <div key={s._id} className="rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${s.verdict === 'Accepted' ? 'text-[var(--easy)]' : 'text-[var(--hard)]'}`}>{s.verdict}</span>
                        <span className="text-xs text-[var(--text-muted)]">{new Date(s.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="mt-2 flex gap-4 text-xs text-[var(--text-muted)]">
                        <span>Language: {LANGUAGES.find(l => l.judgeId.toString() === s.language)?.label || s.language}</span>
                        <span>Runtime: {s.runtime}s</span>
                        <span>Memory: {(s.memory / 1024).toFixed(1)} MB</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Drag Handle */}
        <div onMouseDown={onMouseDown} className="flex w-2 cursor-col-resize items-center justify-center bg-[var(--bg-secondary)] hover:bg-[var(--gradient-start)]/30">
          <div className="h-8 w-0.5 rounded-full bg-[var(--border)]" />
        </div>

        {/* RIGHT — Code Editor */}
        <div className="flex flex-col" style={{ width: `${100 - splitPos}%` }}>
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2">
            <div className="flex items-center gap-3">
              <select value={langIdx} onChange={(e) => setLangIdx(Number(e.target.value))}
                className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-sm text-[var(--text-primary)] outline-none">
                {LANGUAGES.map((l, i) => <option key={l.id} value={i}>{l.label}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} title="Reset code" className="rounded-lg p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--bg-tertiary)] hover:text-white">
                <RotateCcw size={16} />
              </button>
              <button onClick={() => setFullscreen(!fullscreen)} className="rounded-lg p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--bg-tertiary)] hover:text-white">
                {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language={LANGUAGES[langIdx].monacoLang}
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                padding: { top: 16 },
                automaticLayout: true,
              }}
            />
          </div>

          <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-4 border-b border-[var(--border)] px-4">
              <button onClick={() => setOutputTab('output')}
                className={`border-b-2 py-2 text-xs font-medium ${outputTab === 'output' ? 'border-[var(--gradient-start)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)]'}`}>
                Output
              </button>
              <button onClick={() => setOutputTab('input')}
                className={`border-b-2 py-2 text-xs font-medium ${outputTab === 'input' ? 'border-[var(--gradient-start)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)]'}`}>
                Custom Input
              </button>
              {runtime !== null && (
                <div className="ml-auto flex gap-3 text-xs text-[var(--text-muted)]">
                  <span>⏱ {runtime}s</span>
                  <span>💾 {memory ? (memory / 1024).toFixed(1) : 0} MB</span>
                </div>
              )}
            </div>
            <div className="h-32 overflow-y-auto p-4">
              {outputTab === 'input' ? (
                <textarea value={customInput} onChange={(e) => setCustomInput(e.target.value)} placeholder="Enter custom input..."
                  className="h-full w-full resize-none bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none" />
              ) : (
                <pre className={`text-sm ${verdict === 'Accepted' ? 'text-[var(--easy)]' : verdict ? 'text-[var(--hard)]' : 'text-[var(--text-secondary)]'}`}>
                  {output || 'Click "Run" or "Submit" to see output.'}
                </pre>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] px-4 py-3">
              <button onClick={handleRun} disabled={running}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-tertiary)] disabled:opacity-50">
                <Play size={14} /> {running ? 'Running...' : 'Run'}
              </button>
              <button onClick={handleSubmit} disabled={submitting}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--easy)] to-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:shadow-xl disabled:opacity-50">
                <Send size={14} /> {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
