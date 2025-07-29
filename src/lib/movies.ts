export interface Movie {
  id: string;
  title: string;
  description: string;
  synopsis: string;
  poster: string;
  duration: string;
  genre: string[];
  rating: string;
  showtimes: string[];
  price: number;
  seatingLayout: {
    rows: number;
    seatsPerRow: number;
    reservedSeats: string[];
  };
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Avatar: The Way of Water",
    description: "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together.",
    synopsis: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
    duration: "3h 12min",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: "PG-13",
    showtimes: ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"],
    price: 250,
    seatingLayout: {
      rows: 10,
      seatsPerRow: 12,
      reservedSeats: ["A1", "A2", "B5", "C3", "D7", "E8"]
    }
  },
  {
    id: "2",
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    synopsis: "After more than thirty years of service as one of the Navy's top aviators, Pete 'Maverick' Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    poster: "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg",
    duration: "2h 17min",
    genre: ["Action", "Drama"],
    rating: "PG-13",
    showtimes: ["11:00 AM", "3:00 PM", "7:00 PM", "10:00 PM"],
    price: 220,
    seatingLayout: {
      rows: 10,
      seatsPerRow: 12,
      reservedSeats: ["A3", "B1", "B2", "C8", "D4", "F6"]
    }
  },
  {
    id: "3",
    title: "Black Panther: Wakanda Forever",
    description: "The people of Wakanda fight to protect their home from intervening world powers.",
    synopsis: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
    poster: "https://images.pexels.com/photos/8111280/pexels-photo-8111280.jpeg",
    duration: "2h 41min",
    genre: ["Action", "Adventure", "Drama"],
    rating: "PG-13",
    showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
    price: 280,
    seatingLayout: {
      rows: 10,
      seatsPerRow: 12,
      reservedSeats: ["A4", "A5", "C2", "D9", "E1", "G7"]
    }
  },
  {
    id: "4",
    title: "Spider-Man: No Way Home",
    description: "Spider-Man's identity is revealed and he asks Doctor Strange for help.",
    synopsis: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    poster: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg",
    duration: "2h 28min",
    genre: ["Action", "Adventure", "Fantasy"],
    rating: "PG-13",
    showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
    price: 300,
    seatingLayout: {
      rows: 10,
      seatsPerRow: 12,
      reservedSeats: ["B3", "B4", "C6", "D2", "E5", "F9"]
    }
  }
];

export function getMovieById(id: string): Movie {
  const movie = movies.find(m => m.id === id);
  if (!movie) {
    throw new Error(`Movie with id ${id} not found`);
  }
  return movie;
}

export function getAllMovies(): Movie[] {
  return movies;
}
