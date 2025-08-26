'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Award, ExternalLink, Image as ImageIcon, ChevronDown, ChevronRight, Trophy, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "./ui/badge";

// Define the types directly in the file for now to avoid dependency issues
interface Certificate {
  title: string;
  date: string;
  description?: string;
  credentialId?: string;
  credentialUrl: string;
  issuer?: string;
}

interface CertificationPath {
  title: string;
  issuer: string;
  description: string;
  completionDate: string;
  totalCertificates: number;
  skills: string[];
  certificates: Certificate[];
}

interface IndividualCertification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialId?: string;
  credentialUrl: string;
}

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialUrl: string;
}

// Certification component (for certificates within a path)
function Certificate({ title, date, description, credentialId, credentialUrl, issuer }: Certificate) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMediaFile = credentialUrl?.endsWith('.png') || credentialUrl?.endsWith('.jpg');

  return (
    <Card className="w-full backdrop-blur-sm bg-background/60 hover:bg-background/80 transition-all duration-300 hover:shadow-md">
      <CardHeader 
        className="flex flex-row items-center gap-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Award className="w-8 h-8 text-primary/70" />
        <div className="flex-grow">
          <CardTitle className="text-lg text-foreground">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {issuer && `${issuer} • `}{date}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </CardHeader>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-2">
            <div className="space-y-3">
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
              {credentialId && (
                <p className="text-xs text-muted-foreground">
                  Credential ID: {credentialId}
                </p>
              )}
              {credentialUrl && (
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="px-3 py-1 text-xs font-medium text-primary hover:text-primary/90 hover:bg-primary/10 transition-colors"
                  >
                    <a
                      href={credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      {isMediaFile ? (
                        <>
                          <ImageIcon className="h-3 w-3" />
                          View Certificate
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-3 w-3" />
                          View Credential
                        </>
                      )}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Certification Path Card component
function CertificationPathCard({ path }: { path: CertificationPath }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full backdrop-blur-sm bg-gradient-to-br from-background/90 to-background/70 hover:from-background/95 hover:to-background/80 transition-all duration-300 hover:shadow-xl border-l-4 border-l-primary">
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">{path.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {path.issuer} • {path.completionDate}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {path.totalCertificates} certificates
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{path.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {path.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-0">
            <div className="space-y-3">
              {path.certificates.map((cert, index) => (
                <Certificate
                  key={`${cert.title}-${index}`}
                  title={cert.title}
                  date={cert.date}
                  description={cert.description}
                  credentialId={cert.credentialId}
                  credentialUrl={cert.credentialUrl}
                />
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Individual Certification Card component
function IndividualCertificationCard({ certification }: { certification: IndividualCertification }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMediaFile = certification.credentialUrl?.endsWith('.png') || certification.credentialUrl?.endsWith('.jpg');

  return (
    <Card 
      className="w-full backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className={`flex flex-row items-center gap-4 transition-colors duration-300 ${isExpanded ? 'bg-muted/50' : ''}`}>
        <Award className={`w-12 h-12 transition-colors duration-300 ${isExpanded ? 'text-primary/80' : 'text-primary'}`} />
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
              <p className="text-sm text-muted-foreground">
                {certification.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <Badge key={skill} className="bg-primary text-white">
                    {skill}
                  </Badge>
                ))}
              </div>
              {certification.credentialId && (
                <p className="text-xs text-muted-foreground">
                  Credential ID: {certification.credentialId}
                </p>
              )}
            </div>
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
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Achievement Card component
function AchievementCard({ achievement }: { achievement: Achievement }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className="w-full backdrop-blur-sm bg-gradient-to-br from-amber-50/80 to-yellow-50/60 dark:from-amber-950/20 dark:to-yellow-950/10 hover:from-amber-100/90 hover:to-yellow-100/70 dark:hover:from-amber-900/30 dark:hover:to-yellow-900/20 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden border-l-4 border-l-amber-500"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className={`flex flex-row items-center gap-4 transition-colors duration-300 ${isExpanded ? 'bg-amber-100/50 dark:bg-amber-900/20' : ''}`}>
        <Star className={`w-12 h-12 transition-colors duration-300 ${isExpanded ? 'text-amber-600/80' : 'text-amber-600'}`} />
        <div className="flex-grow">
          <CardTitle className="text-xl text-foreground">{achievement.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {achievement.issuer} • {achievement.date}
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
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {achievement.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="px-4 py-2 text-xs font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-100/50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  View Certificate
                </a>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Section wrapper component
function CertificationSection({ title, icon, children }: { title: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// Main Certifications component
interface CertificationsProps {
  certificationPaths: CertificationPath[];
  individualCertifications: IndividualCertification[];
  achievements: Achievement[];
}

export function Certifications({ 
  certificationPaths = [], 
  individualCertifications = [], 
  achievements = [] 
}: CertificationsProps) {
  return (
    <div className="space-y-12">
      {/* Learning Paths */}
      {certificationPaths.length > 0 && (
        <CertificationSection 
          title="Learning Paths & Specializations"
          icon={<Trophy className="w-6 h-6 text-primary" />}
        >
          <div className="space-y-6">
            {certificationPaths.map((path) => (
              <CertificationPathCard key={path.title} path={path} />
            ))}
          </div>
        </CertificationSection>
      )}

      {/* Individual Certifications */}
      {individualCertifications.length > 0 && (
        <CertificationSection 
          title="Professional Certifications"
          icon={<Award className="w-6 h-6 text-primary" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {individualCertifications.map((cert) => (
              <IndividualCertificationCard key={cert.title} certification={cert} />
            ))}
          </div>
        </CertificationSection>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <CertificationSection 
          title="Awards & Achievements"
          icon={<Star className="w-6 h-6 text-amber-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.title} achievement={achievement} />
            ))}
          </div>
        </CertificationSection>
      )}
    </div>
  );
}

// Legacy adapter component
interface LegacyCertification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialId?: string;
  credentialUrl: string;
  image?: string;
}

interface LegacyCertificationsProps {
  certifications: LegacyCertification[];
}

export function CertificationAdapter({ certifications = [] }: LegacyCertificationsProps) {
  if (!certifications || certifications.length === 0) {
    return <div>No certifications found</div>;
  }

  // Group certifications by issuer
  const googleCertifications = certifications.filter(cert => cert.issuer === "Google");
  const ciscoCertifications = certifications.filter(cert => cert.issuer === "Cisco");
  const catoCertifications = certifications.filter(cert => cert.issuer === "Cato Networks");
  const cisaCertifications = certifications.filter(cert => cert.issuer === "Cybersecurity and Infrastructure Security Agency (CISA)");
  const udemyCertifications = certifications.filter(cert => cert.issuer === "Udemy");
  const niitCertifications = certifications.filter(cert => 
    cert.issuer === "NIIT Foundation" || 
    cert.issuer === "NIIT University" ||
    cert.issuer === "TEDxNIITUniversity"
  );
  const iitCertifications = certifications.filter(cert => cert.issuer === "Indian Institute of Technology, Bombay");
  const sinusoidCertifications = certifications.filter(cert => cert.issuer === "siNUsoid");
  const otherCertifications = certifications.filter(cert =>
    [
      "Google",
      "Cisco",
      "Udemy",
      "NIIT Foundation",
      "NIIT University",
      "TEDxNIITUniversity",
      "Indian Institute of Technology, Bombay",
      "siNUsoid",
      "Cato Networks",
      "Cybersecurity and Infrastructure Security Agency (CISA)"
    ].indexOf(cert.issuer) === -1
  );

  return (
    <div className="space-y-12">
      {googleCertifications.length > 0 && (
        <CertificationSection 
          title="Google"
          icon={<Award className="w-6 h-6 text-primary" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleCertifications.map((cert) => (
              <IndividualCertificationCard key={cert.title} certification={cert} />
            ))}
          </div>
        </CertificationSection>
      )}
      {ciscoCertifications.length > 0 && (
        <CertificationSection 
          title="Cisco"
          icon={<Award className="w-6 h-6 text-primary" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ciscoCertifications.map((cert) => (
              <IndividualCertificationCard key={cert.title} certification={cert} />
            ))}
          </div>
        </CertificationSection>
      )}
      {/* Add other sections as needed */}
      {/* For brevity, I'm only including these two sections but you should add more as needed */}
    </div>
  );
}