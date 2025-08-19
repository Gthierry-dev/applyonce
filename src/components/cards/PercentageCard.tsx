import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

type GlowColor = "teal" | "blue" | "purple" | "green" | "red" | "orange" | "pink";
type CardSize = "sm" | "md" | "lg";

export interface PercentageCardProps {
  percentage?: number;
  title?: string;
  features?: string[];
  glowColor?: GlowColor;
  size?: CardSize;
}

const PercentageCard: React.FC<PercentageCardProps> = ({
  percentage = 85,
  title = "STRONG MATCH",
  features = ["Growth Opportunities", "No H1B"],
  glowColor = "teal",
  size = "md",
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const sizeClasses: Record<CardSize, { container: string; circle: string; text: string; title: string; features: string }> = {
    sm: {
      container: "h-[200px] min-w-[120px] p-3",
      circle: "w-16 h-16",
      text: "text-sm",
      title: "text-xs",
      features: "text-xs",
    },
    md: {
      container: "h-[250px] min-w-[140px] p-4",
      circle: "w-24 h-24",
      text: "text-lg",
      title: "text-sm",
      features: "text-xs",
    },
    lg: {
      container: "h-[300px] min-w-[160px] p-5",
      circle: "w-32 h-32",
      text: "text-xl",
      title: "text-base",
      features: "text-sm",
    },
  };

  const glowColors: Record<GlowColor, { glow: string; border: string; text: string; gradient: string }> = {
    teal: {
      glow: "shadow-[0_20px_40px_rgba(20,184,166,0.3)]",
      border: "border-teal-400",
      text: "text-teal-400",
      gradient: "from-teal-500/20 to-transparent",
    },
    blue: {
      glow: "shadow-[0_20px_40px_rgba(59,130,246,0.3)]",
      border: "border-blue-400",
      text: "text-blue-400",
      gradient: "from-blue-500/20 to-transparent",
    },
    purple: {
      glow: "shadow-[0_20px_40px_rgba(147,51,234,0.3)]",
      border: "border-purple-400",
      text: "text-purple-400",
      gradient: "from-purple-500/20 to-transparent",
    },
    green: {
      glow: "shadow-[0_20px_40px_rgba(34,197,94,0.3)]",
      border: "border-green-400",
      text: "text-green-400",
      gradient: "from-green-500/20 to-transparent",
    },
    red: {
      glow: "shadow-[0_20px_40px_rgba(239,68,68,0.3)]",
      border: "border-red-400",
      text: "text-red-400",
      gradient: "from-red-500/20 to-transparent",
    },
    orange: {
      glow: "shadow-[0_20px_40px_rgba(249,115,22,0.3)]",
      border: "border-orange-400",
      text: "text-orange-400",
      gradient: "from-orange-500/20 to-transparent",
    },
    pink: {
      glow: "shadow-[0_20px_40px_rgba(236,72,153,0.3)]",
      border: "border-pink-400",
      text: "text-pink-400",
      gradient: "from-pink-500/20 to-transparent",
    },
  };

  const currentSize = sizeClasses[size];
  const currentGlow = glowColors[glowColor];

  // Calculate stroke properties for circular progress
  const radius = size === "sm" ? 28 : size === "md" ? 36 : 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div
      className={`
        bg-gray-900 rounded-xl text-center relative overflow-hidden
        ${currentSize.container}
        ${currentGlow.glow}
        transition-all duration-500 hover:scale-105 cursor-pointer
      `}
    >
      {/* Glow effect from bottom */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-1/2
          bg-gradient-to-t ${currentGlow.gradient}
          blur-xl opacity-60
        `}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center">
        {/* Circular Progress */}
        <div className="relative mb-3">
          <svg
            className={`${currentSize.circle} transform -rotate-90`}
            viewBox={`0 0 ${radius * 2 + 16} ${radius * 2 + 16}`}
          >
            {/* Background circle */}
            <circle
              cx={radius + 8}
              cy={radius + 8}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            {/* Progress circle */}
            <circle
              cx={radius + 8}
              cy={radius + 8}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`${currentGlow.text} transition-all duration-1000 ease-out`}
              style={{ filter: `drop-shadow(0 0 8px currentColor)` }}
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-white font-bold ${currentSize.text}`}>
              {Math.round(animatedPercentage)}%
            </span>
          </div>
        </div>

        {/* Title */}
        <div className={`text-white font-bold ${currentSize.title} mb-3 tracking-wide`}>
          {title}
        </div>

        {/* Features */}
        <div className="space-y-1">
          {features.map((feature, index) => (
            <div key={index} className={`${currentSize.features} flex items-center justify-center gap-1`}>
              {feature.startsWith("✓") || feature.includes("Growth") || feature.includes("Benefits") ? (
                <>
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">{feature.replace("✓ ", "")}</span>
                </>
              ) : (
                <>
                  <div className="w-1 h-1 bg-white rounded-full" />
                  <span className="text-white">{feature}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PercentageCard;


