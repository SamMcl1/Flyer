// context/TransportContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Booking } from '../types';

interface TransportContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => Promise<void>;
  selectedRoute: string | null;
  setSelectedRoute: (route: string | null) => void;
}

const TransportContext = createContext<TransportContextType | undefined>(undefined);

export function TransportProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const addBooking = async (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  return (
    <TransportContext.Provider 
      value={{
        bookings,
        addBooking,
        selectedRoute,
        setSelectedRoute,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
}

export function useTransport() {
  const context = useContext(TransportContext);
  if (context === undefined) {
    throw new Error('useTransport must be used within a TransportProvider');
  }
  return context;
}