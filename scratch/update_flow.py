import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. bookingStep state
content = content.replace(
    "const [bookingStep, setBookingStep] = useState<'search' | 'confirm' | 'seats' | 'success'>('search');",
    "const [bookingStep, setBookingStep] = useState<'search' | 'seats' | 'confirm' | 'payment' | 'success'>('search');"
)

# 2. breadcrumbs
old_breadcrumbs = """                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'confirm'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">02</span>
                  <span>Review</span>
                </div>
                <span className="text-white/30">→</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'seats'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">03</span>
                  <span>Seats</span>
                </div>
                <span className="text-white/30">→</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'success'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">04</span>
                  <span>Pass</span>
                </div>"""

new_breadcrumbs = """                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'seats'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">02</span>
                  <span>Seat</span>
                </div>
                <span className="text-white/30">→</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'confirm'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">03</span>
                  <span>Review</span>
                </div>
                <span className="text-white/30">→</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'payment'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">04</span>
                  <span>Payment</span>
                </div>
                <span className="text-white/30">→</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'success'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">05</span>
                  <span>Pass</span>
                </div>"""
content = content.replace(old_breadcrumbs, new_breadcrumbs)

# 3. Flow: search -> seats
old_search_btn = """                    <button
                      onClick={() => setBookingStep('confirm')}
                      className="w-full py-3.5 rounded-full bg-white text-black font-normal text-sm sm:text-base hover:bg-neutral-200 transition-all uppercase tracking-wider cursor-pointer shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-95 flex items-center justify-center gap-2 group"
                    >
                      <span>Continue to Review</span>"""
new_search_btn = """                    <button
                      onClick={() => {
                        const flightKey = `reserved_seats_${bookingEngineFlights[selectedFlightIndex].flightNumber}_${bookingDateInput}`;
                        const stored = localStorage.getItem(flightKey);
                        if (stored) {
                          setBookingReservedSeats(JSON.parse(stored));
                        } else {
                          setBookingReservedSeats(['2A', '2C', '4D', '4F', '5B', '7A', '7B', '10C', '10D', '11E', '11F', '12A']);
                        }
                        setBookingSelectedSeats([]);
                        setBookingStep('seats');
                      }}
                      className="w-full py-3.5 rounded-full bg-white text-black font-normal text-sm sm:text-base hover:bg-neutral-200 transition-all uppercase tracking-wider cursor-pointer shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-95 flex items-center justify-center gap-2 group"
                    >
                      <span>Continue to Seats</span>"""
content = content.replace(old_search_btn, new_search_btn)

# 4. Flow: seats -> confirm (review)
old_seats_back = """                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('confirm');
                        }}
                        className="flex-1 py-3.5 rounded-xl border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>"""
new_seats_back = """                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('search');
                        }}
                        className="flex-1 py-3.5 rounded-xl border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>"""
content = content.replace(old_seats_back, new_seats_back)

old_seats_confirm = """                        onClick={() => {
                          const flightInfo = bookingEngineFlights[selectedFlightIndex];
                          handleConfirmBooking({
                            flightNumber: flightInfo.flightNumber,
                            fare: flightInfo.fare,
                            time: flightInfo.time,
                          });
                        }}
                        className="flex-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(16,185,129,0.25)] flex justify-center items-center gap-2 group cursor-pointer"
                      >
                        <span>Confirm Seats</span>"""
new_seats_confirm = """                        onClick={() => {
                          setBookingStep('confirm');
                        }}
                        className="flex-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(16,185,129,0.25)] flex justify-center items-center gap-2 group cursor-pointer"
                      >
                        <span>Continue to Review</span>"""
content = content.replace(old_seats_confirm, new_seats_confirm)

# 5. Flow: confirm (review) -> payment
old_confirm_back = """                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('search');
                          setBookingDuplicateError(null);
                        }}
                        className="flex-1 py-3 rounded-full border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>"""
new_confirm_back = """                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('seats');
                          setBookingDuplicateError(null);
                        }}
                        className="flex-1 py-3 rounded-full border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>"""
