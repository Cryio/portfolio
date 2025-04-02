"use client";

import { Technology } from "../types";
import { Card, CardContent } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

interface TechnologyCardProps {
  technology: Technology;
}

export function TechnologyCard({ technology }: TechnologyCardProps) {
  const { theme } = useTheme();

  // Get the appropriate logo based on theme
  const logoSrc = theme === "dark" && technology.darkLogo 
    ? technology.darkLogo 
    : technology.logo;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="overflow-hidden backdrop-blur-sm bg-card hover:bg-card/90 transition-all duration-300 hover:shadow-lg border-primary/20">
          <CardContent className="p-4 flex flex-col items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={technology.alt}
                  width={48}
                  height={48}
                  className="object-contain transition-all duration-300"
                  loading="lazy"
                />
              ) : (
                <span className="text-2xl text-foreground">{technology.icon}</span>
              )}
            </div>
            <span className="text-sm font-medium text-center text-foreground">{technology.name}</span>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="backdrop-blur-sm bg-popover border-primary/20">
        <div className="flex flex-col gap-2">
          {technology.description && (
            <p className="text-sm text-muted-foreground">{technology.description}</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
} 