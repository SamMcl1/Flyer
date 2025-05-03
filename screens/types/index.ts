// types/index.ts
export interface Vehicle {
    id: string;
    latitude: number;
    longitude: number;
    routeNumber: string;
    destination: string;
    status: string;
  }
  
  export interface Event {
    id: string;
    title: string;
    description: string;
    location: {
      latitude: number;
      longitude: number;
    };
    datetime: string;
  }
  
  export interface Booking {
    id: string;
    origin: string;
    destination: string;
    datetime: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  }