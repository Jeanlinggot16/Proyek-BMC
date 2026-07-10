// components/ui/OfficialBMCLogo.tsx
'use client';

import { useState } from 'react';

export default function OfficialBMCLogo({ height = 48, animated = true }: { height?: number; animated?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        height: `${height}px`,
        overflow: 'visible',
      }}
    >
      <svg height="100%" viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', width: 'auto' }}>
        <defs>
          <linearGradient id="officialRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#800000" />
            <stop offset="40%" stopColor="#CC1111" />
            <stop offset="70%" stopColor="#FF3333" />
            <stop offset="100%" stopColor="#A30000" />
          </linearGradient>
          <filter id="mGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isHovered ? '10' : '4'} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path d="M 45 15 L 85 15 C 105 15, 115 25, 115 38 C 115 48, 108 54, 98 57 C 110 60, 118 68, 118 82 C 118 96, 105 105, 85 105 L 45 105 Z M 67 33 L 67 51 L 82 51 C 90 51, 94 47, 94 42 C 94 37, 90 33, 82 33 Z M 67 67 L 67 87 L 84 87 C 92 87, 97 82, 97 77 C 97 72, 92 67, 84 67 Z" fill="#E8E6E0" style={{ transition: 'fill 0.3s' }} />

        <path d="M 133 60 C 133 32, 150 16, 168 16 C 182 16, 193 30, 200 48 C 207 30, 218 16, 232 16 C 250 16, 267 32, 267 60 C 267 88, 250 104, 232 104 C 218 104, 207 90, 200 72 C 193 90, 182 104, 168 104 C 150 104, 133 88, 133 60 Z M 155 60 C 155 77, 161 86, 168 86 C 176 86, 185 72, 192 60 C 185 48, 176 34, 168 34 C 161 34, 155 43, 155 60 Z M 245 60 C 245 43, 239 34, 232 34 C 224 34, 215 48, 208 60 C 215 72, 224 86, 232 86 C 239 86, 245 77, 245 60 Z" fill="url(#officialRedGradient)" filter="url(#mGlow)" style={{ transition: 'all 0.5s ease', transformOrigin: '200px 60px' }} />

        {animated && (
          <path d="M 133 60 C 133 32, 150 16, 168 16 C 182 16, 193 30, 200 48 C 207 30, 218 16, 232 16 C 250 16, 267 32, 267 60 C 267 88, 250 104, 232 104 C 218 104, 207 90, 200 72 C 193 90, 182 104, 168 104 C 150 104, 133 88, 133 60 Z" fill="none" stroke="#FF5555" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="20 180" className="bmc-logo-trace" />
        )}

        <path d="M 362 36 C 355 22, 342 14, 325 14 C 300 14, 282 33, 282 60 C 282 87, 300 106, 325 106 C 342 106, 355 98, 362 84 L 342 74 C 338 82, 333 87, 325 87 C 313 87, 304 76, 304 60 C 304 44, 313 33, 325 33 C 333 33, 338 38, 342 46 Z" fill="#E8E6E0" style={{ transition: 'fill 0.3s' }} />

        <text x="203" y="124" fill="#E8E6E0" fontSize="14px" fontWeight="700" letterSpacing="0.378em" textAnchor="middle" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textTransform: 'uppercase', opacity: isHovered ? 1 : 0.82, transition: 'all 0.3s ease' }}>
          BENANG MERAH COMMUNITY
        </text>
      </svg>
    </div>
  );
}
