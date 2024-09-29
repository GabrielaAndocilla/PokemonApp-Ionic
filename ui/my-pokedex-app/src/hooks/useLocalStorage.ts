import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue?: any) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    const _value = window.localStorage.getItem(key) ?? initialValue;
    try {
      return JSON.parse(_value);
    } catch (error) {
      return _value;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  const remove = ()=>{
    localStorage.removeItem(key);
  }

  return [value, setValue, remove];
};
