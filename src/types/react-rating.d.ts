declare module 'react-rating' {
  import * as React from 'react';

  interface RatingProps {
    initialRating: number;
    onChange: (rating: number) => void;
    [key: string]: any; // 추가적인 props를 처리하기 위한 방법
  }

  const Rating: React.FC<RatingProps>;
  export default Rating;
}
