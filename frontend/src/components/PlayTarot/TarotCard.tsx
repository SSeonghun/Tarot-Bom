// src/components/PlayTarot/TarotCard.tsx
import React from 'react';

interface TarotCardProps {
  src: string;
  alt: string;
}

const TarotCard: React.FC<TarotCardProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-32 object-cover border border-gray-300 rounded-lg z-20"
    />
  );
};

export default TarotCard;
