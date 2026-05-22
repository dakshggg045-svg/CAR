import { ArrowRight, ArrowUpRight, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import VehicleCard from '@/components/VehicleCard';
import { formatCurrency } from '@/utils/pricing';

export default function HomePage() {
  const { state, navigate, dispatch } = useApp();
  const popular = state.vehicles.filter(v => v.status === 'available').slice(0, 6);
  const cheapest = [...state.vehicles].filter(v => v.status === 'available').sort((a, b) => a.daily_rate - b.daily_rate)[0];
  const cats = ['Economy','Compact','Sedan','SUV','Luxury','Sports','Electric','Van'] as const;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end pt-[60px]">
        <div className="absolute inset-0">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-[#121212]/40" />
        </div>
        <div className="relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-24">
            <div className="max-w-2xl animate-fade-up">
              <p className="text-amber-400 text-[13px] font-medium tracking-wide uppercase mb-4">Car rental, simplified</p>
              <h1 className="text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-white leading-[1.1] tracking-tight mb-5">
                Find your ride,<br /><span className="text-neutral-500">book it in minutes.</span>
              </h1>
              <p className="text-neutral-400 text-[16px] leading-relaxed mb-8 max-w-lg">
                {state.vehicles.filter(v => v.status === 'available').length} vehicles across {cats.length} categories. Rates from {cheapest ? formatCurrency(cheapest.daily_rate) : '$30'}/day with multi-day discounts.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('fleet')} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-[14px] font-medium rounded-lg transition-colors flex items-center gap-2">
                  Browse all vehicles <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate('fleet')} className="px-6 py-3 text-neutral-300 hover:text-white text-[14px] font-medium rounded-lg border border-white/[0.12] hover:border-white/[0.25] bg-white/[0.04] hover:bg-white/[0.08] transition-all">
                  View pricing
                </button>
              </div>
            </div>
            <div className="mt-14 animate-fade-up delay-200">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {cats.map(c => {
                  const count = state.vehicles.filter(v => v.category === c && v.status === 'available').length;
                  const min = Math.min(...state.vehicles.filter(v => v.category === c && v.status === 'available').map(v => v.daily_rate));
                  return (
                    <button key={c} onClick={() => { dispatch({ type: 'SET_FILTERS', payload: { category: c as any } }); navigate('fleet'); }}
                      className="shrink-0 px-4 py-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] hover:border-amber-500/30 transition-all group text-left min-w-[140px]">
                      <div className="text-white text-[13px] font-medium group-hover:text-amber-400 transition-colors">{c}</div>
                      <div className="text-neutral-500 text-[11px] mt-0.5">{count} cars · from ${isFinite(min) ? min : '—'}/d</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="py-16 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-8">
            <div><h2 className="text-[22px] font-semibold text-white">Popular picks</h2><p className="text-neutral-500 text-[14px] mt-1">Frequently rented from our fleet</p></div>
            <button onClick={() => navigate('fleet')} className="hidden sm:flex items-center gap-1 text-[13px] text-amber-400 hover:text-amber-300 font-medium transition-colors">All vehicles <ArrowUpRight className="w-3.5 h-3.5" /></button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{popular.map(v => <VehicleCard key={v.id} vehicle={v} />)}</div>
          <div className="mt-6 text-center sm:hidden"><button onClick={() => navigate('fleet')} className="text-[13px] text-amber-400 font-medium">View all →</button></div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#0e0e0e] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[22px] font-semibold text-white mb-2">How it works</h2>
          <p className="text-neutral-500 text-[14px] mb-10">Three steps from browsing to driving.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { s:'01', t:'Pick your car & dates', d:'Browse the fleet, filter by category or price, and select dates. Our system checks availability in real time.', i:<Clock className="w-5 h-5" /> },
              { s:'02', t:'Pay securely', d:'Checkout with Stripe — card or UPI. Your reservation stays pending until payment confirms via webhook.', i:<CreditCard className="w-5 h-5" /> },
              { s:'03', t:'Pick up & drive', d:'Show your confirmation at any location. Longer rentals get automatic discounts up to 20%.', i:<ShieldCheck className="w-5 h-5" /> },
            ].map(x => (
              <div key={x.s} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">{x.i}</div>
                  <span className="text-[11px] font-mono text-neutral-600 tracking-wider">STEP {x.s}</span>
                </div>
                <h3 className="text-white font-medium text-[15px] mb-1.5">{x.t}</h3>
                <p className="text-neutral-500 text-[13px] leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[22px] font-semibold text-white mb-1">Pricing by category</h2>
          <p className="text-neutral-500 text-[14px] mb-8">Daily rates before multi-day discounts</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cats.map(c => {
              const vs = state.vehicles.filter(v => v.category === c && v.status === 'available');
              const mn = vs.length ? Math.min(...vs.map(v => v.daily_rate)) : 0;
              const mx = vs.length ? Math.max(...vs.map(v => v.daily_rate)) : 0;
              return (
                <button key={c} onClick={() => { dispatch({ type:'SET_FILTERS', payload:{ category: c as any } }); navigate('fleet'); }}
                  className="p-4 rounded-xl border border-white/[0.06] hover:border-amber-500/25 bg-white/[0.02] hover:bg-amber-500/5 transition-all text-left group">
                  <span className="text-white font-medium text-[14px] group-hover:text-amber-400 transition-colors">{c}</span>
                  <div className="text-neutral-500 text-[12px] mt-1">{vs.length} vehicles</div>
                  <div className="text-white text-[18px] font-semibold mt-2">${mn}{mx !== mn && <span className="text-neutral-500 text-[13px] font-normal"> – ${mx}</span>}<span className="text-neutral-500 text-[12px] font-normal">/day</span></div>
                </button>
              );
            })}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-amber-500/5 border border-amber-500/10 text-[13px] text-neutral-400">
            <span className="text-amber-400 font-medium">Multi-day discounts:</span> 3+ days (5% off) · 7+ days (10%) · 14+ days (15%) · 30+ days (20%)
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0e0e0e] border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[24px] font-semibold text-white mb-3">Ready to book?</h2>
          <p className="text-neutral-500 text-[14px] mb-6">Browse the fleet, pick dates, reserve in under two minutes.</p>
          <button onClick={() => navigate('fleet')} className="px-7 py-3 bg-amber-500 hover:bg-amber-400 text-black text-[14px] font-medium rounded-lg transition-colors inline-flex items-center gap-2">Browse fleet <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
    </div>
  );
}
