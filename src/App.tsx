
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Index from "./pages/Index";
import FrequencyDetail from "./pages/FrequencyDetail";
import MapView from "./pages/MapView";
import MediaLibrary from "./pages/MediaLibrary";
import AddFrequency from "./pages/AddFrequency";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AppContainer from "./components/AppContainer";
import TourGuide from "./components/TourGuide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LazyMotion features={domAnimation}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContainer>
            <TourGuide />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/frequency/:id" element={<FrequencyDetail />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/media" element={<MediaLibrary />} />
              <Route path="/add" element={<AddFrequency />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppContainer>
        </BrowserRouter>
      </LazyMotion>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
