declare module 'react-rating' {
  import * as React from 'react';

  interface RatingProps {
    initialRating: number;
    onChange: (rating: number) => void;
    [key: string]: any;
  }

  const Rating: React.FC<RatingProps>;
  export default Rating;
}
