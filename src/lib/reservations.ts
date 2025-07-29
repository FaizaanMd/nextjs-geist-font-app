export interface Reservation {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  showtime: string;
  seats: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

// In-memory storage for demo purposes
// In a real app, this would be stored in a database
let reservations: Reservation[] = [
  {
    id: "res-001",
    movieId: "1",
    movieTitle: "Avatar: The Way of Water",
    moviePoster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
    showtime: "2:00 PM",
    seats: ["A5", "A6"],
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "9876543210",
    totalPrice: 500,
    bookingDate: "2024-01-15",
    status: "confirmed"
  },
  {
    id: "res-002",
    movieId: "2",
    movieTitle: "Top Gun: Maverick",
    moviePoster: "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg",
    showtime: "7:00 PM",
    seats: ["C3", "C4", "C5"],
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    customerPhone: "9123456789",
    totalPrice: 660,
    bookingDate: "2024-01-14",
    status: "confirmed"
  }
];

export function getAllReservations(): Reservation[] {
  return reservations.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
}

export function getReservationById(id: string): Reservation | null {
  return reservations.find(reservation => reservation.id === id) || null;
}

export function createReservation(reservation: Omit<Reservation, 'id' | 'bookingDate' | 'status'>): Reservation {
  const newReservation: Reservation = {
    ...reservation,
    id: `res-${Date.now()}`,
    bookingDate: new Date().toISOString().split('T')[0],
    status: 'confirmed'
  };
  
  reservations.push(newReservation);
  return newReservation;
}

export function cancelReservation(id: string): boolean {
  const reservationIndex = reservations.findIndex(reservation => reservation.id === id);
  if (reservationIndex !== -1) {
    reservations[reservationIndex].status = 'cancelled';
    return true;
  }
  return false;
}

export function getReservationsByEmail(email: string): Reservation[] {
  return reservations
    .filter(reservation => reservation.customerEmail.toLowerCase() === email.toLowerCase())
    .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
}

export function deleteReservation(id: string): boolean {
  const reservationIndex = reservations.findIndex(reservation => reservation.id === id);
  if (reservationIndex !== -1) {
    reservations.splice(reservationIndex, 1);
    return true;
  }
  return false;
}
