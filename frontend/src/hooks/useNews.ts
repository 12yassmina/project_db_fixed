import { useState, useEffect, useCallback } from 'react';
import { newsService, NewsArticle, NewsSearchParams, NewsSearchResponse, NewsCategory } from '@/services/newsService';

interface UseNewsSearchResult {
  articles: NewsArticle[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseFeaturedNewsResult {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseNewsArticleResult {
  article: NewsArticle | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook for searching news articles with filtering and pagination
 */
export const useNewsSearch = (params: NewsSearchParams = {}): UseNewsSearchResult => {
  const [data, setData] = useState<NewsSearchResponse>({
    articles: [],
    total: 0,
    page: 1,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await newsService.searchNews(params);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    ...data,
    isLoading,
    error,
    refetch: fetchNews,
  };
};

/**
 * Hook for fetching featured news articles
 */
export const useFeaturedNews = (limit: number = 3): UseFeaturedNewsResult => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await newsService.getFeaturedNews(limit);
      if (response.success) {
        setArticles(response.data);
      } else {
        setError(response.message || 'Failed to fetch featured news');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeaturedNews();
  }, [fetchFeaturedNews]);

  return {
    articles,
    isLoading,
    error,
    refetch: fetchFeaturedNews,
  };
};

/**
 * Hook for fetching a single news article
 */
export const useNewsArticle = (idOrSlug: string): UseNewsArticleResult => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    if (!idOrSlug) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await newsService.getNewsArticle(idOrSlug);
      if (response.success) {
        setArticle(response.data);
      } else {
        setError(response.message || 'Failed to fetch article');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [idOrSlug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return {
    article,
    isLoading,
    error,
    refetch: fetchArticle,
  };
};

/**
 * Hook for fetching news categories with counts
 */
export const useNewsCategories = () => {
  const [categories, setCategories] = useState<Array<{ category: NewsCategory; count: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await newsService.getNewsCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
};

/**
 * Hook for fetching trending tags
 */
export const useTrendingTags = (limit: number = 10) => {
  const [tags, setTags] = useState<Array<{ tag: string; count: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await newsService.getTrendingTags(limit);
      if (response.success) {
        setTags(response.data);
      } else {
        setError(response.message || 'Failed to fetch trending tags');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return {
    tags,
    isLoading,
    error,
    refetch: fetchTags,
  };
};
