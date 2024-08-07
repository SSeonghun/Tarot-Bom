import React, { useEffect } from 'react';
import Booking from '../../components/Booking/Booking';

const TarotResult: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div>
      <Booking />
    </div>
  );
};

export default TarotResult;
