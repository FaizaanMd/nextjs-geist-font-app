import { getAllMovies } from '@/lib/movies';
import { MovieCard } from '@/components/ui/MovieCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  const movies = getAllMovies();
  const featuredMovies = movies.slice(0, 3); // Show first 3 movies as featured

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            CineMax
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Experience movies like never before. Book your tickets for the latest blockbusters and enjoy premium cinema comfort.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/movies">
            <Button size="lg" className="text-lg px-8 py-6">
              Browse Movies
            </Button>
          </Link>
          <Link href="/reservations">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              My Reservations
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Featured Movies</h2>
          <p className="text-muted-foreground text-lg">
            Don't miss these amazing films currently showing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/movies">
            <Button variant="outline" size="lg">
              View All Movies
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose CineMax?</h2>
          <p className="text-muted-foreground text-lg">
            Premium cinema experience with modern amenities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold">Premium Seating</h3>
              <p className="text-muted-foreground">
                Comfortable recliner seats with ample legroom for the ultimate movie experience.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold">Easy Booking</h3>
              <p className="text-muted-foreground">
                Simple and intuitive booking process with real-time seat selection.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold">Latest Technology</h3>
              <p className="text-muted-foreground">
                State-of-the-art sound systems and crystal-clear projection technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center space-y-6 py-12 bg-muted/30 rounded-lg">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Ready for Your Next Movie Night?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of movie lovers who trust CineMax for their entertainment needs.
          </p>
        </div>
        
        <Link href="/movies">
          <Button size="lg" className="text-lg px-8 py-6">
            Book Your Tickets Now
          </Button>
        </Link>
      </section>
    </div>
  );
}
