import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { CartProvider } from "./context/CartContext";
import { AccountProvider } from "./context/AccountContext";
import Search from "./pages/Search";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import Recruitment from "./pages/Recruitment";
import FloatingZalo from "@/components/ui/zalo-float";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAccounts from "./pages/AdminAccounts";
import AddAccount from "./pages/AddAccount";
import EditAccount from "./pages/EditAccount";
import AdminLogin from "./pages/AdminLogin";
import RequireAdmin from "@/components/RequireAdmin";
import AdminChangePassword from "./pages/AdminChangePassword";
import { AuthProvider } from "@/context/AuthContext";
import Invite from "./pages/Invite";
import CollaboratorRegister from "./pages/CollaboratorRegister";
import CollaboratorInvite from "./pages/CollaboratorInvite";
import CollaboratorLayout from "./pages/CollaboratorLayout";
import RequireCollaborator from "@/components/RequireCollaborator";
import { useEffect } from "react";
import AdminCollaborators from "./pages/AdminCollaborators";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <CartProvider>
          <AccountProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:slug" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/thankyou" element={<ThankYou />} />
                  <Route path="/recruitment" element={<Recruitment />} />
                  <Route path="/collaborator/register" element={<CollaboratorRegister />} />
                  <Route path="/collaborator" element={<RequireCollaborator><CollaboratorLayout /></RequireCollaborator>}>
                    <Route index element={<CollaboratorInvite />} />
                  </Route>
                  <Route path="/invite" element={<Invite />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="accounts" element={<AdminAccounts />} />
                    <Route path="accounts/add" element={<AddAccount />} />
                    <Route path="accounts/edit/:id" element={<EditAccount />} />
                    <Route path="collaborators" element={<AdminCollaborators />} />
                    <Route path="password" element={<AdminChangePassword />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {/* Global floating helpers */}
                <FloatingZalo zaloUrl="https://zalo.me/g/kqdtcp205" />
              </BrowserRouter>
            </AuthProvider>
          </AccountProvider>
        </CartProvider>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;