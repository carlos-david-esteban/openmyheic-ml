import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { detectBrowserLanguage, DEFAULT_LANG, LANGUAGES } from "@/i18n/config";
import Index from "./pages/Index";
import ConvertPage from "./pages/ConvertPage";
import BatchConvert from "./pages/BatchConvert";
import HeicViewer from "./pages/HeicViewer";
import BlogPage from "./pages/BlogPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function LanguageRedirect() {
  const detected = detectBrowserLanguage();
  if (detected !== DEFAULT_LANG) {
    return <Navigate to={`/${detected}`} replace />;
  }
  return <Index />;
}

// Check if user has visited before (to avoid redirect on every home visit)
function SmartHome() {
  const hasVisited = sessionStorage.getItem("lang_detected");
  if (!hasVisited) {
    sessionStorage.setItem("lang_detected", "true");
    return <LanguageRedirect />;
  }
  return <Index />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* English (default, no prefix) */}
      <Route path="/" element={<SmartHome />} />
      <Route path="/heic-to-jpg" element={<ConvertPage />} />
      <Route path="/heic-to-png" element={<ConvertPage />} />
      <Route path="/heic-to-webp" element={<ConvertPage />} />
      <Route path="/heic-to-bmp" element={<ConvertPage />} />
      <Route path="/heic-to-gif" element={<ConvertPage />} />
      <Route path="/heic-to-pdf" element={<ConvertPage />} />
      <Route path="/batch-convert" element={<BatchConvert />} />
      <Route path="/heic-viewer" element={<HeicViewer />} />
      <Route path="/what-is-heic" element={<BlogPage />} />
      <Route path="/how-to-convert-heic-to-jpg-windows" element={<BlogPage />} />
      <Route path="/how-to-convert-heic-to-jpg-mac" element={<BlogPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      {/* Language-prefixed routes */}
      <Route path="/:lang" element={<Index />} />
      <Route path="/:lang/heic-to-jpg" element={<ConvertPage />} />
      <Route path="/:lang/heic-to-png" element={<ConvertPage />} />
      <Route path="/:lang/heic-to-webp" element={<ConvertPage />} />
      <Route path="/:lang/heic-to-bmp" element={<ConvertPage />} />
      <Route path="/:lang/heic-to-gif" element={<ConvertPage />} />
      <Route path="/:lang/heic-to-pdf" element={<ConvertPage />} />
      <Route path="/:lang/batch-convert" element={<BatchConvert />} />
      <Route path="/:lang/heic-viewer" element={<HeicViewer />} />
      <Route path="/:lang/what-is-heic" element={<BlogPage />} />
      <Route path="/:lang/how-to-convert-heic-to-jpg-windows" element={<BlogPage />} />
      <Route path="/:lang/how-to-convert-heic-to-jpg-mac" element={<BlogPage />} />
      <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/:lang/terms-of-use" element={<TermsOfUse />} />
      <Route path="/:lang/contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <LanguageProvider>
            <AppRoutes />
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;