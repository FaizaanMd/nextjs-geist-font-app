"use client";

import { Movie } from "@/lib/movies";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold line-clamp-1">{movie.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {movie.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>{movie.duration}</span>
          <span className="font-semibold">{movie.rating}</span>
        </div>
        
        <div className="text-lg font-bold text-primary">
          ₹{movie.price}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link href={`/movies/${movie.id}`} className="w-full">
          <Button className="w-full">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
