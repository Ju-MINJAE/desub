import Image from 'next/image';

interface LoadingSpinnerProps {
  width?: number;
  height?: number;
  className?: string;
}

const LoadingSpinner = ({ width = 50, height = 50, className = '' }: LoadingSpinnerProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spinner">
        <Image src="/icons/loading.svg" alt="Loading..." width={width} height={height} priority />
      </div>
    </div>
  );
};

export default LoadingSpinner;
