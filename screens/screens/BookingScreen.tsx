// screens/BookingScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';

interface BookingScreenProps {
  params?: {
    destination?: string;
    eventName?: string;
  };
}

export default function BookingScreen({ params }: BookingScreenProps) {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>(params?.destination || '');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const router = useRouter();

  const handleBooking = async () => {
    try {
      // Implement your booking logic here
      console.log('Booking:', { origin, destination, date, time });
      router.back();
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {params?.eventName && (
        <Text style={styles.eventTitle}>Booking for: {params.eventName}</Text>
      )}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>From</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter origin"
          value={origin}
          onChangeText={setOrigin}
        />

        <Text style={styles.label}>To</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={time}
          onChangeText={setTime}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleBooking}
      >
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.PRIMARY,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});