import type React from 'react';
import LoadingSpinner from './LoadingSpinner';
import useLoading from '@/hooks/useLoading';

interface LoadingWrapperProps {
  children: React.ReactNode;
  loadingTime?: number;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, loadingTime }) => {
  const isLoading = useLoading(loadingTime);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
