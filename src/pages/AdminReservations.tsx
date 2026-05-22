import { useState } from 'react';
import { ArrowLeft, Search, XCircle, CheckCircle } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { formatCurrency } from '@/utils/pricing';
import { PaymentStatus, ReservationStatus } from '@/types';

export default function AdminReservations() {
  const { state, dispatch, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [sF, setSF] = useState<ReservationStatus | 'All'>('All');
  const [pF, setPF] = useState<PaymentStatus | 'All'>('All');

  const filtered = state.reservations.filter(r => {
    if (sF !== 'All' && r.reservation_status !== sF) return false;
    if (pF !== 'All' && r.payment_status !== pF) return false;
    if (search) { const q = search.toLowerCase(); const v = state.vehicles.find(x => x.id === r.vehicle_id); return `${r.user_name} ${r.user_email} ${r.id} ${v ? v.make + ' ' + v.model : ''}`.toLowerCase().includes(q); }
    return true;
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const statusColor: Record<string, string> = { pending: 'text-amber-400', confirmed: 'text-emerald-400', active: 'text-cyan-400', completed: 'text-neutral-500', cancelled: 'text-red-400' };
  const payColor: Record<string, string> = { unpaid: 'text-amber-400', paid: 'text-emerald-400', cancelled: 'text-red-400', refunded: 'text-violet-400' };
  const sel = "px-3 py-2 bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-white text-sm focus:border-amber-500/50 focus:outline-none";

  return (
    <div className="min-h-screen bg-[#0c1222] pt-[60px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('admin')} className="text-slate-500 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <h1 className="text-lg font-bold text-white">Reservations <span className="text-slate-500 font-normal">({state.reservations.length})</span></h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" /><input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className={`w-full pl-8 pr-3 ${sel}`} /></div>
          <select value={sF} onChange={e => setSF(e.target.value as any)} className={sel}><option value="All">All status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
          <select value={pF} onChange={e => setPF(e.target.value as any)} className={sel}><option value="All">All payments</option><option value="unpaid">Unpaid</option><option value="paid">Paid</option><option value="cancelled">Cancelled</option><option value="refunded">Refunded</option></select>
        </div>

        <div className="space-y-2">
          {filtered.map(r => { const v = state.vehicles.find(x => x.id === r.vehicle_id); return (
            <div key={r.id} className="border border-slate-800 rounded-lg bg-slate-900 p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  {v && <img src={v.image_urls[0]} alt="" className="w-14 h-10 rounded object-cover bg-slate-800 shrink-0" />}
                  <div>
                    <div className="text-sm text-white">{r.user_name} <span className="text-slate-500 font-normal">({r.user_email})</span></div>
                    <div className="text-xs text-slate-500 mt-0.5">{v ? `${v.make} ${v.model}` : '—'} · {r.pickup_date} → {r.return_date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{formatCurrency(r.total_price)}</div>
                    <div className="text-[11px] space-x-2">
                      <span className={`uppercase ${statusColor[r.reservation_status]}`}>{r.reservation_status}</span>
                      <span className={`uppercase ${payColor[r.payment_status]}`}>{r.payment_status}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {r.payment_status === 'unpaid' && r.reservation_status === 'pending' && (
                      <button onClick={() => { dispatch({ type: 'UPDATE_RESERVATION', payload: { id: r.id, payment_status: 'paid', reservation_status: 'confirmed' } }); dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'success', message: 'Confirmed' } }); }}
                        className="p-1.5 text-emerald-500 hover:bg-emerald-500/10 rounded" title="Mark paid"><CheckCircle className="w-4 h-4" /></button>
                    )}
                    {r.reservation_status === 'confirmed' && (
                      <button onClick={() => { dispatch({ type: 'UPDATE_RESERVATION', payload: { id: r.id, reservation_status: 'completed' } }); }}
                        className="p-1.5 text-cyan-400 hover:bg-cyan-500/10 rounded" title="Complete"><CheckCircle className="w-4 h-4" /></button>
                    )}
                    {!['cancelled', 'completed'].includes(r.reservation_status) && (
                      <button onClick={() => { dispatch({ type: 'CANCEL_RESERVATION', payload: r.id }); dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'info', message: 'Cancelled' } }); }}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded" title="Cancel"><XCircle className="w-4 h-4" /></button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ); })}
          {filtered.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">No reservations found</div>}
        </div>
      </div>
    </div>
  );
}
