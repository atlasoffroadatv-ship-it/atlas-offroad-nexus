import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import SiteLayout from "@/components/SiteLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";
import AdminAuth from "./pages/admin/AdminAuth";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/auth" element={<SiteLayout><AdminAuth /></SiteLayout>} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
              <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
              <Route path="/shop" element={<SiteLayout><Shop /></SiteLayout>} />
              <Route path="/shop/:slug" element={<SiteLayout><ProductDetail /></SiteLayout>} />
              <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
              <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
              <Route path="/cart" element={<SiteLayout><Cart /></SiteLayout>} />
              <Route path="/checkout" element={<SiteLayout><Checkout /></SiteLayout>} />
              <Route path="/checkout/success" element={<SiteLayout><CheckoutSuccess /></SiteLayout>} />
              <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
