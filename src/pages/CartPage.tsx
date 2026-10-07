import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  Tag, 
  ArrowLeft 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const CartPage: React.FC = () => {
  const {
    brandConfig,
    cart,
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
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({ message: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const freeShippingThreshold = brandConfig.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#F5EEDB] border border-[#DFCFA8] flex items-center justify-center text-[#947432]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#1E1915]">
          Your Shopping Bag is Currently Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#736353] max-w-md mx-auto leading-relaxed">
          Discover our archival antique necklaces, temple jhumkas, and royal polki heirlooms.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3.5 bg-[#1E1915] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#382F27] transition-colors cursor-pointer"
        >
          Explore Antique Jewellery
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAE3D6] gap-2">
        <h1 className="font-serif text-2xl sm:text-4xl text-[#1E1915] font-light">
          Your Shopping Bag
        </h1>
        <button
          onClick={() => setCurrentPage('shop')}
          className="text-xs uppercase tracking-wider text-[#947432] hover:text-[#1E1915] flex items-center gap-1.5 cursor-pointer font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Exploring</span>
        </button>
      </div>

      {/* Free Insured Delivery Banner */}
      <div className="bg-[#FAF7F2] p-4 rounded-xs border border-[#E8DEC8]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[#594A3D] font-medium">
            {remainingForFreeShipping > 0 ? (
              <>Add <strong className="text-[#8B6520]">{formatPrice(remainingForFreeShipping)}</strong> more to receive Free Insured Express Delivery</>
            ) : (
              <span className="text-[#2C6B3F] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> You qualify for Complimentary Insured Express Delivery across India!
              </span>
            )}
          </span>
          <span className="text-[11px] text-[#8C7A68] tabular-nums font-medium">
            {progressPercent}% unlocked
          </span>
        </div>
        <div className="w-full bg-[#DFD5C4] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#947432] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Items List (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-[#EAE2D5] bg-white border border-[#EBE3D6] rounded-xs">
            {cart.map((item) => (
              <div 
                key={`${item.product.id}-${item.selectedSize || 'default'}`}
                className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
              >
                {/* Product Thumbnail & Meta */}
                <div className="flex gap-4 items-center flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-[#F5EFEA] rounded-xs overflow-hidden border border-[#EDE5D8]">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackTitle={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#947432] font-semibold block">
                      {item.product.category}
                    </span>
                    <h3 
                      onClick={() => setCurrentPage('product', { id: item.product.id })}
                      className="font-serif text-base sm:text-lg font-medium text-[#1E1915] hover:text-[#947432] cursor-pointer transition-colors"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-[11px] text-[#7A6959]">
                      Purity: {item.product.specs.goldPurity.split(' ')[0]} {item.selectedSize ? `· Size: ${item.selectedSize}` : ''}
                    </p>
                    <span className="text-xs font-semibold text-[#1E1915] sm:hidden block pt-1 tabular-nums">
                      {formatPrice(item.product.price)} each
                    </span>
                  </div>
                </div>

                {/* Stepper + Item Total + Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#F5EFEA]">
                  <div className="flex items-center border border-[#D5C9B8] rounded-xs bg-[#FAF7F2]">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                      className="p-1.5 text-[#5C4C3E] hover:text-[#1E1915] cursor-pointer"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold tabular-nums text-[#1E1915]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                      className="p-1.5 text-[#5C4C3E] hover:text-[#1E1915] cursor-pointer"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="font-serif text-base sm:text-lg font-semibold text-[#1E1915] tabular-nums block">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-[#8C7A68]">
                      ({formatPrice(item.product.price)} / unit)
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    className="p-2 text-[#9E8E7E] hover:text-[#8F2824] transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-[#FAF7F2] p-6 rounded-xs border border-[#E8DEC8] space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[#1E1915] pb-3 border-b border-[#E3D7C4]">
              Order Summary
            </h2>

            {/* Gift Wrap option */}
            <label className="flex items-center gap-2.5 text-xs text-[#594A3D] cursor-pointer select-none p-2.5 bg-white border border-[#DFD5C3] rounded-xs">
              <input
                type="checkbox"
                checked={isGiftWrap}
                onChange={(e) => setIsGiftWrap(e.target.checked)}
                className="accent-[#947432] w-4 h-4 cursor-pointer"
              />
              <Gift className="w-4 h-4 text-[#8B6520]" />
              <span className="flex-1">
                Royal Velvet Presentation Vault (+{formatPrice(brandConfig.giftPackagingPrice)})
              </span>
            </label>

            {/* Coupon Code input */}
            <div>
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#9E8E7D]" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon (e.g. ROYAL10)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#D5C9B8] rounded-xs uppercase tracking-wider text-[#1E1915]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1E1915] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#382F27] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-[#F3EEDB] border border-[#DECFA9] text-xs rounded-xs">
                  <span className="text-[#755519] font-medium flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Coupon <strong>{appliedCoupon}</strong> Applied
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#8F2824] underline hover:no-underline font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponFeedback && (
                <p className={`text-[11px] mt-1.5 ${couponFeedback.isError ? 'text-[#A02824]' : 'text-[#2C6B3F]'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-[#6B5D50] pt-2 border-t border-[#E3D7C4]">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-[#1E1915] tabular-nums font-medium">{formatPrice(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#2C6B3F]">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums font-semibold">- {formatPrice(cartDiscount)}</span>
                </div>
              )}

              {isGiftWrap && (
                <div className="flex justify-between">
                  <span>Velvet Presentation Vault</span>
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

              <div className="flex justify-between items-baseline pt-3 border-t border-[#DFD6C7] text-sm text-[#1E1915] font-semibold">
                <span className="font-serif text-lg">Total Amount</span>
                <span className="font-serif text-2xl text-[#825C1B] tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full py-3.5 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="p-4 bg-white border border-[#EDE5D8] rounded-xs space-y-2 text-[11px] text-[#7A6A5A]">
            <div className="flex items-center gap-2 text-[#2C6B3F] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe &amp; Encrypted Armored Checkout</span>
            </div>
            <p>
              Insured pan-India door delivery via certified precious cargo handlers.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
