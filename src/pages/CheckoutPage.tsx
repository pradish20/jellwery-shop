import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  Check, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderAddress } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const CheckoutPage: React.FC = () => {
  const { 
    brandConfig, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal, 
    isGiftWrap, 
    formatPrice, 
    createOrder, 
    setCurrentPage 
  } = useStore();

  // Form State
  const [address, setAddress] = useState<OrderAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [shippingMethod, setShippingMethod] = useState<'armored' | 'concierge'>('armored');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick Indian Pincode autofill
  const handlePincodeChange = (pin: string) => {
    const cleanPin = pin.trim();
    setAddress(prev => ({ ...prev, pincode: cleanPin }));

    if (cleanPin.length === 6) {
      if (cleanPin.startsWith('302')) {
        setAddress(prev => ({ ...prev, city: 'Jaipur', state: 'Rajasthan' }));
      } else if (cleanPin.startsWith('110')) {
        setAddress(prev => ({ ...prev, city: 'New Delhi', state: 'Delhi' }));
      } else if (cleanPin.startsWith('400')) {
        setAddress(prev => ({ ...prev, city: 'Mumbai', state: 'Maharashtra' }));
      } else if (cleanPin.startsWith('600')) {
        setAddress(prev => ({ ...prev, city: 'Chennai', state: 'Tamil Nadu' }));
      } else if (cleanPin.startsWith('500')) {
        setAddress(prev => ({ ...prev, city: 'Hyderabad', state: 'Telangana' }));
      } else if (cleanPin.startsWith('560')) {
        setAddress(prev => ({ ...prev, city: 'Bengaluru', state: 'Karnataka' }));
      } else if (cleanPin.startsWith('700')) {
        setAddress(prev => ({ ...prev, city: 'Kolkata', state: 'West Bengal' }));
      }
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.addressLine1 || !address.pincode) {
      alert('Please fill all mandatory shipping address fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const shippingFee = cartSubtotal >= brandConfig.freeShippingThreshold ? 0 : brandConfig.defaultShippingFee;
      const giftWrapFee = isGiftWrap ? brandConfig.giftPackagingPrice : 0;

      const newOrder = createOrder({
        items: [...cart],
        shippingAddress: address,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending COD' : 'Paid',
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shippingFee,
        giftWrapFee,
        total: cartTotal
      });

      setIsSubmitting(false);
      setCurrentPage('order-success', { orderId: newOrder.id });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#1E1915]">
          Your bag is empty
        </h2>
        <p className="text-xs text-[#7A6959]">
          Please select jewellery items before accessing checkout.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-[#1E1915] text-white text-xs uppercase tracking-wider rounded-xs cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
            Armored Checkout
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1E1915] font-light">
            Secure Delivery &amp; Payment
          </h1>
        </div>
        <button
          onClick={() => setCurrentPage('cart')}
          className="text-xs text-[#7A6959] hover:text-[#1E1915] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Form Steps (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* STEP 1: Shipping Address */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-xs border border-[#E8DEC8] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3D7C4]">
              <span className="w-6 h-6 rounded-full bg-[#1E1915] text-[#D4AF37] text-xs font-serif flex items-center justify-center font-bold">
                1
              </span>
              <h2 className="font-serif text-lg font-semibold text-[#1E1915]">
                Shipping Address &amp; Contact
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[#524438] mb-1 font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="e.g. Maharani Gayatri Devi"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div>
                <label className="block text-[#524438] mb-1 font-medium">Email (for invoice &amp; tracking) *</label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div>
                <label className="block text-[#524438] mb-1 font-medium">Mobile Phone (for delivery OTP) *</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#524438] mb-1 font-medium">Flat, House No., Building, Street *</label>
                <input
                  type="text"
                  required
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                  placeholder="e.g. Penthouse 8, Heritage Villa, Civil Lines"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#524438] mb-1 font-medium">Landmark (Optional)</label>
                <input
                  type="text"
                  value={address.addressLine2}
                  onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                  placeholder="e.g. Near Royal City Palace"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div>
                <label className="block text-[#524438] mb-1 font-medium">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="6 digit PIN code"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div>
                <label className="block text-[#524438] mb-1 font-medium">City *</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div>
                <label className="block text-[#524438] mb-1 font-medium">State *</label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <div>
                <label className="block text-[#524438] mb-1 font-medium">Country</label>
                <input
                  type="text"
                  disabled
                  value={address.country}
                  className="w-full p-2.5 bg-[#EAE2D5] border border-[#D5C9B8] rounded-xs text-[#524438]"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Delivery Transit Protocol */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-xs border border-[#E8DEC8] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3D7C4]">
              <span className="w-6 h-6 rounded-full bg-[#1E1915] text-[#D4AF37] text-xs font-serif flex items-center justify-center font-bold">
                2
              </span>
              <h2 className="font-serif text-lg font-semibold text-[#1E1915]">
                Insured Delivery Protocol
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <label 
                onClick={() => setShippingMethod('armored')}
                className={`flex items-start gap-3 p-3.5 rounded-xs border cursor-pointer transition-colors ${
                  shippingMethod === 'armored' ? 'border-[#947432] bg-white' : 'border-[#E0D5C3] bg-[#FAF7F2]'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'armored'}
                  onChange={() => setShippingMethod('armored')}
                  className="mt-0.5 accent-[#947432]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-[#1E1915] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#947432]" /> Insured Armored Express (BVC / Sequel)
                    </span>
                    <span className="text-[#2C6B3F] font-bold">
                      {cartSubtotal >= brandConfig.freeShippingThreshold ? 'FREE' : formatPrice(brandConfig.defaultShippingFee)}
                    </span>
                  </div>
                  <p className="text-[#7A6959] mt-0.5 leading-relaxed">
                    Tamper-evident sealed security container. Verified hand-off with recipient Aadhaar/OTP.
                  </p>
                </div>
              </label>

              <label 
                onClick={() => setShippingMethod('concierge')}
                className={`flex items-start gap-3 p-3.5 rounded-xs border cursor-pointer transition-colors ${
                  shippingMethod === 'concierge' ? 'border-[#947432] bg-white' : 'border-[#E0D5C3] bg-[#FAF7F2]'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'concierge'}
                  onChange={() => setShippingMethod('concierge')}
                  className="mt-0.5 accent-[#947432]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-[#1E1915] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#947432]" /> Senior Atelier Concierge White-Glove Hand Delivery
                    </span>
                    <span className="text-[#8B6520] font-semibold">Complimentary</span>
                  </div>
                  <p className="text-[#7A6959] mt-0.5 leading-relaxed">
                    Delivered personally by a senior jewellery appraiser in major metro cities with live appraisal check.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* STEP 3: Payment Method */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-xs border border-[#E8DEC8] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3D7C4]">
              <span className="w-6 h-6 rounded-full bg-[#1E1915] text-[#D4AF37] text-xs font-serif flex items-center justify-center font-bold">
                3
              </span>
              <h2 className="font-serif text-lg font-semibold text-[#1E1915]">
                Payment Option
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xs border text-center transition-all cursor-pointer ${
                  paymentMethod === 'UPI'
                    ? 'border-[#947432] bg-white shadow-xs font-semibold text-[#1E1915]'
                    : 'border-[#E0D5C3] bg-white/60 text-[#6B5A4B]'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-[#947432]" />
                <span className="text-xs block">UPI / QR</span>
                <span className="text-[10px] text-[#8C7A68]">GPay, PhonePe</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-3 rounded-xs border text-center transition-all cursor-pointer ${
                  paymentMethod === 'Card'
                    ? 'border-[#947432] bg-white shadow-xs font-semibold text-[#1E1915]'
                    : 'border-[#E0D5C3] bg-white/60 text-[#6B5A4B]'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#947432]" />
                <span className="text-xs block">Cards</span>
                <span className="text-[10px] text-[#8C7A68]">Visa, Master, Amex</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NetBanking')}
                className={`p-3 rounded-xs border text-center transition-all cursor-pointer ${
                  paymentMethod === 'NetBanking'
                    ? 'border-[#947432] bg-white shadow-xs font-semibold text-[#1E1915]'
                    : 'border-[#E0D5C3] bg-white/60 text-[#6B5A4B]'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1 text-[#947432]" />
                <span className="text-xs block">Net Banking</span>
                <span className="text-[10px] text-[#8C7A68]">All Major Banks</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-3 rounded-xs border text-center transition-all cursor-pointer ${
                  paymentMethod === 'COD'
                    ? 'border-[#947432] bg-white shadow-xs font-semibold text-[#1E1915]'
                    : 'border-[#E0D5C3] bg-white/60 text-[#6B5A4B]'
                }`}
              >
                <Banknote className="w-5 h-5 mx-auto mb-1 text-[#947432]" />
                <span className="text-xs block">Pay on Delivery</span>
                <span className="text-[10px] text-[#8C7A68]">Cash / Demand Draft</span>
              </button>
            </div>

            {/* Payment simulation detail box */}
            <div className="p-4 bg-white border border-[#E3D7C4] rounded-xs text-xs text-[#6B5A4B]">
              {paymentMethod === 'UPI' && (
                <div className="space-y-1">
                  <span className="font-semibold text-[#1E1915] block">Instant Zero-Fee UPI Payment</span>
                  <p>
                    A secure UPI QR code will be generated to scan with Google Pay, PhonePe, Paytm, or CRED with instant transaction verification.
                  </p>
                </div>
              )}
              {paymentMethod === 'Card' && (
                <div className="space-y-1">
                  <span className="font-semibold text-[#1E1915] block">256-Bit Encrypted Card Payment</span>
                  <p>
                    Accepts Indian and International Credit/Debit cards. Protected with 3D Secure OTP verification.
                  </p>
                </div>
              )}
              {paymentMethod === 'NetBanking' && (
                <div className="space-y-1">
                  <span className="font-semibold text-[#1E1915] block">Direct Bank Transfer</span>
                  <p>
                    Instant settlement via HDFC, ICICI, SBI, Axis, Kotak and 50+ RBI authorized scheduled banks.
                  </p>
                </div>
              )}
              {paymentMethod === 'COD' && (
                <div className="space-y-1">
                  <span className="font-semibold text-[#1E1915] block">Verified Cash on Delivery (COD)</span>
                  <p>
                    For your security on high-value antique jewellery, our concierge team will place a brief verification call prior to dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Order Review & Confirm (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] p-6 rounded-xs border border-[#E8DEC8] space-y-5">
            <h3 className="font-serif text-lg font-semibold text-[#1E1915] pb-3 border-b border-[#E3D7C4]">
              Jewellery in Order ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            {/* Mini Item List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex items-center gap-3 text-xs"
                >
                  <div className="w-14 h-14 shrink-0 rounded-xs overflow-hidden bg-white border border-[#E0D5C3]">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackTitle={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-medium text-[#1E1915] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#7A6959]">
                      Qty: {item.quantity} · {item.product.specs.goldPurity.split(' ')[0]}
                    </span>
                  </div>
                  <span className="font-serif font-semibold text-[#1E1915] tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs text-[#6B5A4B] pt-4 border-t border-[#E3D7C4]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1E1915] tabular-nums font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#2C6B3F]">
                  <span>Privilege Savings</span>
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
                <span>Insured Armored Express</span>
                <span className="tabular-nums font-medium">
                  {cartSubtotal >= brandConfig.freeShippingThreshold ? (
                    <span className="text-[#2C6B3F] font-semibold">FREE</span>
                  ) : (
                    formatPrice(brandConfig.defaultShippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-[#DFD6C7] text-sm text-[#1E1915] font-semibold">
                <span className="font-serif text-lg">Total Payable</span>
                <span className="font-serif text-2xl text-[#825C1B] tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Security Invoice...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Confirm &amp; Place Order ({formatPrice(cartTotal)})</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-white border border-[#E3D7C4] rounded-xs text-[11px] text-[#7A6959] space-y-1">
            <div className="flex items-center gap-1.5 text-[#1E1915] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#947432]" />
              <span>Full Insurance &amp; Lifetime Authenticity Pledge</span>
            </div>
            <p>
              Your order is protected under our comprehensive gemological guarantee and tamper-proof courier protocol.
            </p>
          </div>
        </div>

      </form>

    </div>
  );
};
