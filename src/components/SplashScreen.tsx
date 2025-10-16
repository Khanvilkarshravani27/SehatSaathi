import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-[#112D4E] flex items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <Heart className="w-16 h-16 text-[#3F72AF]" fill="#3F72AF" />
          </div>
          <Sparkles className="absolute top-0 right-8 w-8 h-8 text-[#DBE2EF] animate-bounce" />
          <Sparkles className="absolute bottom-4 left-8 w-6 h-6 text-white animate-bounce delay-150" />
        </div>
        <div className="space-y-2">
          <h1 className="text-white animate-slide-up" style={{ fontWeight: 900 }}>SehatSaathi</h1>
          <p className="text-[#DBE2EF] text-xl animate-slide-up delay-200">
            Your Health Companion
          </p>
        </div>
      </div>
    </div>
  );
}
