// context/ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { COLORS } from '../constants/colors';

const ThemeContext = createContext({
  colors: COLORS,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ colors: COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);