import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { filterVehicles } from '@/utils/filters';
import { VehicleCategory } from '@/types';
import VehicleCard from '@/components/VehicleCard';

const categories: Array<VehicleCategory | 'All'> = ['All','Economy','Compact','Sedan','SUV','Luxury','Van','Sports','Electric'];

export default function FleetPage() {
  const { state, dispatch } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const { filters } = state;
  const filtered = useMemo(() => filterVehicles(state.vehicles, filters, state.reservations), [state.vehicles, filters, state.reservations]);
  const up = (u: Partial<typeof filters>) => dispatch({ type: 'SET_FILTERS', payload: u });
  const hasActive = filters.category !== 'All' || filters.priceRange[0] > 0 || filters.priceRange[1] < 300 || filters.transmission !== 'All' || filters.fuel !== 'All' || filters.seats !== null || filters.searchQuery || filters.pickupDate || filters.returnDate;
  const inp = "w-full px-3 py-2 bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-white text-sm focus:border-amber-500/50 focus:outline-none";

  return (
    <div className="min-h-screen pt-[60px] bg-[#121212]">
      <div className="bg-[#121212]/90 backdrop-blur-md border-b border-white/[0.06] sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input type="text" placeholder="Search vehicles…" value={filters.searchQuery} onChange={e => up({ searchQuery: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-white text-sm placeholder:text-neutral-500 focus:border-amber-500/50 focus:outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${showFilters ? 'bg-amber-500 text-black font-medium' : 'bg-[#1a1a1a] text-neutral-400 border border-white/[0.08] hover:text-white'}`}>
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>
              {hasActive && (
                <button onClick={() => dispatch({ type: 'RESET_FILTERS' })} className="flex items-center gap-1 px-3 py-2 bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-sm text-neutral-400 hover:text-white transition-colors">
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
              <span className="text-sm text-neutral-500 ml-1">{filtered.length} results</span>
            </div>
          </div>
          <div className="flex gap-1.5 mt-3 overflow-x-auto scrollbar-hide">
            {categories.map(c => (
              <button key={c} onClick={() => up({ category: c })}
                className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-colors ${filters.category === c ? 'bg-amber-500 text-black font-medium' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-[#0e0e0e] border-b border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div><label className="block text-xs text-neutral-500 mb-1">Pickup</label><input type="date" value={filters.pickupDate} onChange={e => up({ pickupDate: e.target.value })} min={new Date().toISOString().split('T')[0]} className={inp} /></div>
              <div><label className="block text-xs text-neutral-500 mb-1">Return</label><input type="date" value={filters.returnDate} onChange={e => up({ returnDate: e.target.value })} min={filters.pickupDate || new Date().toISOString().split('T')[0]} className={inp} /></div>
              <div><label className="block text-xs text-neutral-500 mb-1">Transmission</label><select value={filters.transmission} onChange={e => up({ transmission: e.target.value as any })} className={inp}><option value="All">Any</option><option value="Automatic">Automatic</option><option value="Manual">Manual</option></select></div>
              <div><label className="block text-xs text-neutral-500 mb-1">Fuel</label><select value={filters.fuel} onChange={e => up({ fuel: e.target.value as any })} className={inp}><option value="All">Any</option><option value="Gasoline">Gasoline</option><option value="Diesel">Diesel</option><option value="Electric">Electric</option><option value="Hybrid">Hybrid</option></select></div>
              <div><label className="block text-xs text-neutral-500 mb-1">Seats</label><select value={filters.seats ?? ''} onChange={e => up({ seats: e.target.value ? +e.target.value : null })} className={inp}><option value="">Any</option><option value="2">2+</option><option value="4">4+</option><option value="5">5+</option><option value="7">7+</option></select></div>
            </div>
            <div className="mt-3">
              <label className="block text-xs text-neutral-500 mb-1">Price: ${filters.priceRange[0]} – ${filters.priceRange[1]}/day</label>
              <div className="flex gap-3"><input type="range" min="0" max="300" step="5" value={filters.priceRange[0]} onChange={e => up({ priceRange: [+e.target.value, filters.priceRange[1]] })} className="flex-1" /><input type="range" min="0" max="300" step="5" value={filters.priceRange[1]} onChange={e => up({ priceRange: [filters.priceRange[0], +e.target.value] })} className="flex-1" /></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 mb-4">No vehicles match your criteria.</p>
            <button onClick={() => dispatch({ type: 'RESET_FILTERS' })} className="px-4 py-2 bg-amber-500 text-black text-sm font-medium rounded-lg">Clear filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map(v => <VehicleCard key={v.id} vehicle={v} />)}</div>
        )}
      </div>
    </div>
  );
}
