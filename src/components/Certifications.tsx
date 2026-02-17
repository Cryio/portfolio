'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Award, ExternalLink, Image as ImageIcon, ChevronDown, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "./ui/badge";
import { CertificateViewer } from "./CertificateViewer";

type ViewableCertificate = {
  url: string;
  title: string;
  isExternal: boolean;
};

// Import interfaces from types file using type-only imports
import type { 
  Certification, 
  Achievement, 
  CertificationPath 
} from "../types";

// Component prop interfaces
interface CertificationProps {
  certification: Certification;
  onViewCertificate?: (url: string, title: string, isExternal: boolean) => void;
}

interface CertificationPathProps {
  certificationPath: CertificationPath;
  onViewCertificate?: (url: string, title: string, isExternal: boolean) => void;
}

interface CertificationsProps {
  certificationPaths?: CertificationPath[];
  individualCertifications?: Certification[];
  achievements?: Achievement[];
}

// Individual Certification Component
export function Certification({ certification, onViewCertificate }: CertificationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMediaFile = certification.credentialUrl?.endsWith('.png') || certification.credentialUrl?.endsWith('.jpg') || certification.credentialUrl?.endsWith('.pdf');
  const isExternalUrl = certification.credentialUrl?.startsWith('http');

  return (
    <Card 
      className="backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden border border-border"
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
          <CardTitle className="text-xl text-foreground font-bold">{certification.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {certification.issuer} • {certification.date}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 text-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
                    <Badge key={skill} variant="outline" className="border-primary/30 text-foreground bg-primary/10">
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
                  className="px-4 py-2 text-xs font-medium text-primary hover:text-primary/90 hover:bg-primary/10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCertificate?.(certification.credentialUrl!, certification.title, !!isExternalUrl);
                  }}
                >
                  <span className="flex items-center gap-1.5">
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
                  </span>
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
export function CertificationPath({ certificationPath, onViewCertificate }: CertificationPathProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isPathMediaFile = certificationPath.pathCredentialUrl
    ? /\.(png|jpe?g|gif|webp|pdf)$/i.test(certificationPath.pathCredentialUrl)
    : false;
  const isExternalPath = certificationPath.pathCredentialUrl?.startsWith('http');

  return (
    <Card className="backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg border border-border">
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
              <CardTitle className="text-2xl text-foreground font-bold mb-1">
                {certificationPath.title}
              </CardTitle>
              <div className="text-sm text-muted-foreground mb-2">
                {certificationPath.issuer} • Completed {certificationPath.completionDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <GraduationCap className="w-4 h-4" />
                <span>{certificationPath.totalCertificates} Certifications</span>
              </div>
            </div>
          </div>
<div className="flex items-center gap-2">
            {certificationPath.pathCredentialUrl && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-xs sm:text-sm border-border text-foreground hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewCertificate?.(certificationPath.pathCredentialUrl!, certificationPath.title, !!isExternalPath);
                }}
              >
                <span className="flex items-center gap-1">
                  {isPathMediaFile ? (
                    <ImageIcon className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                  View Certification
                </span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 text-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {!isExpanded && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              {certificationPath.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {certificationPath.skills.slice(0, 5).map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="text-xs border-border text-foreground"
                >
                  {skill}
                </Badge>
              ))}
              {certificationPath.skills.length > 5 && (
                <Badge 
                  variant="outline" 
                  className="text-xs border-border text-foreground"
                >
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
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {certificationPath.description}
                </p>
<div className="flex flex-wrap gap-2 mb-6">
                  {certificationPath.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-primary/30 text-foreground bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {certificationPath.certificates.map((cert) => (
                  <div key={cert.title} className="p-4 bg-muted/30 rounded-lg border border-border">
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
                              <Badge key={skill} variant="outline" className="text-xs px-1 py-0 border-primary/30 text-foreground bg-primary/10">
                                {skill}
                              </Badge>
                            ))}
                            {cert.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs px-1 py-0 border-primary/30 text-foreground bg-primary/10">
                                +{cert.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
{cert.credentialUrl && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2 text-xs hover:bg-muted text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewCertificate?.(cert.credentialUrl!, cert.title, cert.credentialUrl!.startsWith('http'));
                            }}
                          >
                            <span className="flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              View
                            </span>
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
interface CertificationSectionProps {
  title: string;
  certifications: (Certification | Achievement)[];
  onViewCertificate?: (url: string, title: string, isExternal: boolean) => void;
}

export function CertificationSection({ title, certifications, onViewCertificate }: CertificationSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <Certification key={cert.title} certification={cert} onViewCertificate={onViewCertificate} />
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
  const [viewingCertificate, setViewingCertificate] = useState<ViewableCertificate | null>(null);

  const handleViewCertificate = (url: string, title: string, isExternal: boolean) => {
    setViewingCertificate({ url, title, isExternal });
  };

  const handleCloseViewer = () => {
    setViewingCertificate(null);
  };

  return (
    <div className="space-y-12">
      {/* Certificate Viewer Modal */}
      {viewingCertificate && (
        <CertificateViewer
          url={viewingCertificate.url}
          title={viewingCertificate.title}
          isExternal={viewingCertificate.isExternal}
          onClose={handleCloseViewer}
        />
      )}

      {/* Certification Paths Section */}
      {certificationPaths.length > 0 && (
        <div className="mb-12">
          {/* Main Title - Forced Foreground Color */}
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Certification Tracks & Learning Paths
          </h2>
          <div className="space-y-6">
            {certificationPaths.map((path) => (
              <CertificationPath key={path.title} certificationPath={path} onViewCertificate={handleViewCertificate} />
            ))}
          </div>
        </div>
      )}

      {/* Individual Certifications */}
      {individualCertifications.length > 0 && (
        <CertificationSection 
          title="Individual Certifications" 
          certifications={individualCertifications}
          onViewCertificate={handleViewCertificate}
        />
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <CertificationSection 
          title="Achievements & Recognition" 
          certifications={achievements}
          onViewCertificate={handleViewCertificate}
        />
      )}
    </div>
  );
}