import { TechnologySection as TechnologySectionType } from "../types";
import { TechnologyCard } from "./TechnologyCard";

interface TechnologySectionProps {
  section: TechnologySectionType;
}

export function TechnologySection({ section }: TechnologySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">{section.title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {section.technologies.map((technology) => (
          <TechnologyCard key={technology.name} technology={technology} />
        ))}
      </div>
    </div>
  );
} 