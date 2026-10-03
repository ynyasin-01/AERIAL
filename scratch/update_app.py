import os
import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update bookingStep type
content = content.replace(
    "const [bookingStep, setBookingStep] = useState<'search' | 'confirm' | 'success'>('search');",
    "const [bookingStep, setBookingStep] = useState<'search' | 'confirm' | 'seats' | 'success'>('search');\n  const [bookingSelectedSeats, setBookingSelectedSeats] = useState<string[]>([]);\n  const [bookingReservedSeats, setBookingReservedSeats] = useState<string[]>([]);"
)

# 2. Add seats to BookingItem
content = content.replace(
    "  seat: string;",
    "  seat: string;\n  seats?: string[];"
)

# 3. Update breadcrumbs
breadcrumbs_old = """                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'success'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">03</span>
                  <span>Pass</span>
                </div>"""

breadcrumbs_new = """                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
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
content = content.replace(breadcrumbs_old, breadcrumbs_new)

# 4. Update 'Confirm & Book' button to 'Select Seats'
confirm_btn_old = """                      <button
                        type="button"
                        onClick={() => handleConfirmBooking({
                          flightNumber: bookingEngineFlights[selectedFlightIndex].flightNumber,
                          fare: bookingEngineFlights[selectedFlightIndex].fare,
                          time: bookingEngineFlights[selectedFlightIndex].time,
                        })}
                        className="flex-2 py-3 rounded-full bg-white text-black font-normal text-xs sm:text-sm hover:bg-neutral-200 transition-all uppercase tracking-wider shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        <span>Confirm & Book</span>"""

