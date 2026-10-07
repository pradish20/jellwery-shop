import React, { useState } from 'react';
import { 
  Package, 
  Heart, 
  MapPin, 
  User, 
  ShieldCheck, 
  Clock, 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const AccountPage: React.FC = () => {
  const { 
    orders, 
    wishlist, 
    products, 
    pageParams, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    setCurrentPage,
    brandConfig,
    isAdminLoggedIn 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>(
    (pageParams.tab as any) || 'orders'
  );

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Account Header */}
      <div className="bg-[#FAF7F2] border border-[#E8DEC8] p-6 sm:p-8 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1E1915] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-semibold border border-[#3E3228]">
            YC
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#947432] font-semibold block">
              Royal Collector Circle
            </span>
            <h1 className="font-serif text-2xl text-[#1E1915] font-medium">
              Collector Portfolio &amp; Orders
            </h1>
            <p className="text-xs text-[#7A6959]">
              Insured consignments, private appraisal records &amp; saved heirlooms
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-[#EFE8DC] rounded-xs text-xs font-medium text-[#5C4C3E]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#1E1915] text-white shadow-xs' : 'hover:text-[#1E1915]'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'wishlist' ? 'bg-[#1E1915] text-white shadow-xs' : 'hover:text-[#1E1915]'
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-[#1E1915] text-white shadow-xs' : 'hover:text-[#1E1915]'
            }`}
          >
            Address &amp; Profile
          </button>
        </div>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[#1E1915]">
            Insured Orders &amp; Delivery Tracking
          </h2>

          {orders.length === 0 ? (
            <div className="bg-[#FAF7F2] border border-[#E8DEC8] p-12 text-center rounded-xs space-y-3">
              <Package className="w-10 h-10 mx-auto text-[#947432]" />
              <h3 className="font-serif text-lg text-[#1E1915]">No Orders Recorded Yet</h3>
              <p className="text-xs text-[#7A6959]">
                Browse our collection of 22K antique gold pieces to start your collection.
              </p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-6 py-2.5 bg-[#1E1915] text-white text-xs uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Explore Jewellery
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className="bg-white border border-[#E8DEC8] rounded-xs overflow-hidden shadow-xs"
                >
                  {/* Order Top Bar */}
                  <div className="bg-[#FAF7F2] p-4 sm:p-5 border-b border-[#EAE0CF] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div>
                        <span className="text-[#8C7A68] block text-[10px] uppercase">Order Reference</span>
                        <strong className="text-[#1E1915] font-mono text-sm">{order.orderNumber}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C7A68] block text-[10px] uppercase">Date Placed</span>
                        <span className="text-[#1E1915]">
                          {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8C7A68] block text-[10px] uppercase">Settlement Total</span>
                        <strong className="text-[#825C1B] font-serif text-sm tabular-nums">{formatPrice(order.total)}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Clean unboxed status indicator */}
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#8B6520] bg-[#F4ECDA] px-2.5 py-1 border border-[#DFCCA5] rounded-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8B6520]" />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6 divide-y divide-[#F2ECE0]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 shrink-0 rounded-xs overflow-hidden bg-[#F5EFEA] border border-[#E5DDD0]">
                            <ImageWithFallback
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fallbackTitle={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 
                              onClick={() => setCurrentPage('product', { id: item.product.id })}
                              className="font-serif text-sm font-medium text-[#1E1915] hover:text-[#947432] cursor-pointer"
                            >
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-[#7A6959]">
                              Qty: {item.quantity} · Purity: {item.product.specs.goldPurity}
                            </p>
                            <span className="text-xs text-[#825C1B] font-medium tabular-nums">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setCurrentPage('product', { id: item.product.id })}
                          className="px-3 py-1.5 border border-[#D5C9B8] text-xs font-medium rounded-xs hover:border-[#1E1915] text-[#1E1915] cursor-pointer"
                        >
                          View Piece
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer with Tracking info */}
                  <div className="bg-[#FCFAF7] p-4 border-t border-[#EAE0CF] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#6B5A4B] gap-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2C6B3F]" />
                      <span>
                        Insured Air Waybill: <strong className="font-mono text-[#1E1915]">{order.trackingNumber}</strong>
                      </span>
                      <span>· Consignee: {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                    </div>

                    <button
                      onClick={() => setCurrentPage('order-success', { orderId: order.id })}
                      className="text-[#947432] hover:underline font-medium cursor-pointer"
                    >
                      View Full Tax Invoice Receipt →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[#1E1915]">
              Saved Antique Heirlooms ({wishlistProducts.length})
            </h2>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs text-[#947432] hover:underline cursor-pointer"
            >
              Explore More Pieces
            </button>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="bg-[#FAF7F2] border border-[#E8DEC8] p-12 text-center rounded-xs space-y-3">
              <Heart className="w-10 h-10 mx-auto text-[#947432]" />
              <h3 className="font-serif text-lg text-[#1E1915]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#7A6959]">
                Click the heart icon on any product to save it to your private portfolio.
              </p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-6 py-2.5 bg-[#1E1915] text-white text-xs uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="bg-white border border-[#E8DEC8] rounded-xs overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-square bg-[#F5EFEA]">
                    <ImageWithFallback
                      src={p.images[0]}
                      alt={p.name}
                      fallbackTitle={p.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white/90 text-[#8F2824] rounded-full hover:bg-white shadow-xs cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#947432] font-semibold block">
                        {p.category}
                      </span>
                      <h4 
                        onClick={() => setCurrentPage('product', { id: p.id })}
                        className="font-serif text-base font-medium text-[#1E1915] hover:text-[#947432] cursor-pointer"
                      >
                        {p.name}
                      </h4>
                      <span className="font-serif text-base font-semibold text-[#1E1915] tabular-nums mt-1 block">
                        {formatPrice(p.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(p, 1)}
                      className="w-full py-2.5 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Move to Shopping Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADDRESS & PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[#1E1915]">
            Collector Profile &amp; Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8DEC8] p-6 rounded-xs space-y-4 text-xs text-[#5C4C3E]">
              <h3 className="font-serif text-lg font-semibold text-[#1E1915] border-b border-[#F2ECE0] pb-2">
                Primary Shipping Residence
              </h3>
              <div>
                <span className="font-semibold text-[#1E1915] block">Gayatri Devi / Pooja Agarwal</span>
                <p>Flat 402, Royal Palms, Banjara Hills Road No. 12</p>
                <p>Hyderabad, Telangana - 500034</p>
                <p>Phone: +91 98234 56789</p>
              </div>
              <div className="pt-2 text-[11px] text-[#2C6B3F] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Armored Hand-Off Verified Address
              </div>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E8DEC8] p-6 rounded-xs space-y-4 text-xs text-[#5C4C3E]">
              <h3 className="font-serif text-lg font-semibold text-[#1E1915] border-b border-[#E8DEC8] pb-2">
                Store Administrator Portal
              </h3>
              <p>
                Manage boutique inventory, update order statuses, or reconfigure brand credentials.
              </p>
              <button
                onClick={() => setCurrentPage(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
                className="px-5 py-2.5 bg-[#1E1915] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#382F27] transition-colors cursor-pointer"
              >
                {isAdminLoggedIn ? 'Launch Admin Dashboard' : 'Login to Admin Area'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
