import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '@/store/AppContext';

export default function Notification() {
  const { state, dispatch } = useApp();
  useEffect(() => { if (state.notification) { const t = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 4000); return () => clearTimeout(t); } }, [state.notification, dispatch]);
  if (!state.notification) return null;
  const { type, message } = state.notification;
  const c = { success: 'border-emerald-700 bg-emerald-950 text-emerald-300', error: 'border-red-700 bg-red-950 text-red-300', info: 'border-amber-700 bg-amber-950 text-amber-300' }[type];
  const i = { success: <CheckCircle className="w-4 h-4" />, error: <XCircle className="w-4 h-4" />, info: <Info className="w-4 h-4" /> }[type];
  return (
    <div className="fixed top-[68px] right-4 z-[100] animate-slide-in">
      <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm ${c}`}>
        {i}<span>{message}</span>
        <button onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })} className="ml-1 opacity-60 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}
