export const setLs = (key: string, value: unknown): void => {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error occurred while setting localStorage:", error);
  }
};

export const getLs = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);

    if (serializedValue !== null) {
      return JSON.parse(serializedValue) as T;
    }

    return null;
  } catch (error) {
    console.error("Error occurred while getting localStorage:", error);
    return null;
  }
};

export const rmLs = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error occurred while removing from localStorage", e);
  }
};
