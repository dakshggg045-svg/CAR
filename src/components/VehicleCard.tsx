import { Fuel, Users, ArrowUpRight } from 'lucide-react';
import { Vehicle } from '@/types';
import { useApp } from '@/store/AppContext';
import { formatCurrency } from '@/utils/pricing';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { navigate } = useApp();
  return (
    <div className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/[0.06] hover:border-amber-500/25 transition-all duration-300">
      <div className="relative h-[180px] overflow-hidden">
        <img src={vehicle.image_urls[0]} alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-amber-400">{vehicle.category}</p>
            <h3 className="text-white font-semibold text-[15px] leading-snug mt-0.5">{vehicle.make} {vehicle.model}</h3>
          </div>
          <div className="text-right">
            <span className="text-white font-semibold text-lg leading-none">{formatCurrency(vehicle.daily_rate)}</span>
            <span className="text-neutral-500 text-[11px] block">/day</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center gap-2 text-[12px] text-neutral-500 mb-3">
          <span>{vehicle.year}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />{vehicle.specs.fuel}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span>{vehicle.specs.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{vehicle.specs.seats}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('vehicle-detail', vehicle.id)}
            className="flex-1 py-2 text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-colors">
            View details
          </button>
          <button onClick={() => navigate('booking', vehicle.id)}
            className="flex-1 py-2 text-[13px] font-medium text-black bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors flex items-center justify-center gap-1">
            Reserve <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
