import { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { formatCurrency } from '@/utils/pricing';
import { Vehicle, VehicleCategory, VehicleStatus } from '@/types';

export default function AdminVehicles() {
  const { state, dispatch, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [catF, setCatF] = useState<VehicleCategory | 'All'>('All');
  const [statF, setStatF] = useState<VehicleStatus | 'All'>('All');
  const [delId, setDelId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<string | null>(null);
  const [newRate, setNewRate] = useState('');

  const filtered = state.vehicles.filter(v => {
    if (catF !== 'All' && v.category !== catF) return false;
    if (statF !== 'All' && v.status !== statF) return false;
    if (search) return `${v.make} ${v.model} ${v.plate} ${v.year}`.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  const doDelete = (id: string) => {
    if (state.reservations.some(r => r.vehicle_id === id && r.reservation_status !== 'cancelled')) { dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'error', message: 'Has active reservations' } }); return; }
    dispatch({ type: 'DELETE_VEHICLE', payload: id }); dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'success', message: 'Removed' } }); setDelId(null);
  };
  const doRate = (v: Vehicle) => {
    const r = parseFloat(newRate); if (isNaN(r) || r <= 0) return;
    dispatch({ type: 'UPDATE_VEHICLE', payload: { ...v, daily_rate: r } }); dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'success', message: `Rate updated` } }); setEditRate(null);
  };
  const toggleStatus = (v: Vehicle) => {
    const next: Record<VehicleStatus, VehicleStatus> = { available: 'maintenance', maintenance: 'available', retired: 'available' };
    dispatch({ type: 'UPDATE_VEHICLE', payload: { ...v, status: next[v.status] } });
  };

  const sel = "px-3 py-2 bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-white text-sm focus:border-amber-500/50 focus:outline-none";
  const statusColor: Record<string, string> = { available: 'text-emerald-400', maintenance: 'text-amber-400', retired: 'text-red-400' };

  return (
    <div className="min-h-screen bg-[#121212] pt-[60px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('admin')} className="text-slate-500 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /></button>
            <h1 className="text-lg font-bold text-white">Vehicles <span className="text-slate-500 font-normal">({state.vehicles.length})</span></h1>
          </div>
          <button onClick={() => navigate('admin-vehicle-add')} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add</button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" /><input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className={`w-full pl-8 pr-3 ${sel}`} /></div>
          <select value={catF} onChange={e => setCatF(e.target.value as any)} className={sel}><option value="All">All categories</option>{['Economy','Compact','Sedan','SUV','Luxury','Van','Sports','Electric'].map(c => <option key={c}>{c}</option>)}</select>
          <select value={statF} onChange={e => setStatF(e.target.value as any)} className={sel}><option value="All">All status</option><option value="available">Available</option><option value="maintenance">Maintenance</option><option value="retired">Retired</option></select>
        </div>

        <div className="border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-4 py-3">Vehicle</th><th className="text-left px-4 py-3">Category</th><th className="text-left px-4 py-3">Rate</th><th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Plate</th><th className="text-right px-4 py-3">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map(v => (
                  <tr key={v.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img src={v.image_urls[0]} alt="" className="w-12 h-8 rounded object-cover bg-slate-800" />
                        <div><div className="text-white">{v.make} {v.model}</div><div className="text-xs text-slate-500">{v.year} · {v.color}</div></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{v.category}</td>
                    <td className="px-4 py-3">
                      {editRate === v.id ? (
                        <div className="flex items-center gap-1">
                          <input type="number" value={newRate} onChange={e => setNewRate(e.target.value)} className="w-16 px-1.5 py-0.5 bg-neutral-800 border border-amber-500 rounded-lg text-white text-sm focus:outline-none" autoFocus
                            onKeyDown={e => { if (e.key === 'Enter') doRate(v); if (e.key === 'Escape') setEditRate(null); }} />
                          <button onClick={() => doRate(v)} className="text-emerald-400 text-xs">Save</button>
                        </div>
                      ) : (
                        <button onClick={() => { setEditRate(v.id); setNewRate(String(v.daily_rate)); }} className="text-white hover:text-amber-400 transition-colors">{formatCurrency(v.daily_rate)}</button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStatus(v)} className={`text-xs uppercase ${statusColor[v.status]}`}>{v.status}</button>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{v.plate}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate('vehicle-detail', v.id)} className="p-1.5 text-slate-500 hover:text-white" title="View"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { dispatch({ type: 'SELECT_VEHICLE', payload: v.id }); navigate('admin-vehicle-edit'); }} className="p-1.5 text-slate-500 hover:text-white" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                        {delId === v.id ? (
                          <><button onClick={() => doDelete(v.id)} className="px-1.5 py-0.5 text-red-400 text-xs">Delete</button><button onClick={() => setDelId(null)} className="px-1.5 py-0.5 text-slate-500 text-xs">No</button></>
                        ) : (
                          <button onClick={() => setDelId(v.id)} className="p-1.5 text-slate-500 hover:text-red-400" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">No vehicles found</div>}
        </div>
      </div>
    </div>
  );
}
