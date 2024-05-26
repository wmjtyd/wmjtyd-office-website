'use client';

import React, { ReactElement, ReactNode, useState, useEffect, useRef } from 'react';

export function Carousel(props: { children: ReactNode, className: string }) {
  const { children, className } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenCount = React.Children.count(children);
  const debounceRef = useRef(false);

  const handlePrevious = () => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? childrenCount - 1 : prevIndex - 1));
    setTimeout(() => debounceRef.current = false, 500);
  };

  const handleNext = () => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setCurrentIndex((prevIndex) => (prevIndex === childrenCount - 1 ? 0 : prevIndex + 1));
    setTimeout(() => debounceRef.current = false, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <CarouselContent currentIndex={currentIndex} total={childrenCount}>
        {children}
      </CarouselContent>
      <CarouselPrevious onClick={handlePrevious} />
      <CarouselNext onClick={handleNext} />
    </div>
  );
}

export function CarouselContent(props: { children: ReactNode, currentIndex: number, total: number }) {
  const { children, currentIndex, total } = props;
  return (
    <div className="flex" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out', width: `${total * 100}%` }}>
      {React.Children.map(children, (child) => (
        <div className="flex-shrink-0 w-full h-64"> {/* Set a fixed height here */}
          {child}
        </div>
      ))}
    </div>
  );
}

export function CarouselItem(props: { children: ReactElement }) {
  return <div className="flex-shrink-0 w-full h-full">{props.children}</div>;
}

export function CarouselPrevious({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white">
      &lt;
    </button>
  );
}

export function CarouselNext({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white">
      &gt;
    </button>
  );
}
