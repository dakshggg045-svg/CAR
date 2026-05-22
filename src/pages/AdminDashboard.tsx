import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { formatCurrency } from '@/utils/pricing';

export default function AdminDashboard() {
  const { state, dispatch, navigate, getAdminStats } = useApp();
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  if (!state.isAdminAuthenticated) return (
    <div className="min-h-screen bg-[#121212] pt-[60px] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="border border-white/[0.06] rounded-xl p-6 bg-[#1a1a1a]">
          <h1 className="text-lg font-bold text-white mb-1">Admin sign in</h1>
          <p className="text-slate-500 text-sm mb-5">Fleet management portal</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Email</label>
              <input type="email" defaultValue="admin@driveluxe.com" readOnly className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-400 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={pw} onChange={e => { setPw(e.target.value); setErr(''); }} placeholder="Password"
                  onKeyDown={e => { if (e.key === 'Enter') { pw === 'admin123' ? dispatch({ type: 'ADMIN_LOGIN' }) : setErr('Wrong password. Use: admin123'); } }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm placeholder:text-slate-600 focus:border-amber-500/50 focus:outline-none pr-9" />
                <button onClick={() => setShow(!show)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">{show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button>
              </div>
            </div>
            {err && <p className="flex items-center gap-1.5 text-red-400 text-xs"><AlertCircle className="w-3 h-3" />{err}</p>}
            <button onClick={() => pw === 'admin123' ? dispatch({ type: 'ADMIN_LOGIN' }) : setErr('Wrong password. Use: admin123')}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium rounded-lg transition-colors">Sign in</button>
            <p className="text-center text-[11px] text-slate-600">Demo: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );

  const s = getAdminStats();
  const recent = [...state.reservations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  const badge: Record<string, string> = { pending: 'text-amber-400', confirmed: 'text-emerald-400', active: 'text-cyan-400', completed: 'text-neutral-500', cancelled: 'text-red-400' };

  return (
    <div className="min-h-screen bg-[#121212] pt-[60px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={() => navigate('admin-vehicles')} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white bg-slate-800 rounded transition-colors">Vehicles</button>
            <button onClick={() => navigate('admin-reservations')} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white bg-slate-800 rounded transition-colors">Reservations</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { l: 'Fleet', v: s.totalVehicles },
            { l: 'Available', v: s.availableVehicles },
            { l: 'Active', v: s.activeReservations },
            { l: 'Revenue', v: formatCurrency(s.totalRevenue) },
            { l: 'Pending', v: s.pendingPayments },
            { l: 'Occupancy', v: `${Math.round(s.occupancyRate)}%` },
          ].map(x => (
            <div key={x.l} className="border border-slate-800 rounded-lg p-3 bg-slate-900">
              <div className="text-lg font-bold text-white">{x.v}</div>
              <div className="text-xs text-slate-500">{x.l}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Recent bookings */}
          <div className="border border-slate-800 rounded-lg bg-slate-900">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <h2 className="text-sm font-medium text-white">Recent bookings</h2>
              <button onClick={() => navigate('admin-reservations')} className="text-xs text-amber-400">View all →</button>
            </div>
            <div className="divide-y divide-slate-800">
              {recent.map(r => { const v = state.vehicles.find(x => x.id === r.vehicle_id); return (
                <div key={r.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="text-sm text-white">{r.user_name}</div>
                    <div className="text-xs text-slate-500">{v ? `${v.make} ${v.model}` : '—'} · {r.pickup_date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white">{formatCurrency(r.total_price)}</div>
                    <div className={`text-[11px] uppercase ${badge[r.reservation_status]}`}>{r.reservation_status}</div>
                  </div>
                </div>
              ); })}
            </div>
          </div>

          {/* Fleet breakdown */}
          <div className="border border-slate-800 rounded-lg bg-slate-900">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <h2 className="text-sm font-medium text-white">Fleet breakdown</h2>
              <button onClick={() => navigate('admin-vehicles')} className="text-xs text-amber-400">Manage →</button>
            </div>
            <div className="p-4 space-y-2.5">
              {['Economy', 'Compact', 'Sedan', 'SUV', 'Luxury', 'Van', 'Sports', 'Electric'].map(cat => {
                const cnt = state.vehicles.filter(v => v.category === cat).length;
                const avl = state.vehicles.filter(v => v.category === cat && v.status === 'available').length;
                return (
                  <div key={cat} className="flex items-center gap-3 text-sm">
                    <span className="w-16 text-slate-500 shrink-0">{cat}</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: cnt > 0 ? `${(avl / cnt) * 100}%` : '0%' }} />
                    </div>
                    <span className="text-xs text-slate-500 w-10 text-right">{avl}/{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
