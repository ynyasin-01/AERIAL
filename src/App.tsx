import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import ScrollAnimationBackground from './ScrollAnimationBackground';
import {
  Plane,
  ArrowRight,
  ArrowLeft,
  User,
  Menu,
  X,
  Compass,
  Calendar,
  ChevronDown,
  LogOut,
  Bookmark,
  ShieldCheck,
  Sparkles,
  Luggage,
  Ticket,
  MapPin,
  Play,
  Users,
  Mail,
  MessageSquare,
  HelpCircle,
  Send,
  CheckCircle,
  ArrowRightLeft,
  CreditCard
} from 'lucide-react';

// Plushy Airplane Logo in Pure White
function PlushyAirplaneLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Soft, plump, friendly plushy airplane silhouette */}
      <g fill="#FFFFFF">
        {/* Chubby Fuselage with soft bulbous curves */}
        <path
          d="M35 20C35 17.5 32.5 15.5 28.5 15.5H23.5L16 6.5C15 5.3 13.5 5.5 12.8 6.5C12.2 7.5 12.6 8.8 13.8 10.2L18.5 15.5H10.5L6.5 12.2C5.8 11.5 4.6 11.8 4.2 12.6C3.7 13.5 4 14.5 4.8 15.5L8 19C7.5 19.8 7.2 20.8 7.2 22C7.2 23.2 7.5 24.2 8 25L4.8 28.5C4 29.5 3.7 30.5 4.2 31.4C4.6 32.2 5.8 32.5 6.5 31.8L10.5 28.5H18.5L13.8 33.8C12.6 35.2 12.2 36.5 12.8 37.5C13.5 38.5 15 38.7 16 37.5L23.5 28.5H28.5C32.5 28.5 35 26.5 35 24C36.2 23.5 37.5 22.8 37.5 22C37.5 21.2 36.2 20.5 35 20Z"
        />
        {/* Soft wing shadows/accents */}
        <path
          d="M21 16L15 8C14.5 7.3 14 7.5 13.8 8C13.5 8.5 13.8 9.2 14.5 10L19.5 16H21Z"
          opacity="0.9"
        />
        <path
          d="M21 28L15 36C14.5 36.7 14 36.5 13.8 36C13.5 35.5 13.8 34.8 14.5 34L19.5 28H21Z"
          opacity="0.9"
        />
      </g>
      {/* Plush cockpit pill window with soft eye glints */}
      <path
        d="M27 18.5H31C32 18.5 33 19.5 32.8 20.8C32.5 21.8 31.8 22.8 30.8 23.2C30 23.5 29 23.5 28 23.5H27C26.2 23.5 25.5 22.8 25.5 22V20C25.5 19.2 26.2 18.5 27 18.5Z"
        fill="#000000"
      />
      <circle cx="28.5" cy="20.5" r="0.9" fill="#FFFFFF" />
      <circle cx="31" cy="20.5" r="0.7" fill="#FFFFFF" />
    </svg>
  );
}

interface DestinationItem {
  id: number;
  name: string;
  country: string;
  subtext: string;
  startingFare: string;
  image: string;
  flightTime: string;
  avgTemp?: string;
  peakSeason?: string;
}

export interface WebsiteLocation {
  city: string;
  country: string;
  code: string;
  airport: string;
  fullName: string;
  region: 'Asia' | 'Americas' | 'Europe' | 'Middle East';
}

// Canonical list of all destinations and departure locations featured across Aerial website
export const websiteLocations: WebsiteLocation[] = [
  { city: 'Dhaka', country: 'Bangladesh', code: 'DAC', airport: 'Hazrat Shahjalal Int’l', fullName: 'Dhaka (DAC)', region: 'Asia' },
  { city: 'Bangkok', country: 'Thailand', code: 'BKK', airport: 'Suvarnabhumi', fullName: 'Bangkok (BKK)', region: 'Asia' },
  { city: 'Dubai', country: 'United Arab Emirates', code: 'DXB', airport: 'Dubai Int’l', fullName: 'Dubai (DXB)', region: 'Middle East' },
  { city: 'Kuala Lumpur', country: 'Malaysia', code: 'KUL', airport: 'Kuala Lumpur Int’l', fullName: 'Kuala Lumpur (KUL)', region: 'Asia' },
  { city: 'Singapore', country: 'Singapore', code: 'SIN', airport: 'Changi Airport', fullName: 'Singapore (SIN)', region: 'Asia' },
  { city: 'Tokyo', country: 'Japan', code: 'NRT', airport: 'Narita Int’l', fullName: 'Tokyo Narita (NRT)', region: 'Asia' },
  { city: 'Vancouver', country: 'Canada', code: 'YVR', airport: 'Vancouver Int’l', fullName: 'Vancouver (YVR)', region: 'Americas' },
  { city: 'New York', country: 'United States', code: 'JFK', airport: 'John F. Kennedy', fullName: 'New York (JFK)', region: 'Americas' },
  { city: 'San Francisco', country: 'United States', code: 'SFO', airport: 'San Francisco Int’l', fullName: 'San Francisco (SFO)', region: 'Americas' },
  { city: 'Los Angeles', country: 'United States', code: 'LAX', airport: 'Los Angeles Int’l', fullName: 'Los Angeles (LAX)', region: 'Americas' },
  { city: 'San Lucas', country: 'Mexico', code: 'SJD', airport: 'Los Cabos Int’l', fullName: 'San Lucas (SJD)', region: 'Americas' },
  { city: 'Amalfi Coast', country: 'Italy', code: 'NAP', airport: 'Naples Int’l', fullName: 'Amalfi Coast (NAP)', region: 'Europe' },
  { city: 'Punta Cana', country: 'Dominican Republic', code: 'PUJ', airport: 'Punta Cana Int’l', fullName: 'Punta Cana (PUJ)', region: 'Americas' },
  { city: 'Miami', country: 'United States', code: 'MIA', airport: 'Miami Int’l', fullName: 'Miami (MIA)', region: 'Americas' },
  { city: 'Honolulu', country: 'United States', code: 'HNL', airport: 'Daniel K. Inouye', fullName: 'Honolulu (HNL)', region: 'Americas' },
  { city: 'London', country: 'United Kingdom', code: 'LHR', airport: 'Heathrow', fullName: 'London (LHR)', region: 'Europe' },
  { city: 'Paris', country: 'France', code: 'CDG', airport: 'Charles de Gaulle', fullName: 'Paris (CDG)', region: 'Europe' },
  { city: 'Bali', country: 'Indonesia', code: 'DPS', airport: 'Ngurah Rai Int’l', fullName: 'Bali (DPS)', region: 'Asia' },
];

