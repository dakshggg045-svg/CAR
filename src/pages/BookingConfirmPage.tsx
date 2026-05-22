import { CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { formatCurrency } from '@/utils/pricing';

export default function BookingConfirmPage() {
  const { state, navigate, getVehicle, getReservation } = useApp();
  const res = getReservation(state.selectedReservationId || '');
  const vehicle = res ? getVehicle(res.vehicle_id) : null;
  if (!res || !vehicle) return <div className="min-h-screen bg-[#121212] pt-24 text-center"><p className="text-neutral-400">Booking not found.</p><button onClick={() => navigate('fleet')} className="mt-3 text-amber-400 text-sm">Browse fleet</button></div>;

  return (
    <div className="min-h-screen bg-[#121212] pt-[60px]">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="flex justify-center mb-6"><div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center"><CheckCircle className="w-7 h-7 text-emerald-400" /></div></div>
        <h1 className="text-[22px] font-semibold text-white text-center mb-1">Booking confirmed</h1>
        <p className="text-neutral-500 text-[14px] text-center mb-8">You're all set.</p>
        <div className="rounded-xl border border-white/[0.06] bg-[#1a1a1a] overflow-hidden">
          <div className="h-40 bg-neutral-800 relative"><img src={vehicle.image_urls[0]} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" /><div className="absolute bottom-3 left-4"><span className="text-white font-medium text-[15px]">{vehicle.make} {vehicle.model}</span><span className="text-neutral-400 text-[12px] ml-2">{vehicle.year}</span></div></div>
          <div className="p-5 space-y-4">
            <div className="bg-white/[0.03] rounded-lg px-4 py-3 text-center border border-white/[0.04]"><div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-0.5">Confirmation</div><div className="text-[18px] font-mono font-semibold text-amber-400">{res.id.toUpperCase()}</div></div>
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div><div className="text-neutral-500 text-[11px] mb-0.5">Pickup</div><div className="text-white">{res.pickup_date}</div></div>
              <div><div className="text-neutral-500 text-[11px] mb-0.5">Return</div><div className="text-white">{res.return_date}</div></div>
              <div><div className="text-neutral-500 text-[11px] mb-0.5">From</div><div className="text-neutral-300">{res.pickup_location}</div></div>
              <div><div className="text-neutral-500 text-[11px] mb-0.5">To</div><div className="text-neutral-300">{res.return_location}</div></div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]"><span className="text-emerald-400 text-[12px] font-medium uppercase tracking-wide">{res.payment_status}</span><span className="text-[22px] font-bold text-white">{formatCurrency(res.total_price)}</span></div>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={() => navigate('fleet')} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-[13px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5">Book another <ArrowRight className="w-3.5 h-3.5" /></button>
          <button onClick={() => navigate('home')} className="flex-1 py-2.5 border border-white/[0.08] text-neutral-300 hover:text-white text-[13px] rounded-lg transition-colors">Home</button>
        </div>
      </div>
    </div>
  );
}
