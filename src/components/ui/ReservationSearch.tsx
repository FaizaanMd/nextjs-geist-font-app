"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Reservation } from "@/lib/reservations";

interface ReservationSearchProps {
  onSearch: (email: string) => Promise<Reservation[]>;
  onClearSearch: () => void;
}

export function ReservationSearch({ onSearch, onClearSearch }: ReservationSearchProps) {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSearchError("Please enter an email address");
      return;
    }

    if (!email.includes("@")) {
      setSearchError("Please enter a valid email address");
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      await onSearch(email.trim());
    } catch (error) {
      setSearchError("Failed to search reservations. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setEmail("");
    setSearchError(null);
    onClearSearch();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Your Reservations</CardTitle>
        <CardDescription>
          Enter your email address to view and manage your movie bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <Label htmlFor="search-email">Email Address</Label>
            <Input
              id="search-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={searchError ? "border-destructive" : ""}
            />
            {searchError && (
              <p className="text-sm text-destructive mt-1">{searchError}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isSearching || !email.trim()}
              className="flex-1"
            >
              {isSearching ? "Searching..." : "Search Reservations"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClear}
              disabled={isSearching}
            >
              Clear
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Demo Email Addresses:</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• john.doe@example.com</p>
            <p>• jane.smith@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
