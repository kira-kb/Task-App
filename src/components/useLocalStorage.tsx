import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [savedValue, setSavedValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(`error while tyring to access Local storage:  ${error}`);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setSavedValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [savedValue, setValue] as const;
}

export default useLocalStorage;
