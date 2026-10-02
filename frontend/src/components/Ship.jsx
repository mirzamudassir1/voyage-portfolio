export default function Ship() {
  return (
    <div className="ship-wrap" aria-hidden="true">
      <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
        {/* hull */}
        <path
          d="M20 80 L120 80 L105 105 L35 105 Z"
          fill="#7a4a26"
          stroke="#4a2c15"
          strokeWidth="2"
        />
        {/* mast */}
        <rect x="68" y="15" width="4" height="68" fill="#4a2c15" />
        {/* main sail */}
        <path d="M72 20 L72 70 L108 62 Q86 44 72 20 Z" fill="#f2e8d5" />
        {/* front sail */}
        <path d="M68 30 L68 68 L40 60 Q56 44 68 30 Z" fill="#e4d5ae" />
        {/* flag */}
        <path d="M72 15 L90 20 L72 25 Z" fill="#c08a3e" />
      </svg>
    </div>
  );
}
