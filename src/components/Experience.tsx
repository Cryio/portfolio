import { Experience as ExperienceType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceProps {
  experience: ExperienceType;
}

export function Role({ experience }: ExperienceProps) {
  return (
    <Card className="backdrop-blur-sm bg-background/80">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{experience.title}</h3>
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary mt-2 sm:mt-0">
            {experience.period}
          </span>
        </div>
        
        <p className="text-lg text-muted-foreground mb-4">{experience.company}</p>
        
        <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
          {experience.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
} 