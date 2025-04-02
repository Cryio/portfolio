'use client';

import { useEffect, useState } from 'react';
import GithubProject from './GithubProject';
import { Repository } from '@/types';

interface GithubProjectsProps {
  username: string;
  featuredRepos?: string[];
}

export default function GithubProjects({ username, featuredRepos }: GithubProjectsProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isMounted = true;

    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
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
              ? 'User not found'
              : 'Failed to fetch repositories'
          );
        }

        const data = await response.json();
        
        // Filter out forked repositories
        const nonForkedRepos = data.filter((repo: Repository) => !repo.fork);

        if (isMounted) {
          setRepos(nonForkedRepos);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching repos:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
        }
      }
    };

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [username, mounted]);

  if (!mounted) {
    return null;
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-400 mb-2">Failed to load repositories</p>
        <p className="text-sm text-gray-400">{error}</p>
      </div>
    );
  }

  // If featuredRepos is provided, filter and order repos accordingly
  const displayRepos = featuredRepos
    ? featuredRepos
        .map(name => repos.find(repo => repo.name === name))
        .filter((repo): repo is Repository => repo !== undefined)
    : repos;

  if (!displayRepos.length && !error) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-400">No repositories found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayRepos.map((repo) => (
        <GithubProject key={repo.name} repo={`${username}/${repo.name}`} />
      ))}
    </div>
  );
} 