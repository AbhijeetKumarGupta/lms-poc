import {
  isEqual,
  safelyGetLocalStorageItem,
  safelyParseJSON,
  safelySetLocalStorageItem,
} from '@/libs/utils';
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
  }, [value, defaultValue, key, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const item = safelyGetLocalStorageItem(key) as string;
    const newValue = safelyParseJSON(item, defaultValue) as T;
    if (!isEqual(value, newValue)) {
      setValue(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, isClient]);

  const updateValue = useCallback(
    (newValue: T) => {
      if (!isClient) return;

      if (!isEqual(value, newValue)) {
        setValue(newValue);
        safelySetLocalStorageItem(key, JSON.stringify(newValue));
      }
    },
    [value, key, isClient]
  );
  /* ********** */

  /* Event handlers and other functions */

  /* ********** */

  return [value, updateValue];
};

export { useLocalStorage };
