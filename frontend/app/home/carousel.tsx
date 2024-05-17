import React, { ReactElement, ReactNode } from 'react';

export function Carousel(props: { children: ReactNode, className: string }) {
  const { children, className } = props
  return <div className={`relative ${className}`}>{children}</div>;
}

export function CarouselContent(props: { children: ReactNode }) {
  return <div className="flex">{props.children}</div>;
}

export function CarouselItem(props: { children: ReactElement }) {
  return <div className="flex-shrink-0">{props.children}</div>;
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
