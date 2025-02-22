import Image from 'next/image';

interface LoadingSpinnerProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function LoadingSpinner({
  width = 200,
  height = 100,
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Image
        src="/images/loadingspinner.gif"
        alt="Loading..."
        width={width}
        height={height}
        priority
      />
    </div>
  );
}
