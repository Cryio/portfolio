'use client';

import GithubProjects from "../../components/GithubProjects";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function Projects() {
  const githubUsername = "Cryio";
  
  // List of featured repository names (exact matches)
  const featuredRepos = [
    'Wifi-CSI-Based-Activity-Recognition',
    'TinyLinux',
    'TCP-IP-in-C',
    'Synergy_Project',
    'healthmate',
    'Zen_Garden'
  ];

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
          Projects
        </h1>

        <div className="grid gap-8">
          {/* Featured Projects Section */}
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Featured Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <GithubProjects 
                username={githubUsername} 
                featuredRepos={featuredRepos}
              />
            </CardContent>
          </Card>

          {/* All GitHub Projects Section */}
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>All GitHub Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <GithubProjects username={githubUsername} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 