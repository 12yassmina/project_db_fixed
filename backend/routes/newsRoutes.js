const express = require('express');
const router = express.Router();

// Mock news data - World Cup Football focused
const mockNewsData = [
  {
    id: '1',
    title: 'Breaking: FIFA Confirms Additional Matches for Morocco',
    summary: 'Morocco will host 20 matches including a semi-final, making it the most significant World Cup presence in African history.',
    content: 'Full article content would go here...',
    category: 'Breaking',
    publishedDate: '2024-12-20T08:30:00Z',
    updatedDate: '2024-12-20T08:30:00Z',
    author: 'FIFA Communications',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
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
    content: 'Full article content would go here...',
    category: 'Stadiums',
    publishedDate: '2024-12-19T10:00:00Z',
    updatedDate: '2024-12-19T10:00:00Z',
    author: 'FIFA Stadium Committee',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
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
    content: 'Full article content would go here...',
    category: 'Tickets',
    publishedDate: '2024-12-18T14:30:00Z',
    updatedDate: '2024-12-18T14:30:00Z',
    author: 'FIFA Ticketing Division',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
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
    content: 'Full article content would go here...',
    category: 'Teams',
    publishedDate: '2024-12-17T11:20:00Z',
    updatedDate: '2024-12-17T11:20:00Z',
    author: 'FIFA Technical Division',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
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
    content: 'Full article content would go here...',
    category: 'Matches',
    publishedDate: '2024-12-16T16:45:00Z',
    updatedDate: '2024-12-16T16:45:00Z',
    author: 'FIFA Match Committee',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
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
    content: 'Full article content would go here...',
    category: 'Teams',
    publishedDate: '2024-12-15T13:00:00Z',
    updatedDate: '2024-12-15T13:00:00Z',
    author: 'UEFA Communications',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
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
    content: 'Full article content would go here...',
    category: 'Matches',
    publishedDate: '2024-12-14T20:00:00Z',
    updatedDate: '2024-12-14T20:00:00Z',
    author: 'Morocco Football Federation',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
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
    content: 'Full article content would go here...',
    category: 'Breaking',
    publishedDate: '2024-12-13T15:45:00Z',
    updatedDate: '2024-12-13T15:45:00Z',
    author: 'FIFA Events Committee',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
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
    content: 'Full article content would go here...',
    category: 'Stadiums',
    publishedDate: '2024-12-12T09:30:00Z',
    updatedDate: '2024-12-12T09:30:00Z',
    author: 'Morocco Stadium Authority',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
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
    content: 'Full article content would go here...',
    category: 'Teams',
    publishedDate: '2024-12-11T14:15:00Z',
    updatedDate: '2024-12-11T14:15:00Z',
    author: 'CAF Media Office',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    featured: false,
    tags: ['qualifiers', 'africa', 'nigeria', 'senegal', 'egypt'],
    slug: 'african-nations-world-cup-qualifiers-final',
    viewCount: 19870,
    likes: 923
  }
];

// Search news articles with filtering and pagination
router.post('/search', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      page = 1, 
      limit = 6, 
      featured, 
      tags = [], 
      dateFrom, 
      dateTo 
    } = req.body;

    let filteredNews = [...mockNewsData];

    // Apply filters
    if (category && category !== 'All') {
      filteredNews = filteredNews.filter(article => article.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      filteredNews = filteredNews.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (featured !== undefined) {
      filteredNews = filteredNews.filter(article => article.featured === featured);
    }

    if (tags.length > 0) {
      filteredNews = filteredNews.filter(article =>
        tags.some(tag => article.tags.includes(tag))
      );
    }

    if (dateFrom) {
      filteredNews = filteredNews.filter(article => 
        new Date(article.publishedDate) >= new Date(dateFrom)
      );
    }

    if (dateTo) {
      filteredNews = filteredNews.filter(article => 
        new Date(article.publishedDate) <= new Date(dateTo)
      );
    }

    // Sort by published date (newest first)
    filteredNews.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredNews.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredNews.length / limit);

    res.json({
      success: true,
      data: {
        articles: paginatedArticles,
        total: filteredNews.length,
        page: parseInt(page),
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    console.error('News search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search news articles',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get featured news articles
router.get('/featured', async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    
    const featuredNews = mockNewsData
      .filter(article => article.featured)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: featuredNews
    });
  } catch (error) {
    console.error('Featured news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured news',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single news article by ID or slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    
    const article = mockNewsData.find(a => 
      a.id === idOrSlug || a.slug === idOrSlug
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment view count (in real app, this would update the database)
    article.viewCount = (article.viewCount || 0) + 1;

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('News article error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news article',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get news categories with article counts
router.get('/categories', async (req, res) => {
  try {
    const categories = mockNewsData.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {});

    const categoryData = Object.entries(categories).map(([category, count]) => ({
      category,
      count
    }));

    res.json({
      success: true,
      data: categoryData
    });
  } catch (error) {
    console.error('News categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get trending tags
router.get('/trending-tags', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const tagCounts = mockNewsData.reduce((acc, article) => {
      article.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    const trendingTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, parseInt(limit))
      .map(([tag, count]) => ({ tag, count }));

    res.json({
      success: true,
      data: trendingTags
    });
  } catch (error) {
    console.error('Trending tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trending tags',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get latest news (for homepage or widgets)
router.get('/latest', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const latestNews = mockNewsData
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: latestNews
    });
  } catch (error) {
    console.error('Latest news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest news',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Like/unlike an article (requires authentication in real app)
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    
    const article = mockNewsData.find(a => a.id === id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Toggle like (in real app, track user likes in database)
    article.likes = (article.likes || 0) + 1;

    res.json({
      success: true,
      data: {
        id: article.id,
        likes: article.likes
      }
    });
  } catch (error) {
    console.error('Like article error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like article',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
