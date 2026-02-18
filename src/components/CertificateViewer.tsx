'use client';

import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface CertificateViewerProps {
  url: string;
  title: string;
  isExternal: boolean;
  onClose: () => void;
}

export function CertificateViewer({ url, title, isExternal, onClose }: CertificateViewerProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const modalContent = (
    <div 
      className="fixed inset-0 animate-in fade-in duration-200"
      style={{ zIndex: 9990, position: 'fixed' }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />
      
      {/* Modal Container */}
      <div className="relative h-full w-full flex items-center justify-center p-2 sm:p-3 lg:p-4">
        <div 
          className="relative bg-card/95 backdrop-blur-xl border-4 border-primary/20 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.7)] w-full max-w-7xl h-[95vh] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden ring-1 ring-border"
          style={{ boxShadow: '0 0 80px rgba(0,0,0,0.7), inset 0 0 40px rgba(255,255,255,0.03)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-3 py-2 border-b-2 border-primary/30 bg-gradient-to-r from-card via-card/95 to-card shrink-0">
            <h2 className="text-base sm:text-lg font-bold text-foreground line-clamp-1 drop-shadow-sm">
              {title}
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="shrink-0 h-8 w-8 border-2 hover:bg-destructive/10 hover:border-destructive/50 rounded-full transition-all duration-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-h-0 p-2 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 overflow-hidden">
            <div className="h-full w-full flex items-center justify-center border-2 border-border/40 rounded-xl bg-background/80 backdrop-blur-sm p-1 sm:p-2 shadow-inner overflow-hidden">
              {isExternal ? (
                <iframe
                  src={url}
                  className="w-full h-full rounded-lg border border-border/30"
                  title={title}
                  sandbox="allow-same-origin allow-scripts"
                />
              ) : (
                <img
                  src={url}
                  alt={title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