confirm_btn_new = """                      <button
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
content = content.replace(confirm_btn_old, confirm_btn_new)


# 5. Add Seat Selection Step UI
seats_ui = """
            {/* STEP 2.5: SEAT SELECTION */}
            {bookingStep === 'seats' && (
              <div className="w-full flex flex-col h-full animate-fade-in text-white pt-2">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Left Column: Info & Legend & Action */}
                  <div className="lg:col-span-1 flex flex-col gap-5">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                      <h4 className="text-xl font-medium tracking-tight mb-2">Select Your Seats</h4>
                      <p className="text-sm text-white/60 font-light mb-4">
                        Please choose 1 seat per passenger. Click on an available seat to select it.
                      </p>
                      
                      <div className="flex flex-col gap-3 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-white/10 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">✓</div>
                          <span className="text-white/80">Selected</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40"></div>
                          <span className="text-white/80">Available</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 text-white/20 flex items-center justify-center text-xs">✕</div>
                          <span className="text-white/80">Reserved</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex-1">
                      <h4 className="text-lg font-medium tracking-tight mb-3 border-b border-white/10 pb-3">Selection Summary</h4>
                      
                      <div className="flex justify-between items-center text-sm mb-2 text-white/70">
                        <span>Required Seats:</span>
                        <span className="text-white font-mono">{parseInt(bookingPassengerSelect.split(' ')[0]) || 1}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-4 text-white/70">
                        <span>Selected Seats:</span>
                        <span className="text-white font-mono">{bookingSelectedSeats.length}</span>
                      </div>
                      
                      {bookingSelectedSeats.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {bookingSelectedSeats.map(s => (
                            <span key={s} className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-end">
                        <span className="text-sm text-white/70">Seat Fees</span>
                        <span className="text-xl font-bold">+${bookingSelectedSeats.length * 25}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('confirm');
                        }}
                        className="flex-1 py-3.5 rounded-xl border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={bookingSelectedSeats.length !== (parseInt(bookingPassengerSelect.split(' ')[0]) || 1)}
                        onClick={() => {
                          const flightInfo = bookingEngineFlights[selectedFlightIndex];
                          handleConfirmBooking({
                            flightNumber: flightInfo.flightNumber,
                            fare: flightInfo.fare,
                            time: flightInfo.time,
                          });
                        }}
                        className="flex-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(16,185,129,0.25)] flex justify-center items-center gap-2 group cursor-pointer"
                      >
                        <span>Confirm Seats</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive Seat Map */}
                  <div className="lg:col-span-2 relative flex flex-col items-center justify-start bg-neutral-900/40 rounded-3xl border border-white/10 overflow-hidden py-10 h-[500px] overflow-y-auto custom-scrollbar">
                    {/* Plane Nose / Cockpit */}
                    <div className="w-48 h-24 border-t-2 border-l-2 border-r-2 border-white/20 rounded-t-[100px] mb-8 relative bg-white/[0.02]">
                       <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 border border-white/20 rounded-t-[30px] rounded-b-sm bg-blue-400/10 backdrop-blur-md"></div>
                    </div>
                    
                    {/* Plane Body */}
                    <div className="w-64 border-l-2 border-r-2 border-white/20 flex flex-col items-center pb-20 relative bg-white/[0.02]">
                      
                      {/* Wings */}
                      <div className="absolute top-20 -left-24 w-24 h-40 border-t-2 border-b-2 border-l-2 border-white/20 rounded-l-[40px] skew-y-12 bg-white/[0.01]"></div>
                      <div className="absolute top-20 -right-24 w-24 h-40 border-t-2 border-b-2 border-r-2 border-white/20 rounded-r-[40px] -skew-y-12 bg-white/[0.01]"></div>

                      {/* Seats Array */}
                      {Array.from({ length: 15 }).map((_, rIdx) => {
                        const row = rIdx + 1;
                        return (
                          <div key={row} className="flex items-center gap-2 mb-3 relative z-10">
                            {/* Left Seats (A, B, C) */}
                            <div className="flex gap-1">
                              {['A', 'B', 'C'].map(col => {
                                const seatId = `${row}${col}`;
                                const isReserved = bookingReservedSeats.includes(seatId);
                                const isSelected = bookingSelectedSeats.includes(seatId);
                                
                                return (
                                  <button
                                    key={seatId}
                                    disabled={isReserved}
                                    onClick={() => {
                                      const maxSeats = parseInt(bookingPassengerSelect.split(' ')[0]) || 1;
                                      if (isSelected) {
                                        setBookingSelectedSeats(prev => prev.filter(s => s !== seatId));
                                      } else {
                                        if (bookingSelectedSeats.length < maxSeats) {
                                          setBookingSelectedSeats(prev => [...prev, seatId]);
                                        } else {
                                          // Replace the last selected seat if trying to select more
                                          setBookingSelectedSeats(prev => [...prev.slice(1), seatId]);
                                        }
                                      }
                                    }}
                                    className={`w-7 h-8 sm:w-8 sm:h-9 rounded-t-lg rounded-b-sm border flex items-center justify-center text-[10px] sm:text-xs font-mono transition-all cursor-pointer ${
                                      isReserved 
                                        ? 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
                                        : isSelected
                                          ? 'bg-white/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100/50 hover:bg-emerald-500/30 hover:text-white'
                                    }`}
                                  >
                                    {isReserved ? '✕' : isSelected ? '✓' : ''}
                                  </button>
                                );
                              })}
                            </div>
                            
                            {/* Aisle with Row Number */}
                            <div className="w-8 flex items-center justify-center text-[10px] text-white/40 font-mono font-light">
                              {row}
                            </div>
                            
                            {/* Right Seats (D, E, F) */}
                            <div className="flex gap-1">
                              {['D', 'E', 'F'].map(col => {
                                const seatId = `${row}${col}`;
                                const isReserved = bookingReservedSeats.includes(seatId);
                                const isSelected = bookingSelectedSeats.includes(seatId);
                                
                                return (
                                  <button
                                    key={seatId}
                                    disabled={isReserved}
                                    onClick={() => {
                                      const maxSeats = parseInt(bookingPassengerSelect.split(' ')[0]) || 1;
                                      if (isSelected) {
                                        setBookingSelectedSeats(prev => prev.filter(s => s !== seatId));
                                      } else {
                                        if (bookingSelectedSeats.length < maxSeats) {
                                          setBookingSelectedSeats(prev => [...prev, seatId]);
                                        } else {
                                          setBookingSelectedSeats(prev => [...prev.slice(1), seatId]);
                                        }
                                      }
                                    }}
                                    className={`w-7 h-8 sm:w-8 sm:h-9 rounded-t-lg rounded-b-sm border flex items-center justify-center text-[10px] sm:text-xs font-mono transition-all cursor-pointer ${
                                      isReserved 
                                        ? 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
                                        : isSelected
                                          ? 'bg-white/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100/50 hover:bg-emerald-500/30 hover:text-white'
                                    }`}
                                  >
                                    {isReserved ? '✕' : isSelected ? '✓' : ''}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* STEP 3: SUCCESS CONFIRMATION & BOARDING PASS */}"""
content = content.replace("{/* STEP 3: SUCCESS CONFIRMATION & BOARDING PASS */}", seats_ui)

# 6. Update handleConfirmBooking to include seats and fee
confirm_old = """    const refCode = `AER-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: BookingItem = {
      id: `booking-${Date.now()}-${Math.random()}`,
      reference: refCode,
      destination: bookingDestInput.split('(')[0].trim(),
      route: cleanRoute,
      origin: bookingOriginInput,
      date: formattedDate,
      departDate: bookingDateInput,
      flight: `Flight ${chosenFlight.flightNumber} · Seat 14K (Window) · Confirmed`,
      flightNumber: chosenFlight.flightNumber,
      code: refCode,
      time: chosenFlight.time,
      gate: 'Gate ' + Math.floor(10 + Math.random() * 40),
      terminal: 'Terminal ' + (Math.floor(Math.random() * 3) + 1),
      seat: '14K',
      passengers: bookingPassengerSelect,
      passengerCount: 1,
      status: 'Confirmed',
      image: destImg,
      totalFare: chosenFlight.fare,
      userEmail: activeEmail,
    };"""

confirm_new = """    const refCode = `AER-${Math.floor(10000 + Math.random() * 90000)}`;
    const passCount = parseInt(bookingPassengerSelect.split(' ')[0]) || 1;
    const seatString = bookingSelectedSeats.length > 0 ? bookingSelectedSeats.join(', ') : 'Unassigned';
    
    // Save reserved seats to local storage
    if (bookingSelectedSeats.length > 0) {
       const flightKey = `reserved_seats_${chosenFlight.flightNumber}_${bookingDateInput}`;
       const currentReserved = [...bookingReservedSeats, ...bookingSelectedSeats];
       try {
         localStorage.setItem(flightKey, JSON.stringify(currentReserved));
       } catch {}
    }
    
    // Calculate total fare + seat fee
    const baseFare = parseInt(chosenFlight.fare.replace(/[^0-9]/g, '')) || 500;
    const seatFees = bookingSelectedSeats.length * 25;
    const finalFare = `$${baseFare + seatFees}`;

    const newBooking: BookingItem = {
      id: `booking-${Date.now()}-${Math.random()}`,
      reference: refCode,
      destination: bookingDestInput.split('(')[0].trim(),
      route: cleanRoute,
      origin: bookingOriginInput,
      date: formattedDate,
      departDate: bookingDateInput,
      flight: `Flight ${chosenFlight.flightNumber} · Seat(s): ${seatString} · Confirmed`,
      flightNumber: chosenFlight.flightNumber,
      code: refCode,
      time: chosenFlight.time,
      gate: 'Gate ' + Math.floor(10 + Math.random() * 40),
      terminal: 'Terminal ' + (Math.floor(Math.random() * 3) + 1),
      seat: seatString,
      seats: bookingSelectedSeats,
      passengers: bookingPassengerSelect,
      passengerCount: passCount,
      status: 'Confirmed',
      image: destImg,
      totalFare: finalFare,
      userEmail: activeEmail,
    };"""
content = content.replace(confirm_old, confirm_new)

# 7. Add seat display in Boarding Pass UI (Success Step)
bp_old = """                                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-black/50 block mb-0.5">Seat</span>
                                  <span className="text-base sm:text-lg font-bold text-black font-['Oswald']">14K</span>"""
bp_new = """                                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-black/50 block mb-0.5">Seat(s)</span>
                                  <span className="text-base sm:text-lg font-bold text-black font-['Oswald'] truncate">{confirmedBookingResult.seat}</span>"""
content = content.replace(bp_old, bp_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
