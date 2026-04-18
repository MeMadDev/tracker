import { useState, useEffect } from 'react';

export function useStoredArray(key) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        setData(JSON.parse(raw));
      }
    } catch {
      // key doesn't exist or bad data
    }
    setLoaded(true);
  }, [key]);

  const save = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(key, JSON.stringify(newData));
    } catch (e) {
      console.error('storage save failed', e);
    }
  };

  return [data, save, loaded];
}

export function useStoredObject(key, defaultValue = {}) {
  const [data, setData] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setData(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [key]);

  const save = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(key, JSON.stringify(newData));
    } catch (e) {
      console.error('storage save failed', e);
    }
  };

  return [data, save, loaded];
}
