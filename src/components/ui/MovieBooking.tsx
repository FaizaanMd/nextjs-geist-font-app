"use client";

import { useState } from "react";
import { Movie } from "@/lib/movies";
import { createReservation } from "@/lib/reservations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SeatSelection } from "@/components/ui/SeatSelection";
import { BookingForm } from "@/components/ui/BookingForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

interface MovieBookingProps {
  movie: Movie;
}

export function MovieBooking({ movie }: MovieBookingProps) {
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingStep, setBookingStep] = useState<"showtime" | "seats" | "booking">("showtime");

  const totalPrice = movie.price * selectedSeats.length;

  const handleShowtimeSelect = (showtime: string) => {
    setSelectedShowtime(showtime);
    setBookingStep("seats");
  };

  const handleSeatSelect = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const handleProceedToBooking = () => {
    if (selectedSeats.length === 0) {
      return;
    }
    setBookingStep("booking");
  };

  const handleBookingSubmit = async (data: any) => {
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Create the reservation
      const reservation = createReservation({
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster,
        showtime: selectedShowtime,
        seats: selectedSeats,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        totalPrice
      });
      
      console.log("Booking created successfully:", reservation);
    } catch (error) {
      console.error("Failed to create booking:", error);
      throw new Error("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Movie Details Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Movie Poster */}
            <div className="relative h-96 w-full">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Movie Info */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                <p className="text-muted-foreground text-lg">{movie.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="secondary">
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Duration:</span> {movie.duration}
                </div>
                <div>
                  <span className="font-semibold">Rating:</span> {movie.rating}
                </div>
                <div>
                  <span className="font-semibold">Price:</span> ₹{movie.price} per seat
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Steps */}
      <div className="space-y-6">
        {/* Step 1: Showtime Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              Select Showtime
            </CardTitle>
            {selectedShowtime && (
              <CardDescription>
                Selected: {selectedShowtime}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedShowtime} onValueChange={handleShowtimeSelect}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.showtimes.map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <RadioGroupItem value={time} id={time} />
                    <Label 
                      htmlFor={time} 
                      className="cursor-pointer p-3 border rounded-lg hover:bg-muted transition-colors flex-1 text-center"
                    >
                      {time}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Step 2: Seat Selection */}
        {bookingStep !== "showtime" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  bookingStep === "seats" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  2
                </span>
                Select Seats
              </CardTitle>
              {selectedSeats.length > 0 && (
                <CardDescription>
                  Selected {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''}: {selectedSeats.join(", ")}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <SeatSelection
                rows={movie.seatingLayout.rows}
                seatsPerRow={movie.seatingLayout.seatsPerRow}
                reservedSeats={movie.seatingLayout.reservedSeats}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
              />
              
              {selectedSeats.length > 0 && bookingStep === "seats" && (
                <div className="mt-6 flex justify-center">
                  <Button onClick={handleProceedToBooking} size="lg">
                    Proceed to Booking - ₹{totalPrice}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Booking Form */}
        {bookingStep === "booking" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Complete Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <BookingForm
                  movieTitle={movie.title}
                  selectedSeats={selectedSeats}
                  totalPrice={totalPrice}
                  onSubmit={handleBookingSubmit}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Booking Summary (always visible when seats are selected) */}
      {selectedSeats.length > 0 && (
        <Card className="sticky bottom-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-2">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedShowtime} • {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} • {selectedSeats.join(", ")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{totalPrice}</p>
                <p className="text-sm text-muted-foreground">Total Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
