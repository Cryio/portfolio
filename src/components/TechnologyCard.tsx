"use client";

import { Technology } from "../types";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

interface TechnologyCardProps {
  technology: Technology;
}

export function TechnologyCard({ technology }: TechnologyCardProps) {
  const { theme } = useTheme();

  // Get the appropriate logo based on theme (this logic is unchanged)
  const logoSrc = theme === "dark" && technology.darkLogo 
    ? technology.darkLogo 
    : technology.logo;

  return (
    // The hover aspect has been changed to a 3D flip effect
    <div className="group h-36 w-full [perspective:1000px]">
      <div className="relative h-full w-full rounded-lg shadow-md transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Face: Visually identical to your original card */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border border-primary/20 bg-card p-4 text-center backdrop-blur-sm">
            <div className="relative flex h-12 w-12 items-center justify-center">
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={technology.alt}
                  width={48}
                  height={48}
                  sizes="48px"
                  className="object-contain"
                  loading="lazy"
                  style={{ aspectRatio: '1/1' }}
                />
              ) : (
                <span className="text-2xl text-foreground">{technology.icon}</span>
              )}
            </div>
            <span className="text-sm font-medium text-center text-foreground">{technology.name}</span>
          </div>
        </div>

        {/* Back Face: Shows the description on hover */}
        <div className="absolute inset-0 rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-primary/20 bg-card p-4 text-center backdrop-blur-sm">
            <h3 className="text-md font-bold text-primary">{technology.name}</h3>
            {technology.description && (
              <p className="mt-2 text-xs text-muted-foreground">{technology.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}