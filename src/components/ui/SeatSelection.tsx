"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SeatSelectionProps {
  rows: number;
  seatsPerRow: number;
  reservedSeats: string[];
  onSeatSelect: (selectedSeats: string[]) => void;
  selectedSeats: string[];
}

export function SeatSelection({ 
  rows, 
  seatsPerRow, 
  reservedSeats, 
  onSeatSelect, 
  selectedSeats 
}: SeatSelectionProps) {
  const generateSeatId = (row: number, seat: number): string => {
    const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.
    return `${rowLetter}${seat + 1}`;
  };

  const handleSeatClick = (seatId: string) => {
    if (reservedSeats.includes(seatId)) return;
    
    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];
    
    onSeatSelect(newSelectedSeats);
  };

  const getSeatStatus = (seatId: string) => {
    if (reservedSeats.includes(seatId)) return 'reserved';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Screen */}
      <div className="mb-8">
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2"></div>
        <p className="text-center text-sm text-muted-foreground">SCREEN</p>
      </div>

      {/* Seating Grid */}
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center gap-2">
            {/* Row Label */}
            <div className="w-6 text-center font-semibold text-sm">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            
            {/* Seats */}
            <div className="flex gap-1">
              {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                const seatId = generateSeatId(rowIndex, seatIndex);
                const status = getSeatStatus(seatId);
                
                return (
                  <Button
                    key={seatId}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-8 h-8 p-0 text-xs font-medium transition-all duration-200",
                      status === 'available' && "hover:bg-primary hover:text-primary-foreground border-border",
                      status === 'selected' && "bg-primary text-primary-foreground border-primary",
                      status === 'reserved' && "bg-destructive/20 text-destructive border-destructive cursor-not-allowed opacity-50"
                    )}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={status === 'reserved'}
                  >
                    {seatIndex + 1}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-border rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-destructive/20 border border-destructive rounded"></div>
          <span>Reserved</span>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Selected Seats:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seatId => (
              <span key={seatId} className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">
                {seatId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
