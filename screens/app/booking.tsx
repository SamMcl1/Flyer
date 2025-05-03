// app/booking.tsx
import { useLocalSearchParams } from 'expo-router';
import BookingScreen from '../screens/BookingScreen';

export default function Booking() {
  const params = useLocalSearchParams();
  return <BookingScreen params={params} />;
}