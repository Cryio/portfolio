'use client';

import { Certification as CertificationType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Award, ExternalLink, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CertificationProps {
  certification: CertificationType;
}

export function Certification({ certification }: CertificationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMediaFile = certification.credentialUrl?.endsWith('.png') || certification.credentialUrl?.endsWith('.jpg');

  return (
    <Card 
      className="w-full backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className={`flex flex-row items-center gap-4 transition-colors duration-300 ${isExpanded ? 'bg-muted/50' : ''}`}>
        {certification.image ? (
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={certification.image}
              alt={certification.title}
              fill
              className="object-contain"
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

interface CertificationSectionProps {
  title: string;
  certifications: CertificationType[];
}

export function CertificationSection({ title, certifications }: CertificationSectionProps) {
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

interface CertificationsProps {
  certifications: CertificationType[];
}

export function Certifications({ certifications }: CertificationsProps) {
  // Group certifications by issuer
  const googleCertifications = certifications.filter(cert => cert.issuer === "Google");
  const udemyCertifications = certifications.filter(cert => cert.issuer === "Udemy");
  const niitCertifications = certifications.filter(cert => 
    cert.issuer === "NIIT Foundation" || 
    cert.issuer === "NIIT University" ||
    cert.issuer === "TEDxNIITUniversity"
  );
  const iitCertifications = certifications.filter(cert => cert.issuer === "Indian Institute of Technology, Bombay");
  const sinusoidCertifications = certifications.filter(cert => cert.issuer === "siNUsoid");

  return (
    <div className="space-y-12">
      {googleCertifications.length > 0 && (
        <CertificationSection 
          title="Google Certifications" 
          certifications={googleCertifications} 
        />
      )}
      {udemyCertifications.length > 0 && (
        <CertificationSection 
          title="Udemy Certifications" 
          certifications={udemyCertifications} 
        />
      )}
      {niitCertifications.length > 0 && (
        <CertificationSection 
          title="NIIT Certifications" 
          certifications={niitCertifications} 
        />
      )}
      {iitCertifications.length > 0 && (
        <CertificationSection 
          title="IIT Bombay Certifications" 
          certifications={iitCertifications} 
        />
      )}
      {sinusoidCertifications.length > 0 && (
        <CertificationSection 
          title="siNUsoid Certifications" 
          certifications={sinusoidCertifications} 
        />
      )}
    </div>
  );
} 