import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import worldCupLogo from "@/assets/world-cup-2030.jpg";
import worldCupNews from "@/assets/world-cup-2030.jpg";
import stadiumConstruction from "@/assets/stadiums/stadium-construction.jpg";
import grandStadeImage from "@/assets/grand-stade-de-casa.jpg";

const NewsPage = () => {
  const featuredNews = [
    {
      id: 1,
      title: "World's Largest Stadium Construction Progresses",
      excerpt: "Grand Stade Hassan II construction reaches 60% completion with innovative architectural features.",
      image: grandStadeImage,
      date: "2024-12-18",
      author: "FIFA Infrastructure Team",
      category: "Breaking"
    },
    {
      id: 2,
      title: "Morocco 2030 Host Announcement Press Conference",
      excerpt: "Historic moment as Morocco, Spain, and Portugal officially confirmed as co-hosts for World Cup 2030.",
      image: worldCupNews,
      date: "2024-12-16",
      author: "FIFA Media",
      category: "Official"
    },
    {
      id: 3,
      title: "Stadium Construction Updates Across Morocco",
      excerpt: "Major infrastructure developments progressing in all host cities with cutting-edge technology.",
      image: stadiumConstruction,
      date: "2024-12-14",
      author: "Construction Authority",
      category: "Infrastructure"
    }
  ];

  const newsArticles = [
    {
      id: 4,
      title: "Morocco 2030 World Cup Preparations in Full Swing",
      excerpt: "Construction of new stadiums and infrastructure improvements are progressing ahead of schedule.",
      date: "2024-12-15",
      author: "FIFA Media Team",
      category: "Infrastructure",
      readTime: "5 min read"
    },
    {
      id: 5,
      title: "Training Camps Announced for World Cup 2030",
      excerpt: "Official training locations have been confirmed across Morocco's host cities.",
      date: "2024-12-10",
      author: "Morocco 2030 Committee",
      category: "Teams",
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "Ticket Sales Phase 2 Opens Next Month",
      excerpt: "General public ticket sales will begin with special offers for local supporters.",
      date: "2024-12-08",
      author: "FIFA Ticketing",
      category: "Tickets",
      readTime: "4 min read"
    }
  ];

  const categories = ["All", "Infrastructure", "Teams", "Tickets", "Culture", "Transport", "Volunteers"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Latest News
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest developments and preparations for Morocco World Cup 2030
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-morocco bg-clip-text text-transparent">
              Featured Stories
            </h2>
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {featuredNews.map((news, index) => (
                <Card
                  key={news.id}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge 
                        className={news.category === "Breaking" ? "bg-red-500/10 text-red-700" : ""}
                      >
                        {news.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(news.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{news.author}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More →
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* News Articles */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start group-hover:bg-muted transition-colors"
                    >
                      Read More →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default NewsPage;