import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import MapComponent from "@/components/MapComponent";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Carte Interactive du Maroc 2030
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explorez tous les lieux importants pour la Coupe du Monde 2030 : hôtels, restaurants, stades, événements et transports
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[calc(100vh-200px)]">
          <MapComponent />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MapPage;
