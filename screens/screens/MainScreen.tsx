// screens/MainScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';

interface Bus {
  id: string;
  latitude: number;
  longitude: number;
  heading: number;
  routeNumber: string;
}

export default function MainScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  // Get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Initialize demo buses around user location
      const demoBuses = generateDemoBuses(location.coords.latitude, location.coords.longitude);
      setBuses(demoBuses);
    })();
  }, []);

  // Simulate bus movements
  useEffect(() => {
    if (!location) return;

    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          latitude: bus.latitude + (Math.random() - 0.5) * 0.0005,
          longitude: bus.longitude + (Math.random() - 0.5) * 0.0005,
          heading: Math.random() * 360,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [location]);

  const generateDemoBuses = (centerLat: number, centerLng: number): Bus[] => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `bus-${i}`,
      latitude: centerLat + (Math.random() - 0.5) * 0.01,
      longitude: centerLng + (Math.random() - 0.5) * 0.01,
      heading: Math.random() * 360,
      routeNumber: `${Math.floor(Math.random() * 100)}`,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        userLocationUpdateInterval={5000}
        userLocationAnnotationTitle="You are here"
        tintColor="#07B965"  // Changes the user location marker color
        userInterfaceStyle="light"
        initialRegion={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        } : undefined}
      >
        {location && (
          <Circle
            center={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            radius={1000}
            fillColor="rgba(0, 122, 255, 0.1)"
            strokeColor="rgba(0, 122, 255, 0.3)"
          />
        )}
        
        {buses.map(bus => (
          <Marker
            key={bus.id}
            coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude,
            }}
            rotation={bus.heading}
            title={`Bus ${bus.routeNumber}`}
            description={`Route ${bus.routeNumber}`}
          >
            <View style={styles.busMarker}>
              <Text style={styles.busNumber}>{bus.routeNumber}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/booking')}
        >
          <Text style={styles.buttonText}>Book Journey</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/events')}
        >
          <Text style={styles.buttonText}>View Events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  busMarker: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  busNumber: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 12,
  },
});