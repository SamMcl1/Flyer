// app/_layout.tsx
import { Stack } from 'expo-router';
import { TransportProvider } from '../context/TransportContext';
import { ThemeProvider } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';

export default function Layout() {
  return (
    <TransportProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: COLORS.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }}
        
      >
        <Stack.Screen 
          name="main" 
          options={{ 
            title: 'FLYER',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="booking" 
          options={{ 
            title: 'Book Journey',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="events" 
          options={{ 
            title: 'Nearby Events',
            headerShown: true 
          }} 
        />
      </Stack>
    </TransportProvider>
  );
}