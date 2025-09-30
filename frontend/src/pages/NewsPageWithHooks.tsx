import React, { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  Ticket,
  Building,
  Zap,
  AlertCircle,
  RefreshCw
} from "lucide-react";

// Import hooks and types
import { useNewsSearch, useFeaturedNews } from '@/hooks/useNews';
import { NewsCategory } from '@/services/newsService';

// Category configuration with icons and colors - World Cup Football focused
const categoryConfig: Record<NewsCategory, { icon: React.ElementType; color: string; bgColor: string }> = {
  'Breaking': { icon: Zap, color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' },
  'Teams': { icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200' },
  'Matches': { icon: Trophy, color: 'text-green-600', bgColor: 'bg-green-50 border-green-200' },
  'Tickets': { icon: Ticket, color: 'text-purple-600', bgColor: 'bg-purple-50 border-purple-200' },
  'Stadiums': { icon: Building, color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-200' }
};

const ITEMS_PER_PAGE = 6;

const NewsPageWithHooks: React.FC = () => {
  // State management
  const [currentPage, setCurrentPage] = useState(1);

  // API hooks
  const { 
    articles: featuredArticles, 
    isLoading: featuredLoading, 
    error: featuredError,
    refetch: refetchFeatured 
  } = useFeaturedNews(3);

  const { 
    articles, 
    total, 
    totalPages, 
    hasNext, 
    hasPrev, 
    isLoading: articlesLoading, 
    error: articlesError,
    refetch: refetchArticles 
  } = useNewsSearch({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    featured: false // Exclude featured articles from regular search
  });


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

  const handleRetry = () => {
    refetchFeatured();
    refetchArticles();
  };

  // Loading skeleton component
  const ArticleSkeleton = () => (
    <Card className="overflow-hidden">
      <div className="aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  const RegularArticleSkeleton = () => (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );

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
              
            </div>
          </div>
        </section>

        {/* Featured News Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Featured Stories
            </h2>
            
            {featuredError ? (
              <Alert variant="destructive" className="max-w-2xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>Failed to load featured news: {featuredError}</span>
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : featuredLoading ? (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ArticleSkeleton key={index} />
                ))}
              </div>
            ) : featuredArticles.length > 0 ? (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredArticles.map((article, index) => (
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
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No featured stories available</h3>
                <p className="text-gray-500">Check back later for featured content</p>
              </div>
            )}
          </div>
        </section>

        {/* Regular News Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {articlesError ? (
              <Alert variant="destructive" className="max-w-2xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>Failed to load news articles: {articlesError}</span>
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : articlesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <RegularArticleSkeleton key={index} />
                ))}
              </div>
            ) : articles.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {articles.map((article, index) => (
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
                      disabled={!hasPrev || articlesLoading}
                      className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            disabled={articlesLoading}
                            className={currentPage === page 
                              ? "bg-orange-500 hover:bg-orange-600" 
                              : "border-orange-200 text-orange-600 hover:bg-orange-50"
                            }
                          >
                            {page}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && <span className="text-gray-400">...</span>}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={!hasNext || articlesLoading}
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
                  <Trophy className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  Check back later for more news articles
                </p>
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

export default NewsPageWithHooks;
