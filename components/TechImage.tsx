"use client";

import Image from 'next/image';
import { useState } from 'react';

interface TechImageProps {
  src: string;
  alt: string;
  className?: string;
}

const TechImage = ({ src, alt, className }: TechImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc("/tech.svg");
  };

  return (
    <Image 
      src={imgSrc} 
      alt={alt} 
      width={20} 
      height={20} 
      className={className}
      onError={handleError}
    />
  );
};

export default TechImage;
