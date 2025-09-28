import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Calendar, MapPin, Users, Trophy, Star } from "lucide-react";
import heroImage from "@/assets/morocco-2030-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Morocco World Cup 2030"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-gold rounded-full opacity-20 animate-float" />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-morocco rounded-full opacity-30 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-royal rounded-full opacity-25 animate-float" style={{ animationDelay: "2s" }} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-timer px-6 py-3 rounded-full text-white shadow-timer animate-pulse-glow">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">FIFA World Cup 2030</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="block text-white drop-shadow-2xl">Marhba Bik</span>
                  <span className="block bg-gradient-timer bg-clip-text text-transparent animate-pulse-glow">
                    Morocco 2030
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-xl leading-relaxed drop-shadow-lg">
                  Welcome to the greatest football celebration in Morocco's history. 
                  Experience the magic where heritage meets modern football.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                {[
                  { icon: MapPin, label: "9 Host Cities", value: "Morocco" },
                  { icon: Users, label: "1M+ Visitors", value: "Expected" },
                  { icon: Calendar, label: "June 2030", value: "Tournament" }
                ].map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="text-center space-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-timer rounded-full flex items-center justify-center mx-auto shadow-timer">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/tickets">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-timer hover:shadow-timer text-white border-0 px-8 py-4 text-lg font-semibold transition-all duration-500 hover:scale-105"
                  >
                    <Trophy className="w-6 h-6 mr-3" />
                    Get Your Tickets
                  </Button>
                </Link>
                
                <Link to="/activities">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-500"
                  >
                    <Play className="w-6 h-6 mr-3" />
                    Explore Activities
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-4 justify-center lg:justify-start pt-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-morocco rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <div className="text-white/90">
                  <div className="font-semibold">Join 50,000+ Fans</div>
                  <div className="text-sm">Already registered for updates</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="space-y-6">
              {[
                {
                  title: "Experience Morocco", 
                  description: "Discover authentic culture, cuisine, and hospitality",
                  icon: MapPin,
                  color: "from-secondary to-secondary-glow"
                },
                {
                  title: "World-Class Stadiums",
                  description: "State-of-the-art venues in 9 magnificent cities", 
                  icon: Trophy,
                  color: "from-accent to-accent-glow"
                },
                {
                  title: "Unforgettable Journey",
                  description: "Create memories that will last a lifetime",
                  icon: Star,
                  color: "from-primary to-primary-glow"
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all duration-500 group animate-fade-in-up shadow-elegant"
                  style={{ animationDelay: `${(index + 1) * 400}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      <p className="text-white/80 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-background">
          <path d="M0,120 L0,80 Q300,0 600,80 T1200,80 L1200,120 Z" />
        </svg>
      </div>
    </section>
  );
};