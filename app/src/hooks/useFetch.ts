import { useCallback, useState } from 'react';
import axios from 'axios';

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = useCallback(
    async (url: string, requestType: string, payload?: any) => {
      console.log(payload)
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios({
          method: requestType,
          url,
          data: payload,
        });

        setResponse(res.data);
      } catch (err: any) {
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { makeRequest, response, error, isLoading };
};

export default useFetch;
