import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add paymentMethod state
state_old = "const [bookingStep, setBookingStep] = useState<'search' | 'seats' | 'confirm' | 'payment' | 'success'>('search');"
state_new = "const [bookingStep, setBookingStep] = useState<'search' | 'seats' | 'confirm' | 'payment' | 'success'>('search');\n  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');"
content = content.replace(state_old, state_new)


# Update the payment methods toggles
payment_old = """                  {/* Payment Methods */}
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
                  </div>"""

payment_new = """                  {/* Payment Methods */}
                  <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`py-5 border backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group ${
                        paymentMethod === 'card' 
                          ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-400' 
                          : 'border-white/20 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-7 h-7 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-medium tracking-wider uppercase">Credit Card</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('paypal')}
                      className={`py-5 border backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group ${
                        paymentMethod === 'paypal' 
                          ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-400' 
                          : 'border-white/20 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 group-hover:scale-110 transition-transform"><path d="M7 11.5V14m0-2.5h1.5a4.5 4.5 0 1 0-4-4.492M7 11.5l1.61 5.635M17 14.5l-1.61-5.635M17 14.5H15.5a4.5 4.5 0 1 1 4-4.492M17 14.5v2.5"/></svg>
                      <span className="text-[11px] font-medium tracking-wider uppercase">PayPal</span>
                    </button>
                  </div>

                  {/* Payment Forms */}
                  <div className="mb-8 relative z-10 min-h-[220px]">
                    {paymentMethod === 'card' ? (
                      <div className="space-y-4 animate-fade-in">
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
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full space-y-6 py-6 animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-[#00457C]/20 border border-[#0079C1]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,121,193,0.2)]">
                           <svg className="w-8 h-8 text-[#0079C1]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
                           </svg>
                        </div>
                        <div className="text-center space-y-2">
                          <h4 className="text-white text-lg font-medium">Pay with PayPal</h4>
                          <p className="text-white/50 text-xs sm:text-sm max-w-xs mx-auto">You will be securely redirected to PayPal to complete your purchase when you click the button below.</p>
                        </div>
                      </div>
                    )}
                  </div>"""

content = content.replace(payment_old, payment_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("PayPal view fixed successfully")
