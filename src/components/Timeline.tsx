'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  header: string;
  badge: string;
  subheader: string;
  location?: string;
  description?: string[];
  skills?: string[];
  index?: number;
}

const TimelineItem = ({ 
  header, 
  badge, 
  subheader,
  location,
  description = [],
  skills = [],
  index = 0
}: TimelineItemProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={cn(
      "relative md:w-1/2 mb-8",
      isEven ? "md:ml-auto md:pl-8" : "md:pr-8"
    )}>
      {/* Connecting Line */}
      <div className="hidden md:block absolute top-8 w-8 h-[2px] bg-primary/30"
           style={{ 
             [isEven ? 'left' : 'right']: '-32px',
           }} 
      />

      {/* Timeline Dot */}
      <div className={cn(
        "absolute top-6 z-10 w-3 h-3 rounded-full bg-primary",
        isEven ? "-left-[5px] md:left-auto md:-right-[5px]" : "-left-[5px]"
      )} />

      <Card className="backdrop-blur-sm bg-background/80">
        <div className="p-6 space-y-4">
          {/* Header Section */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-foreground">{header}</h3>
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {badge}
              </span>
            </div>
            
            <div className="text-base text-muted-foreground">{subheader}</div>
            
            {location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {/* Role & Responsibilities */}
          {description.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Role & Responsibilities</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {description.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Tags */}
          {skills.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default function Timeline({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  
  return (
    <div className="relative">
      {/* Central Timeline Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/30 transform md:-translate-x-px" />
      
      {/* Timeline Items */}
      <div className="relative">
        {items.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index } as Partial<TimelineItemProps>);
          }
          return child;
        })}
      </div>
    </div>
  );
}

Timeline.Item = TimelineItem; 