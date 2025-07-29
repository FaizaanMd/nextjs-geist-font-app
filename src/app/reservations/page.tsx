"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ReservationCard } from '@/components/ui/ReservationCard';
import { ReservationSearch } from '@/components/ui/ReservationSearch';
import { 
  getAllReservations, 
  getReservationsByEmail, 
  cancelReservation, 
  deleteReservation,
  Reservation 
} from '@/lib/reservations';
import Link from 'next/link';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadAllReservations();
  }, []);

  const loadAllReservations = () => {
    setIsLoading(true);
    try {
      const allReservations = getAllReservations();
      setReservations(allReservations);
      setFilteredReservations(allReservations);
      setSearchMode(false);
      setSearchEmail("");
    } catch (error) {
      console.error('Failed to load reservations:', error);
      setMessage({ type: 'error', text: 'Failed to load reservations' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (email: string): Promise<Reservation[]> => {
    setIsLoading(true);
    try {
      const userReservations = getReservationsByEmail(email);
      setFilteredReservations(userReservations);
      setSearchMode(true);
      setSearchEmail(email);
      setMessage(null);
      return userReservations;
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to search reservations' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    loadAllReservations();
    setMessage(null);
  };

  const handleCancelReservation = async (id: string) => {
    try {
      const success = cancelReservation(id);
      if (success) {
        // Refresh the current view
        if (searchMode && searchEmail) {
          await handleSearch(searchEmail);
        } else {
          loadAllReservations();
        }
        setMessage({ type: 'success', text: 'Reservation cancelled successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to cancel reservation' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cancel reservation' });
    }
  };

  const handleDeleteReservation = async (id: string) => {
    try {
      const success = deleteReservation(id);
      if (success) {
        // Refresh the current view
        if (searchMode && searchEmail) {
          await handleSearch(searchEmail);
        } else {
          loadAllReservations();
        }
        setMessage({ type: 'success', text: 'Reservation deleted successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete reservation' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete reservation' });
    }
  };

  const confirmedCount = filteredReservations.filter(r => r.status === 'confirmed').length;
  const cancelledCount = filteredReservations.filter(r => r.status === 'cancelled').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Reservation Management</h1>
        <p className="text-muted-foreground text-lg">
          View and manage movie ticket bookings
        </p>
      </div>

      {/* Message Alert */}
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Search Section */}
      <ReservationSearch 
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />

      {/* Statistics */}
      {filteredReservations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{filteredReservations.length}</div>
              <div className="text-sm text-muted-foreground">
                Total Reservations
                {searchMode && ` for ${searchEmail}`}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{cancelledCount}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reservations List */}
      <div className="space-y-6">
        {searchMode && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                Reservations for {searchEmail}
              </h2>
              <Badge variant="outline">
                {filteredReservations.length} found
              </Badge>
            </div>
            <Button variant="outline" onClick={handleClearSearch}>
              View All Reservations
            </Button>
          </div>
        )}

        {!searchMode && (
          <h2 className="text-xl font-semibold">All Reservations</h2>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading reservations...</p>
          </div>
        ) : filteredReservations.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">
                {searchMode ? 'No reservations found' : 'No reservations yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchMode 
                  ? `No reservations found for ${searchEmail}. Please check the email address and try again.`
                  : 'Start by booking your first movie ticket!'
                }
              </p>
              <Link href="/movies">
                <Button>Book Your First Movie</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancelReservation}
                onDelete={handleDeleteReservation}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/movies" className="flex-1">
              <Button className="w-full">
                Book New Tickets
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
