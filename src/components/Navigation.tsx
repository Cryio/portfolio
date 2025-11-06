"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          Srachet Rai
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/roles">Role & Responsibilities</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/projects">Projects</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/blogs">Blogs</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/certifications">Certifications</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/terminal" className="flex items-center gap-1.5">
              <Terminal className="h-4 w-4" />
              Terminal
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" asChild>
                  <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/about">About</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/roles">Role & Responsibilities</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/projects">Projects</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/blogs">Blogs</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/certifications">Certifications</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/terminal" className="flex items-center gap-1.5">
                    <Terminal className="h-4 w-4" />
                    Terminal
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
} 