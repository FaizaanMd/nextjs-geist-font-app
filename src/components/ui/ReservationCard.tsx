"use client";

import { Reservation } from "@/lib/reservations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { useState } from "react";

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export function ReservationCard({ 
  reservation, 
  onCancel, 
  onDelete, 
  showActions = true 
}: ReservationCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCancel = async () => {
    if (!onCancel) return;
    
    setIsLoading(true);
    try {
      await onCancel(reservation.id);
      setShowConfirmCancel(false);
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsLoading(true);
    try {
      await onDelete(reservation.id);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error('Failed to delete reservation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Booking #{reservation.id}</CardTitle>
            <CardDescription>
              Booked on {formatDate(reservation.bookingDate)}
            </CardDescription>
          </div>
          <Badge 
            variant={reservation.status === 'confirmed' ? 'default' : 'destructive'}
            className="capitalize"
          >
            {reservation.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Movie Info */}
        <div className="flex gap-4">
          <div className="relative w-16 h-24 flex-shrink-0">
            <Image
              src={reservation.moviePoster}
              alt={reservation.movieTitle}
              fill
              className="object-cover rounded"
              sizes="64px"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{reservation.movieTitle}</h3>
            <p className="text-muted-foreground">Showtime: {reservation.showtime}</p>
            <p className="text-muted-foreground">
              Seats: {reservation.seats.join(", ")} ({reservation.seats.length} seat{reservation.seats.length !== 1 ? 's' : ''})
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="font-semibold mb-2">Customer Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p><span className="font-medium">Name:</span> {reservation.customerName}</p>
            <p><span className="font-medium">Email:</span> {reservation.customerEmail}</p>
            <p><span className="font-medium">Phone:</span> {reservation.customerPhone}</p>
            <p><span className="font-medium">Total:</span> ₹{reservation.totalPrice}</p>
          </div>
        </div>

        {/* Confirmation Dialogs */}
        {showConfirmCancel && (
          <Alert>
            <AlertDescription>
              Are you sure you want to cancel this reservation? This action cannot be undone.
              <div className="flex gap-2 mt-3">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {isLoading ? "Cancelling..." : "Yes, Cancel"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowConfirmCancel(false)}
                  disabled={isLoading}
                >
                  No, Keep It
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {showConfirmDelete && (
          <Alert variant="destructive">
            <AlertDescription>
              Are you sure you want to permanently delete this reservation? This action cannot be undone.
              <div className="flex gap-2 mt-3">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Yes, Delete"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowConfirmDelete(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        {showActions && reservation.status === 'confirmed' && !showConfirmCancel && !showConfirmDelete && (
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowConfirmCancel(true)}
              disabled={isLoading}
            >
              Cancel Booking
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowConfirmDelete(true)}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        )}

        {showActions && reservation.status === 'cancelled' && !showConfirmDelete && (
          <div className="flex gap-2 pt-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowConfirmDelete(true)}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
