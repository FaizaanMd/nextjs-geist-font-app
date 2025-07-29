import { getMovieById } from '@/lib/movies';
import { MovieBooking } from '@/components/ui/MovieBooking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  let movie;
  
  try {
    movie = getMovieById(id);
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">Movie Not Found</CardTitle>
            <CardDescription>
              The movie you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/movies">
              <Button>
                Browse All Movies
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <MovieBooking movie={movie} />;
}
