// Decorative island silhouette sitting behind each section's panel.
// `variant` picks the shape so every island reads as visually distinct.
export default function IslandShape({ variant = "grass" }) {
  const shapes = {
    grass: (
      <svg viewBox="0 0 400 220" className="island-svg" aria-hidden="true">
        <ellipse cx="200" cy="170" rx="190" ry="40" fill="#1b6b93" opacity="0.5" />
        <path
          d="M40 160 Q60 90 160 80 Q220 40 300 80 Q380 100 360 160 Q200 200 40 160 Z"
          fill="#d9c27e"
        />
        <path
          d="M70 158 Q100 110 180 100 Q240 70 310 100 Q355 118 345 155 Q200 185 70 158 Z"
          fill="#4a7c4e"
        />
        <rect x="195" y="40" width="6" height="55" fill="#6b4423" />
        <path d="M201 42 L240 54 L201 66 Z" fill="#c08a3e" />
      </svg>
    ),
    rock: (
      <svg viewBox="0 0 400 220" className="island-svg" aria-hidden="true">
        <ellipse cx="200" cy="175" rx="170" ry="35" fill="#1b6b93" opacity="0.5" />
        <path
          d="M60 165 L110 100 L160 130 L210 70 L270 120 L330 95 L350 165 Q200 195 60 165 Z"
          fill="#9b8c74"
        />
        <path
          d="M85 162 L125 115 L165 140 L215 90 L265 130 L320 110 L335 160 Q200 182 85 162 Z"
          fill="#b7a788"
        />
        <path d="M150 95 Q145 60 170 40" stroke="#6b4423" strokeWidth="5" fill="none" />
        <path d="M170 40 Q140 30 120 45 M170 40 Q195 25 215 42 M170 40 Q165 20 180 10" stroke="#4a7c4e" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
    ),
    reef: (
      <svg viewBox="0 0 400 220" className="island-svg" aria-hidden="true">
        <ellipse cx="200" cy="185" rx="185" ry="30" fill="#1b6b93" opacity="0.4" />
        <path
          d="M50 180 L90 130 L120 170 L150 110 L185 175 L220 120 L255 175 L290 125 L325 175 L355 150 L370 180 Q200 205 50 180 Z"
          fill="#4fa8c9"
          opacity="0.85"
        />
        <path
          d="M70 178 L100 145 L125 172 L155 135 L185 178 L215 140 L250 178 L280 142 L315 178 Z"
          fill="#c08a3e"
          opacity="0.6"
        />
      </svg>
    ),
    peak: (
      <svg viewBox="0 0 400 220" className="island-svg" aria-hidden="true">
        <ellipse cx="200" cy="178" rx="175" ry="32" fill="#1b6b93" opacity="0.5" />
        <path d="M90 175 L200 40 L310 175 Z" fill="#8a7a63" />
        <path d="M200 40 L170 95 L230 95 Z" fill="#f2e8d5" />
        <path d="M110 175 L200 70 L290 175 Z" fill="#9b8c74" />
        <rect x="197" y="35" width="4" height="30" fill="#4a2c15" />
        <path d="M201 36 L228 45 L201 54 Z" fill="#c08a3e" />
      </svg>
    ),
    lighthouse: (
      <svg viewBox="0 0 400 220" className="island-svg" aria-hidden="true">
        <ellipse cx="200" cy="180" rx="150" ry="30" fill="#1b6b93" opacity="0.5" />
        <path d="M140 178 L175 120 L225 120 L260 178 Z" fill="#6b5d4f" />
        <rect x="185" y="55" width="30" height="70" fill="#f2e8d5" />
        <rect x="185" y="55" width="30" height="12" fill="#c08a3e" />
        <rect x="185" y="80" width="30" height="10" fill="#1b6b93" />
        <path d="M178 45 L222 45 L210 55 L190 55 Z" fill="#a33" />
        <circle cx="200" cy="65" r="5" fill="#f4d35e" opacity="0.9" />
      </svg>
    )
  };

  return shapes[variant] || shapes.grass;
}