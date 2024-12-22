import { FC } from 'react';
import { UiComponent } from "@/types";
import { cn } from '@/lib/utils';

type BlipProps = UiComponent<{
  color?: string;
  size?: number;
}>;

export const Blip: React.FC<BlipProps> = ({ className, color = "bg-red-500", size = 20 }) => {
  const sizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={ cn("relative flex items-center justify-center", className) }>
      {/* Wave 1 */}
      <div
        className={`absolute rounded-full ${color} animate-ping opacity-40`}
        style={{
          ...sizeStyle,
          width: `${size * 1.25}px`,
          height: `${size * 1.25}px`,
        }}
      ></div>
      {/* Wave 2 */}
      <div
        className={`absolute rounded-full ${color} animate-ping opacity-20`}
        style={{
          ...sizeStyle,
          width: `${size * 1.75}px`,
          height: `${size * 1.75}px`,
        }}
      ></div>
      {/* Main Blip */}
      <div
        className={`relative rounded-full opacity-60 shadow-blip ${color}`}
        style={sizeStyle}
      ></div>
    </div>
  );
};

Blip.displayName = 'Blip';
