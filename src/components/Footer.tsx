import { useApp } from '@/store/AppContext';

export default function Footer() {
  const { navigate } = useApp();
  return (
    <footer className="border-t border-white/[0.06] bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center text-black text-xs font-black">D</div>
              <span className="font-semibold text-white">DriveLuxe</span>
            </div>
            <p className="text-neutral-500 text-[13px] leading-relaxed max-w-xs">Car rental made easy. Pick from 30+ vehicles, book online, drive away.</p>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">Pages</h4>
            <ul className="space-y-1.5 text-[13px]">
              {([['Home','home'],['Fleet','fleet'],['Admin','admin']] as const).map(([l,p]) => (
                <li key={p}><button onClick={() => navigate(p)} className="text-neutral-500 hover:text-amber-400 transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">Vehicles</h4>
            <ul className="space-y-1.5 text-[13px] text-neutral-500">
              <li>Economy &amp; Compact</li><li>Sedans &amp; SUVs</li><li>Luxury &amp; Sports</li><li>Electric &amp; Hybrid</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">Contact</h4>
            <ul className="space-y-1.5 text-[13px] text-neutral-500">
              <li>+1 (555) 123-4567</li><li>hello@driveluxe.com</li><li>New York, NY</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-neutral-600">
          <span>© 2025 DriveLuxe Inc.</span>
          <div className="flex gap-5"><span className="hover:text-neutral-400 cursor-pointer">Privacy</span><span className="hover:text-neutral-400 cursor-pointer">Terms</span></div>
        </div>
      </div>
    </footer>
  );
}
