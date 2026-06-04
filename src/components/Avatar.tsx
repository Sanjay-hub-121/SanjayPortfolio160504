export default function SanjayAvatar() {
  return (
    <svg
      viewBox="0 0 420 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Sanjay G – UI/UX Designer sitting at a desk with a laptop"
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2" />
        </radialGradient>
        <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d2b1f" />
          <stop offset="100%" stopColor="#2a1d14" />
        </linearGradient>
        <linearGradient id="laptopBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d3748" />
          <stop offset="100%" stopColor="#1a202c" />
        </linearGradient>
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c2128" />
          <stop offset="100%" stopColor="#0d1117" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B4513" />
          <stop offset="100%" stopColor="#4a3011" />
        </linearGradient>
        <linearGradient id="skinLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a5423" />
          <stop offset="100%" stopColor="#5a3f1a" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.4" />
        </filter>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="screenClip">
          <rect x="130" y="300" width="140" height="88" rx="4" />
        </clipPath>
      </defs>

      {/* Background glow */}
      <ellipse cx="210" cy="380" rx="180" ry="120" fill="url(#bgGlow)" />

      {/* DESK */}
      <rect x="60" y="385" width="300" height="18" rx="4" fill="url(#deskGrad)" filter="url(#shadow)" />
      <rect x="80" y="403" width="12" height="60" rx="3" fill="#2a1d14" />
      <rect x="328" y="403" width="12" height="60" rx="3" fill="#2a1d14" />

      {/* LAPTOP BASE (closed bottom half on desk) */}
      <rect x="115" y="370" width="190" height="18" rx="6" fill="url(#laptopBody)" />

      {/* LAPTOP SCREEN (open) */}
      <rect x="118" y="220" width="184" height="152" rx="8" fill="#1a202c" filter="url(#shadow)" />
      {/* Screen bezel */}
      <rect x="126" y="228" width="168" height="130" rx="4" fill="#0d1117" />
      {/* Screen content glow */}
      <rect x="128" y="230" width="164" height="126" rx="3" fill="url(#screenGlow)" opacity="0.15" />
      {/* Screen content – code editor mockup */}
      <rect x="130" y="232" width="160" height="122" rx="3" fill="#0d1117" />
      {/* Code lines */}
      <rect x="138" y="242" width="60" height="3" rx="1.5" fill="#60a5fa" opacity="0.8" />
      <rect x="138" y="250" width="90" height="3" rx="1.5" fill="#94a3b8" opacity="0.5" />
      <rect x="145" y="258" width="75" height="3" rx="1.5" fill="#4ade80" opacity="0.6" />
      <rect x="145" y="266" width="55" height="3" rx="1.5" fill="#94a3b8" opacity="0.4" />
      <rect x="145" y="274" width="80" height="3" rx="1.5" fill="#f472b6" opacity="0.5" />
      <rect x="138" y="282" width="40" height="3" rx="1.5" fill="#60a5fa" opacity="0.7" />
      <rect x="138" y="290" width="100" height="3" rx="1.5" fill="#94a3b8" opacity="0.4" />
      <rect x="145" y="298" width="65" height="3" rx="1.5" fill="#fbbf24" opacity="0.5" />
      <rect x="145" y="306" width="85" height="3" rx="1.5" fill="#94a3b8" opacity="0.3" />
      <rect x="138" y="314" width="50" height="3" rx="1.5" fill="#60a5fa" opacity="0.6" />
      {/* Blinking cursor */}
      <rect x="193" y="314" width="2" height="10" rx="1" fill="#60a5fa" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0;0.9" dur="1s" repeatCount="indefinite" />
      </rect>
      {/* Screen bottom bar */}
      <rect x="130" y="342" width="160" height="8" rx="2" fill="#161b22" />
      <rect x="134" y="344" width="30" height="4" rx="2" fill="#3b82f6" opacity="0.4" />

      {/* Laptop hinge */}
      <rect x="113" y="368" width="194" height="6" rx="3" fill="#374151" />

      {/* BODY / TORSO */}
      {/* Suit jacket */}
      <path d="M130 460 L130 340 Q145 330 160 335 L175 360 L210 350 L245 360 L260 335 Q275 330 290 340 L290 460 Z"
        fill="url(#suitGrad)" />
      {/* Suit lapels */}
      <path d="M175 360 L190 340 L210 350" fill="#161b22" stroke="#21262d" strokeWidth="0.5" />
      <path d="M245 360 L230 340 L210 350" fill="#161b22" stroke="#21262d" strokeWidth="0.5" />
      {/* White shirt */}
      <path d="M190 340 L210 345 L230 340 L215 400 L205 400 Z" fill="#e2e8f0" />
      {/* Blue tie */}
      <path d="M205 345 L215 345 L218 380 L210 390 L202 380 Z" fill="#1d4ed8" />
      <path d="M207 347 L213 347 L215 365 L210 370 L205 365 Z" fill="#2563eb" />
      {/* Tie knot */}
      <ellipse cx="210" cy="347" rx="5" ry="4" fill="#1e40af" />

      {/* LEFT ARM */}
      <path d="M130 340 L105 380 L115 395 L148 360 Z" fill="url(#suitGrad)" />
      {/* Left hand on keyboard */}
      <ellipse cx="110" cy="390" rx="14" ry="10" fill="url(#skinLight)" />
      {/* fingers */}
      <rect x="100" y="383" width="5" height="10" rx="2.5" fill="url(#skinLight)" transform="rotate(-10 102 388)" />
      <rect x="107" y="381" width="5" height="12" rx="2.5" fill="url(#skinLight)" transform="rotate(-5 109 387)" />
      <rect x="114" y="381" width="5" height="12" rx="2.5" fill="url(#skinLight)" transform="rotate(0 116 387)" />
      <rect x="121" y="382" width="5" height="11" rx="2.5" fill="url(#skinLight)" transform="rotate(8 123 387)" />

      {/* RIGHT ARM */}
      <path d="M290 340 L315 378 L305 393 L272 360 Z" fill="url(#suitGrad)" />
      {/* Right hand on trackpad */}
      <ellipse cx="310" cy="387" rx="14" ry="10" fill="url(#skinLight)" />
      <rect x="300" y="380" width="5" height="10" rx="2.5" fill="url(#skinLight)" transform="rotate(-8 302 385)" />
      <rect x="307" y="378" width="5" height="12" rx="2.5" fill="url(#skinLight)" transform="rotate(-3 309 384)" />
      <rect x="314" y="379" width="5" height="11" rx="2.5" fill="url(#skinLight)" transform="rotate(4 316 384)" />
      <rect x="321" y="381" width="4" height="10" rx="2" fill="url(#skinLight)" transform="rotate(10 323 386)" />

      {/* NECK */}
      <rect x="200" y="310" width="20" height="35" rx="8" fill="url(#skinLight)" />

      {/* HEAD */}
      <ellipse cx="210" cy="275" rx="52" ry="60" fill="url(#skinLight)" filter="url(#shadow)" />
      {/* Cheekbone shadow - more prominent */}
      <ellipse cx="165" cy="285" rx="18" ry="14" fill="#4a3011" opacity="0.35" />
      <ellipse cx="255" cy="285" rx="18" ry="14" fill="#4a3011" opacity="0.35" />

      {/* HAIR – short black wavy */}
      <ellipse cx="210" cy="228" rx="52" ry="28" fill="#111111" />
      {/* Hair texture/waves */}
      <path d="M162 240 Q175 228 190 234 Q200 228 210 232 Q222 225 238 232 Q250 228 258 240"
        fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M163 248 Q175 238 188 242 Q198 235 210 240 Q222 233 237 240 Q249 237 257 248"
        fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      {/* Side hair */}
      <ellipse cx="162" cy="262" rx="10" ry="20" fill="#111111" />
      <ellipse cx="258" cy="262" rx="10" ry="20" fill="#111111" />

      {/* EARS */}
      <ellipse cx="159" cy="278" rx="9" ry="12" fill="url(#skinGrad)" />
      <ellipse cx="261" cy="278" rx="9" ry="12" fill="url(#skinGrad)" />
      {/* Ear inner detail */}
      <ellipse cx="159" cy="278" rx="5" ry="7" fill="#6B4220" opacity="0.5" />
      <ellipse cx="261" cy="278" rx="5" ry="7" fill="#6B4220" opacity="0.5" />

      {/* BEARD / STUBBLE - darker and more prominent */}
      {/* Chin beard */}
      <ellipse cx="210" cy="318" rx="20" ry="10" fill="#1a1a1a" opacity="0.75" />
      {/* Mustache */}
      <path d="M193 302 Q202 307 210 305 Q218 307 227 302"
        fill="none" stroke="#0a0a0a" strokeWidth="3.5" strokeLinecap="round" />
      {/* Stubble dots - denser pattern */}
      {[185,189,193,197,202,207,212,217,221,226,230].map((x, i) => (
        <circle key={i} cx={x} cy={310 + (i % 2) * 3} r="1.3" fill="#1a1a1a" opacity="0.5" />
      ))}
      {[187,194,201,208,215,223,229].map((x, i) => (
        <circle key={i + 20} cx={x} cy={315 + (i % 2) * 2} r="1.1" fill="#1a1a1a" opacity="0.45" />
      ))}

      {/* EYES */}
      {/* Eye whites */}
      <ellipse cx="188" cy="272" rx="14" ry="9" fill="#fafbfc" />
      <ellipse cx="232" cy="272" rx="14" ry="9" fill="#fafbfc" />
      {/* Irises - dark brown */}
      <circle cx="188" cy="272" r="6.5" fill="#1a1008" />
      <circle cx="232" cy="272" r="6.5" fill="#1a1008" />
      {/* Pupils - darker and smaller */}
      <circle cx="188" cy="272" r="3.2" fill="#0a0605" />
      <circle cx="232" cy="272" r="3.2" fill="#0a0605" />
      {/* Eye shine */}
      <circle cx="190" cy="270" r="1.8" fill="white" opacity="0.85" />
      <circle cx="234" cy="270" r="1.8" fill="white" opacity="0.85" />
      {/* Eyebrows - thicker and more angular */}
      <path d="M176 260 Q188 255 200 258" fill="none" stroke="#0a0a0a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M220 258 Q232 255 244 260" fill="none" stroke="#0a0a0a" strokeWidth="3.5" strokeLinecap="round" />

      {/* GLASSES */}
      {/* Left frame */}
      <rect x="172" y="263" width="34" height="20" rx="5" fill="none" stroke="#0a0a0a" strokeWidth="3.5" />
      {/* Right frame */}
      <rect x="214" y="263" width="34" height="20" rx="5" fill="none" stroke="#0a0a0a" strokeWidth="3.5" />
      {/* Nose bridge */}
      <path d="M206 273 L214 273" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
      {/* Left temple */}
      <path d="M172 270 L161 268" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right temple */}
      <path d="M248 270 L259 268" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lens shine - subtle */}
      <ellipse cx="189" cy="272" rx="12" ry="8" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
      <ellipse cx="231" cy="272" rx="12" ry="8" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />

      {/* NOSE */}
      <path d="M210 275 Q205 292 198 296 Q204 299 210 298 Q216 299 222 296 Q215 292 210 275"
        fill="url(#skinLight)" opacity="0.7" />
      {/* Nose shading */}
      <ellipse cx="205" cy="290" rx="3" ry="4" fill="#4a3011" opacity="0.3" />
      <ellipse cx="215" cy="290" rx="3" ry="4" fill="#4a3011" opacity="0.3" />

      {/* MOUTH – confident expression */}
      <path d="M196 310 Q210 317 224 310" fill="none" stroke="#3d2811" strokeWidth="2.5" strokeLinecap="round" />

      {/* Screen reflection on glasses */}
      <rect x="174" y="265" width="30" height="16" rx="4" fill="#60a5fa" opacity="0.06" />
      <rect x="216" y="265" width="30" height="16" rx="4" fill="#60a5fa" opacity="0.06" />

      {/* Coffee mug on desk */}
      <rect x="330" y="356" width="26" height="30" rx="4" fill="#374151" />
      <rect x="332" y="358" width="22" height="6" rx="2" fill="#60a5fa" opacity="0.6" />
      <path d="M356 366 Q365 366 365 374 Q365 382 356 382" fill="none" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
      {/* Steam */}
      <path d="M340 354 Q342 348 340 342" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M347 354 Q349 346 347 340" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite" />
      </path>

      {/* Ambient screen light on face */}
      <ellipse cx="210" cy="285" rx="45" ry="40" fill="#3b82f6" opacity="0.04" />
    </svg>
  );
}
