import { useEffect } from 'react';

export function useDebounceSelect(
  value: string,
  callback: (value: string) => void,
  nullMode?: boolean,
  delay?: number
) {
  useEffect(() => {
    if (nullMode || value.length) {
      const timer = setTimeout(() => callback(value), delay || 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value]);
}
