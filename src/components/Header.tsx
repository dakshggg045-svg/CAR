import { useState } from 'react';
import { Menu, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '@/store/AppContext';

export default function Header() {
  const { state, dispatch, navigate } = useApp();
  const [open, setOpen] = useState(false);
  const links = [{ label: 'Home', page: 'home' as const }, { label: 'Fleet', page: 'fleet' as const }];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-lg border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <button onClick={() => navigate('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-amber-500 flex items-center justify-center text-black text-sm font-black">D</div>
            <span className="text-[17px] font-semibold text-white">DriveLuxe</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button key={l.page} onClick={() => navigate(l.page)}
                className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-colors ${state.currentPage === l.page ? 'text-amber-400 bg-amber-500/10' : 'text-neutral-400 hover:text-white'}`}>
                {l.label}
              </button>
            ))}
            <div className="w-px h-5 bg-white/10 mx-1.5" />
            {state.isAdminAuthenticated ? (
              <div className="flex items-center">
                <button onClick={() => navigate('admin')}
                  className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium flex items-center gap-1.5 transition-colors ${state.currentPage.startsWith('admin') ? 'text-amber-400 bg-amber-500/10' : 'text-neutral-400 hover:text-white'}`}>
                  <Shield className="w-3.5 h-3.5" /> Admin
                </button>
                <button onClick={() => dispatch({ type: 'ADMIN_LOGOUT' })} className="ml-1 p-1.5 text-neutral-500 hover:text-red-400 transition-colors"><LogOut className="w-3.5 h-3.5" /></button>
              </div>
            ) : (
              <button onClick={() => navigate('admin')} className="px-3.5 py-1.5 rounded-md text-[13px] font-medium text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors">
                <Shield className="w-3.5 h-3.5" /> Admin
              </button>
            )}
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-1.5 text-neutral-400"><Menu className="w-5 h-5" /></button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-white/[0.06] py-3 px-4 space-y-1">
          {links.map(l => (
            <button key={l.page} onClick={() => { navigate(l.page); setOpen(false); }}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm ${state.currentPage === l.page ? 'text-amber-400 bg-amber-500/10' : 'text-neutral-400'}`}>
              {l.label}<ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            </button>
          ))}
          <button onClick={() => { navigate('admin'); setOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-md text-sm text-neutral-400"><Shield className="w-3.5 h-3.5" /> Admin</button>
        </div>
      )}
    </header>
  );
}
