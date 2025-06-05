export const isEqual = <T>(a: T, b: T): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const safelyParseJSON = <T>(value?: string | null, defaultValue?: T): T | undefined => {
  try {
    if (!value) return defaultValue;
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
    return defaultValue;
  }
};

export const safelyGetLocalStorageItem = <T>(key: string, defaultValue?: T): T | undefined => {
  try {
    return safelyParseJSON(localStorage.getItem(key));
  } catch (error) {
    console.error(`Error getting localStorage item: ${error}`);
    return defaultValue;
  }
};

export const safelySetLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item: ${error}`);
  }
};

export const getShortName = (name?: string | null): string => {
  if (!name) return '';
  return name
    ?.split?.(' ')
    ?.slice?.(0, 2)
    ?.map?.(str => str?.[0])
    ?.join?.('');
};
