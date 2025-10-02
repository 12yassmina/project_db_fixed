import { ApiService, ApiResponse } from './apiService';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: NewsCategory;
  publishedDate: string;
  updatedDate?: string;
  author: string;
  authorAvatar?: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  slug?: string;
  viewCount?: number;
  likes?: number;
}

export type NewsCategory = 'Breaking' | 'Teams' | 'Matches' |  'Stadiums';

export interface NewsSearchParams {
  category?: NewsCategory | 'All';
  search?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface NewsSearchResponse {
  articles: NewsArticle[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

class NewsService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_BASE);
  }

  /**
   * Search for news articles with filtering and pagination
   */
  async searchNews(params: NewsSearchParams = {}): Promise<ApiResponse<NewsSearchResponse>> {
    try {
      // Try backend API first
      const response = await this.request<NewsSearchResponse>('/api/news/search', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Backend news search failed, using mock data:', error);
    }

    // Fallback to mock data
    return this.getMockNewsResponse(params);
  }

  /**
   * Get featured news articles
   */
  async getFeaturedNews(limit: number = 3): Promise<ApiResponse<NewsArticle[]>> {
    try {
      const response = await this.request<NewsArticle[]>(`/api/news/featured?limit=${limit}`);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Backend featured news failed, using mock data:', error);
    }

    // Fallback to mock data
    const mockData = this.getMockNewsData();
    const featured = mockData.filter(article => article.featured).slice(0, limit);
    
    return {
      success: true,
      data: featured,
      status: 200,
    };
  }

  /**
   * Get single news article by ID or slug
   */
  async getNewsArticle(idOrSlug: string): Promise<ApiResponse<NewsArticle>> {
    try {
      const response = await this.request<NewsArticle>(`/api/news/${idOrSlug}`);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Backend news article failed, using mock data:', error);
    }

    // Fallback to mock data
    const mockData = this.getMockNewsData();
    const article = mockData.find(a => a.id === idOrSlug || a.slug === idOrSlug);
    
    if (article) {
      return {
        success: true,
        data: article,
        status: 200,
      };
    }

    throw new Error('Article not found');
  }

  /**
   * Get news categories with article counts
   */
  async getNewsCategories(): Promise<ApiResponse<Array<{ category: NewsCategory; count: number }>>> {
    try {
      const response = await this.request<Array<{ category: NewsCategory; count: number }>>('/api/news/categories');
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Backend news categories failed, using mock data:', error);
    }

    // Fallback to mock data
    const mockData = this.getMockNewsData();
    const categories = mockData.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {} as Record<NewsCategory, number>);

    const categoryData = Object.entries(categories).map(([category, count]) => ({
      category: category as NewsCategory,
      count,
    }));

    return {
      success: true,
      data: categoryData,
      status: 200,
    };
  }

  /**
   * Get trending tags
   */
  async getTrendingTags(limit: number = 10): Promise<ApiResponse<Array<{ tag: string; count: number }>>> {
    try {
      const response = await this.request<Array<{ tag: string; count: number }>>(`/api/news/trending-tags?limit=${limit}`);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Backend trending tags failed, using mock data:', error);
    }

    // Fallback to mock data
    const mockData = this.getMockNewsData();
    const tagCounts = mockData.reduce((acc, article) => {
      article.tags?.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const trendingTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));

    return {
      success: true,
      data: trendingTags,
      status: 200,
    };
  }

