export default function SanjayAvatar() {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Sanjay G – UI/UX Designer"
    >
      <defs>
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#c19a6b" />
        </linearGradient>
        <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="200" height="240" fill="url(#bgGradient)" />

      {/* Head */}
      <circle cx="100" cy="70" r="45" fill="url(#skinGradient)" />

      {/* Hair */}
      <path d="M 55 70 A 45 45 0 0 1 145 70 L 145 45 A 45 45 0 0 0 55 45 Z" fill="#1a1a1a" />

      {/* Eyes */}
      <circle cx="85" cy="60" r="4" fill="#fff" />
      <circle cx="115" cy="60" r="4" fill="#fff" />
      <circle cx="85" cy="60" r="2.5" fill="#000" />
      <circle cx="115" cy="60" r="2.5" fill="#000" />

      {/* Smile */}
      <path d="M 85 75 Q 100 82 115 75" stroke="#8b6f47" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="90" y="108" width="20" height="12" fill="url(#skinGradient)" />

      {/* Body - Shirt */}
      <path
        d="M 60 120 L 75 125 L 75 160 Q 75 170 65 170 L 65 140 L 60 135 Z"
        fill="url(#shirtGradient)"
      />
      <path
        d="M 140 120 L 125 125 L 125 160 Q 125 170 135 170 L 135 140 L 140 135 Z"
        fill="url(#shirtGradient)"
      />
      <rect x="70" y="120" width="60" height="50" fill="url(#shirtGradient)" rx="3" />

      {/* Shirt accent - code symbol */}
      <g transform="translate(100, 145)" opacity="0.3">
        <text x="0" y="0" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="monospace" fontWeight="bold">
          {'</>'}
        </text>
      </g>

      {/* Left arm */}
      <ellipse cx="45" cy="140" rx="12" ry="35" fill="url(#skinGradient)" transform="rotate(-25 45 140)" />

      {/* Right arm */}
      <ellipse cx="155" cy="140" rx="12" ry="35" fill="url(#skinGradient)" transform="rotate(25 155 140)" />

      {/* Left hand holding something */}
      <circle cx="25" cy="170" r="8" fill="url(#skinGradient)" />

      {/* Right hand */}
      <circle cx="175" cy="170" r="8" fill="url(#skinGradient)" />

      {/* Subtle decorative element - highlight */}
      <ellipse cx="80" cy="50" rx="8" ry="12" fill="#fff" opacity="0.15" />
    </svg>
  );
}