export interface BookingItem {
  id: string;
  reference: string;
  destination: string;
  route: string;
  origin: string;
  destCode?: string;
  date: string;
  departDate: string;
  returnDate?: string;
  flight: string;
  flightNumber: string;
  code: string;
  time: string;
  gate: string;
  terminal: string;
  seat: string;
  seats?: string[];
  passengers: string;
  passengerCount: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  image: string;
  totalFare: string;
  userEmail: string;
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string }>(() => {
    try {
      const saved = localStorage.getItem('aerial_user_session');
      return saved ? JSON.parse(saved) : { name: 'Alex Taylor', email: 'alex.taylor@example.com' };
    } catch {
      return { name: 'Alex Taylor', email: 'alex.taylor@example.com' };
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('aerial_is_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authNameInput, setAuthNameInput] = useState('Alex Taylor');
  const [authEmailInput, setAuthEmailInput] = useState('alex.taylor@example.com');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFlightModalOpen, setIsSearchFlightModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section 2: Destination Showcase State
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const [isDestCarouselHovered, setIsDestCarouselHovered] = useState(false);
  const [selectedPill, setSelectedPill] = useState('All');
  const [selectedDestinationForModal, setSelectedDestinationForModal] = useState<DestinationItem | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const destinationsSectionRef = useRef<HTMLDivElement>(null);
  const offersSectionRef = useRef<HTMLDivElement>(null);
  const bookingsSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  // Section 5: About & Contact State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [activeBubbleIndex, setActiveBubbleIndex] = useState(2); // Lake Braies (Dolomites) default center
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // 5 Orbital Destinations matching requested table entries
  const orbitalDestinations = [
    {
      id: 1,
      title: 'Dhaka',
      location: 'Bangladesh',
      landmark: 'Ahsan Manzil',
      image: 'https://i.pinimg.com/1200x/55/39/b3/5539b363da13a0a10e67eb7482ae6128.jpg',
    },
    {
      id: 2,
      title: 'Bangkok',
      location: 'Thailand',
      landmark: 'Wat Arun',
      image: 'https://i.pinimg.com/1200x/2a/0f/c5/2a0fc56c63ed836b7a4e2151179c2edf.jpg',
    },
    {
      id: 3,
      title: 'Dubai',
      location: 'United Arab Emirates',
      landmark: 'Burj Khalifa',
      image: 'https://res.cloudinary.com/akbfl7c0/image/upload/v1791002865/Dubai.jpg',
    },
    {
      id: 4,
      title: 'Kuala Lumpur',
      location: 'Malaysia',
      landmark: 'Petronas Towers',
      image: 'https://i.pinimg.com/1200x/a1/61/da/a161da30a1a5f1b22bd1cfb1a6292950.jpg',
    },
    {
      id: 5,
      title: 'Singapore',
      location: 'Singapore',
      landmark: 'Marina Bay Sands',
      image: 'https://i.pinimg.com/1200x/ff/92/62/ff926215a168ced36d421051754d7ba8.jpg',
    },
  ];

  // Section 4: My Bookings State (Persistent per user, initially empty)
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [myBookings, setMyBookings] = useState<BookingItem[]>(() => {
    try {
      const savedSession = localStorage.getItem('aerial_user_session');
      const email = savedSession ? JSON.parse(savedSession).email : 'alex.taylor@example.com';
      const stored = localStorage.getItem(`aerial_bookings_${email}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedBookingForItinerary, setSelectedBookingForItinerary] = useState<BookingItem | null>(null);

  // Booking Engine & Flow State
  const [bookingOriginInput, setBookingOriginInput] = useState('San Francisco (SFO)');
  const [bookingDestInput, setBookingDestInput] = useState('Tokyo Narita (NRT)');
  const [bookingDateInput, setBookingDateInput] = useState('2026-10-15');
  const [bookingReturnDateInput, setBookingReturnDateInput] = useState('2026-10-22');
  const [bookingPassengerSelect, setBookingPassengerSelect] = useState('1 Adult, Economy');
  const [bookingCabinClassSelect, setBookingCabinClassSelect] = useState('Economy');
  const [bookingStep, setBookingStep] = useState<'search' | 'seats' | 'confirm' | 'payment' | 'success'>('search');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [bookingSelectedSeats, setBookingSelectedSeats] = useState<string[]>([]);
  const [bookingReservedSeats, setBookingReservedSeats] = useState<string[]>([]);
  const [modalTripType, setModalTripType] = useState<'Round Trip' | 'One-way'>('Round Trip');
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(0);
  const [confirmedBookingResult, setConfirmedBookingResult] = useState<BookingItem | null>(null);
  const [bookingDuplicateError, setBookingDuplicateError] = useState<string | null>(null);

  // Footer animation state
  const footerLogoRef = useRef<SVGSVGElement>(null);
  const [isFooterLogoVisible, setIsFooterLogoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFooterLogoVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (footerLogoRef.current) {
      observer.observe(footerLogoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Curated live flights for Aerial Booking Engine
  const bookingEngineFlights = [
    {
      flightNumber: 'AR-802',
      type: 'Aerial Dreamliner',
      aircraft: 'Boeing 787-9',
      departTime: '11:20 AM',
      arriveTime: '03:45 PM (+1)',
      time: '11:20 AM - 03:45 PM (+1)',
      duration: '11h 25m',
      stops: 'Non-Stop',
      fare: '$640',
      numericFare: 640,
      badge: 'Best Value',
    },
    {
      flightNumber: 'AR-310',
      type: 'Aerial Express',
      aircraft: 'Airbus A350-900',
      departTime: '02:40 PM',
      arriveTime: '07:15 PM (+1)',
      time: '02:40 PM - 07:15 PM (+1)',
      duration: '10h 35m',
      stops: 'Non-Stop',
      fare: '$595',
      numericFare: 595,
      badge: 'Fastest',
    },
    {
      flightNumber: 'AR-105',
      type: 'Aerial Saver',
      aircraft: 'Boeing 777-300ER',
      departTime: '08:15 AM',
      arriveTime: '04:30 PM (+1)',
      time: '08:15 AM - 04:30 PM (+1)',
      duration: '14h 15m',
      stops: '1 Stop (Hub)',
      fare: '$490',
      numericFare: 490,
      badge: 'Saver',
    },
  ];

  // Sync bookings to localStorage whenever they change
  useEffect(() => {
    if (currentUser?.email) {
      try {
        localStorage.setItem(`aerial_bookings_${currentUser.email}`, JSON.stringify(myBookings));
      } catch {}
    }
  }, [myBookings, currentUser]);

  const handleLoginUser = (name: string, email: string) => {
    const user = { name: name || 'Alex Taylor', email: email || 'alex.taylor@example.com' };
    setCurrentUser(user);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('aerial_user_session', JSON.stringify(user));
      localStorage.setItem('aerial_is_logged_in', 'true');
      const stored = localStorage.getItem(`aerial_bookings_${user.email}`);
      setMyBookings(stored ? JSON.parse(stored) : []);
    } catch {
      setMyBookings([]);
    }
  };

  const handleLogoutUser = () => {
    setIsLoggedIn(false);
    setMyBookings([]);
    try {
      localStorage.removeItem('aerial_is_logged_in');
    } catch {}
  };

  const handleConfirmBooking = (flightOption?: { flightNumber: string; fare: string; time: string }) => {
    setBookingDuplicateError(null);
    const activeEmail = currentUser.email || 'alex.taylor@example.com';
    const cleanRoute = `${bookingOriginInput} → ${bookingDestInput}`;

    // Prevent duplicate bookings: same user, same route, and same travel date
    const existing = myBookings.find(
      (b) => b.route.toLowerCase() === cleanRoute.toLowerCase() &&
             b.departDate === bookingDateInput &&
             b.status === 'Confirmed'
    );

    if (existing) {
      setBookingDuplicateError(`Duplicate booking prevented: You already have a confirmed flight for ${cleanRoute} on ${bookingDateInput} (Reference: ${existing.reference}).`);
      return;
    }

    const chosenFlight = flightOption || bookingEngineFlights[selectedFlightIndex] || bookingEngineFlights[0];

    // Determine matching vivid landmark image
    let destImg = 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80';
    const matchDest = destinations.find(d => bookingDestInput.toLowerCase().includes(d.name.toLowerCase()));
    if (matchDest) {
      destImg = matchDest.image;
    } else {
      const matchOrb = orbitalDestinations.find(o => bookingDestInput.toLowerCase().includes(o.title.toLowerCase()));
      if (matchOrb) destImg = matchOrb.image;
    }

    // Format human-readable date
    let formattedDate = bookingDateInput;
    try {
      const d = new Date(bookingDateInput + 'T00:00:00');
      formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {}

    const refCode = `AER-${Math.floor(10000 + Math.random() * 90000)}`;
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
      returnDate: modalTripType === 'Round Trip' ? bookingReturnDateInput : undefined,
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
    };

    const updatedBookings = [newBooking, ...myBookings];
    setMyBookings(updatedBookings);
    setIsLoggedIn(true);
    setConfirmedBookingResult(newBooking);
    setBookingStep('success');

    try {
      localStorage.setItem(`aerial_bookings_${activeEmail}`, JSON.stringify(updatedBookings));
      localStorage.setItem('aerial_is_logged_in', 'true');
    } catch {}
  };

  const handleCancelBooking = (bookingId: string) => {
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
  };

  // Section 3: Flight Offers State
  const [selectedOfferCategory, setSelectedOfferCategory] = useState<string>('Weekend Getaways');
  const [bookingTripType, setBookingTripType] = useState<'One-way' | 'Round Trip' | 'Multi City'>('Round Trip');
  const [bookingOriginCode, setBookingOriginCode] = useState('YVR');
  const [bookingOriginCity, setBookingOriginCity] = useState('Vancouver');
  const [bookingDestCode, setBookingDestCode] = useState('BKK');
  const [bookingDestCity, setBookingDestCity] = useState('Bangkok');
  const [bookingDepartDate, setBookingDepartDate] = useState('28 May 2026');
  const [bookingReturnDate, setBookingReturnDate] = useState('05 June 2026');
  const [bookingCabinClass, setBookingCabinClass] = useState('Economy');
  const [bookingPassengers, setBookingPassengers] = useState(2);

  // Special Offer Cards Data for Section 3 matching reference layout
  const specialOffersData: Record<string, Array<{
    id: number;
    destination: string;
    code: string;
    origin: string;
    price: string;
    dates: string;
    image: string;
  }>> = {
    'Weekend Getaways': [
      {
        id: 1,
        destination: 'Punta Cana',
        code: 'PUJ',
        origin: 'Vancouver (YVR)',
        price: '$626',
        dates: '28 May to 05 Jun',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 2,
        destination: 'Cancun',
        code: 'CUN',
        origin: 'Vancouver (YVR)',
        price: '$762',
        dates: '28 May to 05 Jun',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 3,
        destination: 'Punta Cana',
        code: 'PUJ',
        origin: 'Vancouver (YVR)',
        price: '$632',
        dates: '28 May to 05 Jun',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
      },
    ],
    'International Adventures': [
      {
        id: 4,
        destination: 'Tokyo',
        code: 'NRT',
        origin: 'San Francisco (SFO)',
        price: '$840',
        dates: '15 Oct to 28 Oct',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 5,
        destination: 'Bangkok',
        code: 'BKK',
        origin: 'Vancouver (YVR)',
        price: '$695',
        dates: '10 Nov to 24 Nov',
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 6,
        destination: 'Rome',
        code: 'FCO',
        origin: 'New York (JFK)',
        price: '$710',
        dates: '05 Sep to 18 Sep',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
      },
    ],
    'Last-Minute Trips': [
      {
        id: 7,
        destination: 'Miami',
        code: 'MIA',
        origin: 'New York (JFK)',
        price: '$245',
        dates: 'Departs Tomorrow',
        image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 8,
        destination: 'Honolulu',
        code: 'HNL',
        origin: 'Los Angeles (LAX)',
        price: '$380',
        dates: 'Departs Friday',
        image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 9,
        destination: 'Vancouver',
        code: 'YVR',
        origin: 'San Francisco (SFO)',
        price: '$195',
        dates: 'Departs Thursday',
        image: 'https://images.unsplash.com/photo-1559511260-66a65e09b245?auto=format&fit=crop&w=600&q=80',
      },
    ],
  };

  // 5 Destinations specified in the user prompt
  const destinations: DestinationItem[] = [
    {
      id: 1,
      name: 'Dhaka',
      country: 'Bangladesh',
      subtext: 'Discover rich culture, colorful streets, and unforgettable flavors.',
      startingFare: '$620',
      flightTime: 'Direct & 1-stop available',
      image: 'https://i.pinimg.com/1200x/55/39/b3/5539b363da13a0a10e67eb7482ae6128.jpg',
      avgTemp: '26°C',
      peakSeason: 'Nov - Feb',
    },
    {
      id: 2,
      name: 'Bangkok',
      country: 'Thailand',
      subtext: 'Explore golden temples, bustling markets, and vibrant nightlife.',
      startingFare: '$490',
      flightTime: 'Daily direct flights',
      image: 'https://i.pinimg.com/1200x/2a/0f/c5/2a0fc56c63ed836b7a4e2151179c2edf.jpg',
      avgTemp: '28°C',
      peakSeason: 'Nov - Mar',
    },
    {
      id: 3,
      name: 'Dubai',
      country: 'United Arab Emirates',
      subtext: 'Experience striking skylines, desert adventures, and seaside relaxation.',
      startingFare: '$580',
      flightTime: 'Multiple departures daily',
      image: 'https://res.cloudinary.com/akbfl7c0/image/upload/v1791002865/Dubai.jpg',
      avgTemp: '30°C',
      peakSeason: 'Nov - Mar',
    },
    {
      id: 4,
      name: 'Kuala Lumpur',
      country: 'Malaysia',
      subtext: 'Enjoy iconic landmarks and a city full of flavor.',
      startingFare: '$510',
      flightTime: 'Prime morning & evening slots',
      image: 'https://i.pinimg.com/1200x/a1/61/da/a161da30a1a5f1b22bd1cfb1a6292950.jpg',
      avgTemp: '28°C',
      peakSeason: 'May - Jul',
    },
    {
      id: 5,
      name: 'Singapore',
      country: 'Singapore',
      subtext: 'Discover futuristic gardens, stunning skylines, and vibrant street food.',
      startingFare: '$530',
      flightTime: 'Daily direct departures',
      image: 'https://i.pinimg.com/1200x/ff/92/62/ff926215a168ced36d421051754d7ba8.jpg',
      avgTemp: '27°C',
      peakSeason: 'Feb - Apr',
    },
  ];

  // Auto-advance for Section 2 destination carousel
  useEffect(() => {
    if (isDestCarouselHovered) return;
    const interval = setInterval(() => {
      setActiveDestIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isDestCarouselHovered, destinations.length]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = ['Home', 'Flights', 'Destinations', 'Offers', 'My Bookings', 'About'];

  const bottomTravelHighlights = [
    {
      id: 1,
      title: 'Real-time Fares',
      subtitle: 'Compare 500+ airlines',
      icon: <Plane className="w-5 h-5 text-white" />,
    },
    {
      id: 2,
      title: 'Zero Hidden Fees',
      subtitle: 'Transparent all-inclusive',
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
    },
    {
      id: 3,
      title: 'Smart Flexibility',
      subtitle: 'Easy date changes',
      icon: <Calendar className="w-5 h-5 text-white" />,
    },
    {
      id: 4,
      title: 'Curated Escapes',
      subtitle: 'Handpicked routes',
      icon: <Sparkles className="w-5 h-5 text-white" />,
    },
  ];

  // Scroll to section when nav clicked
  const handleNavClick = (item: string) => {
    setActiveNav(item);
    if (item === 'Destinations' && destinationsSectionRef.current) {
      destinationsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Offers' && offersSectionRef.current) {
      offersSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'My Bookings' && bookingsSectionRef.current) {
      bookingsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if ((item === 'About' || item === 'Contact' || item === 'About Us') && aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Flights' && offersSectionRef.current) {
      offersSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevDest = () => {
    setActiveDestIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const handleNextDest = () => {
    setActiveDestIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  const handlePillClick = (destName: string) => {
    setSelectedPill(destName);
    if (destName === 'All') {
      setActiveDestIndex(0);
    } else {
      const idx = destinations.findIndex((d) => d.name === destName);
      if (idx !== -1) {
        setActiveDestIndex(idx);
      }
    }
  };

  return (
    <div className="w-full bg-transparent text-white relative selection:bg-white selection:text-black font-['Oswald']">
      <ScrollAnimationBackground />

      {/* ALWAYS-ON-SCREEN PERSISTENT NAVIGATION PANEL (SHRINKS ON SCROLL, SHOWN IN EVERY SECTION) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 lg:px-16 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 sm:py-3 bg-neutral-950/85 backdrop-blur-2xl border-b border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
            : 'py-5 sm:py-6 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Left: Aerial Logo Text ONLY in Nevera font (Icon removed as requested) */}
        <div
          onClick={() => handleNavClick('Home')}
          className="flex items-center cursor-pointer group select-none shrink-0"
        >
          <svg 
            className="overflow-visible transition-all duration-300 group-hover:opacity-85 h-12 w-32 sm:w-40"
            fill="none"
          >
            <style>
              {`
                @font-face {
                  font-family: 'NeveraSVG';
                  src: url('/fonts/Nevera-Regular.otf') format('opentype');
                }
                .svg-nevera {
                  font-family: 'NeveraSVG', 'Nevera', sans-serif !important;
                }
              `}
            </style>
            <text
              x="0"
              y="50%"
              dominantBaseline="central"
              fontFamily="NeveraSVG, Nevera, sans-serif"
              fontWeight="bold"
              className={`svg-nevera tracking-wider uppercase transition-all duration-300 font-bold ${
                isScrolled ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
              }`}
            >
              <tspan className="logo-letter" style={{ animationDelay: '0s' }}>A</tspan>
              <tspan className="logo-letter" style={{ animationDelay: '0.15s' }}>E</tspan>
              <tspan className="logo-letter" style={{ animationDelay: '0.3s' }}>R</tspan>
              <tspan className="logo-letter" style={{ animationDelay: '0.45s' }}>I</tspan>
              <tspan className="logo-letter" style={{ animationDelay: '0.6s' }}>A</tspan>
              <tspan className="logo-letter" style={{ animationDelay: '0.75s' }}>L</tspan>
            </text>
          </svg>
        </div>

        {/* Center: Home · Flights · Destinations · Offers · My Bookings (Center-aligned & single line) */}
        <nav className="hidden lg:flex items-center justify-center flex-1 mx-6">
          <div className="flex items-center gap-4 text-white text-base tracking-wide font-normal whitespace-nowrap">
            {navItems.map((item, idx) => {
              const isActive = activeNav === item;
              return (
                <React.Fragment key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`relative py-1 cursor-pointer transition-all hover:text-white ${
                      isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white rounded-full" />
                    )}
                  </button>
                  {idx < navItems.length - 1 && (
                    <span className="text-white/40 text-sm select-none font-bold">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </nav>

        {/* Right: Log In · Sign Up OR Profile Icon with Dropdown after login */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {!isLoggedIn ? (
            <div className="flex items-center gap-2.5 text-white text-sm sm:text-base tracking-wide whitespace-nowrap">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 text-white hover:opacity-80 transition-opacity cursor-pointer font-normal"
              >
                Log In
              </button>
              <span className="text-white/40 text-sm select-none font-bold">·</span>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className={`bg-white text-black font-normal rounded-full hover:bg-neutral-200 transition-all cursor-pointer shadow-md active:scale-95 ${
                  isScrolled ? 'px-4 py-1.5 text-xs sm:text-sm' : 'px-5 py-2 text-sm sm:text-base'
                }`}
              >
                Sign Up
              </button>
            </div>
          ) : (
            /* After Login: Profile Icon with Dropdown */
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 hover:border-white hover:bg-white/20 transition-all cursor-pointer ${
                  isScrolled ? 'px-2.5 py-1' : 'px-3 py-1.5'
                }`}
              >
                <div className={`${isScrolled ? 'w-7 h-7 text-[11px]' : 'w-8 h-8 text-xs'} rounded-full bg-white text-black flex items-center justify-center font-bold uppercase transition-all`}>
                  {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AT'}
                </div>
                <span className="text-white text-sm font-normal hidden md:inline">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-4 h-4 text-white opacity-80" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-neutral-950/90 border border-white/25 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl animate-modal-card">
                  <div className="px-4 py-2 border-b border-white/15">
                    <p className="text-sm text-white font-medium">{currentUser.name}</p>
                    <p className="text-xs text-white/60">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-light uppercase tracking-wider">
                      Frequent Flyer Member
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveNav('My Bookings');
                        setIsProfileDropdownOpen(false);
                        bookingsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Ticket className="w-4 h-4 text-white" />
                      <span>My Bookings ({myBookings.length})</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveNav('Destinations');
                        setIsProfileDropdownOpen(false);
                        destinationsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-white" />
                      <span>Saved Flights</span>
                    </button>

                    <button
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-white" />
                      <span>Account Preferences</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-white/15">
                    <button
                      onClick={() => {
                        handleLogoutUser();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-white" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right: Premium Hamburger Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="p-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-all text-white cursor-pointer"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

      </header>

      {/* SECTION 1: HEADER BANNER (FIRST HERO FLOW) */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-[900px] lg:h-[920px] bg-transparent text-white relative flex flex-col justify-between overflow-hidden px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-6 sm:pb-7 border-b border-white/10"
      >

        {/* 2. MAIN HERO AREA (Headline & CTAs on top, Two Cards side-by-side below) */}
        <div className="w-full flex flex-col items-start justify-center flex-1 my-auto pt-2 sm:pt-4 pb-2">

          {/* Top Headline, Subtext, and CTA Buttons with subtle fade-in and slide-up */}
          <div className="w-full max-w-4xl flex flex-col items-start">
            {/* Travel Tag / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/30 bg-white/5 mb-3 backdrop-blur-sm"
            >
              <span className="text-white text-xs sm:text-sm font-light tracking-wider">
                + Seamless flight booking. Instant confirmation.
              </span>
            </motion.div>

            {/* Requested Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.05] font-medium tracking-tight text-white mb-2.5"
            >
              Your next journey starts with Aerial.
            </motion.h1>

            {/* Requested Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
              className="text-white text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed max-w-2xl mb-4 sm:mb-5 opacity-90"
            >
              Search flights, compare fares, and find a flight that fits your plans.
            </motion.p>

            {/* CTA Buttons in the first flow */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-5"
            >
              {/* Primary Search Flights CTA Button */}
              <button
                onClick={() => {
                  offersSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black font-normal text-base px-8 py-3 rounded-full flex items-center gap-3 hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-95 group"
              >
                <span>Search Flights</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Compare Fares CTA Button */}
              <button
                onClick={() => setIsSearchFlightModalOpen(true)}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 transition-all text-white cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <Luggage className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white text-base font-normal tracking-wide">
                  Compare Fares
                </span>
              </button>
            </motion.div>
          </div>

          {/* TWO CARDS IN THE DOWN: Left Side Card 1 & Right Side Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6 sm:mt-8"
          >
            
            {/* LEFT SIDE: CARD 1 - Your Next Adventure Awaits */}
            <div
              onClick={() => setIsSearchFlightModalOpen(true)}
              className="w-full rounded-2xl border border-white/20 hover:border-white/50 bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Left Circle Icon */}
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-white" />
              </div>

              {/* Center Content */}
              <div className="flex flex-col text-left flex-1 min-w-0">
                <h3 className="text-white font-medium text-base sm:text-lg tracking-wide leading-snug">
                  Your Next Adventure Awaits
                </h3>
                <p className="text-white/80 font-light text-xs sm:text-sm tracking-wide leading-relaxed mt-0.5">
                  Discover new destinations and find the perfect flight for your next escape.
                </p>
              </div>

              {/* Right Arrow Button */}
              <div className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors stroke-[2]" />
              </div>
            </div>

            {/* RIGHT SIDE: CARD 2 - Less Planning. More Exploring. */}
            <div
              onClick={() => setIsSearchFlightModalOpen(true)}
              className="w-full rounded-2xl border border-white/20 hover:border-white/50 bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Left Circle Icon */}
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Plane className="w-6 h-6 text-white" />
              </div>

              {/* Center Content */}
              <div className="flex flex-col text-left flex-1 min-w-0">
                <h3 className="text-white font-medium text-base sm:text-lg tracking-wide leading-snug">
                  Less Planning. More Exploring.
                </h3>
                <p className="text-white/80 font-light text-xs sm:text-sm tracking-wide leading-relaxed mt-0.5">
                  Compare fares, book your flight, and bring your travel plans to life with Aerial.
                </p>
              </div>

              {/* Right Arrow Button */}
              <div className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors stroke-[2]" />
              </div>
            </div>

          </motion.div>

        </div>

        {/* 3. BOTTOM TRAVEL DOCK & PAGINATION SLIDER */}
        <footer className="w-full pt-6 border-t border-white/15 shrink-0">
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* 4 Feature Items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 flex-1">
              {bottomTravelHighlights.map((item) => {
                const isSelected = activeSlide === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSlide(item.id)}
                    className={`flex items-center gap-3 cursor-pointer group transition-all p-2 rounded-xl ${
                      isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-white bg-white/20 scale-105'
                          : 'border-white/25 bg-white/10 group-hover:border-white/50'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-white font-normal text-sm sm:text-base tracking-wide leading-snug">
                        {item.title}
                      </span>
                      <span className="text-white/80 font-light text-xs sm:text-sm tracking-wide leading-tight mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Indicator */}
            <div className="flex items-center gap-4 self-end lg:self-center shrink-0">
              <span className="text-white text-xs sm:text-sm font-normal tracking-widest">
                0{activeSlide}
              </span>
              <div
                onClick={() => setActiveSlide((prev) => (prev % 4) + 1)}
                className="w-20 sm:w-28 h-[2px] bg-white/30 rounded-full relative cursor-pointer overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{
                    width: '33%',
                    transform: `translateX(${(activeSlide - 1) * 100}%)`,
                  }}
                />
              </div>
              <span className="text-white text-xs sm:text-sm font-normal tracking-widest">
                04
              </span>
            </div>

          </div>
        </footer>

      </motion.section>

      {/* SECTION 2: DESTINATION GALLERY & COVERFLOW CAROUSEL (STYLE MATCHING REFERENCE) */}
      <motion.section
        ref={destinationsSectionRef}
        id="destinations"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-transparent text-white relative py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

          {/* Eyebrow Tag matching reference */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/60 font-light mb-3 select-none"
          >
            GALLERY · FEATURED DESTINATIONS
          </motion.span>

          {/* Requested Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-4"
          >
            Where will you go next?
          </motion.h2>

          {/* Requested Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="text-white/80 max-w-2xl text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed mb-10"
          >
            From lively cities to peaceful seaside escapes, discover a destination for your next adventure.
          </motion.p>

          {/* Filter Pills matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14 sm:mb-16 max-w-4xl px-2"
          >
            {['All', 'Dhaka', 'Bangkok', 'Dubai', 'Kuala Lumpur', 'Singapore'].map((item) => {
              const isActive = selectedPill === item;
              return (
                <button
                  key={item}
                  onClick={() => handlePillClick(item)}
                  className={`px-5 sm:px-6 py-2 rounded-full text-sm sm:text-base font-normal tracking-wide transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-white text-black shadow-lg font-medium'
                      : 'border border-white/30 text-white hover:border-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              );
            })}

            {/* View More Button pill matching reference */}
            <button
              onClick={() => setIsSearchFlightModalOpen(true)}
              className="px-5 sm:px-6 py-2 rounded-full text-sm sm:text-base font-normal tracking-wide border border-white/40 text-white hover:border-white hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>View More</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>

          {/* 3D / COVERFLOW CAROUSEL CONTAINER (MATCHING REFERENCE FOREGROUND LAYOUT) */}
          <div 
            className="relative w-full max-w-6xl mx-auto h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center select-none"
          >
            {destinations.map((dest, index) => {
              // Calculate relative position to active index
              const count = destinations.length;
              let offset = (index - activeDestIndex) % count;
              if (offset < -Math.floor(count / 2)) offset += count;
              if (offset > Math.floor(count / 2)) offset -= count;

              const isCenter = offset === 0;
              const isLeft = offset === -1 || (offset < 0 && Math.abs(offset) === 1);
              const isRight = offset === 1 || (offset > 0 && Math.abs(offset) === 1);
              const isFar = Math.abs(offset) > 1;

              // Compute transforms for 3D layered coverflow layout exactly matching reference
              let transformStyles = '';
              let zIndex = 10;
              let opacity = 1;

              if (isCenter) {
                transformStyles = 'translate-x-0 scale-100 z-30 shadow-2xl';
                zIndex = 30;
                opacity = 1;
              } else if (isLeft) {
                transformStyles = '-translate-x-[62%] sm:-translate-x-[72%] md:-translate-x-[80%] scale-90 z-20 shadow-xl';
                zIndex = 20;
                opacity = 0.7;
              } else if (isRight) {
                transformStyles = 'translate-x-[62%] sm:translate-x-[72%] md:translate-x-[80%] scale-90 z-20 shadow-xl';
                zIndex = 20;
                opacity = 0.7;
              } else {
                transformStyles = offset < 0
                  ? '-translate-x-[115%] sm:-translate-x-[135%] md:-translate-x-[150%] scale-80 z-10'
                  : 'translate-x-[115%] sm:translate-x-[135%] md:translate-x-[150%] scale-80 z-10';
                zIndex = 10;
                opacity = isFar ? 0.45 : 0;
              }

              return (
                <div
                  key={dest.id}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveDestIndex(index);
                      setSelectedPill(dest.name);
                    } else {
                      setSelectedDestinationForModal(dest);
                    }
                  }}
                  onMouseEnter={() => setIsDestCarouselHovered(true)}
                  onMouseLeave={() => setIsDestCarouselHovered(false)}
                  className={`absolute top-0 transition-all duration-500 ease-out cursor-pointer rounded-3xl overflow-hidden border border-white/20 bg-neutral-950 group ${transformStyles}`}
                  style={{
                    width: 'min(90vw, 360px)',
                    height: '100%',
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                >
                  {/* Framer Motion subtle entrance animation for the selected card when scrolled into view */}
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="w-full h-full relative"
                  >
                    {/* Image Background */}
                    <img
                      src={dest.image}
                      alt={dest.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Scrim matching reference */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10" />

                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-left">
                      {/* Top destination badge */}
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-transparent/60 border border-white/25 backdrop-blur-md text-xs tracking-wider uppercase text-white font-normal">
                          {dest.country}
                        </span>

                        <div className="px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-xs text-white">
                          From {dest.startingFare}
                        </div>
                      </div>

                      {/* Bottom details with expanded hover state */}
                      <div className="relative overflow-hidden group-hover:bg-transparent">
                        <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-2 leading-none">
                          {dest.name}
                        </h3>

                        <p className="text-white/90 text-sm sm:text-base font-light tracking-wide line-clamp-3 mb-4 leading-relaxed group-hover:line-clamp-none transition-all duration-300">
                          {dest.subtext}
                        </p>
                        
                        {/* Expandable Travel Stats on Hover */}
                        <div className="grid grid-cols-2 gap-4 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mb-4 transition-all duration-500 overflow-hidden">
                          {dest.avgTemp && (
                            <div className="flex flex-col">
                              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-0.5">Avg Temp</span>
                              <span className="text-sm sm:text-base text-white">{dest.avgTemp}</span>
                            </div>
                          )}
                          {dest.peakSeason && (
                            <div className="flex flex-col">
                              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-0.5">Peak Season</span>
                              <span className="text-sm sm:text-base text-white">{dest.peakSeason}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDestinationForModal(dest);
                            }}
                            className="text-xs uppercase tracking-wider text-white hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Explore Flights</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {/* Circular video / action play button matching reference image */}
                          <div className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black border border-white/40 flex items-center justify-center transition-all cursor-pointer">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Circular Outline Arrows Matching Reference */}
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
            <button
              onClick={handlePrevDest}
              aria-label="Previous destination"
              className="w-12 h-12 rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90"
            >
              <ArrowLeft className="w-5 h-5 text-white stroke-[2]" />
            </button>

            <button
              onClick={handleNextDest}
              aria-label="Next destination"
              className="w-12 h-12 rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90"
            >
              <ArrowRight className="w-5 h-5 text-white stroke-[2]" />
            </button>
          </div>

        </div>
      </motion.section>

      {/* SECTION 3: FLIGHT OFFERS (MATCHING REFERENCE FOREGROUND LAYOUT, CARDS, ICONS, AND BUTTONS) */}
      <motion.section
        ref={offersSectionRef}
        id="offers"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-transparent text-white relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-white/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* LEFT COLUMN: Section Label, Heading, Subtext, Offer Categories, Button & Special Offers Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between">

              <div>
                {/* Section Label */}
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/60 font-light mb-3 select-none block">
                  Flight Offers
                </span>

                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4 leading-[1.08]">
                  New places. More possibilities.
                </h2>

                {/* Subtext */}
                <p className="text-white/80 max-w-xl text-base sm:text-lg font-light tracking-wide leading-relaxed mb-6">
                  Explore featured fares for your next getaway. Choose your dates to see current prices and availability.
                </p>

                {/* Offer Categories Tabs */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                  {['Weekend Getaways', 'International Adventures', 'Last-Minute Trips'].map((category, idx) => {
                    const isSelected = selectedOfferCategory === category;
                    return (
                      <React.Fragment key={category}>
                        <button
                          onClick={() => setSelectedOfferCategory(category)}
                          className={`text-sm sm:text-base font-normal tracking-wide transition-all cursor-pointer py-1 ${
                            isSelected
                              ? 'text-white border-b-2 border-white font-medium'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {category}
                        </button>
                        {idx < 2 && <span className="text-white/30 text-sm select-none font-bold">·</span>}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Button: View Flight Offers */}
                <div className="mb-10 sm:mb-12">
                  <button
                    onClick={() => setIsSearchFlightModalOpen(true)}
                    className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all cursor-pointer font-normal text-sm sm:text-base tracking-wide active:scale-95 group shadow-lg"
                  >
                    <span>View Flight Offers</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors stroke-[2]" />
                  </button>
                </div>
              </div>

              {/* Special Offers Cards Row (Matching Bottom-Left of Reference) */}
              <div className="w-full pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-white/80 font-normal">
                    Special Offers
                  </span>
                  <span className="text-xs text-white/50">
                    {selectedOfferCategory}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {specialOffersData[selectedOfferCategory]?.map((offer) => (
                    <div
                      key={offer.id}
                      onClick={() => {
                        setBookingDestCode(offer.code);
                        setBookingDestCity(offer.destination);
                        setIsSearchFlightModalOpen(true);
                      }}
                      className="rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-md p-3.5 flex flex-col justify-between hover:border-white/50 hover:bg-white/[0.1] transition-all cursor-pointer group shadow-xl"
                    >
                      <div className="flex gap-3 items-center mb-3">
                        <img
                          src={offer.image}
                          alt={offer.destination}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/15 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <h4 className="text-white font-medium text-sm sm:text-base truncate">
                            {offer.destination} ({offer.code})
                          </h4>
                          <p className="text-white/60 text-xs truncate">
                            {offer.origin}
                          </p>
                          <span className="text-xs text-white/40 block mt-0.5">
                            {offer.dates}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-lg font-medium text-white tracking-tight">
                          {offer.price}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingOriginInput(offer.origin);
                            setBookingDestInput(`${offer.destination} (${offer.code})`);
                            setBookingStep('confirm');
                            setBookingDuplicateError(null);
                            setIsSearchFlightModalOpen(true);
                          }}
                          className="px-3 py-1 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors uppercase tracking-wider cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Book a Flight Glassmorphic Card (Matching Reference Right Column) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-3xl border border-white/20 bg-white/[0.06] backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative">

                {/* Card Title */}
                <h3 className="text-2xl sm:text-3xl font-normal text-white mb-6 tracking-wide">
                  Book a Flight
                </h3>

                {/* Trip Type Selector (One-way, Round Trip, Multi City) */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {(['One-way', 'Round Trip', 'Multi City'] as const).map((type) => {
                    const isSelected = bookingTripType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setBookingTripType(type)}
                        className={`py-2 px-1 sm:px-2 text-center rounded-xl text-[11px] sm:text-xs md:text-sm font-normal tracking-wide transition-all cursor-pointer truncate ${
                          isSelected
                            ? 'bg-white text-black font-medium shadow-md'
                            : 'border border-white/25 text-white/80 hover:border-white hover:text-white bg-white/5'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

                {/* Route Segment: From airport -> Plane icon -> To airport with Glassmorphism Blurry Effect */}
                <div className="grid grid-cols-11 items-center gap-2 mb-6 p-4 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl shadow-lg relative">
                  {/* Origin */}
                  <div className="col-span-5 text-left relative">
                    <label className="text-[11px] uppercase tracking-wider text-white/50 block mb-0.5">
                      From (Departure)
                    </label>
                    <select
                      value={bookingOriginCode}
                      onChange={(e) => {
                        const loc = websiteLocations.find(l => l.code === e.target.value);
                        if (loc) {
                          setBookingOriginCode(loc.code);
                          setBookingOriginCity(loc.city);
                          setBookingOriginInput(loc.fullName);
                        }
                      }}
                      className="bg-transparent text-white font-medium text-base sm:text-lg tracking-tight focus:outline-none cursor-pointer w-full font-['Oswald'] truncate"
                    >
                      {websiteLocations.map((loc) => (
                        <option key={`s3-from-${loc.code}`} value={loc.code} className="bg-neutral-950 text-white text-sm">
                          {loc.city} ({loc.code})
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-white/70 block truncate mt-0.5 font-light">
                      {bookingOriginCity}
                    </span>
                  </div>

                  {/* Airplane Icon with Swap Capability */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        const tempCode = bookingOriginCode;
                        const tempCity = bookingOriginCity;
                        setBookingOriginCode(bookingDestCode);
                        setBookingOriginCity(bookingDestCity);
                        setBookingDestCode(tempCode);
                        setBookingDestCity(tempCity);
                        const locFrom = websiteLocations.find(l => l.code === bookingDestCode);
                        const locTo = websiteLocations.find(l => l.code === tempCode);
                        if (locFrom) setBookingOriginInput(locFrom.fullName);
                        if (locTo) setBookingDestInput(locTo.fullName);
                      }}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group shadow-sm"
                      title="Swap departure and destination"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5 text-white group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Destination */}
                  <div className="col-span-5 text-right relative">
                    <label className="text-[11px] uppercase tracking-wider text-white/50 block mb-0.5">
                      To (Destination)
                    </label>
                    <select
                      value={bookingDestCode}
                      onChange={(e) => {
                        const loc = websiteLocations.find(l => l.code === e.target.value);
                        if (loc) {
                          setBookingDestCode(loc.code);
                          setBookingDestCity(loc.city);
                          setBookingDestInput(loc.fullName);
                        }
                      }}
                      className="bg-transparent text-white font-medium text-base sm:text-lg tracking-tight focus:outline-none cursor-pointer w-full text-right font-['Oswald'] truncate"
                    >
                      {websiteLocations.map((loc) => (
                        <option key={`s3-to-${loc.code}`} value={loc.code} className="bg-neutral-950 text-white text-sm">
                          {loc.city} ({loc.code})
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-white/70 block truncate mt-0.5 font-light">
                      {bookingDestCity}
                    </span>
                  </div>
                </div>

                {/* Dates Segment: 2 Columns */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl border border-white/15 bg-white/5">
                  <div className="text-left border-r border-white/15 pr-3">
                    <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
                      From
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-normal text-white flex items-center gap-2 truncate">
                      <Calendar className="w-4 h-4 text-white/60 shrink-0" />
                      {bookingDepartDate}
                    </span>
                  </div>

                  <div className="text-left pl-1">
                    <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
                      To
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-normal text-white flex items-center gap-2 truncate">
                      <Calendar className="w-4 h-4 text-white/60 shrink-0" />
                      {bookingTripType === 'One-way' ? 'One-way flight' : bookingReturnDate}
                    </span>
                  </div>
                </div>

                {/* Class & Passengers Segment: 2 Columns */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl border border-white/15 bg-white/5">
                  <div className="text-left border-r border-white/15 pr-3">
                    <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
                      Class
                    </span>
                    <select
                      value={bookingCabinClass}
                      onChange={(e) => setBookingCabinClass(e.target.value)}
                      className="bg-transparent text-white text-sm sm:text-base font-normal focus:outline-none cursor-pointer w-full"
                    >
                      <option value="Economy" className="bg-neutral-900 text-white">Economy</option>
                      <option value="Premium Economy" className="bg-neutral-900 text-white">Premium</option>
                      <option value="Business" className="bg-neutral-900 text-white">Business</option>
                      <option value="First Class" className="bg-neutral-900 text-white">First Class</option>
                    </select>
                  </div>

                  <div className="text-left pl-1">
                    <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
                      Passengers
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm md:text-base font-normal text-white flex items-center gap-1.5 truncate">
                        <Users className="w-4 h-4 text-white/60 shrink-0" />
                        {bookingPassengers} {bookingPassengers === 1 ? 'Traveler' : 'Travelers'}
                      </span>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          onClick={() => setBookingPassengers((p) => Math.max(1, p - 1))}
                          className="w-6 h-6 rounded-full border border-white/30 text-white text-xs hover:bg-white/20 flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          onClick={() => setBookingPassengers((p) => Math.min(9, p + 1))}
                          className="w-6 h-6 rounded-full border border-white/30 text-white text-xs hover:bg-white/20 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: Check Availability */}
                <button
                  onClick={() => {
                    setBookingOriginInput(`${bookingOriginCity} (${bookingOriginCode})`);
                    setBookingDestInput(`${bookingDestCity} (${bookingDestCode})`);
                    setBookingDateInput('2026-05-28');
                    setBookingStep('search');
                    setBookingDuplicateError(null);
                    setIsSearchFlightModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-white text-black font-normal text-base hover:bg-neutral-200 transition-colors uppercase tracking-wider shadow-lg active:scale-95 cursor-pointer text-center"
                >
                  Check Availability
                </button>

              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* SECTION 4: MY BOOKINGS (PERSISTENT & CONNECTED TO REAL BOOKING FLOW) */}
      <motion.section
        ref={bookingsSectionRef}
        id="bookings"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-transparent text-white relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-white/10 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

          {/* Label matching reference header */}
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/60 font-light mb-2 block select-none">
            My Bookings
          </span>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-3">
            Your travel plans, all in one place.
          </h2>

          {/* Subtext */}
          <p className="text-white/80 max-w-xl text-base sm:text-lg font-light tracking-wide leading-relaxed mb-8 sm:mb-10">
            View your upcoming flights, check booking details, and access your itinerary.
          </p>

          {/* CONTENT: Real Bookings or Initial Empty State */}
          {myBookings.length > 0 ? (
            /* 2x2 Grid of real confirmed bookings */
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
              {myBookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBookingForItinerary(booking)}
                  className="rounded-2xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.09] hover:border-white/40 backdrop-blur-xl p-5 sm:p-6 transition-all flex items-center gap-5 sm:gap-6 shadow-xl group cursor-pointer relative"
                >
                  {/* Left: Circular Image Mask matching reference */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-white/25 group-hover:border-white transition-all shadow-lg">
                    <img
                      src={booking.image}
                      alt={booking.destination}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-white transition-colors truncate">
                          {booking.destination}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-normal uppercase tracking-wider flex items-center gap-1 shrink-0">
                          <CheckCircle className="w-3 h-3 text-white" />
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-white/50 font-light mb-1">
                        <span className="font-mono">Ref: {booking.reference}</span>
                        <span>·</span>
                        <span>{booking.date}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-white/90 font-normal truncate mb-1">
                        {booking.route}
                      </p>

                      <p className="text-xs text-white/60 font-light truncate mb-3">
                        {booking.passengers} · {booking.flight}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-white/50">
                        {booking.terminal} · {booking.gate}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBookingForItinerary(booking);
                        }}
                        className="text-xs sm:text-sm font-normal text-white hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>View Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State: initially shown when no bookings exist */
            <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-white/[0.05] backdrop-blur-xl p-10 sm:p-14 text-center mx-auto mb-10 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/25 flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-8 h-8 text-white stroke-[1.5]" />
              </div>
              <p className="text-white text-lg sm:text-xl font-light leading-relaxed max-w-md mx-auto mb-8">
                Your next adventure is waiting. Search for a flight to get started.
              </p>
              <button
                onClick={() => {
                  setBookingStep('search');
                  setBookingDuplicateError(null);
                  setIsSearchFlightModalOpen(true);
                }}
                className="px-8 py-3.5 rounded-full bg-white text-black font-normal text-base hover:bg-neutral-200 transition-all uppercase tracking-wider cursor-pointer shadow-lg active:scale-95"
              >
                Find a Flight
              </button>
            </div>
          )}

          {/* Action Buttons: View My Trips · Find a Flight when trips exist */}
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
                className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer font-normal text-sm sm:text-base tracking-wide active:scale-95 shadow-lg flex items-center gap-2.5"
              >
                <span>Find a Flight</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

        </div>
      </motion.section>

      {/* SECTION 5: ABOUT & CONTACT (MATCHING REFERENCE FOREGROUND LAYOUT & ORBITAL BUBBLE SHOWCASE) */}
      <motion.section
        ref={aboutSectionRef}
        id="about"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-transparent text-white relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-white/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* LEFT COLUMN: Headings, Texts, Subheading, and Action Buttons */}
            <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">

              {/* Tag / Pill matching reference (New · Travel Beyond Expectations) */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/25 bg-white/5 mb-6 backdrop-blur-sm">
                <span className="px-2 py-0.5 rounded-full bg-white text-black text-xs font-normal">
                  About
                </span>
                <span className="text-white text-xs sm:text-sm font-light tracking-wide">
                  Travel Beyond the Ordinary
                </span>
              </div>

              {/* Requested Heading */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-medium tracking-tight text-white mb-6 leading-[1.04]">
                Meet Aerial.
              </h2>

              {/* Requested Text */}
              <p className="text-white/80 text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed mb-8">
                Aerial brings flight search and booking together in a simple, easy-to-use experience—helping you spend less time planning and more time looking forward to your journey.
              </p>

              {/* Subtle divider */}
              <div className="w-full border-t border-white/15 my-4 max-w-xl" />

              {/* Requested Subheading */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mt-4 mb-3">
                Need a hand?
              </h3>

              {/* Requested Subheading Text */}
              <p className="text-white/80 text-base sm:text-lg font-light tracking-wide leading-relaxed mb-8 max-w-xl">
                Have a question about your booking or using Aerial? Get in touch with our team.
              </p>

              {/* Requested Buttons: Contact Us · Browse FAQs */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Contact Us Button matching reference arrow style */}
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-white text-black font-normal text-base px-8 py-3.5 rounded-full flex items-center gap-2.5 hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-95 group"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {/* Browse FAQs Button */}
                <button
                  onClick={() => setIsFaqModalOpen(true)}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 transition-all text-white font-normal text-base cursor-pointer shadow-md active:scale-95"
                >
                  <HelpCircle className="w-4 h-4 text-white/80" />
                  <span>Browse FAQs</span>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: ORBITAL DESTINATION BUBBLE CAROUSEL MATCHING REFERENCE */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative py-6">

              {/* Vertical bubble arc container */}
              <div className="relative flex flex-col items-end gap-3 sm:gap-4 w-full max-w-[420px]">
                {orbitalDestinations.map((dest, idx) => {
                  const isActive = activeBubbleIndex === idx;

                  // Horizontal indentation curve matching the arc in the reference image
                  let curveIndent = 'mr-0';
                  if (idx === 0 || idx === 4) {
                    curveIndent = 'mr-6 sm:mr-10';
                  } else if (idx === 1 || idx === 3) {
                    curveIndent = 'mr-2 sm:mr-4';
                  } else if (idx === 2) {
                    curveIndent = 'mr-0';
                  }

                  return (
                    <div
                      key={dest.id}
                      onClick={() => setActiveBubbleIndex(idx)}
                      className={`flex items-center gap-3 sm:gap-4 transition-all duration-300 cursor-pointer group ${curveIndent}`}
                    >
                      {/* Destination Label Left of bubble */}
                      <div className="text-right">
                        <p className={`font-normal tracking-wide transition-all ${
                          isActive
                            ? 'text-white text-base sm:text-lg italic font-medium'
                            : 'text-white/80 text-sm sm:text-base group-hover:text-white'
                        }`}>
                          {dest.title}
                        </p>
                        <p className="text-xs text-white/50 font-light">
                          {dest.location} · {dest.landmark}
                        </p>
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setBookingDestInput(dest.title);
                              setBookingStep('search');
                              setBookingDuplicateError(null);
                              setIsSearchFlightModalOpen(true);
                            }}
                            className="mt-1 text-[11px] text-white/80 hover:text-white hover:underline inline-flex items-center gap-1 cursor-pointer font-light transition-colors"
                          >
                            <span>Search flights</span>
                            <ArrowRight className="w-3 h-3 stroke-[2]" />
                          </button>
                        )}
                      </div>

                      {/* Circular Image Bubble matching reference */}
                      <div
                        className={`rounded-full overflow-hidden transition-all duration-500 shrink-0 relative ${
                          isActive
                            ? 'w-24 h-24 sm:w-28 sm:h-28 border-2 border-white ring-4 ring-white/20 shadow-2xl scale-105'
                            : 'w-16 h-16 sm:w-20 sm:h-20 border border-white/30 group-hover:border-white opacity-70 group-hover:opacity-100 shadow-md'
                        }`}
                      >
                        <img
                          src={dest.image}
                          alt={dest.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Vertical Pagination Dots on the right matching reference */}
              <div className="hidden sm:flex flex-col items-center gap-2.5 ml-6 pl-2 border-l border-white/10">
                {orbitalDestinations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveBubbleIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeBubbleIndex === idx
                        ? 'bg-white scale-125'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="w-full bg-transparent text-white py-12 px-6 sm:px-10 lg:px-16 border-t border-white/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('Home')}>
            <svg 
              ref={footerLogoRef}
              className="overflow-visible transition-all duration-300 group-hover:opacity-85 h-8 w-24"
              fill="none"
            >
              <style>
                {`
                  @font-face {
                    font-family: 'NeveraSVG';
                    src: url('/fonts/Nevera-Regular.otf') format('opentype');
                  }
                  .svg-nevera {
                    font-family: 'NeveraSVG', 'Nevera', sans-serif !important;
                  }
                `}
              </style>
              <text
                x="0"
                y="50%"
                dominantBaseline="central"
                fontFamily="NeveraSVG, Nevera, sans-serif"
                fontWeight="bold"
                className="svg-nevera tracking-wider uppercase transition-all duration-300 font-bold text-2xl"
              >
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0s', opacity: isFooterLogoVisible ? 1 : 0 }}>A</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.15s', opacity: isFooterLogoVisible ? 1 : 0 }}>E</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.3s', opacity: isFooterLogoVisible ? 1 : 0 }}>R</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.45s', opacity: isFooterLogoVisible ? 1 : 0 }}>I</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.6s', opacity: isFooterLogoVisible ? 1 : 0 }}>A</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.75s', opacity: isFooterLogoVisible ? 1 : 0 }}>L</tspan>
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/70">
            {['Home', 'Flights', 'Destinations', 'Offers', 'My Bookings', 'About Us', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link}
              </button>
            ))}
          </div>

          <p className="text-xs text-white/50 text-center sm:text-right font-light">
            © 2026 Aerial Airlines Inc. All rights reserved.
          </p>
        </div>
      </footer>

      {/* MOBILE HAMBURGER MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-transparent/95 backdrop-blur-xl flex flex-col justify-between p-6">
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <div className="flex items-center">
              <span className="font-nevera text-2xl tracking-wider uppercase text-white">
                Aerial
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:opacity-70 cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6 my-auto py-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  handleNavClick(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-2xl text-left font-normal tracking-wide transition-colors ${
                  activeNav === item ? 'text-white underline underline-offset-8' : 'text-white/70'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Auth actions */}
          <div className="border-t border-white/20 pt-6">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3 rounded-full border border-white/40 text-white font-normal text-base hover:bg-white/10"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-white text-black font-normal text-base hover:bg-neutral-200"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AT'}
                  </div>
                  <div>
                    <p className="text-white font-medium">{currentUser.name}</p>
                    <p className="text-xs text-white/60">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogoutUser();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-full border border-white/30 text-xs text-white"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LOGIN / SIGN UP MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-transparent/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-transparent border border-white/30 rounded-2xl p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:opacity-70 p-1 cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-1 rounded-full bg-white/10 border border-white/20">
                <PlushyAirplaneLogo className="w-6 h-6" />
              </div>
              <span className="text-2xl font-medium uppercase text-white tracking-wider">
                Aerial
              </span>
            </div>

            <h3 className="text-2xl font-normal text-white mb-2 tracking-wide">
              {authMode === 'login' ? 'Welcome Back to Aerial' : 'Join Aerial Today'}
            </h3>
            <p className="text-white/70 font-light text-sm mb-6">
              {authMode === 'login'
                ? 'Sign in to access your booked flights, preferences, and special fares.'
                : 'Create an account to compare fares, track flights, and unlock member discounts.'}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLoginUser(authNameInput, authEmailInput);
                setIsAuthModalOpen(false);
              }}
              className="space-y-4"
            >
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authNameInput}
                    onChange={(e) => setAuthNameInput(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white font-['Oswald']"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white font-['Oswald']"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  defaultValue="aerialjourney2026"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white font-['Oswald']"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-full bg-white text-black font-normal text-base hover:bg-neutral-200 transition-colors shadow-md cursor-pointer uppercase tracking-wider"
              >
                {authMode === 'login' ? 'Log In to Aerial' : 'Create Free Account'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/70">
              {authMode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-white underline hover:opacity-80 font-normal cursor-pointer"
                  >
                    Sign Up
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-white underline hover:opacity-80 font-normal cursor-pointer"
                  >
                    Log In
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLIGHT SEARCH & BOOKING ENGINE MODAL (PREMIUM 2-SIDED COMPACT GLASSMORPHISM) */}
      {isSearchFlightModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-modal-backdrop transition-all">
          <div className="w-full max-w-5xl bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl p-5 sm:p-7 relative shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] max-h-[92vh] overflow-y-auto animate-modal-card">
            
            {/* Header: Brand & Step Breadcrumbs & Close */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10 relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-white/10 border border-white/20 shadow-inner flex items-center justify-center">
                  <PlushyAirplaneLogo className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-medium tracking-wider text-white uppercase font-['Oswald']">
                      Aerial Booking Engine
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] tracking-wider uppercase font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-emerald"></span>
                      Live Fares
                    </span>
                  </div>
                  <p className="text-xs text-white/50 font-light mt-0.5">
                    Premium global flight network & instant reservation
                  </p>
                </div>
              </div>

              {/* Step indicator breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-light tracking-wider mr-10 sm:mr-12">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  bookingStep === 'search'
                    ? 'bg-white text-black font-normal border-white shadow-sm'
                    : 'bg-white/5 text-white/60 border-white/15'
                }`}>
                  <span className="font-mono text-[10px]">01</span>
                  <span>Flights</span>
                </div>
                <span className="text-white/30">→</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
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
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSearchFlightModalOpen(false);
                  setBookingStep('search');
                  setBookingDuplicateError(null);
                }}
                className="absolute top-0 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md"
                aria-label="Close booking engine"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* STEP 1: SEARCH & FARE SELECTION (BEAUTIFULLY DISTRIBUTED IN TWO SIDES) */}
            {bookingStep === 'search' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                
                {/* LEFT SIDE: SEARCH & ROUTE CONTROLS (col-span-12 lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-3.5">
                  {/* Trip Type Tabs */}
                  <div className="flex items-center p-1 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl">
                    {(['Round Trip', 'One-way'] as const).map((type) => {
                      const active = modalTripType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setModalTripType(type)}
                          className={`flex-1 py-1.5 text-xs font-normal uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                            active
                              ? 'bg-white text-black shadow-md font-medium'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>

                  {/* Route Card: Origin & Destination with interactive swap button */}
                  <div className="p-4 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-2xl shadow-xl relative space-y-3">
                    
                    {/* Departure Origin */}
                    <div className="text-left">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/50 font-light flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-white/50" />
                          <span>Origin (From)</span>
                        </label>
                        <span className="text-xs font-mono font-bold text-white/80 px-2 py-0.5 rounded bg-white/10 border border-white/15">
                          {bookingOriginInput.match(/\(([A-Z]{3})\)/)?.[1] || 'SFO'}
                        </span>
                      </div>
                      <select
                        value={bookingOriginInput}
                        onChange={(e) => {
                          setBookingOriginInput(e.target.value);
                          const loc = websiteLocations.find(l => l.fullName === e.target.value);
                          if (loc) {
                            setBookingOriginCode(loc.code);
                            setBookingOriginCity(loc.city);
                          }
                        }}
                        className="w-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 focus:border-white rounded-xl px-3 py-2 text-white text-sm sm:text-base font-medium focus:outline-none backdrop-blur-md transition-all cursor-pointer font-['Oswald']"
                      >
                        {websiteLocations.map((loc) => (
                          <option key={`modal-from-${loc.code}`} value={loc.fullName} className="bg-neutral-950 text-white py-1">
                            {loc.city} ({loc.code}) · {loc.country}
                          </option>
                        ))}
                      </select>
                      <span className="text-[11px] text-white/45 block mt-1 font-light truncate">
                        {websiteLocations.find(l => l.fullName === bookingOriginInput)?.airport || 'Airport Terminal'}
                      </span>
                    </div>

                    {/* Swap Route Button */}
                    <div className="relative flex items-center justify-center my-1">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const tempOrigin = bookingOriginInput;
                          const tempDest = bookingDestInput;
                          setBookingOriginInput(tempDest);
                          setBookingDestInput(tempOrigin);
                          const locOrigin = websiteLocations.find(l => l.fullName === tempDest);
                          const locDest = websiteLocations.find(l => l.fullName === tempOrigin);
                          if (locOrigin) {
                            setBookingOriginCode(locOrigin.code);
                            setBookingOriginCity(locOrigin.city);
                          }
                          if (locDest) {
                            setBookingDestCode(locDest.code);
                            setBookingDestCity(locDest.city);
                          }
                        }}
                        className="relative z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/30 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-md group"
                        title="Swap Route"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5 text-white group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                    </div>

                    {/* Arrival Destination */}
                    <div className="text-left">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/50 font-light flex items-center gap-1.5">
                          <Plane className="w-3 h-3 text-white/50" />
                          <span>Destination (To)</span>
                        </label>
                        <span className="text-xs font-mono font-bold text-white/80 px-2 py-0.5 rounded bg-white/10 border border-white/15">
                          {bookingDestInput.match(/\(([A-Z]{3})\)/)?.[1] || 'NRT'}
                        </span>
                      </div>
                      <select
                        value={bookingDestInput}
                        onChange={(e) => {
                          setBookingDestInput(e.target.value);
                          const loc = websiteLocations.find(l => l.fullName === e.target.value);
                          if (loc) {
                            setBookingDestCode(loc.code);
                            setBookingDestCity(loc.city);
                          }
                        }}
                        className="w-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 focus:border-white rounded-xl px-3 py-2 text-white text-sm sm:text-base font-medium focus:outline-none backdrop-blur-md transition-all cursor-pointer font-['Oswald']"
                      >
                        {websiteLocations.map((loc) => (
                          <option key={`modal-to-${loc.code}`} value={loc.fullName} className="bg-neutral-950 text-white py-1">
                            {loc.city} ({loc.code}) · {loc.country}
                          </option>
                        ))}
                      </select>
                      <span className="text-[11px] text-white/45 block mt-1 font-light truncate">
                        {websiteLocations.find(l => l.fullName === bookingDestInput)?.airport || 'Airport Terminal'}
                      </span>
                    </div>

                  </div>

                  {/* Date & Travelers Row */}
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
                    )}

                    <div className="p-3 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl">
                      <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1 font-light flex items-center gap-1">
                        <Users className="w-3 h-3 text-white/50" />
                        <span>Travelers</span>
                      </label>
                      <select
                        value={bookingPassengerSelect}
                        onChange={(e) => setBookingPassengerSelect(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-2.5 py-1.5 text-white text-xs sm:text-sm focus:outline-none focus:border-white font-['Oswald'] backdrop-blur-md cursor-pointer"
                      >
                        <option className="bg-neutral-950 text-white">1 Adult, Economy</option>
                        <option className="bg-neutral-950 text-white">2 Adults, Economy</option>
                        <option className="bg-neutral-950 text-white">1 Adult, Business</option>
                        <option className="bg-neutral-950 text-white">2 Adults, Business</option>
                        <option className="bg-neutral-950 text-white">1 Adult, First</option>
                        <option className="bg-neutral-950 text-white">Family (2A + 2C)</option>
                      </select>
                    </div>
                  </div>

                  {/* Popular Hubs Quick Chips */}
                  <div className="p-3 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-xl">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-2 font-light">
                      Popular Hubs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {websiteLocations.slice(0, 8).map((loc) => {
                        const isSelected = bookingDestInput.includes(loc.code);
                        return (
                          <button
                            key={`chip-${loc.code}`}
                            type="button"
                            onClick={() => {
                              setBookingDestInput(loc.fullName);
                              setBookingDestCode(loc.code);
                              setBookingDestCity(loc.city);
                            }}
                            className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-white text-black font-medium border-white shadow-sm'
                                : 'bg-white/[0.06] hover:bg-white/15 border-white/15 text-white/80 hover:text-white'
                            }`}
                          >
                            {loc.city} <span className="opacity-60 text-[10px]">({loc.code})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compact Perks Badges */}
                  <div className="flex items-center justify-between text-[11px] text-white/60 px-1 font-light">
                    <span>✓ No Booking Fees</span>
                    <span>✓ 24h Free Cancel</span>
                    <span>✓ Star Alliance</span>
                  </div>

                </div>

                {/* RIGHT SIDE: AVAILABLE FLIGHTS & LIVE FARE SELECTION (col-span-12 lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-3">
                  
                  {/* Flight Section Header */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-white/70 font-light">
                        Select Aerial Flight
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-mono border border-white/15">
                        {bookingOriginInput.match(/\(([A-Z]{3})\)/)?.[1] || 'SFO'} → {bookingDestInput.match(/\(([A-Z]{3})\)/)?.[1] || 'NRT'}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/50 font-light">
                      3 Available Fares
                    </span>
                  </div>

                  {/* Flight Options Cards */}
                  <div className="space-y-2.5">
                    {bookingEngineFlights.map((flight, idx) => {
                      const isSelected = selectedFlightIndex === idx;
                      return (
                        <div
                          key={flight.flightNumber}
                          onClick={() => setSelectedFlightIndex(idx)}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative backdrop-blur-xl group ${
                            isSelected
                              ? 'bg-white/[0.12] border-white/60 shadow-[0_8px_30px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)] scale-[1.01]'
                              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/15 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white font-mono text-xs font-medium border border-white/20">
                                {flight.flightNumber}
                              </span>
                              <span className="text-xs text-white/60">· {flight.aircraft}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${
                                flight.badge === 'Best Value'
                                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                                  : flight.badge === 'Fastest'
                                  ? 'bg-cyan-400/20 text-cyan-200 border border-cyan-400/30'
                                  : 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30'
                              }`}>
                                {flight.badge}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                                {flight.fare}
                              </span>
                              <span className="text-[10px] text-white/50 block font-light">Taxes incl.</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-11 items-center gap-2 pt-2 border-t border-white/10 text-xs sm:text-sm">
                            <div className="col-span-4 text-left">
                              <span className="font-medium text-white block text-sm sm:text-base">{flight.departTime}</span>
                              <span className="text-[11px] text-white/50 font-light truncate block">
                                {bookingOriginInput.split('(')[0].trim()}
                              </span>
                            </div>

                            <div className="col-span-3 text-center flex flex-col items-center">
                              <span className="text-[10px] text-white/60 font-light">{flight.duration}</span>
                              <div className="w-full flex items-center justify-center gap-1 my-0.5">
                                <div className="h-[1px] w-6 bg-white/30"></div>
                                <Plane className="w-3 h-3 text-white/70 rotate-90" />
                                <div className="h-[1px] w-6 bg-white/30"></div>
                              </div>
                              <span className="text-[10px] text-emerald-300 font-light">{flight.stops}</span>
                            </div>

                            <div className="col-span-4 text-right">
                              <span className="font-medium text-white block text-sm sm:text-base">{flight.arriveTime}</span>
                              <span className="text-[11px] text-white/50 font-light truncate block">
                                {bookingDestInput.split('(')[0].trim()}
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Flight Inclusions & Perks Summary */}
                  <div className="p-3.5 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-white block">
                        Included with {bookingEngineFlights[selectedFlightIndex].flightNumber}:
                      </span>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/70 font-light">
                        <span>• 2x 23kg Checked Bags</span>
                        <span>• High-Speed Wi-Fi</span>
                        <span>• In-Seat Power & USB-C</span>
                        <span>• Complimentary Dining</span>
                      </div>
                    </div>

                    <div className="text-right sm:shrink-0">
                      <span className="text-[11px] text-white/50 block font-light">Total for 1 Traveler</span>
                      <span className="text-xl font-medium text-white">
                        {bookingEngineFlights[selectedFlightIndex].fare}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA Button */}
                  <div className="pt-2">
                    <button
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
                      <span>Continue to Seats</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* STEP 2: REVIEW & CONFIRM BOOKING (BEAUTIFULLY DISTRIBUTED IN TWO SIDES) */}
            {bookingStep === 'confirm' && (
              <div className="space-y-5">
                {/* Duplicate booking error alert if detected */}
                {bookingDuplicateError && (
                  <div className="p-3.5 rounded-2xl border border-red-500/40 bg-red-500/15 text-white animate-modal-card">
                    <p className="text-xs font-medium text-red-200 mb-0.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      Duplicate Booking Alert
                    </p>
                    <p className="text-xs text-red-300 font-light">
                      {bookingDuplicateError}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                  
                  {/* LEFT SIDE: Flight Itinerary Boarding Summary (col-span-12 lg:col-span-6) */}
                  <div className="lg:col-span-6 p-5 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-2xl shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-white/50 block">Flight Itinerary</span>
                        <span className="text-base sm:text-lg font-medium text-white">
                          {bookingOriginInput.split('(')[0].trim()} → {bookingDestInput.split('(')[0].trim()}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-mono">
                        {bookingEngineFlights[selectedFlightIndex].flightNumber}
                      </span>
                    </div>

                    {/* Flight Visual Path */}
                    <div className="grid grid-cols-11 items-center gap-2 py-2">
                      <div className="col-span-4">
                        <span className="text-2xl sm:text-3xl font-bold font-mono text-white block">
                          {bookingOriginInput.match(/\(([A-Z]{3})\)/)?.[1] || 'SFO'}
                        </span>
                        <span className="text-xs text-white/60 font-light truncate block">
                          {websiteLocations.find(l => l.fullName === bookingOriginInput)?.city || 'Origin'}
                        </span>
                        <span className="text-xs font-medium text-white mt-1 block">
                          {bookingEngineFlights[selectedFlightIndex].departTime}
                        </span>
                      </div>

                      <div className="col-span-3 text-center flex flex-col items-center">
                        <span className="text-[10px] text-white/50">{bookingEngineFlights[selectedFlightIndex].duration}</span>
                        <div className="w-full flex items-center justify-center gap-1 my-1">
                          <div className="h-[1px] w-5 bg-white/30"></div>
                          <Plane className="w-3.5 h-3.5 text-white/80 rotate-90" />
                          <div className="h-[1px] w-5 bg-white/30"></div>
                        </div>
                        <span className="text-[10px] text-emerald-300">Non-Stop</span>
                      </div>

                      <div className="col-span-4 text-right">
                        <span className="text-2xl sm:text-3xl font-bold font-mono text-white block">
                          {bookingDestInput.match(/\(([A-Z]{3})\)/)?.[1] || 'NRT'}
                        </span>
                        <span className="text-xs text-white/60 font-light truncate block">
                          {websiteLocations.find(l => l.fullName === bookingDestInput)?.city || 'Destination'}
                        </span>
                        <span className="text-xs font-medium text-white mt-1 block">
                          {bookingEngineFlights[selectedFlightIndex].arriveTime}
                        </span>
                      </div>
                    </div>

                    {/* Flight Details Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-xs">
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-[10px] text-white/50 block">Departure</span>
                        <span className="font-medium text-white truncate block">{bookingDateInput}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-[10px] text-white/50 block">Seat</span>
                        <span className="font-medium text-white truncate block">14K (Window)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-[10px] text-white/50 block">Aircraft</span>
                        <span className="font-medium text-white truncate block">{bookingEngineFlights[selectedFlightIndex].aircraft}</span>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT SIDE: Passenger & Fare Breakdown (col-span-12 lg:col-span-6) */}
                  <div className="lg:col-span-6 p-5 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-2xl shadow-xl space-y-4">
                    
                    {/* Passenger Verification */}
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-2 font-light">
                        Passenger & Contact Information
                      </span>
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-white/60">Lead Passenger:</span>
                          <span className="font-medium text-white">{currentUser.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60">E-Ticket Delivery:</span>
                          <span className="font-medium text-white truncate max-w-[200px]">{currentUser.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60">Travelers & Cabin:</span>
                          <span className="font-medium text-white">{bookingPassengerSelect}</span>
                        </div>
                      </div>
                    </div>

                    {/* Fare Summary Breakdown */}
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-2 font-light">
                        Price Breakdown
                      </span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-white/70">
                          <span>Base Fare (1 Passenger):</span>
                          <span>${bookingEngineFlights[selectedFlightIndex].numericFare - 90}</span>
                        </div>
                        <div className="flex items-center justify-between text-white/70">
                          <span>Taxes & Airport Security Fees:</span>
                          <span>$90</span>
                        </div>
                        <div className="flex items-center justify-between text-white/70">
                          <span>Booking & Card Fees:</span>
                          <span className="text-emerald-300">$0 (Free)</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-base font-medium text-white">
                          <span>Total Amount:</span>
                          <span className="text-xl font-bold">{bookingEngineFlights[selectedFlightIndex].fare}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('seats');
                          setBookingDuplicateError(null);
                        }}
                        className="flex-1 py-3 rounded-full border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep('payment');
                        }}
                        className="flex-2 py-3 rounded-full bg-white text-black font-normal text-xs sm:text-sm hover:bg-neutral-200 transition-all uppercase tracking-wider shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}

            
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
                          setBookingStep('search');
                        }}
                        className="flex-1 py-3.5 rounded-xl border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={bookingSelectedSeats.length !== (parseInt(bookingPassengerSelect.split(' ')[0]) || 1)}
                        onClick={() => {
                          setBookingStep('confirm');
                        }}
                        className="flex-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(16,185,129,0.25)] flex justify-center items-center gap-2 group cursor-pointer"
                      >
                        <span>Continue to Review</span>
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
            
            
            {/* STEP 4: PAYMENT (DEMO) */}
            {bookingStep === 'payment' && (
              <div className="w-full flex flex-col h-full animate-fade-in text-white pt-2 max-w-2xl mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                  
                  <h3 className="text-2xl font-medium tracking-tight mb-2 relative z-10">Complete Payment</h3>
                  <p className="text-white/60 text-sm font-light mb-6 relative z-10">Choose your payment method to finalize the reservation.</p>
                  
                  {/* Payment Methods */}
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

            {/* STEP 5: SUCCESS CONFIRMATION & BOARDING PASS */}
            {bookingStep === 'success' && confirmedBookingResult && (
              <div className="py-4 text-center animate-modal-card">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-1">
                  Flight Confirmed!
                </h3>
                <p className="text-white/60 text-xs sm:text-sm font-light mb-5">
                  Your ticket has been generated and added to your My Bookings section.
                </p>

                {/* Digital Boarding Pass Ticket with Glassmorphism */}
                <div className="max-w-lg mx-auto rounded-3xl border border-white/25 bg-white/[0.08] backdrop-blur-2xl p-5 text-left mb-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-white to-cyan-400"></div>
                  
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <PlushyAirplaneLogo className="w-5 h-5 text-white" />
                      <span className="text-sm font-bold tracking-wider text-white uppercase font-['Oswald']">
                        Aerial Boarding Pass
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold px-2.5 py-0.5 rounded bg-white/20 text-white border border-white/30">
                      {confirmedBookingResult.reference}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-b border-white/10 text-xs">
                    <div>
                      <span className="text-[10px] text-white/50 uppercase block">Route</span>
                      <span className="font-medium text-white text-sm block">{confirmedBookingResult.route}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/50 uppercase block">Flight & Seat</span>
                      <span className="font-medium text-white text-sm block">{confirmedBookingResult.flightNumber} · Seat {confirmedBookingResult.seat}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 uppercase block">Departure Date</span>
                      <span className="font-medium text-white block">{confirmedBookingResult.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/50 uppercase block">Status</span>
                      <span className="text-emerald-400 font-medium flex items-center justify-end gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        Confirmed
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-white/50 uppercase block">Passenger</span>
                      <span className="font-medium text-white">{currentUser.name}</span>
                    </div>
                    <div className="font-mono tracking-widest text-white/30 text-[10px]">
                      ||| | |||| | ||||| || |||
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSearchFlightModalOpen(false);
                      setBookingStep('search');
                      setBookingDuplicateError(null);
                      bookingsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-normal text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>View in My Bookings</span>
                    <Ticket className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setIsSearchFlightModalOpen(false);
                      setBookingStep('search');
                      setBookingDuplicateError(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/30 text-white font-normal text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* DESTINATION QUICK DETAIL & BOOKING MODAL */}
      {selectedDestinationForModal && (
        <div className="fixed inset-0 z-50 bg-transparent/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-transparent border border-white/30 rounded-2xl overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setSelectedDestinationForModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-transparent/70 border border-white/30 text-white hover:bg-transparent flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="relative h-64 w-full">
              <img
                src={selectedDestinationForModal.image}
                alt={selectedDestinationForModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-xs uppercase tracking-widest text-white/70 block mb-1">
                  {selectedDestinationForModal.country}
                </span>
                <h3 className="text-4xl font-medium text-white">
                  {selectedDestinationForModal.name}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-white/90 text-base font-light mb-6 leading-relaxed">
                {selectedDestinationForModal.subtext}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-white/20 bg-white/5 mb-6 text-sm">
                <div>
                  <span className="text-xs text-white/60 block uppercase tracking-wider">
                    Starting Fare
                  </span>
                  <span className="text-xl font-medium text-white">
                    {selectedDestinationForModal.startingFare}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-white/60 block uppercase tracking-wider">
                    Availability
                  </span>
                  <span className="text-sm font-light text-white">
                    {selectedDestinationForModal.flightTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setBookingDestInput(`${selectedDestinationForModal.name}`);
                    setSelectedDestinationForModal(null);
                    setBookingStep('search');
                    setBookingDuplicateError(null);
                    setIsSearchFlightModalOpen(true);
                  }}
                  className="flex-1 py-3 rounded-full bg-white text-black font-normal text-base hover:bg-neutral-200 transition-colors uppercase tracking-wider text-center cursor-pointer"
                >
                  Book Flight to {selectedDestinationForModal.name}
                </button>
                <button
                  onClick={() => setSelectedDestinationForModal(null)}
                  className="px-6 py-3 rounded-full border border-white/30 text-white font-normal text-base hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ITINERARY & BOARDING PASS MODAL FOR MY BOOKINGS */}
      {selectedBookingForItinerary && (
        <div className="fixed inset-0 z-50 bg-transparent/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-transparent border border-white/30 rounded-3xl p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedBookingForItinerary(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-full bg-white/10 border border-white/20">
                  <PlushyAirplaneLogo className="w-6 h-6" />
                </div>
                <span className="text-xl font-medium tracking-wider uppercase text-white">
                  Aerial Itinerary
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs uppercase tracking-wider font-mono">
                {selectedBookingForItinerary.reference}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
                <img
                  src={selectedBookingForItinerary.image}
                  alt={selectedBookingForItinerary.destination}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-white">
                  {selectedBookingForItinerary.destination}
                </h3>
                <p className="text-sm text-white/70 font-light">
                  {selectedBookingForItinerary.route}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] uppercase tracking-wider">
                  {selectedBookingForItinerary.passengers} · {selectedBookingForItinerary.status}
                </span>
              </div>
            </div>

            {/* Flight Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border border-white/20 bg-white/5 mb-6 text-center text-xs">
              <div className="border-r border-white/10 pr-2">
                <span className="text-white/50 uppercase block mb-1">Date</span>
                <span className="text-white font-medium">{selectedBookingForItinerary.date}</span>
              </div>
              <div className="border-r border-white/10 pr-2">
                <span className="text-white/50 uppercase block mb-1">Time</span>
                <span className="text-white font-medium">{selectedBookingForItinerary.time}</span>
              </div>
              <div className="border-r border-white/10 pr-2">
                <span className="text-white/50 uppercase block mb-1">Terminal</span>
                <span className="text-white font-medium">{selectedBookingForItinerary.terminal}</span>
              </div>
              <div>
                <span className="text-white/50 uppercase block mb-1">Seat</span>
                <span className="text-white font-medium">{selectedBookingForItinerary.seat}</span>
              </div>
            </div>

            {/* Boarding Simulation Barcode */}
            <div className="p-4 rounded-2xl border border-white/15 bg-white/[0.04] mb-6 flex flex-col items-center">
              <div className="w-full h-10 flex items-center justify-between px-4 opacity-75">
                {[4, 2, 6, 1, 3, 5, 2, 4, 1, 6, 3, 2, 5, 1, 4, 2, 6, 3, 1, 5, 2, 4, 6].map((w, i) => (
                  <div key={i} className="bg-white h-full" style={{ width: `${w * 2}px` }} />
                ))}
              </div>
              <span className="text-[11px] text-white/50 uppercase tracking-widest mt-2 font-mono">
                BOARDING PASS · {selectedBookingForItinerary.reference} · AR-CONFIRMED
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedBookingForItinerary(null)}
                className="flex-1 py-3 rounded-full bg-white text-black font-normal text-sm hover:bg-neutral-200 transition-colors uppercase tracking-wider text-center cursor-pointer"
              >
                Done
              </button>
              <button
                onClick={() => {
                  handleCancelBooking(selectedBookingForItinerary.id);
                }}
                className="px-6 py-3 rounded-full border border-red-500/40 text-red-300 font-normal text-sm hover:bg-red-500/10 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT US MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-transparent/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-transparent border border-white/30 rounded-3xl p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => {
                setIsContactModalOpen(false);
                setContactSubmitted(false);
              }}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-full bg-white/10 border border-white/20">
                <PlushyAirplaneLogo className="w-6 h-6" />
              </div>
              <span className="text-xl font-medium tracking-wider uppercase text-white">
                Aerial Support
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-normal text-white mb-2 tracking-wide">
              Get in touch with our team
            </h3>
            <p className="text-white/70 text-sm font-light mb-6">
              Have a question about your booking or using Aerial? We typically respond in under 15 minutes.
            </p>

            {!contactSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Taylor"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white font-['Oswald']"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex.taylor@example.com"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white font-['Oswald']"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    defaultValue="Booking Support & Changes"
                    className="w-full bg-neutral-900 border border-white/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white font-['Oswald']"
                  >
                    <option>Booking Support & Changes</option>
                    <option>Fare Inquiry & Offers</option>
                    <option>Baggage & Seat Selection</option>
                    <option>Refund & Cancellation</option>
                    <option>Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us how we can help your journey..."
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white font-['Oswald'] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white text-black font-normal text-base hover:bg-neutral-200 transition-colors uppercase tracking-wider shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-medium text-white mb-2">
                  Message Sent Successfully
                </h4>
                <p className="text-white/70 text-sm max-w-sm mx-auto mb-6">
                  Thank you! An Aerial customer journey specialist has received your message and will email you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsContactModalOpen(false);
                    setContactSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-sm uppercase tracking-wider hover:bg-neutral-200"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BROWSE FAQS MODAL */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-transparent/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-transparent border border-white/30 rounded-3xl p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFaqModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-full bg-white/10 border border-white/20">
                <PlushyAirplaneLogo className="w-6 h-6" />
              </div>
              <span className="text-xl font-medium tracking-wider uppercase text-white">
                Aerial Knowledge Base
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-normal text-white mb-2 tracking-wide">
              Frequently Asked Questions
            </h3>
            <p className="text-white/70 text-sm font-light mb-6">
              Everything you need to know about booking, fare flexibility, and flying with Aerial.
            </p>

            <div className="space-y-3">
              {[
                {
                  q: 'How do I change or cancel my flight reservation?',
                  a: 'You can change flight dates or cancel eligible bookings directly from the My Bookings section on Aerial up to 24 hours before your departure with instant credit or refund processing.',
                },
                {
                  q: 'Are all taxes and airport charges included in the price?',
                  a: 'Yes. Aerial enforces complete price transparency. All displayed prices include government taxes, carrier surcharges, and terminal fees with zero hidden surprise charges.',
                },
                {
                  q: 'When and how do I receive my digital boarding pass?',
                  a: 'Online check-in opens 24 hours prior to departure. Your digital pass and QR code are instantly available in your itinerary card and can be saved or downloaded.',
                },
                {
                  q: 'Can I book multi-city routes or open-jaw tickets?',
                  a: 'Yes! Simply select the Multi City option in our booking engine to combine flights across different destinations in one seamless reservation.',
                },
                {
                  q: 'What is Aerial’s standard baggage policy?',
                  a: 'Standard Economy tickets include one personal item and one standard carry-on bag (up to 10kg). Checked bags can be added at discounted member rates anytime before departure.',
                },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl border border-white/20 bg-white/5">
                  <h4 className="text-base sm:text-lg font-medium text-white mb-1.5">
                    {faq.q}
                  </h4>
                  <p className="text-white/75 text-sm font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs text-white/50">Still need help?</span>
              <button
                onClick={() => {
                  setIsFaqModalOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="px-5 py-2 rounded-full bg-white text-black text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Contact Support Directly
              </button>
            </div>
          </div>
        </div>
      )}


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
}
