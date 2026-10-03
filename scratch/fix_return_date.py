import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add bookingReturnDateInput state
state_old = "const [bookingDateInput, setBookingDateInput] = useState('2026-10-15');"
state_new = "const [bookingDateInput, setBookingDateInput] = useState('2026-10-15');\n  const [bookingReturnDateInput, setBookingReturnDateInput] = useState('2026-10-22');"
content = content.replace(state_old, state_new)

# Modify the Date & Travelers Row
dates_old = """                  {/* Date & Travelers Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl">
                      <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1 font-light flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-white/50" />
                        <span>Date</span>
                      </label>
                      <input
                        type="date"
                        value={bookingDateInput}
                        onChange={(e) => setBookingDateInput(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-2.5 py-1.5 text-white text-xs sm:text-sm focus:outline-none focus:border-white font-['Oswald'] backdrop-blur-md cursor-pointer"
                      />
                    </div>"""

dates_new = """                  {/* Date & Travelers Row */}
                  <div className={`grid gap-3 ${modalTripType === 'Round Trip' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    <div className="p-3 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl">
                      <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1 font-light flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-white/50 shrink-0" />
                        <span className="truncate">{modalTripType === 'Round Trip' ? 'Departure' : 'Date'}</span>
                      </label>
                      <input
                        type="date"
                        value={bookingDateInput}
                        onChange={(e) => setBookingDateInput(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-2.5 py-1.5 text-white text-xs sm:text-sm focus:outline-none focus:border-white font-['Oswald'] backdrop-blur-md cursor-pointer"
                      />
                    </div>

                    {modalTripType === 'Round Trip' && (
                      <div className="p-3 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl">
                        <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1 font-light flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-white/50 shrink-0" />
                          <span className="truncate">Return</span>
                        </label>
                        <input
                          type="date"
                          value={bookingReturnDateInput}
                          min={bookingDateInput}
                          onChange={(e) => setBookingReturnDateInput(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-2.5 py-1.5 text-white text-xs sm:text-sm focus:outline-none focus:border-white font-['Oswald'] backdrop-blur-md cursor-pointer"
                        />
                      </div>
                    )}"""

content = content.replace(dates_old, dates_new)

# Update return date format in booking item
booking_old = """      departDate: bookingDateInput,
      flight: `Flight ${chosenFlight.flightNumber} · Seat(s): ${seatString} · Confirmed`,"""
booking_new = """      departDate: bookingDateInput,
      returnDate: modalTripType === 'Round Trip' ? bookingReturnDateInput : undefined,
      flight: `Flight ${chosenFlight.flightNumber} · Seat(s): ${seatString} · Confirmed`,"""
content = content.replace(booking_old, booking_new)


# SVG Logo replacement
logo_old = """                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center group cursor-pointer"
                >
                  <span className="text-3xl font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity font-nevera">
                    Aerial
                  </span>
                </button>"""

logo_new = """                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center group cursor-pointer"
                  aria-label="Aerial Home"
                >
                  <svg className="h-8 w-28 overflow-visible" viewBox="0 0 100 30" fill="none">
                    <text
                      x="0"
                      y="24"
                      className="font-nevera text-3xl font-bold transition-opacity group-hover:opacity-80"
                    >
                      <tspan className="logo-letter" style={{ animationDelay: '0s' }}>A</tspan>
                      <tspan className="logo-letter" style={{ animationDelay: '0.15s' }}>e</tspan>
                      <tspan className="logo-letter" style={{ animationDelay: '0.3s' }}>r</tspan>
                      <tspan className="logo-letter" style={{ animationDelay: '0.45s' }}>i</tspan>
                      <tspan className="logo-letter" style={{ animationDelay: '0.6s' }}>a</tspan>
                      <tspan className="logo-letter" style={{ animationDelay: '0.75s' }}>l</tspan>
                    </text>
                  </svg>
                </button>"""

content = content.replace(logo_old, logo_new)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
