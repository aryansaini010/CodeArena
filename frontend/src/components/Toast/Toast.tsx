import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { clearToast } from '../../redux/slices/uiSlice';

const icons = {
  success: <CheckCircle size={18} className="text-green-400" />,
  error: <AlertCircle size={18} className="text-red-400" />,
  info: <Info size={18} className="text-blue-400" />,
};

const bgColors = {
  success: 'border-green-500/30 bg-green-500/10',
  error: 'border-red-500/30 bg-red-500/10',
  info: 'border-blue-500/30 bg-blue-500/10',
};

export default function Toast() {
  const toast = useAppSelector((s) => s.ui.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => dispatch(clearToast()), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-2xl backdrop-blur-xl ${bgColors[toast.type]}`}>
        {icons[toast.type]}
        <span className="text-sm text-[var(--text-primary)]">{toast.message}</span>
        <button onClick={() => dispatch(clearToast())} className="ml-2 text-[var(--text-muted)] hover:text-white">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
