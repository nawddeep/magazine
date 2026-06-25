// src/hooks/useMagazineData.ts
import { useState, useEffect } from 'react';
import { MagazineIssue } from '../types';

export const useMagazineData = () => {
  const [issues, setIssues] = useState<MagazineIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vanguard_issues');
      const parsed: MagazineIssue[] = saved ? JSON.parse(saved) : [];
      setIssues(parsed);
    } catch (e) {
      setError('Failed to load issues');
    } finally {
      setLoading(false);
    }
  }, []);

  const latestIssue = issues.reduce((prev, curr) => {
    if (!prev) return curr;
    const prevNum = parseInt(prev.issueNumber, 10);
    const currNum = parseInt(curr.issueNumber, 10);
    return currNum > prevNum ? curr : prev;
  }, issues[0] || null);

  const recentIssues = [...issues]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 5);

  const totalIssues = issues.length;

  // Derive top categories dynamically from the loaded issue catalog
  const topCategories = Array.from(
    new Set(issues.filter((i) => i.status === 'Published').map((i) => i.category))
  ).filter(Boolean);

  return { issues, loading, error, latestIssue, recentIssues, totalIssues, topCategories };
};
