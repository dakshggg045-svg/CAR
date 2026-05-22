import { useState } from 'react';
import { ArrowLeft, Fuel, Settings, Users, DoorOpen, Briefcase, Snowflake, Navigation, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { formatCurrency } from '@/utils/pricing';
import { getBlockedDates } from '@/utils/availability';

export default function VehicleDetailPage() {
  const { state, navigate, getVehicle } = useApp();
  const vehicle = getVehicle(state.selectedVehicleId || '');
  const [ci, setCi] = useState(0);
  if (!vehicle) return <div className="min-h-screen bg-[#121212] pt-24 text-center"><p className="text-neutral-400">Vehicle not found.</p><button onClick={() => navigate('fleet')} className="mt-3 text-amber-400 text-sm">← Fleet</button></div>;
  const blocked = getBlockedDates(vehicle.id, state.reservations);
  const specs = [
    { icon:<Fuel className="w-4 h-4" />, l:'Fuel', v:vehicle.specs.fuel },
    { icon:<Settings className="w-4 h-4" />, l:'Transmission', v:vehicle.specs.transmission },
    { icon:<Users className="w-4 h-4" />, l:'Seats', v:String(vehicle.specs.seats) },
    { icon:<DoorOpen className="w-4 h-4" />, l:'Doors', v:String(vehicle.specs.doors) },
    { icon:<Briefcase className="w-4 h-4" />, l:'Luggage', v:`${vehicle.specs.luggage} bags` },
    { icon:<Snowflake className="w-4 h-4" />, l:'A/C', v:vehicle.specs.ac?'Yes':'No' },
    { icon:<Navigation className="w-4 h-4" />, l:'GPS', v:vehicle.specs.gps?'Included':'Optional' },
  ];
  return (
    <div className="min-h-screen bg-[#121212] pt-[60px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate('fleet')} className="flex items-center gap-1.5 text-neutral-500 hover:text-white text-[13px] mb-6 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back to fleet</button>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#1a1a1a]">
              <img src={vehicle.image_urls[ci]} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover" />
              {vehicle.image_urls.length > 1 && (<>
                <button onClick={() => setCi((ci-1+vehicle.image_urls.length)%vehicle.image_urls.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => setCi((ci+1)%vehicle.image_urls.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
              </>)}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider mb-1 text-amber-400">{vehicle.category}</p>
              <h1 className="text-[26px] font-bold text-white leading-tight">{vehicle.make} {vehicle.model}</h1>
              <p className="text-neutral-500 text-[13px] mt-1">{vehicle.year} · {vehicle.color} · {vehicle.mileage.toLocaleString()} mi</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[#1a1a1a] p-5">
              <div className="flex items-baseline gap-1"><span className="text-[28px] font-bold text-white">{formatCurrency(vehicle.daily_rate)}</span><span className="text-neutral-500 text-[13px]">/ day</span></div>
              <div className="mt-3 text-[12px] text-neutral-500 space-y-1">
                <div>3+ days <span className="text-emerald-400 ml-1">5% off</span></div>
                <div>7+ days <span className="text-emerald-400 ml-1">10% off</span></div>
                <div>14+ days <span className="text-emerald-400 ml-1">15% off</span></div>
                <div>30+ days <span className="text-emerald-400 ml-1">20% off</span></div>
              </div>
              <button onClick={() => navigate('booking', vehicle.id)} className="w-full mt-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-[14px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5">Reserve <ArrowUpRight className="w-4 h-4" /></button>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[#1a1a1a] overflow-hidden divide-y divide-white/[0.04]">
              {specs.map(s => <div key={s.l} className="flex items-center justify-between px-4 py-3"><span className="flex items-center gap-2.5 text-[13px] text-neutral-400">{s.icon}{s.l}</span><span className="text-[13px] text-white">{s.v}</span></div>)}
            </div>
            {blocked.length > 0 && (
              <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-4">
                <h4 className="text-[11px] text-red-400 uppercase tracking-wider font-medium mb-2">Booked dates</h4>
                {blocked.map(b => <p key={b.reservationId} className="text-[12px] text-neutral-500">{b.start} – {b.end}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
