import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
// World Cup 2030 Images from external sources
const worldCupNews = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const stadiumConstruction = "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const grandStadeImage = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const moroccoTeamImage = "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const fifaDrawImage = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const ticketSalesImage = "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const brazilArgentinaImage = "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const fanZoneImage = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const mascotImage = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

const NewsPage = () => {
  const featuredNews = [
    {
      id: 1,
      title: "FIFA Confirms World Cup 2030 Match Schedule - Morocco Opens Against Spain",
      excerpt: "Historic opening match set for Grand Stade Hassan II in Casablanca. Morocco to face Spain in tournament opener on June 11, 2030.",
      image: grandStadeImage,
      date: "2024-12-20",
      author: "FIFA Official",
      category: "Breaking"
    },
    {
      id: 2,
      title: "World Cup 2030 Final Draw Ceremony Set for Rabat",
      excerpt: "Morocco's capital to host the official draw ceremony in March 2030. 48 teams will learn their group stage opponents.",
      image: fifaDrawImage,
      date: "2024-12-18",
      author: "FIFA Media",
      category: "Breaking"
    },
    {
      id: 3,
      title: "Grand Stade Hassan II: World's Largest Stadium Nears Completion",
      excerpt: "115,000-capacity venue reaches 85% completion. Revolutionary design features retractable roof and solar power system.",
      image: stadiumConstruction,
      date: "2024-12-16",
      author: "Stadium Authority",
      category: "Stadiums"
    }
  ];

  const newsArticles = [
    {
      id: 4,
      title: "Morocco National Team Training Camp Begins in Rabat",
      excerpt: "Atlas Lions start intensive preparation with new tactical formations ahead of World Cup 2030 opening match.",
      image: moroccoTeamImage,
      date: "2024-12-19",
      author: "Morocco Football Federation",
      category: "Teams",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "World Cup 2030 Group Stage Venues Confirmed",
      excerpt: "FIFA announces all 16 stadiums across Morocco, Spain, and Portugal that will host group stage matches.",
      image: stadiumConstruction,
      date: "2024-12-17",
      author: "FIFA Venue Committee",
      category: "Stadiums",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Early Bird Ticket Sales Break Records",
      excerpt: "Over 2 million tickets sold in first phase. Special Morocco resident discounts still available.",
      image: ticketSalesImage,
      date: "2024-12-15",
      author: "FIFA Ticketing",
      category: "Tickets",
      readTime: "3 min read"
    },
    {
      id: 7,
      title: "Brazil and Argentina Confirm World Cup 2030 Participation",
      excerpt: "South American giants officially qualify and announce training camp locations in Morocco.",
      image: brazilArgentinaImage,
      date: "2024-12-13",
      author: "CONMEBOL Official",
      category: "Teams",
      readTime: "5 min read"
    },
    {
      id: 8,
      title: "Casablanca Stadium Complex Opens Fan Zone",
      excerpt: "Massive entertainment area around Grand Stade Hassan II to accommodate 50,000 fans daily.",
      image: fanZoneImage,
      date: "2024-12-11",
      author: "Morocco 2030 Organization",
      category: "Matches",
      readTime: "4 min read"
    },
    {
      id: 9,
      title: "World Cup 2030 Official Mascot Unveiled",
      excerpt: "Meet 'Lalla Khadija' - the Moroccan lioness representing courage and hospitality of the host nation.",
      image: mascotImage,
      date: "2024-12-09",
      author: "FIFA Marketing",
      category: "Breaking",
      readTime: "3 min read"
    }
  ];

  const categories = ["All", "Breaking", "Teams", "Matches", "Tickets", "Stadiums"];

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
                World Cup 2030 News
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
                  className="overflow-hidden bg-gradient-card hover:shadow-morocco transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
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