'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Github, Star, GitFork } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface GithubProjectProps {
  repo: string;
}

interface GithubData {
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks: number;
  html_url: string;
}

const languageColors: { [key: string]: string } = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  C: '#555555',
  'C++': '#f34b7d',
  Assembly: '#6E4C13',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Lua: '#000080',
};

export default function GithubProject({ repo }: GithubProjectProps) {
  const [data, setData] = useState<GithubData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!repo) return;
      
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
            'User-Agent': 'Mozilla/4.0 Custom User Agent',
          },
          next: {
            revalidate: 3600 // Cache for 1 hour
          }
        });

        if (!response.ok) {
          throw new Error(
            response.status === 403 
              ? 'Rate limit exceeded. Please try again later.'
              : response.status === 404
              ? 'Repository not found'
              : 'Failed to fetch repository data'
          );
        }

        const responseData = await response.json();
        if (isMounted) {
          setData(responseData);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching repo data:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch repository data');
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [repo]);

  // Show skeleton loading state
  if (!data && !error) {
    return (
      <Card className="w-full">
        <div className="p-5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="mt-2 h-4 w-full" />
          <div className="mt-4 flex items-center gap-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="w-full">
        <div className="p-5">
          <div className="flex items-center gap-2 text-red-400">
            <Github className="h-6 w-6" />
            <p className="font-medium">Error loading repository</p>
          </div>
          <p className="mt-2 text-sm text-gray-400">{error}</p>
        </div>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <a
        href={data.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5"
      >
        <div className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          <h3 className="font-bold text-xl hover:underline hover:underline-offset-2">
            {data.full_name}
          </h3>
        </div>

        <p className="mt-2 text-gray-300">
          {data.description || 'No description available'}
        </p>

        <div className="mt-4 flex items-center gap-4">
          {data.language && (
            <div className="flex items-center gap-1">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: languageColors[data.language] || '#0077b6',
                }}
              />
              <span>{data.language}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{data.stargazers_count}</span>
          </div>

          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{data.forks}</span>
          </div>
        </div>
      </a>
    </Card>
  );
} 