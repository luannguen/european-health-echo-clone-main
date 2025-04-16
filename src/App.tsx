import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./admin/context/AuthContext";

// Public pages
import MainLayout from "./components/layouts/MainLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Installation from "./pages/Installation";
import Maintenance from "./pages/Maintenance";
import Repair from "./pages/Repair";
import Consulting from "./pages/Consulting";
import ServiceSupport from "./pages/ServiceSupport";
import Technologies from "./pages/Technologies";
import EnergyEfficiency from "./pages/technologies/EnergyEfficiency";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

// Legal pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Cookies from "./pages/legal/Cookies";
import Sitemap from "./pages/legal/Sitemap";

// Data & Resources pages
import Statistics from "./pages/data/Statistics";
import Tools from "./pages/data/Tools";

// Publication pages
import Publications from "./pages/publications/Index";
import InverterTechnology from "./pages/publications/InverterTechnology";
import HeatRecoverySolutions from "./pages/publications/HeatRecoverySolutions";
import GreenBuildingStandards from "./pages/publications/GreenBuildingStandards";
import EnergyEfficiencyReport from "./pages/publications/EnergyEfficiencyReport";

// Product pages
import IndustrialProducts from "./pages/products/Industrial";
import CommercialProducts from "./pages/products/Commercial";
import ResidentialProducts from "./pages/products/Residential";
import ColdStorageProducts from "./pages/products/ColdStorage";
import AuxiliaryProducts from "./pages/products/Auxiliary";

// Project pages
import IndustrialProjects from "./pages/projects/Industrial";
import CommercialProjects from "./pages/projects/Commercial";
import SpecializedProjects from "./pages/projects/Specialized";

// Admin pages
import AdminLayout from "./admin/layouts/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Login from "./admin/pages/Login";
import DbConnection from "./admin/pages/DbConnection";
import UserList from "./admin/pages/users/UserList";
import UserCreate from "./admin/pages/users/UserCreate";
import UserDetail from "./admin/pages/users/UserDetail";
import UserEdit from "./admin/pages/users/UserEdit";

// Auth guard for admin routes
import AuthGuard from "./admin/components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/industrial" element={<IndustrialProducts />} />
              <Route path="products/commercial" element={<CommercialProducts />} />
              <Route path="products/residential" element={<ResidentialProducts />} />
              <Route path="products/cold-storage" element={<ColdStorageProducts />} />
              <Route path="products/auxiliary" element={<AuxiliaryProducts />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/industrial" element={<IndustrialProjects />} />
              <Route path="projects/commercial" element={<CommercialProjects />} />
              <Route path="projects/specialized" element={<SpecializedProjects />} />
              <Route path="services" element={<Services />} />
              <Route path="installation" element={<Installation />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="repair" element={<Repair />} />
              <Route path="consulting" element={<Consulting />} />
              <Route path="service-support" element={<ServiceSupport />} />
              <Route path="technologies" element={<Technologies />} />
              <Route path="technologies/energy-efficiency" element={<EnergyEfficiency />} />
              <Route path="technology" element={<Navigate to="/technologies" replace />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="events" element={<Events />} />
              <Route path="publications" element={<Publications />} />
              <Route path="publications/inverter-technology" element={<InverterTechnology />} />
              <Route path="publications/heat-recovery-solutions" element={<HeatRecoverySolutions />} />
              <Route path="publications/green-building-standards" element={<GreenBuildingStandards />} />
              <Route path="publications/energy-efficiency-report" element={<EnergyEfficiencyReport />} />
              <Route path="contact" element={<Contact />} />
              <Route path="legal/privacy" element={<Privacy />} />
              <Route path="legal/terms" element={<Terms />} />
              <Route path="legal/cookies" element={<Cookies />} />
              <Route path="legal/sitemap" element={<Sitemap />} />
              <Route path="data/statistics" element={<Statistics />} />
              <Route path="data/tools" element={<Tools />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin routes */}
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="database" element={<DbConnection />} />

              {/* User management routes */}
              <Route path="users" element={<UserList />} />
              <Route path="users/create" element={<UserCreate />} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="users/:id/edit" element={<UserEdit />} />

              {/* Fallback for undefined admin routes */}
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Routes>

          <Toaster />
          <Sonner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
