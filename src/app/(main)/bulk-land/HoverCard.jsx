'use client';

import { useState } from 'react';

export default function HoverCard({ 
  children, 
  icon: Icon, 
  title, 
  baseColor = 'rgba(211, 179, 107, 0.1)',
  hoverColor = 'rgba(211, 179, 107, 0.2)',
  iconColor = '#d3b36b'
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg transition-colors card-hover"
      style={{ 
        backgroundColor: isHovered ? hoverColor : baseColor,
        transition: 'background-color 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="w-16 h-16" style={{ color: iconColor }} />
      <p className="text-lg font-medium" style={{ color: '#151f28' }}>
        {title}
      </p>
    </div>
  );
}