content = content.replace(old_confirm_back, new_confirm_back)

old_confirm_btn = """                      <button
                        type="button"
                        onClick={() => {
                          // Load reserved seats from local storage
                          const flightKey = `reserved_seats_${bookingEngineFlights[selectedFlightIndex].flightNumber}_${bookingDateInput}`;
                          const stored = localStorage.getItem(flightKey);
                          if (stored) {
                            setBookingReservedSeats(JSON.parse(stored));
                          } else {
                            // Simulate some reserved seats
                            setBookingReservedSeats(['2A', '2C', '4D', '4F', '5B', '7A', '7B', '10C', '10D', '11E', '11F', '12A']);
                          }
                          setBookingSelectedSeats([]);
                          setBookingStep('seats');
                        }}
                        className="flex-2 py-3 rounded-full bg-white text-black font-normal text-xs sm:text-sm hover:bg-neutral-200 transition-all uppercase tracking-wider shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        <span>Select Seats</span>"""
new_confirm_btn = """                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('payment');
                        }}
                        className="flex-2 py-3 rounded-full bg-white text-black font-normal text-xs sm:text-sm hover:bg-neutral-200 transition-all uppercase tracking-wider shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        <span>Continue to Payment</span>"""
content = content.replace(old_confirm_btn, new_confirm_btn)

# 6. Payment block insertion
payment_block = """
            {/* STEP 4: PAYMENT (DEMO) */}
            {bookingStep === 'payment' && (
              <div className="w-full flex flex-col h-full animate-fade-in text-white pt-2 max-w-2xl mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                  
                  <h3 className="text-2xl font-medium tracking-tight mb-2 relative z-10">Complete Payment</h3>
                  <p className="text-white/60 text-sm font-light mb-6 relative z-10">Choose your payment method to finalize the reservation.</p>
                  
                  {/* Payment Methods */}
                  <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                    <button className="py-5 border border-emerald-500/50 bg-emerald-500/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-400 group">
                      <CreditCard className="w-7 h-7 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-medium tracking-wider uppercase">Credit Card</span>
                    </button>
                    <button className="py-5 border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all text-white/70 hover:text-white group">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 group-hover:scale-110 transition-transform"><path d="M7 11.5V14m0-2.5h1.5a4.5 4.5 0 1 0-4-4.492M7 11.5l1.61 5.635M17 14.5l-1.61-5.635M17 14.5H15.5a4.5 4.5 0 1 1 4-4.492M17 14.5v2.5"/></svg>
                      <span className="text-[11px] font-medium tracking-wider uppercase">PayPal</span>
                    </button>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4 mb-8 relative z-10">
                    <div>
                      <label className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 block mb-2 font-medium">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/15 hover:border-white/30 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-sm shadow-inner" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 block mb-2 font-medium">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/15 hover:border-white/30 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-sm shadow-inner" />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 block mb-2 font-medium">CVV</label>
                        <input type="text" placeholder="123" className="w-full bg-white/5 border border-white/15 hover:border-white/30 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-sm shadow-inner" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 block mb-2 font-medium">Cardholder Name</label>
                      <input type="text" placeholder="Name on card" className="w-full bg-white/5 border border-white/15 hover:border-white/30 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm shadow-inner" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 relative z-10">
                    <button
                      type="button"
                      onClick={() => setBookingStep('confirm')}
                      className="flex-1 py-3.5 rounded-full border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const flightInfo = bookingEngineFlights[selectedFlightIndex];
                        handleConfirmBooking({
                          flightNumber: flightInfo.flightNumber,
                          fare: flightInfo.fare,
                          time: flightInfo.time,
                        });
                      }}
                      className="flex-2 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <span>Pay & Book</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}
"""

# Insert payment block before success block
content = content.replace("{/* STEP 3: SUCCESS CONFIRMATION & BOARDING PASS */}", payment_block + "\n            {/* STEP 5: SUCCESS CONFIRMATION & BOARDING PASS */}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Flow updated successfully")
