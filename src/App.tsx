import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ProductInsert from './pages/Product.insert';
import ProductPage from './pages/product';
import WishlistPage from './pages/wishlist';
import CartPage from './pages/cart';
import { CartProvider } from './context/CartContext';
import CategoryPage from "./pages/category";
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import CreateCategory from './pages/productcategory';
import UserList from './pages/usermanagement';
import CheckoutPage from './pages/CheckoutPage';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';


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

const AppContent = () => {
  const location = useLocation();
  const isDashboardRoute = ['/dashboard', '/orders', '/user-management', '/add-product', '/product-category'].includes(location.pathname);

  return (
    <div className="App w-full min-h-screen">
      {!isDashboardRoute && <Header />}
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
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="admin"><DashboardPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute requiredRole="admin"><OrdersPage /></ProtectedRoute>} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product" element={<ErrorBoundary><ProductPage /></ErrorBoundary>} />
          <Route path="/add-product" element={<ProtectedRoute requiredRole="admin"><ProductInsert /></ProtectedRoute>} />
          <Route path="/product-category" element={<ProtectedRoute requiredRole="admin"><CreateCategory /></ProtectedRoute>} />
          <Route path="/user-management" element={<ProtectedRoute requiredRole="admin"><UserList /></ProtectedRoute>} />
        </Routes>
      </div>
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
        <Toaster position="top-right" />
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
