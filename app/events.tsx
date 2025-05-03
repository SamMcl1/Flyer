// app/events.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Event } from '../types';

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Simulated data - replace with actual API call
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'HackUPC',
          description: 'Best Hackathon Ever',
          location: {
            latitude: 41.3882,
            longitude: 2.1123
          },
          datetime: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Barcelona VS Real Madrid',
          description: 'Olympic Stadium: Laliga',
          location: {
            latitude: 41.3653,
            longitude: 2.1560
          },
          datetime: new Date("2025-05-11T16:15:00Z").toISOString()
        }
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventPress = (event: Event) => {
    router.push({
      pathname: '/booking',
      params: {
        destination: `${event.location.latitude},${event.location.longitude}`,
        eventName: event.title
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.eventCard}
            onPress={() => handleEventPress(item)}
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            <Text style={styles.eventDateTime}>
              {new Date(item.datetime).toLocaleDateString('en-IE', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    padding: 16
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a'
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  eventDateTime: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500'
  },
  separator: {
    height: 12
  }
});