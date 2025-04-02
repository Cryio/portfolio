import { Project as ProjectType } from "../types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Image from "next/image";

interface ProjectProps {
  project: ProjectType;
}

export function Project({ project }: ProjectProps) {
  return (
    <Card className="w-full backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardTitle className="text-foreground">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="backdrop-blur-sm bg-secondary/80 text-secondary-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.github && (
          <Button 
            variant="outline" 
            asChild 
            className="backdrop-blur-sm bg-background/80 hover:bg-accent hover:text-accent-foreground"
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        )}
        {project.link && (
          <Button 
            asChild 
            className="backdrop-blur-sm bg-background/80 hover:bg-accent hover:text-accent-foreground"
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 