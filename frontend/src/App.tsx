import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/hooks/useTranslation";
import Index from "./pages/Index";
import TransportPage from "./pages/TransportPage";
import RestaurantPage from "./pages/RestaurantPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import EventsPage from "./pages/EventsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import GuidePage from "./pages/GuidePage";
import EmergencyPage from "./pages/EmergencyPage";
import HotelPage from "./pages/HotelPage";
import HotelsPage from "./pages/HotelsPage";
import RentalPage from "./pages/RentalPage";
import CarRentalsPage from "./pages/CarRentalsPage";
import NewsPage from "./pages/NewsPage";
import StadiumsPage from "./pages/StadiumsPage";
import StadiumDetailPage from "./pages/StadiumDetailPage";
import SchedulePage from "./pages/SchedulePage";
import MatchesPage from "./pages/MatchesPage";
import TicketsPage from "./pages/TicketsPage";
import VolunteersPage from "./pages/VolunteersPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CitiesPage from "./pages/CitiesPage";
import CityPage from "./pages/CityPage";
import MapPage from "./pages/MapPage";
import GuideProfilePage from "./pages/GuideProfilePage";
import GuideLoginPage from "./pages/GuideLoginPage";
import GuideDashboardPage from "./pages/GuideDashboardPage";
import GuidesPage from "./pages/GuidesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TranslationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/hotel" element={<HotelPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelPage />} />
          <Route path="/hotels/:id/book" element={<HotelPage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/car-rentals" element={<CarRentalsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/stadiums" element={<StadiumsPage />} />
          <Route path="/stadiums/:id" element={<StadiumDetailPage />} />
          
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path='/guide' element={<GuidesPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guide/login" element={<GuideLoginPage />} />
          <Route path="/guide/dashboard" element={<GuideDashboardPage />} />
          <Route path="/guide/:guideId" element={<GuideProfilePage />} />
          <Route path="/city/:cityName" element={<CityPage />} />
          <Route path="/map" element={<MapPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TranslationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
