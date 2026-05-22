import { useState, useMemo } from 'react';
import { ArrowLeft, MapPin, CheckCircle, AlertTriangle, User, Mail, Phone } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import DateRangePicker from '@/components/DateRangePicker';
import StripePaymentForm from '@/components/StripePaymentForm';
import { checkAvailability, getBlockedDates } from '@/utils/availability';
import { calculateTotalPrice, getRentalDays, getDiscountPercentage, formatCurrency } from '@/utils/pricing';
import { Reservation } from '@/types';

export default function BookingPage() {
  const { state, dispatch, navigate, getVehicle } = useApp();
  const vehicle = getVehicle(state.selectedVehicleId || '');
  const [pickupDate,setPickupDate]=useState('');const [returnDate,setReturnDate]=useState('');
  const [pickupLoc,setPickupLoc]=useState('Downtown Office');const [returnLoc,setReturnLoc]=useState('Downtown Office');
  const [name,setName]=useState('');const [email,setEmail]=useState('');const [phone,setPhone]=useState('');
  const [step,setStep]=useState(1);const [resId,setResId]=useState<string|null>(null);
  if (!vehicle) return <div className="min-h-screen bg-[#121212] pt-24 text-center"><p className="text-neutral-400">Vehicle not found.</p><button onClick={() => navigate('fleet')} className="mt-3 text-amber-400 text-sm">← Back</button></div>;
  const blocked = useMemo(() => getBlockedDates(vehicle.id, state.reservations), [vehicle.id, state.reservations]);
  const avail = useMemo(() => pickupDate && returnDate ? checkAvailability(vehicle.id, pickupDate, returnDate, state.reservations) : null, [vehicle.id, pickupDate, returnDate, state.reservations]);
  const days = pickupDate && returnDate ? getRentalDays(pickupDate, returnDate) : 0;
  const disc = getDiscountPercentage(days);const total = pickupDate && returnDate ? calculateTotalPrice(pickupDate, returnDate, vehicle.daily_rate) : 0;const sub = days * vehicle.daily_rate;
  const ok1 = pickupDate && returnDate && avail?.available && days > 0;const ok2 = name.trim() && email.trim() && email.includes('@');
  const goPayment = () => { const r: Reservation = { id:`r${Date.now()}`,vehicle_id:vehicle.id,user_id:`u${Date.now()}`,user_name:name,user_email:email,pickup_date:pickupDate,return_date:returnDate,pickup_location:pickupLoc,return_location:returnLoc,total_price:total,payment_status:'unpaid',reservation_status:'pending',created_at:new Date().toISOString() }; dispatch({type:'ADD_RESERVATION',payload:r}); setResId(r.id); setStep(3); };
  const onPaid = (pi:string) => { if(!resId) return; dispatch({type:'UPDATE_RESERVATION',payload:{id:resId,payment_status:'paid',reservation_status:'confirmed',stripe_session_id:pi}}); dispatch({type:'SELECT_RESERVATION',payload:resId}); dispatch({type:'SET_NOTIFICATION',payload:{type:'success',message:'Booking confirmed.'}}); navigate('booking-confirm'); };
  const onCancel = () => { if(resId){dispatch({type:'CANCEL_RESERVATION',payload:resId});dispatch({type:'SET_NOTIFICATION',payload:{type:'info',message:'Payment cancelled.'}});} setResId(null); setStep(2); };
  const inp = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-white/[0.08] rounded-lg text-white text-sm placeholder:text-neutral-500 focus:border-amber-500/50 focus:outline-none";

  return (
    <div className="min-h-screen bg-[#121212] pt-[60px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button onClick={() => { if(resId && step===3) onCancel(); navigate('vehicle-detail', vehicle.id); }} className="flex items-center gap-1.5 text-neutral-500 hover:text-white text-[13px] mb-5 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> {vehicle.make} {vehicle.model}</button>
        <div className="flex items-center gap-2 mb-8 text-sm">
          {['Dates','Details','Payment'].map((s,i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${step>i+1?'bg-emerald-600 text-white':step===i+1?'bg-amber-500 text-black font-medium':'bg-neutral-800 text-neutral-500'}`}>{step>i+1?'✓':i+1}</span>
              <span className={step>=i+1?'text-white':'text-neutral-600'}>{s}</span>
              {i<2 && <div className={`w-8 h-px ${step>i+1?'bg-emerald-600':'bg-neutral-800'}`} />}
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {step===1 && (<>
              <DateRangePicker pickupDate={pickupDate} returnDate={returnDate} onPickupChange={setPickupDate} onReturnChange={setReturnDate} blockedDates={blocked} />
              {avail && !avail.available && <div className="flex items-start gap-2 p-3 bg-red-950 border border-red-900 rounded-lg text-sm text-red-300"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> Not available ({avail.conflicts.length} conflict).</div>}
              {avail?.available && days>0 && <div className="flex items-start gap-2 p-3 bg-emerald-950 border border-emerald-900 rounded-lg text-sm text-emerald-300"><CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> Available — {days} day{days>1?'s':''}{disc>0?`, ${disc}% discount`:''}</div>}
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className="block text-xs text-neutral-500 mb-1"><MapPin className="w-3 h-3 inline" /> Pickup</label><select value={pickupLoc} onChange={e=>setPickupLoc(e.target.value)} className={inp}><option>Downtown Office</option><option>Airport Terminal</option><option>Midtown Branch</option><option>Harbor Station</option></select></div>
                <div><label className="block text-xs text-neutral-500 mb-1"><MapPin className="w-3 h-3 inline" /> Return</label><select value={returnLoc} onChange={e=>setReturnLoc(e.target.value)} className={inp}><option>Downtown Office</option><option>Airport Terminal</option><option>Midtown Branch</option><option>Harbor Station</option></select></div>
              </div>
              <button onClick={()=>setStep(2)} disabled={!ok1} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-600 text-black text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed">Continue</button>
            </>)}
            {step===2 && (<>
              <div className="border border-white/[0.06] rounded-xl p-4 bg-[#1a1a1a] space-y-3">
                <div><label className="block text-xs text-neutral-500 mb-1"><User className="w-3 h-3 inline" /> Full name</label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe" className={inp} /></div>
                <div><label className="block text-xs text-neutral-500 mb-1"><Mail className="w-3 h-3 inline" /> Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@example.com" className={inp} /></div>
                <div><label className="block text-xs text-neutral-500 mb-1"><Phone className="w-3 h-3 inline" /> Phone</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 123 4567" className={inp} /></div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setStep(1)} className="px-4 py-2.5 bg-neutral-800 text-neutral-300 text-sm rounded-lg">Back</button>
                <button onClick={goPayment} disabled={!ok2} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-600 text-black text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed">Continue to payment</button>
              </div>
            </>)}
            {step===3 && <StripePaymentForm amount={total} customerEmail={email} onSuccess={onPaid} onCancel={onCancel} />}
          </div>
          <div>
            <div className="border border-white/[0.06] rounded-xl p-4 bg-[#1a1a1a] sticky top-20">
              <div className="flex gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                <img src={vehicle.image_urls[0]} alt="" className="w-16 h-12 rounded-lg object-cover bg-neutral-800" />
                <div><div className="text-white text-sm font-medium">{vehicle.make} {vehicle.model}</div><div className="text-neutral-500 text-xs">{vehicle.year} · {vehicle.category}</div></div>
              </div>
              {pickupDate && returnDate && <div className="space-y-1.5 mb-4 pb-4 border-b border-white/[0.06] text-sm"><div className="flex justify-between"><span className="text-neutral-500">Pickup</span><span className="text-neutral-300">{pickupDate}</span></div><div className="flex justify-between"><span className="text-neutral-500">Return</span><span className="text-neutral-300">{returnDate}</span></div><div className="flex justify-between"><span className="text-neutral-500">Days</span><span className="text-neutral-300">{days}</span></div></div>}
              {days>0 && <div className="space-y-1.5 text-sm"><div className="flex justify-between"><span className="text-neutral-500">{days} × {formatCurrency(vehicle.daily_rate)}</span><span className="text-neutral-300">{formatCurrency(sub)}</span></div>{disc>0 && <div className="flex justify-between"><span className="text-emerald-400">Discount ({disc}%)</span><span className="text-emerald-400">−{formatCurrency(sub-total)}</span></div>}<div className="flex justify-between pt-2 border-t border-white/[0.06] font-medium"><span className="text-white">Total</span><span className="text-amber-400 text-lg font-semibold">{formatCurrency(total)}</span></div></div>}
              {resId && step===3 && <div className="mt-3 p-2 bg-amber-950 border border-amber-900 rounded-lg text-xs text-amber-300">Pending — waiting for payment</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
