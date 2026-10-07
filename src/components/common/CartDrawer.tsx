import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Gift, 
  ShieldCheck, 
  Tag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const {
    brandConfig,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isGiftWrap,
    setIsGiftWrap,
    setCurrentPage
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    setCurrentPage('cart');
  };

  const freeShippingThreshold = brandConfig.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#161311]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCF9] shadow-2xl flex flex-col border-l border-[#E5DDD0]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EAE2D5] flex items-center justify-between bg-[#F8F5F0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#947432]" />
              <h2 className="font-serif text-lg font-semibold text-[#1E1915] tracking-wide">
                Your Shopping Bag
              </h2>
              <span className="text-xs text-[#827160] tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6D5D4E] hover:text-[#1E1915] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F3EDE2] px-5 py-3 border-b border-[#E5DDD0]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#594A3D] font-medium">
                {remainingForFreeShipping > 0 ? (
                  <>Add <span className="font-semibold text-[#8B6520]">{formatPrice(remainingForFreeShipping)}</span> more for Free Insured Express Delivery</>
                ) : (
                  <span className="text-[#2C6B3F] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> You've unlocked Free Insured Express Delivery!
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-[#DFD5C4] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#947432] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5EEDB] border border-[#DFCFA8] flex items-center justify-center text-[#947432]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1E1915]">
                  Your shopping bag is empty
                </h3>
                <p className="text-xs text-[#7F7061] max-w-xs leading-relaxed">
                  Explore our handcrafted antique necklaces, temple jhumkas, and royal polki rings.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="px-6 py-2.5 bg-[#1E1915] text-[#F3EFE9] text-xs uppercase tracking-widest font-medium hover:bg-[#382F27] transition-colors rounded-xs cursor-pointer"
                >
                  Explore Jewellery
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize || 'default'}`}
                  className="flex gap-4 p-3 bg-white border border-[#EDE5D8] rounded-xs"
                >
                  <div className="w-20 h-20 shrink-0 bg-[#F5EFEA] overflow-hidden rounded-xs">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackTitle={item.product.name}
                      categoryName={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-sm font-medium text-[#1E1915] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-[#A39282] hover:text-[#8F2824] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7F7061] mt-0.5">
                        {item.product.category} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5EFEA]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD3C4] rounded-xs bg-[#FAF7F2]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="p-1 text-[#5E5043] hover:text-[#1E1915] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-[#1E1915]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="p-1 text-[#5E5043] hover:text-[#1E1915] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-serif text-sm font-semibold text-[#1E1915] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EAE2D5] bg-[#FAF8F4] space-y-3.5">
              
              {/* Luxury Gift Packaging option */}
              <label className="flex items-center gap-2.5 text-xs text-[#594A3D] cursor-pointer select-none p-2 bg-[#F2EDE3] border border-[#DFD5C3] rounded-xs">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="accent-[#947432] w-4 h-4 cursor-pointer"
                />
                <Gift className="w-4 h-4 text-[#8B6520]" />
                <span className="flex-1">
                  Add Handcrafted Royal Velvet Box (+{formatPrice(brandConfig.giftPackagingPrice)})
                </span>
              </label>

              {/* Coupon input */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#9E8E7D]" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon code (e.g. ROYAL10)"
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#D5C9B8] rounded-xs uppercase tracking-wider text-[#1E1915] focus:outline-none focus:border-[#947432]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#332A24] text-white text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-[#1E1915] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-[#F3EEDB] border border-[#DECFA9] text-xs rounded-xs">
                    <span className="text-[#755519] font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Coupon <strong className="font-semibold">{appliedCoupon}</strong> Applied
                    </span>
                    <button 
                      onClick={removeCoupon}
                      className="text-xs text-[#8F2824] underline hover:no-underline font-medium cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponMessage && (
                  <p className={`text-[11px] mt-1 ${couponMessage.isError ? 'text-[#A02824]' : 'text-[#2C6B3F]'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Summary Math */}
              <div className="space-y-1.5 text-xs text-[#6B5D50] pt-2 border-t border-[#EAE2D5]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1E1915] tabular-nums font-medium">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#2C6B3F]">
                    <span>Privilege Discount</span>
                    <span className="tabular-nums">- {formatPrice(cartDiscount)}</span>
                  </div>
                )}
                {isGiftWrap && (
                  <div className="flex justify-between">
                    <span>Velvet Vault Gift Box</span>
                    <span className="tabular-nums font-medium">{formatPrice(brandConfig.giftPackagingPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="tabular-nums font-medium">
                    {cartSubtotal >= brandConfig.freeShippingThreshold ? (
                      <span className="text-[#2C6B3F] font-semibold">FREE</span>
                    ) : (
                      formatPrice(brandConfig.defaultShippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#DFD6C7] text-sm text-[#1E1915] font-semibold">
                  <span className="font-serif text-base">Estimated Total</span>
                  <span className="font-serif text-lg text-[#825C1B] tabular-nums">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-[0.16em] font-medium rounded-xs transition-colors shadow-sm cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button
                  onClick={handleViewFullCart}
                  className="w-full text-center py-2 text-xs text-[#6B5A4B] hover:text-[#1E1915] underline cursor-pointer"
                >
                  View Full Cart &amp; Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
