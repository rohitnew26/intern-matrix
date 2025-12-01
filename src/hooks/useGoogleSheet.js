// useGoogleSheet hook
import { useState } from 'react';
import { verifyCertificate } from '../services/googleSheetService';

export const useVerifyCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const verify = async (serialNumber, dob) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await verifyCertificate(serialNumber, dob);
      
      if (response.success) {
        setResult(response);
      } else {
        setError(response.message);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Verification failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return { verify, reset, loading, error, result };
};

export default useVerifyCertificate;
