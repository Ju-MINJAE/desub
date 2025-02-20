import Image from 'next/image';

interface LoadingSpinnerProps {
  width?: number;
  height?: number;
}

export default function LoadingSpinner({ width = 200, height = 100 }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center">
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
