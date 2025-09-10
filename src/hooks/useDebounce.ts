import { useState, useEffect } from 'react';

/**
 * A hook to debounce a value, delaying its update until a specified time has passed.
 * @param value The value to debounce (e.g., the user's search query).
 * @param delay The delay in milliseconds before updating.
 * @returns The debounced value, which only updates after the delay.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}