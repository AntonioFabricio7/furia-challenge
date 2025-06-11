import React from 'react';

interface FuriaLogoProps {
  className?: string;
}

const FuriaLogo: React.FC<FuriaLogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <div className={`text-white font-bold flex items-center ${className}`}>
      <span className="text-2xl mr-1">FURIA</span>
      <span className="text-green-400 text-2xl">FAN</span>
    </div>
  );
};

export default FuriaLogo;