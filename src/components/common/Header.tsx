import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    brandConfig, 
    cartCount, 
    setIsCartOpen, 
    wishlist, 
    currentPage, 
    setCurrentPage, 
    isAdminLoggedIn,
    products 
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const handleNavClick = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page, params);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setCurrentPage('shop', { search: searchKeyword.trim() });
      setIsSearchOpen(false);
      setSearchKeyword('');
    }
  };

  const searchSuggestions = products
    .filter(p => searchKeyword && p.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    .slice(0, 4);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF9]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
      {/* Slim Promotional Bar (≤ 40px) */}
      {showAnnouncement && (
        <div className="relative bg-[#201A16] text-[#E5D7C3] px-4 py-2 text-xs flex items-center justify-between border-b border-[#362C25]">
          <div className="mx-auto flex items-center gap-2 tracking-wider text-[11px] uppercase font-light">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>Complimentary Insured Express Delivery Above ₹{brandConfig.freeShippingThreshold.toLocaleString('en-IN')} · 100% BIS 916 Hallmarked</span>
          </div>
          <button 
            onClick={() => setShowAnnouncement(false)} 
            className="text-[#9E8E7D] hover:text-[#E5D7C3] transition-colors p-0.5 ml-2 cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation - Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#2A231D] hover:text-[#9A7B38] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* ZONE 1: Brand Wordmark (Single text element in display serif) */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left inline-block focus:outline-none cursor-pointer"
            >
              <span className="font-display text-xl sm:text-2xl tracking-[0.16em] uppercase text-[#1E1915] font-semibold group-hover:text-[#947432] transition-colors block">
                {brandConfig.brandName}
              </span>
            </button>
          </div>

          {/* ZONE 2: 4-6 Clean Text Navigation Links (Single-line, subtle hover underlines) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.18em] uppercase font-medium text-[#4A3F35]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#9A7B38] transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'home' ? 'text-[#9A7B38] font-semibold' : ''
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A7B38]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-[#9A7B38] transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'shop' ? 'text-[#9A7B38] font-semibold' : ''
              }`}
            >
              Shop Collection
              {currentPage === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A7B38]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', { category: 'Temple Jewellery' })}
              className="hover:text-[#9A7B38] transition-colors relative py-1 cursor-pointer whitespace-nowrap"
            >
              Temple Jewellery
            </button>

            <button
              onClick={() => handleNavClick('shop', { category: 'Bridal Jewellery' })}
              className="hover:text-[#9A7B38] transition-colors relative py-1 cursor-pointer whitespace-nowrap"
            >
              Bridal Trousseau
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#9A7B38] transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'about' ? 'text-[#9A7B38] font-semibold' : ''
              }`}
            >
              Our Heritage
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A7B38]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#9A7B38] transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'contact' ? 'text-[#9A7B38] font-semibold' : ''
              }`}
            >
              Boutique &amp; Concierge
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A7B38]" />
              )}
            </button>
          </nav>

          {/* ZONE 3: 1-2 Primary Actions (Search, Wishlist, Cart Drawer, Account) */}
          <div className="flex items-center gap-4 sm:gap-5 text-[#2A231D]">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 hover:text-[#9A7B38] transition-colors cursor-pointer"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('account', { tab: 'wishlist' })}
              className="relative p-1.5 hover:text-[#9A7B38] transition-colors cursor-pointer"
              aria-label="Saved wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9A7B38] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Customer Account / Admin Indicator */}
            <button
              onClick={() => handleNavClick(isAdminLoggedIn ? 'admin-dashboard' : 'account')}
              className="p-1.5 hover:text-[#9A7B38] transition-colors cursor-pointer hidden sm:block"
              title={isAdminLoggedIn ? "Admin Portal" : "Customer Account & Orders"}
              aria-label="Account"
            >
              {isAdminLoggedIn ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#825C1B] bg-[#F5EEDB] px-2 py-0.5 rounded border border-[#DFCCA5]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </span>
              ) : (
                <User className="w-5 h-5" />
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 py-2 px-3.5 bg-[#1F1915] text-[#F5EFEB] rounded-sm hover:bg-[#322822] transition-colors cursor-pointer"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-wider font-medium hidden md:inline">Bag</span>
              <span className="w-4 h-4 rounded-full bg-[#9A7B38] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Overlay */}
      {isSearchOpen && (
        <div className="border-t border-[#EAE3D6] bg-[#FAF8F5] px-4 py-4 animate-fadeIn">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#8F7D6D]" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search antique necklaces, temple jhumkas, kundan rings..."
                autoFocus
                className="w-full pl-12 pr-28 py-3 bg-white border border-[#D9CFC4] rounded-sm text-sm text-[#1E1915] placeholder-[#9E8E7D] focus:outline-none focus:border-[#9A7B38]"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 bg-[#1E1915] text-white text-xs tracking-wider uppercase font-medium rounded-sm hover:bg-[#382F27] cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Live Search Quick Results */}
            {searchSuggestions.length > 0 && (
              <div className="mt-3 bg-white border border-[#E8DEC8] p-3 shadow-md rounded-sm">
                <span className="text-[11px] uppercase tracking-wider text-[#8F7D6D] font-medium block mb-2">
                  Matching Heirloom Pieces:
                </span>
                <div className="divide-y divide-[#F4EFEA]">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleNavClick('product', { id: item.id });
                      }}
                      className="w-full text-left py-2 flex items-center justify-between hover:text-[#9A7B38] transition-colors group cursor-pointer"
                    >
                      <div>
                        <span className="font-serif text-sm font-medium text-[#1E1915] group-hover:text-[#9A7B38]">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#8F7D6D] ml-2 font-sans">
                          ({item.category})
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#7A6126] tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D6] bg-[#FDFCF9] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 text-sm uppercase tracking-[0.16em] font-medium text-[#2E2721]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#9A7B38]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#9A7B38]"
            >
              All Jewellery Collection
            </button>
            <button
              onClick={() => handleNavClick('shop', { category: 'Antique Necklaces' })}
              className="text-left py-2 border-b border-[#F0EBE1] text-[#6E5D4E] hover:text-[#9A7B38]"
            >
              · Antique Necklaces
            </button>
            <button
              onClick={() => handleNavClick('shop', { category: 'Temple Jewellery' })}
              className="text-left py-2 border-b border-[#F0EBE1] text-[#6E5D4E] hover:text-[#9A7B38]"
            >
              · Temple Heritage
            </button>
            <button
              onClick={() => handleNavClick('shop', { category: 'Bridal Jewellery' })}
              className="text-left py-2 border-b border-[#F0EBE1] text-[#6E5D4E] hover:text-[#9A7B38]"
            >
              · Bridal Trousseau
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#9A7B38]"
            >
              Our Heritage &amp; Artisans
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#9A7B38]"
            >
              Boutique &amp; Consultation
            </button>
            <button
              onClick={() => handleNavClick('account')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#9A7B38]"
            >
              My Account &amp; Order Tracking
            </button>
            <button
              onClick={() => handleNavClick(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="text-left py-2 text-[#8B6520] font-semibold"
            >
              {isAdminLoggedIn ? 'Admin Management Dashboard' : 'Admin Portal Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
