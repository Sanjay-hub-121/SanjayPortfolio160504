export default function SanjayAvatar() {
  return (
    <svg
      viewBox="0 0 320 360"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Sanjay G – UI/UX Designer working at desk"
    >
      <defs>
        <linearGradient id="roomBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d1117" />
          <stop offset="100%" stopColor="#161b22" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d2b1f" />
          <stop offset="100%" stopColor="#2a1d14" />
        </linearGradient>
        <linearGradient id="laptopLidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d3748" />
          <stop offset="100%" stopColor="#1a202c" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d1b2a" />
          <stop offset="100%" stopColor="#1a2744" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%" stopColor="#b5824a" />
          <stop offset="100%" stopColor="#9a6b35" />
        </linearGradient>
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="10%" y2="100%">
          <stop offset="0%" stopColor="#2c2c2c" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="chairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <clipPath id="screenClip">
          <rect x="108" y="188" width="84" height="52" rx="2" />
        </clipPath>
      </defs>

      {/* Room background */}
      <rect width="320" height="360" fill="url(#roomBg)" />

      {/* Subtle wall grid lines */}
      <line x1="0" y1="180" x2="320" y2="180" stroke="#1e293b" strokeWidth="0.5" />
      <line x1="160" y1="0" x2="160" y2="180" stroke="#1e293b" strokeWidth="0.5" />

      {/* Ambient glow from screen */}
      <ellipse cx="160" cy="220" rx="90" ry="40" fill="url(#screenGlow)" />

      {/* ── Chair back ── */}
      <rect x="100" y="155" width="120" height="8" rx="4" fill="url(#chairGrad)" />
      <rect x="104" y="163" width="8" height="80" rx="4" fill="url(#chairGrad)" />
      <rect x="208" y="163" width="8" height="80" rx="4" fill="url(#chairGrad)" />

      {/* ── Desk ── */}
      <rect x="60" y="270" width="200" height="12" rx="3" fill="url(#deskGrad)" filter="url(#softShadow)" />
      {/* Desk legs */}
      <rect x="68" y="282" width="8" height="50" rx="2" fill="#2a1d14" />
      <rect x="244" y="282" width="8" height="50" rx="2" fill="#2a1d14" />

      {/* ── Laptop base (keyboard tray) ── */}
      <rect x="105" y="261" width="110" height="10" rx="3" fill="#252d3d" />
      <rect x="108" y="258" width="104" height="4" rx="2" fill="#1e2533" />
      {/* Keyboard keys hint */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={112 + i*15} y="259" width="11" height="2" rx="1" fill="#2d3a4a" opacity="0.8" />
      ))}

      {/* ── Laptop lid ── */}
      <rect x="108" y="200" width="104" height="62" rx="4" fill="url(#laptopLidGrad)" />
      {/* Screen bezel */}
      <rect x="111" y="203" width="98" height="56" rx="3" fill="#0d1117" />
      {/* Screen glow */}
      <rect x="113" y="205" width="94" height="52" rx="2" fill="url(#screenGrad)" />

      {/* Screen content – code editor */}
      <g clipPath="url(#screenClip)">
        {/* Code lines */}
        <rect x="116" y="210" width="35" height="2" rx="1" fill="#58a6ff" opacity="0.9" />
        <rect x="116" y="215" width="20" height="2" rx="1" fill="#7ee787" opacity="0.8" />
        <rect x="120" y="220" width="50" height="2" rx="1" fill="#79c0ff" opacity="0.7" />
        <rect x="120" y="225" width="38" height="2" rx="1" fill="#d2a8ff" opacity="0.7" />
        <rect x="120" y="230" width="44" height="2" rx="1" fill="#79c0ff" opacity="0.7" />
        <rect x="116" y="235" width="18" height="2" rx="1" fill="#7ee787" opacity="0.8" />
        <rect x="116" y="240" width="28" height="2" rx="1" fill="#58a6ff" opacity="0.6" />
        {/* Cursor blink */}
        <rect x="145" y="240" width="2" height="8" rx="1" fill="#58a6ff" opacity="0.9" />
      </g>
      {/* Laptop hinge */}
      <rect x="108" y="259" width="104" height="3" rx="1.5" fill="#141921" />

      {/* ── Body / Suit ── */}
      {/* Torso */}
      <path d="M 120 235 Q 115 260 118 272 L 202 272 Q 205 260 200 235 Q 185 245 160 247 Q 135 245 120 235 Z" fill="url(#suitGrad)" />
      {/* White shirt collar area */}
      <path d="M 148 230 L 152 245 L 160 247 L 168 245 L 172 230 Q 165 236 160 237 Q 155 236 148 230 Z" fill="#e8e8e8" />
      {/* Blue tie */}
      <path d="M 157 237 L 155 248 L 160 252 L 165 248 L 163 237 L 160 240 Z" fill="#2563eb" />
      <path d="M 157 250 L 158 260 L 160 262 L 162 260 L 163 250 L 160 252 Z" fill="#1d4ed8" />
      {/* Left lapel */}
      <path d="M 148 230 Q 138 232 128 242 L 130 248 Q 138 240 148 237 Z" fill="#3a3a3a" />
      {/* Right lapel */}
      <path d="M 172 230 Q 182 232 192 242 L 190 248 Q 182 240 172 237 Z" fill="#3a3a3a" />

      {/* ── Arms ── */}
      {/* Left arm resting on desk */}
      <path d="M 120 245 Q 105 255 95 265 L 105 270 Q 115 260 128 252 Z" fill="url(#suitGrad)" />
      {/* Left hand on desk */}
      <ellipse cx="92" cy="268" rx="10" ry="6" fill="url(#skinGrad)" />
      {/* Right arm reaching toward laptop */}
      <path d="M 200 245 Q 215 255 218 265 L 208 268 Q 205 258 192 250 Z" fill="url(#suitGrad)" />
      {/* Right hand on keyboard */}
      <ellipse cx="220" cy="267" rx="10" ry="6" fill="url(#skinGrad)" />

      {/* ── Neck ── */}
      <rect x="154" y="218" width="12" height="16" rx="5" fill="url(#skinGrad)" />

      {/* ── Head ── */}
      {/* Head shape – slightly oval */}
      <ellipse cx="160" cy="185" rx="38" ry="42" fill="url(#skinGrad)" />

      {/* ── Hair ── (natural wavy/slightly thick black hair) */}
      <path d="M 122 175 Q 120 148 135 137 Q 145 130 160 129 Q 175 130 186 138 Q 198 148 198 175 L 196 168 Q 194 148 185 140 Q 176 133 160 132 Q 144 133 136 140 Q 126 148 124 168 Z" fill="#111111" />
      {/* Hair top volume */}
      <path d="M 126 167 Q 124 148 136 138 Q 146 130 160 129 Q 174 130 184 138 Q 196 148 194 167 Q 188 152 178 145 Q 170 140 160 140 Q 150 140 142 145 Q 132 152 126 167 Z" fill="#1a1a1a" />
      {/* Side hair tufts */}
      <ellipse cx="123" cy="175" rx="6" ry="14" fill="#111111" />
      <ellipse cx="197" cy="175" rx="6" ry="14" fill="#111111" />

      {/* ── Glasses ── */}
      {/* Frame bridge */}
      <rect x="152" y="182" width="16" height="2" rx="1" fill="#222222" />
      {/* Left lens */}
      <rect x="124" y="177" width="27" height="18" rx="5" fill="none" stroke="#222222" strokeWidth="2.5" />
      {/* Right lens */}
      <rect x="169" y="177" width="27" height="18" rx="5" fill="none" stroke="#222222" strokeWidth="2.5" />
      {/* Left temple */}
      <line x1="124" y1="185" x2="118" y2="187" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
      {/* Right temple */}
      <line x1="196" y1="185" x2="202" y2="187" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
      {/* Lens tint (slight reflection) */}
      <rect x="126" y="179" width="23" height="14" rx="4" fill="#3b82f6" opacity="0.06" />
      <rect x="171" y="179" width="23" height="14" rx="4" fill="#3b82f6" opacity="0.06" />

      {/* ── Eyes ── */}
      <ellipse cx="137" cy="187" rx="5" ry="5.5" fill="#1a0f00" />
      <ellipse cx="183" cy="187" rx="5" ry="5.5" fill="#1a0f00" />
      {/* Eye shine */}
      <circle cx="139" cy="185" r="1.5" fill="#fff" opacity="0.6" />
      <circle cx="185" cy="185" r="1.5" fill="#fff" opacity="0.6" />

      {/* ── Eyebrows ── */}
      <path d="M 130 180 Q 137 177 145 179" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 175 179 Q 183 177 190 180" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* ── Nose ── */}
      <path d="M 158 192 Q 155 200 158 204 Q 160 206 162 204 Q 165 200 162 192" stroke="#7a5230" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="157" cy="204" rx="4" ry="2.5" fill="none" stroke="#7a5230" strokeWidth="1" opacity="0.7" />
      <ellipse cx="163" cy="204" rx="4" ry="2.5" fill="none" stroke="#7a5230" strokeWidth="1" opacity="0.7" />

      {/* ── Subtle beard / stubble ── */}
      <ellipse cx="160" cy="216" rx="20" ry="8" fill="#7a5230" opacity="0.18" />
      <ellipse cx="148" cy="213" rx="7" ry="5" fill="#6b4423" opacity="0.15" />
      <ellipse cx="172" cy="213" rx="7" ry="5" fill="#6b4423" opacity="0.15" />

      {/* ── Mouth / slight smile ── */}
      <path d="M 152 210 Q 160 215 168 210" stroke="#7a5230" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* ── Mug on desk ── */}
      <rect x="72" y="255" width="16" height="15" rx="3" fill="#1e3a8a" />
      <path d="M 88 259 Q 94 259 94 263 Q 94 267 88 267" stroke="#1e3a8a" strokeWidth="2" fill="none" />
      <rect x="73" y="255" width="14" height="3" rx="1.5" fill="#2563eb" opacity="0.6" />

      {/* ── Small sticky note on desk ── */}
      <rect x="222" y="252" width="22" height="18" rx="2" fill="#fef08a" opacity="0.85" />
      <line x1="225" y1="258" x2="241" y2="258" stroke="#a16207" strokeWidth="1" opacity="0.5" />
      <line x1="225" y1="263" x2="238" y2="263" stroke="#a16207" strokeWidth="1" opacity="0.5" />

      {/* Screen reflection on face */}
      <ellipse cx="160" cy="195" rx="30" ry="25" fill="#3b82f6" opacity="0.04" />
    </svg>
  );
}
