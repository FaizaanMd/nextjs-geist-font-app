"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must contain only digits"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  movieTitle: string;
  selectedSeats: string[];
  totalPrice: number;
  onSubmit: (data: BookingFormData) => Promise<void>;
}

export function BookingForm({ movieTitle, selectedSeats, totalPrice, onSubmit }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const handleFormSubmit = async (data: BookingFormData) => {
    if (selectedSeats.length === 0) {
      setSubmitError("Please select at least one seat");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await onSubmit(data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred while booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">Booking Confirmed!</CardTitle>
          <CardDescription>
            Your tickets have been successfully booked.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p><strong>Movie:</strong> {movieTitle}</p>
            <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
            <p><strong>Total:</strong> ₹{totalPrice}</p>
          </div>
          <Button 
            onClick={() => {
              setSubmitSuccess(false);
              window.location.href = "/movies";
            }}
            className="w-full"
          >
            Book Another Movie
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Booking</CardTitle>
        <CardDescription>
          Fill in your details to confirm the reservation
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Booking Summary */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold">Booking Summary</h3>
            <p className="text-sm"><strong>Movie:</strong> {movieTitle}</p>
            <p className="text-sm"><strong>Seats:</strong> {selectedSeats.join(", ") || "None selected"}</p>
            <p className="text-sm"><strong>Total:</strong> ₹{totalPrice}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Error Alert */}
          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || selectedSeats.length === 0}
          >
            {isSubmitting ? "Processing..." : `Confirm Booking - ₹${totalPrice}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
