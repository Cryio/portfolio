import { Education as EducationType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface EducationProps {
  education: EducationType;
}

export function Education({ education }: EducationProps) {
  return (
    <Card className="w-full backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">{education.degree}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span>{education.institution}</span>
          <span>•</span>
          <span>{education.location}</span>
          <span>•</span>
          <span>{education.period}</span>
        </div>
        <ul className="list-disc list-inside space-y-2 text-foreground">
          {education.description.map((item: string, index: number) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 