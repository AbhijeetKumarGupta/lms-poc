import {
  isEqual,
  safelyGetLocalStorageItem,
  safelyParseJSON,
  safelySetLocalStorageItem,
} from '@/utils';
import { useCallback, useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const isClient = typeof window !== 'undefined';

  /* React states and hooks */
  const [value, setValue] = useState<T>(() => {
    if (!isClient) return defaultValue;
    const item = window.localStorage.getItem(key);
    return safelyParseJSON(item, defaultValue) as T;
  });

  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = safelyParseJSON(event.newValue, defaultValue) as T;
        if (!isEqual(value, newValue)) {
          setValue(newValue);
        }
      }
    };

    // Storage Event: Fires when localStorage changes in another tab (not the current one).
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [defaultValue, key, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const item = safelyGetLocalStorageItem(key) as string;
    const newValue = safelyParseJSON(item, defaultValue) as T;
    if (!isEqual(value, newValue)) {
      setValue(newValue);
    }
  }, [key, isClient]);
  /* ********** */

  /* Event handlers and other functions */
  const updateValue = useCallback(
    (newValue: T) => {
      if (!isClient) return;

      if (!isEqual(value, newValue)) {
        setValue(newValue);
        safelySetLocalStorageItem(key, JSON.stringify(newValue));
      }
    },
    [key, isClient]
  );
  /* ********** */

  return [value, updateValue];
};

export { useLocalStorage };
