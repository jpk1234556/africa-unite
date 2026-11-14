
interface AfricaLogoProps {
  className?: string;
  size?: number;
}

export const AfricaLogo: React.FC<AfricaLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-b from-[#132c21] to-[#0a1812] border border-[#f59e0b]/60 shadow-[0_0_12px_rgba(245,158,11,0.2)] p-1 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-[#facc15]"
        fill="currentColor"
      >
        {/* Stylized African Bull & Shield Emblem */}
        <path
          d="M50 8 C32 8, 20 22, 20 38 C20 54, 34 76, 50 92 C66 76, 80 54, 80 38 C80 22, 68 8, 50 8 Z"
          fill="none"
          stroke="#facc15"
          strokeWidth="3.5"
          opacity="0.5"
        />
        {/* Bull horns curved upwards */}
        <path
          d="M26 26 C28 14, 40 18, 48 30 C45 32, 40 32, 38 34 C30 38, 24 38, 26 26 Z"
          fill="#facc15"
        />
        <path
          d="M74 26 C72 14, 60 18, 52 30 C55 32, 60 32, 62 34 C70 38, 76 38, 74 26 Z"
          fill="#facc15"
        />
        {/* Bull head & nose contour */}
        <path
          d="M38 34 L62 34 L58 58 L50 68 L42 58 Z"
          fill="#facc15"
          stroke="#06130d"
          strokeWidth="2"
        />
        {/* Eye markers */}
        <circle cx="44" cy="42" r="2.5" fill="#06130d" />
        <circle cx="56" cy="42" r="2.5" fill="#06130d" />
        {/* Muzzle ring */}
        <circle cx="50" cy="56" r="3.5" fill="none" stroke="#06130d" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
