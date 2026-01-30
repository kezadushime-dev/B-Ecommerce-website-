import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Header } from './Header/Header';
import { Footer } from './Header/Footer';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import AuthPage from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';

import { BlogPage } from './pages/BlogPage';
import ProductPage from './pages/product';
import WishlistPage from './pages/wishlist';
import CartPage from './pages/cart';
import { CartProvider } from './context/CartContext';
import CategoryPage from "./pages/category";
import DashboardPage from './pages/DashboardPage';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

// React Query Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <div className="App w-full min-h-screen">
            <Header />
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ErrorBoundary><ProductPage /></ErrorBoundary>} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/product" element={<ErrorBoundary><ProductPage /></ErrorBoundary>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
        <Toaster position="top-right" />
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