  /**
   * Mock data generator for fallback
   */
  private getMockNewsResponse(params: NewsSearchParams): ApiResponse<NewsSearchResponse> {
    const mockData = this.getMockNewsData();
    let filtered = [...mockData];

    // Apply filters
    if (params.category && params.category !== 'All') {
      filtered = filtered.filter(article => article.category === params.category);
    }

    if (params.search) {
      const query = params.search.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (params.featured !== undefined) {
      filtered = filtered.filter(article => article.featured === params.featured);
    }

    if (params.tags && params.tags.length > 0) {
      filtered = filtered.filter(article =>
        params.tags!.some(tag => article.tags?.includes(tag))
      );
    }

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 6;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filtered.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filtered.length / limit);

    return {
      success: true,
      data: {
        articles: paginatedArticles,
        total: filtered.length,
        page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      status: 200,
    };
  }

  /**
   * Mock news data - World Cup Football focused
   */
  private getMockNewsData(): NewsArticle[] {
    return [
      {
        id: '1',
        title: 'Breaking: FIFA Confirms Additional Matches for Morocco',
        summary: 'Morocco will host 20 matches including a semi-final, making it the most significant World Cup presence in African history.',
        category: 'Breaking',
        publishedDate: '2024-12-20T08:30:00Z',
        author: 'FIFA Communications',
        readTime: '2 min read',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        featured: true,
        tags: ['breaking', 'fifa', 'matches', 'semi-final', 'morocco'],
        slug: 'fifa-confirms-additional-matches-morocco',
        viewCount: 45230,
        likes: 2156
      },
      {
        id: '2',
        title: 'Grand Stade Hassan II Ready for World Cup Matches',
        summary: 'The world\'s largest stadium in Casablanca is now complete and ready to host World Cup 2030 matches with 115,000 capacity.',
        category: 'Stadiums',
        publishedDate: '2024-12-19T10:00:00Z',
        author: 'FIFA Stadium Committee',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
        featured: true,
        tags: ['stadium', 'casablanca', 'world-cup', 'hassan-ii'],
        slug: 'grand-stade-hassan-ii-ready-world-cup',
        viewCount: 35420,
        likes: 1892
      },
      {
        id: '3',
        title: 'World Cup 2030 Ticket Sales Phase 3 Opens',
        summary: 'Final phase of ticket sales begins with special pricing for Moroccan fans and exclusive World Cup match packages.',
        category: 'Tickets',
        publishedDate: '2024-12-18T14:30:00Z',
        author: 'FIFA Ticketing Division',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        featured: true,
        tags: ['tickets', 'world-cup', 'fifa', 'morocco', 'sales'],
        slug: 'world-cup-2030-ticket-sales-phase-3',
        viewCount: 28150,
        likes: 1405
      },
      {
        id: '4',
        title: 'Brazil and Argentina Confirm Training Camps in Morocco',
        summary: 'South American giants choose Morocco as their World Cup 2030 base, with Brazil in Rabat and Argentina in Marrakech.',
        category: 'Teams',
        publishedDate: '2024-12-17T11:20:00Z',
        author: 'FIFA Technical Division',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
        featured: false,
        tags: ['teams', 'brazil', 'argentina', 'training', 'world-cup'],
        slug: 'brazil-argentina-training-camps-morocco',
        viewCount: 22870,
        likes: 1523
      },
      {
        id: '5',
        title: 'World Cup Opening Match: Morocco vs Spain Confirmed',
        summary: 'Historic opening match will see co-hosts Morocco face Spain at Grand Stade Hassan II in a highly anticipated clash.',
        category: 'Matches',
        publishedDate: '2024-12-16T16:45:00Z',
        author: 'FIFA Match Committee',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        featured: false,
        tags: ['opening-match', 'morocco', 'spain', 'world-cup', 'hassan-ii'],
        slug: 'world-cup-opening-match-morocco-spain',
        viewCount: 41340,
        likes: 2678
      },
      {
        id: '6',
        title: 'European Teams Announce World Cup Squad Preparations',
        summary: 'England, France, and Germany reveal their preliminary training schedules and squad selection processes for Morocco 2030.',
        category: 'Teams',
        publishedDate: '2024-12-15T13:00:00Z',
        author: 'UEFA Communications',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
        featured: false,
        tags: ['teams', 'europe', 'england', 'france', 'germany', 'squads'],
        slug: 'european-teams-world-cup-squad-preparations',
        viewCount: 18650,
        likes: 889
      },
      {
        id: '7',
        title: 'Rabat Stadium Hosts First World Cup Test Match',
        summary: 'Morocco national team defeats Tunisia 2-1 in the first official test match at the newly renovated Rabat Stadium.',
        category: 'Matches',
        publishedDate: '2024-12-14T20:00:00Z',
        author: 'Morocco Football Federation',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        featured: false,
        tags: ['test-match', 'morocco', 'tunisia', 'rabat', 'stadium'],
        slug: 'rabat-stadium-first-world-cup-test-match',
        viewCount: 15280,
        likes: 734
      },
      {
        id: '8',
        title: 'World Cup Group Stage Draw Set for January 2030',
        summary: 'FIFA announces the official World Cup 2030 group stage draw will take place in Casablanca, featuring all 48 qualified teams.',
        category: 'Breaking',
        publishedDate: '2024-12-13T15:45:00Z',
        author: 'FIFA Events Committee',
        readTime: '2 min read',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        featured: false,
        tags: ['draw', 'group-stage', 'fifa', 'casablanca', '48-teams'],
        slug: 'world-cup-group-stage-draw-january-2030',
        viewCount: 31280,
        likes: 1634
      },
      {
        id: '9',
        title: 'Tangier Stadium Renovation Complete for World Cup',
        summary: 'The historic Tangier Stadium has been fully renovated with modern facilities and increased capacity for World Cup matches.',
        category: 'Stadiums',
        publishedDate: '2024-12-12T09:30:00Z',
        author: 'Morocco Stadium Authority',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
        featured: false,
        tags: ['tangier', 'stadium', 'renovation', 'world-cup', 'capacity'],
        slug: 'tangier-stadium-renovation-complete',
        viewCount: 12450,
        likes: 567
      },
      {
        id: '10',
        title: 'African Nations Prepare for World Cup Qualifiers Final Round',
        summary: 'Nigeria, Senegal, and Egypt lead the charge as African teams compete for the remaining World Cup 2030 spots.',
        category: 'Teams',
        publishedDate: '2024-12-11T14:15:00Z',
        author: 'CAF Media Office',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
        featured: false,
        tags: ['qualifiers', 'africa', 'nigeria', 'senegal', 'egypt'],
        slug: 'african-nations-world-cup-qualifiers-final',
        viewCount: 19870,
        likes: 923
      }
    ];
  }
}

export const newsService = new NewsService();
