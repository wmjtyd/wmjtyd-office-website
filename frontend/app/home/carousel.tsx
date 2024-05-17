import React from 'react';

export function Carousel({ children, className }) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export function CarouselContent({ children }) {
  return <div className="flex">{children}</div>;
}

export function CarouselItem({ children }) {
  return <div className="flex-shrink-0">{children}</div>;
}

export function CarouselPrevious() {
  return (
    <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white">
      &lt;
    </button>
  );
}

export function CarouselNext() {
  return (
    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white">
      &gt;
    </button>
  );
}
