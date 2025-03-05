
import React from "react";

interface AnimatedGradientBgProps {
  className?: string;
  children: React.ReactNode;
}

const AnimatedGradientBg: React.FC<AnimatedGradientBgProps> = ({ 
  className = "", 
  children 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] -right-[10%] w-[35%] h-[50%] rounded-full bg-gradient-to-l from-blue-500/20 to-cyan-500/20 blur-[100px] animate-[pulse_7s_ease-in-out_infinite_1s]" />
        <div className="absolute -bottom-[10%] left-[15%] w-[30%] h-[40%] rounded-full bg-gradient-to-t from-teal-500/20 to-blue-500/20 blur-[100px] animate-[pulse_9s_ease-in-out_infinite_2s]" />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradientBg;
