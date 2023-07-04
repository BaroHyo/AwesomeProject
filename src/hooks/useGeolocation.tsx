import { useEffect, useState } from 'react';
import { ResponseAddress } from '../interfaces/app';

const key = 'pk.32b790ffec52a831ac358dfd15412c91';
export const url = `https://us1.locationiq.com/v1/reverse?key=${key}`;
export const useGeolocation = (initialPosition?: {
  latitude: number;
  longitude: number;
}) => {
  const [data, setData] = useState<ResponseAddress | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!initialPosition) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${url}&lat=${initialPosition?.latitude}&lon=${initialPosition?.longitude}&format=json`
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialPosition]);

  return { data, loading, error };
};
