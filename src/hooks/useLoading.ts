'use client';

import { useState, useEffect } from 'react';

const useLoading = (loadingTime = 1500) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime]);

  return isLoading;
};

export default useLoading;
