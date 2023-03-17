import { useState, useEffect } from 'react';
import axios from 'axios';

const useMultipleApiCalls = (urls: string[]) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          urls.map((url) => axios.get(url))
        );
        setData(responses.map((response) => response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [urls]);

  return data;
};

export default useMultipleApiCalls;
