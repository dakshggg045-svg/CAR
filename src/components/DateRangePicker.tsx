import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameDay, isSameMonth, isBefore, isAfter, isWithinInterval, startOfDay } from 'date-fns';

interface Props { pickupDate: string; returnDate: string; onPickupChange: (d: string) => void; onReturnChange: (d: string) => void; blockedDates?: Array<{ start: string; end: string }>; minDate?: Date; }

export default function DateRangePicker({ pickupDate, returnDate, onPickupChange, onReturnChange, blockedDates = [], minDate = new Date() }: Props) {
  const [month, setMonth] = useState(startOfMonth(minDate));
  const [selecting, setSelecting] = useState<'pickup' | 'return'>('pickup');
  const pickup = pickupDate ? new Date(pickupDate + 'T00:00:00') : null;
  const returnD = returnDate ? new Date(returnDate + 'T00:00:00') : null;
  const isBlocked = (date: Date) => blockedDates.some(b => isWithinInterval(date, { start: new Date(b.start + 'T00:00:00'), end: new Date(b.end + 'T00:00:00') }));
  const isDisabled = (date: Date) => isBefore(startOfDay(date), startOfDay(minDate)) || isBlocked(date);

  const handleClick = (date: Date) => {
    if (isDisabled(date)) return;
    const ds = format(date, 'yyyy-MM-dd');
    if (selecting === 'pickup') { onPickupChange(ds); if (!returnD || !isAfter(returnD, date)) onReturnChange(''); setSelecting('return'); }
    else { if (pickup && isAfter(date, pickup)) { const hasBlock = blockedDates.some(b => { const bs = new Date(b.start+'T00:00:00'); const be = new Date(b.end+'T00:00:00'); return (isAfter(bs,pickup)&&isBefore(bs,date))||(isAfter(be,pickup)&&isBefore(be,date)); }); if (hasBlock) { onPickupChange(ds); onReturnChange(''); setSelecting('return'); } else { onReturnChange(ds); setSelecting('pickup'); } } else { onPickupChange(ds); onReturnChange(''); setSelecting('return'); } }
  };

  const cls = (date: Date) => {
    const b = 'w-9 h-9 flex items-center justify-center text-sm rounded ';
    if (isDisabled(date)) return b + 'text-neutral-700 cursor-not-allowed';
    if (pickup && isSameDay(date, pickup)) return b + 'bg-amber-500 text-black font-medium';
    if (returnD && isSameDay(date, returnD)) return b + 'bg-amber-500 text-black font-medium';
    if (pickup && returnD && isAfter(date, pickup) && isBefore(date, returnD)) return b + 'bg-amber-500/15 text-amber-300';
    if (!isSameMonth(date, month)) return b + 'text-neutral-700 hover:bg-neutral-800 cursor-pointer';
    return b + 'text-neutral-300 hover:bg-neutral-800 cursor-pointer';
  };

  const days = useMemo(() => { const s = startOfWeek(startOfMonth(month)); const e = endOfWeek(endOfMonth(month)); const arr: Date[] = []; let d = s; while (d <= e) { arr.push(d); d = addDays(d, 1); } return arr; }, [month]);

  return (
    <div className="border border-white/[0.06] rounded-xl p-4 bg-[#1a1a1a]">
      <div className="flex gap-2 mb-4">
        {(['pickup','return'] as const).map(t => (
          <button key={t} onClick={() => setSelecting(t)}
            className={`flex-1 py-2 rounded-lg text-sm transition-colors ${selecting === t ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>
            <div className="text-[11px] text-neutral-500 mb-0.5">{t === 'pickup' ? 'Pickup' : 'Return'}</div>
            <div className="font-medium text-xs">{t === 'pickup' ? (pickup ? format(pickup, 'MMM d, yyyy') : '—') : (returnD ? format(returnD, 'MMM d, yyyy') : '—')}</div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setMonth(subMonths(month, 1))} className="p-1 text-neutral-500 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
        <span className="text-sm text-white font-medium">{format(month, 'MMMM yyyy')}</span>
        <button onClick={() => setMonth(addMonths(month, 1))} className="p-1 text-neutral-500 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['S','M','T','W','T','F','S'].map((d,i) => <div key={i} className="w-9 h-7 flex items-center justify-center text-[11px] text-neutral-600">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((d,i) => <button key={i} onClick={() => handleClick(d)} disabled={isDisabled(d)} className={cls(d)}>{format(d,'d')}</button>)}
      </div>
    </div>
  );
}
