'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Award, ExternalLink, Image as ImageIcon, ChevronDown, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "./ui/badge";

// Import interfaces from types file using type-only imports to avoid conflicts
import type { 
  Certification, 
  Achievement, 
  CertificationPath 
} from "../types";

// Component prop interfaces
interface CertificationProps {
  certification: Certification;
}

interface CertificationPathProps {
  certificationPath: CertificationPath;
}

interface CertificationsProps {
  certificationPaths?: CertificationPath[];
  individualCertifications?: Certification[];
  achievements?: Achievement[];
}

// Individual Certification Component
export function Certification({ certification }: CertificationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMediaFile = certification.credentialUrl?.endsWith('.png') || certification.credentialUrl?.endsWith('.jpg');

  return (
    <Card 
      className="backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className={`flex flex-row items-center gap-4 transition-colors duration-300 ${isExpanded ? 'bg-muted/30' : ''}`}>
        {certification.image ? (
          <div className="relative w-16 h-16 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={certification.image}
              alt={certification.title}
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <Award className={`w-12 h-12 transition-colors duration-300 ${isExpanded ? 'text-primary/80' : 'text-primary'}`} />
        )}
        <div className="flex-grow">
          <CardTitle className="text-xl text-foreground">{certification.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {certification.issuer} • {certification.date}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {certification.description && (
                <p className="text-sm text-muted-foreground">
                  {certification.description}
                </p>
              )}
              {certification.skills && certification.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {certification.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
              {certification.credentialId && (
                <p className="text-xs text-muted-foreground">
                  Credential ID: {certification.credentialId}
                </p>
              )}
            </div>
            {certification.credentialUrl && (
              <div className="flex justify-end mt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="px-4 py-2 text-xs font-medium text-primary hover:text-primary/90 hover:bg-primary/10 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    {isMediaFile ? (
                      <>
                        <ImageIcon className="h-3.5 w-3.5" />
                        Show Certificate
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-3.5 w-3.5" />
                        Show Credential
                      </>
                    )}
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Certification Path Component (Expandable Group)
export function CertificationPath({ certificationPath }: CertificationPathProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isPathMediaFile = certificationPath.pathCredentialUrl
    ? /\.(png|jpe?g|gif|webp|pdf)$/i.test(certificationPath.pathCredentialUrl)
    : false;

  return (
    <Card className="backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg">
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-grow">
              <CardTitle className="text-2xl text-foreground mb-1">
                {certificationPath.title}
              </CardTitle>
              <div className="text-sm text-muted-foreground mb-2">
                {certificationPath.issuer} • Completed {certificationPath.completionDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <GraduationCap className="w-4 h-4" />
                <span className="font-medium">{certificationPath.totalCertificates} Certifications</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {certificationPath.pathCredentialUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-1 text-xs sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={certificationPath.pathCredentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  {isPathMediaFile ? (
                    <ImageIcon className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                  View Certification
                </a>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Path description and skills when collapsed */}
        {!isExpanded && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              {certificationPath.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {certificationPath.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {certificationPath.skills.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{certificationPath.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardHeader>

      {/* Expanded content showing all certificates */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-0 pb-6">
            <div className="space-y-4">
              <div className="border-t border-border/50 pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {certificationPath.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {certificationPath.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {certificationPath.certificates.map((cert) => (
                  <div key={cert.title} className="p-4 backdrop-blur-sm bg-background/60 rounded-lg border border-border/30">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-foreground text-sm mb-1 leading-tight">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {cert.date}
                        </p>
                        {cert.description && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {cert.description}
                          </p>
                        )}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {cert.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs px-1 py-0">
                                {skill}
                              </Badge>
                            ))}
                            {cert.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                +{cert.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                        {cert.credentialUrl && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            asChild
                            className="h-6 px-2 text-xs"
                          >
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Section Component for Individual Certs and Achievements
export function CertificationSection({ title, certifications }: { title: string; certifications: (Certification | Achievement)[] }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <Certification key={cert.title} certification={cert} />
        ))}
      </div>
    </div>
  );
}

// Main Certifications Component
export function Certifications({ 
  certificationPaths = [],
  individualCertifications = [],
  achievements = []
}: CertificationsProps) {
  return (
    <div className="space-y-12">
      {/* Certification Paths Section */}
      {certificationPaths.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Certification Tracks & Learning Paths
          </h2>
          <div className="space-y-6">
            {certificationPaths.map((path) => (
              <CertificationPath key={path.title} certificationPath={path} />
            ))}
          </div>
        </div>
      )}

      {/* Individual Certifications */}
      {individualCertifications.length > 0 && (
        <CertificationSection 
          title="Individual Certifications" 
          certifications={individualCertifications} 
        />
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <CertificationSection 
          title="Achievements & Recognition" 
          certifications={achievements} 
        />
      )}
    </div>
  );
}
