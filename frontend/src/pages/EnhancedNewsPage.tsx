import React, { useState, useMemo } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Building,
  Ticket,
  Users,
  Plane,
  Heart
} from "lucide-react";

// Types for better TypeScript support
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  publishedDate: string;
  author: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}

type NewsCategory = 'Breaking' | 'Infrastructure' | 'Tickets' | 'Culture' | 'Teams' | 'Transport' | 'Volunteers';

// Mock data - structured for easy API replacement
const mockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Grand Stade Hassan II Construction Reaches 75% Completion',
    summary: 'The world\'s largest stadium continues to take shape in Casablanca with innovative sustainable features and cutting-edge technology integration.',
    category: 'Infrastructure',
    publishedDate: '2024-12-20',
    author: 'Morocco Infrastructure Authority',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    featured: true,
    tags: ['stadium', 'casablanca', 'construction']
  },
  {
    id: '2',
    title: 'Morocco 2030 Ticket Sales Phase 3 Launches Tomorrow',
    summary: 'General public sales begin with special pricing for Moroccan residents and exclusive packages for international fans.',
    category: 'Tickets',
    publishedDate: '2024-12-19',
    author: 'FIFA Ticketing Division',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    featured: true,
    tags: ['tickets', 'sales', 'fifa']
  },
  {
    id: '3',
    title: 'Traditional Moroccan Arts Festival Planned for World Cup',
    summary: 'A month-long celebration of Moroccan culture will showcase traditional music, crafts, and cuisine across all host cities.',
    category: 'Culture',
    publishedDate: '2024-12-18',
    author: 'Ministry of Culture',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800',
    featured: false,
    tags: ['culture', 'festival', 'arts']
  },
  {
    id: '4',
    title: 'High-Speed Rail Network Connecting Host Cities Unveiled',
    summary: 'Revolutionary transport infrastructure will connect all six Moroccan host cities with journey times under 2 hours.',
    category: 'Transport',
    publishedDate: '2024-12-17',
    author: 'ONCF Morocco',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    featured: false,
    tags: ['transport', 'rail', 'infrastructure']
  },
  {
    id: '5',
    title: 'Team Training Facilities Completed in Marrakech',
    summary: 'State-of-the-art training complexes featuring climate-controlled environments and recovery centers are now operational.',
    category: 'Teams',
    publishedDate: '2024-12-16',
    author: 'FIFA Technical Division',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    featured: false,
    tags: ['teams', 'training', 'marrakech']
  },
  {
    id: '6',
    title: 'Volunteer Program Reaches 50,000 Applications',
    summary: 'Unprecedented enthusiasm as Morocco receives applications from 120 countries for World Cup volunteer positions.',
    category: 'Volunteers',
    publishedDate: '2024-12-15',
    author: 'Morocco 2030 Organizing Committee',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    featured: false,
    tags: ['volunteers', 'applications', 'community']
  },
  {
    id: '7',
    title: 'Breaking: FIFA Confirms Additional Matches for Morocco',
    summary: 'Morocco will host 20 matches including a semi-final, making it the most significant World Cup presence in African history.',
    category: 'Breaking',
    publishedDate: '2024-12-14',
    author: 'FIFA Communications',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    featured: true,
    tags: ['breaking', 'fifa', 'matches']
  },
  {
    id: '8',
    title: 'Sustainable Energy Solutions Power All Venues',
    summary: 'Solar and wind energy installations will make Morocco 2030 the first carbon-neutral World Cup in history.',
    category: 'Infrastructure',
    publishedDate: '2024-12-13',
    author: 'Green Morocco Initiative',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
    featured: false,
    tags: ['sustainability', 'energy', 'environment']
  }
];

// Category configuration with icons and colors
const categoryConfig: Record<NewsCategory, { icon: React.ElementType; color: string; bgColor: string }> = {
  'Breaking': { icon: Trophy, color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' },
  'Infrastructure': { icon: Building, color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200' },
  'Tickets': { icon: Ticket, color: 'text-green-600', bgColor: 'bg-green-50 border-green-200' },
  'Culture': { icon: Heart, color: 'text-purple-600', bgColor: 'bg-purple-50 border-purple-200' },
  'Teams': { icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-200' },
  'Transport': { icon: Plane, color: 'text-indigo-600', bgColor: 'bg-indigo-50 border-indigo-200' },
  'Volunteers': { icon: Users, color: 'text-pink-600', bgColor: 'bg-pink-50 border-pink-200' }
};

const ITEMS_PER_PAGE = 6;

const EnhancedNewsPage: React.FC = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Computed values
  const filteredNews = useMemo(() => {
    let filtered = mockNewsData;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const featuredNews = useMemo(() => 
    filteredNews.filter(article => article.featured),
    [filteredNews]
  );

  const regularNews = useMemo(() => 
    filteredNews.filter(article => !article.featured),
    [filteredNews]
  );

  // Pagination
  const totalPages = Math.ceil(regularNews.length / ITEMS_PER_PAGE);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return regularNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [regularNews, currentPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Helper functions
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: NewsCategory) => {
    const IconComponent = categoryConfig[category]?.icon || Trophy;
    return <IconComponent className="w-4 h-4" />;
  };

  const getCategoryStyle = (category: NewsCategory) => {
    return categoryConfig[category] || categoryConfig['Breaking'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-10 h-10 text-yellow-200" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  Morocco 2030 News
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Stay updated with official announcements, infrastructure progress, and cultural stories
              </p>
              
              {/* Search and Filter Bar */}
              <div className="max-w-4xl mx-auto mt-8">
                <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search news articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </div>
                    
                    {/* Category Filter */}
                    <div className="md:w-64">
                      <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as NewsCategory | 'All')}>
                        <SelectTrigger className="h-12 border-gray-200 focus:border-orange-400">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Categories</SelectItem>
                          {Object.keys(categoryConfig).map((category) => (
                            <SelectItem key={category} value={category}>
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(category as NewsCategory)}
                                {category}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured News Section */}
        {featuredNews.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Featured Stories
              </h2>
              
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredNews.map((article, index) => (
                  <Card
                    key={article.id}
                    className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {article.image && (
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}
                    
                    <CardContent className="p-6 space-y-4">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between">
                        <Badge 
                          className={`${getCategoryStyle(article.category).bgColor} ${getCategoryStyle(article.category).color} border flex items-center gap-1 px-3 py-1`}
                        >
                          {getCategoryIcon(article.category)}
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.publishedDate)}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      {/* Summary */}
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-1" />
                          <span className="truncate">{article.author}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 group"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular News Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {paginatedNews.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {paginatedNews.map((article, index) => (
                    <Card
                      key={article.id}
                      className="group bg-white border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge 
                            variant="outline"
                            className={`${getCategoryStyle(article.category).bgColor} ${getCategoryStyle(article.category).color} border flex items-center gap-1`}
                          >
                            {getCategoryIcon(article.category)}
                            {article.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                      </CardHeader>
                      
                      <CardContent className="pt-0 space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {article.summary}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(article.publishedDate)}
                          </div>
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span className="truncate max-w-24">{article.author}</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 group"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page 
                            ? "bg-orange-500 hover:bg-orange-600" 
                            : "border-orange-200 text-orange-600 hover:bg-orange-50"
                          }
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* No Results State */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or category filter
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default EnhancedNewsPage;
