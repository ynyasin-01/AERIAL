import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add states for deletion and toast
state_old = "  const [myBookings, setMyBookings] = useState<BookingItem[]>(() => {"
state_new = """  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [myBookings, setMyBookings] = useState<BookingItem[]>(() => {"""
content = content.replace(state_old, state_new)

# 2. Update handleCancelBooking
cancel_old = """  const handleCancelBooking = (bookingId: string) => {
    const updated = myBookings.filter(b => b.id !== bookingId);
    setMyBookings(updated);
    try {
      localStorage.setItem(`aerial_bookings_${currentUser.email}`, JSON.stringify(updated));
    } catch {}
    if (selectedBookingForItinerary?.id === bookingId) {
      setSelectedBookingForItinerary(null);
    }
  };"""
cancel_new = """  const handleCancelBooking = (bookingId: string) => {
    setBookingToDelete(bookingId);
  };

  const confirmDeleteBooking = () => {
    if (!bookingToDelete) return;
    
    if (bookingToDelete === 'ALL') {
      setMyBookings([]);
      try {
        localStorage.setItem(`aerial_bookings_${currentUser.email}`, JSON.stringify([]));
      } catch {}
      setToastMessage("All bookings deleted successfully");
    } else {
      const updated = myBookings.filter(b => b.id !== bookingToDelete);
      setMyBookings(updated);
      try {
        localStorage.setItem(`aerial_bookings_${currentUser.email}`, JSON.stringify(updated));
      } catch {}
      if (selectedBookingForItinerary?.id === bookingToDelete) {
        setSelectedBookingForItinerary(null);
      }
      setToastMessage("Booking deleted successfully");
    }
    setBookingToDelete(null);
    
    setTimeout(() => setToastMessage(null), 3500);
  };"""
content = content.replace(cancel_old, cancel_new)


# 3. Add Delete All Bookings button
actions_old = """          {/* Action Buttons: View My Trips · Find a Flight when trips exist */}
          {myBookings.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <button
                onClick={() => {
                  bookingsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer font-normal text-sm sm:text-base tracking-wide text-white active:scale-95 shadow-md"
              >
                View My Trips
              </button>
              <button
                onClick={() => {
                  setBookingStep('search');
                  setBookingDuplicateError(null);
                  setIsSearchFlightModalOpen(true);
                }}
                className="px-8 py-3.5 rounded-full border border-white bg-white text-black transition-all cursor-pointer font-normal text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-95 shadow-lg"
              >
                Find a Flight
              </button>
            </div>
          )}"""

actions_new = """          {/* Action Buttons: View My Trips · Find a Flight when trips exist */}
          {myBookings.length > 0 && (
            <div className="flex flex-col items-center gap-4 mt-2">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    bookingsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-full border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer font-normal text-sm sm:text-base tracking-wide text-white active:scale-95 shadow-md"
                >
                  View My Trips
                </button>
                <button
                  onClick={() => {
                    setBookingStep('search');
                    setBookingDuplicateError(null);
                    setIsSearchFlightModalOpen(true);
                  }}
                  className="px-8 py-3.5 rounded-full border border-white bg-white text-black transition-all cursor-pointer font-normal text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-95 shadow-lg"
                >
                  Find a Flight
                </button>
              </div>
              <button
                onClick={() => handleCancelBooking('ALL')}
                className="px-6 py-2.5 mt-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-md text-red-300 transition-all cursor-pointer font-normal text-xs uppercase tracking-wider hover:bg-red-500/20 hover:border-red-500/50 active:scale-95 shadow-lg"
              >
                Delete all bookings
              </button>
            </div>
          )}"""
content = content.replace(actions_old, actions_new)

# 4. Insert Modal & Toast at bottom
bottom_old = """    </div>
  );
}"""

bottom_new = """
      {/* DELETE CONFIRMATION MODAL */}
      {bookingToDelete && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 animate-modal-backdrop transition-all">
          <div className="w-full max-w-sm bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 relative shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] animate-modal-card text-center">
            <h3 className="text-xl font-medium text-white mb-2">Delete Booking</h3>
            <p className="text-white/70 text-sm mb-6">
              {bookingToDelete === 'ALL' 
                ? 'Are you sure you want to delete all your bookings? This action cannot be undone.'
                : 'Are you sure you want to delete this booking? This action cannot be undone.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setBookingToDelete(null)}
                className="flex-1 py-2.5 rounded-full border border-white/30 text-white text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteBooking}
                className="flex-1 py-2.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] animate-modal-card">
          <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs">✓</div>
            <span className="text-white text-sm font-medium tracking-wide">{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}"""
content = content.replace(bottom_old, bottom_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
