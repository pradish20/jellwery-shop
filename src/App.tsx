/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AccountPage } from './pages/AccountPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentPage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'account':
        return <AccountPage />;
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  const isAdminDashboard = currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF9] text-[#1E1915]">
      {/* Universal 3-Zone Header (hidden on dedicated admin dashboard for workspace focus) */}
      {!isAdminDashboard && <Header />}

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Slide-over cart and quick view modals */}
      <CartDrawer />
      <QuickViewModal />

      {/* Luxury Footer */}
      {!isAdminDashboard && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
