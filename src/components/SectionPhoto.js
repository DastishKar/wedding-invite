import { useState } from 'react';

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'];

function SectionPhoto({ src, className = '' }) {
  const basePath = src.replace(/\.[^.]+$/, '');
  const [extIndex, setExtIndex] = useState(0);
  const imgSrc = `${basePath}${EXTENSIONS[extIndex]}`;

  const handleError = () => {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1);
    }
  };

  return (
    <img
      className={`invite-slide__img ${className}`.trim()}
      src={imgSrc}
      alt=""
      onError={handleError}
      loading="lazy"
    />
  );
}

export default SectionPhoto;
