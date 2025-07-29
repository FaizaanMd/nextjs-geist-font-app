import { getAllMovies } from '@/lib/movies';
import { MovieCard } from '@/components/ui/MovieCard';

export default function MoviesPage() {
  const movies = getAllMovies();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Now Showing</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover the latest blockbusters and book your tickets for an unforgettable cinema experience.
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center pt-8 border-t">
        <p className="text-muted-foreground">
          Can't find what you're looking for? Check back soon for more movies!
        </p>
      </div>
    </div>
  );
}
