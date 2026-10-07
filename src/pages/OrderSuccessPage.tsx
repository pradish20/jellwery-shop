import React from 'react';
import { 
  CheckCircle, 
  Printer, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Package, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const OrderSuccessPage: React.FC = () => {
  const { orders, pageParams, formatPrice, setCurrentPage, brandConfig } = useStore();

  const orderId = pageParams.orderId;
  const order = orders.find(o => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#1E1915]">Order Not Found</h2>
        <button 
          onClick={() => setCurrentPage('home')}
          className="px-6 py-2 bg-[#1E1915] text-white text-xs uppercase tracking-wider rounded-xs"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Success Hero Plaque */}
      <div className="bg-[#FAF7F2] border border-[#E0D3BC] p-8 sm:p-12 text-center rounded-xs space-y-4 shadow-xs">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF5EE] text-[#2C6B3F] flex items-center justify-center border border-[#A6D6B3]">
          <CheckCircle className="w-9 h-9" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
          Royal Acquisition Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1915] font-light">
          Thank you for choosing {brandConfig.brandName}
        </h1>

        <p className="text-xs sm:text-sm text-[#6B5A4B] max-w-lg mx-auto leading-relaxed">
          Your order has been recorded into the private atelier archives. An official invoice copy has been dispatched to <strong>{order.shippingAddress.email}</strong>.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3EDE0] border border-[#DFD1B8] rounded-xs text-xs font-mono font-medium text-[#1E1915]">
          <span>Order Reference:</span>
          <span className="font-bold text-[#825C1B]">{order.orderNumber}</span>
        </div>
      </div>

      {/* Shipment Milestones Timeline */}
      <div className="bg-white border border-[#EDE5D8] p-6 sm:p-8 rounded-xs space-y-6">
        <h3 className="font-serif text-lg font-semibold text-[#1E1915] border-b border-[#F2ECE0] pb-3">
          Armored Transit Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-[#FAF7F2] border border-[#947432]/40 rounded-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#947432] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Step 1: Confirmed
            </span>
            <span className="font-medium text-[#1E1915] block">Order Verified</span>
            <span className="text-[11px] text-[#7A6959]">Recorded in atelier ledger</span>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#7A6959]">
              Step 2: Assay Inspection
            </span>
            <span className="font-medium text-[#1E1915] block">BIS Hallmark Verification</span>
            <span className="text-[11px] text-[#7A6959]">22K purity re-checked</span>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#7A6959]">
              Step 3: Velvet Vaulting
            </span>
            <span className="font-medium text-[#1E1915] block">Tamper-Proof Packaged</span>
            <span className="text-[11px] text-[#7A6959]">Individually sealed in box</span>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#7A6959]">
              Step 4: Insured Hand-Off
            </span>
            <span className="font-medium text-[#1E1915] block">Doorstep Delivery</span>
            <span className="text-[11px] text-[#7A6959]">3–5 business days</span>
          </div>
        </div>
      </div>

      {/* Itemized Invoice Receipt */}
      <div className="bg-[#FAF7F2] border border-[#E0D3BC] p-6 sm:p-8 rounded-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3D7C4] gap-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#1E1915]">
              Atelier Receipt &amp; Appraisal Certificate
            </h2>
            <span className="text-xs text-[#7A6959]">
              Date: {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#D5C9B8] hover:border-[#1E1915] rounded-xs text-xs font-medium text-[#1E1915] transition-colors cursor-pointer w-fit"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Receipt</span>
          </button>
        </div>

        {/* Itemized Table */}
        <div className="divide-y divide-[#EAE0CF]">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xs overflow-hidden bg-white border border-[#DFD5C3]">
                  <ImageWithFallback
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fallbackTitle={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-medium text-[#1E1915]">
                    {item.product.name}
                  </h4>
                  <span className="text-[11px] text-[#7A6959]">
                    Qty: {item.quantity} · Purity: {item.product.specs.goldPurity}
                  </span>
                </div>
              </div>
              <span className="font-serif text-sm font-semibold text-[#1E1915] tabular-nums">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Math Breakdown */}
        <div className="pt-4 border-t border-[#E3D7C4] space-y-1.5 text-xs text-[#6B5A4B]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-[#2C6B3F]">
              <span>Privilege Discount</span>
              <span className="tabular-nums">- {formatPrice(order.discount)}</span>
            </div>
          )}
          {order.giftWrapFee > 0 && (
            <div className="flex justify-between">
              <span>Velvet Presentation Vault</span>
              <span className="tabular-nums">{formatPrice(order.giftWrapFee)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Insured Armored Express Courier</span>
            <span className="tabular-nums">{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-[#D5C7B0] text-sm text-[#1E1915] font-semibold">
            <span className="font-serif text-base">Total Settled</span>
            <span className="font-serif text-xl text-[#825C1B] tabular-nums">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Shipping Destination Summary */}
        <div className="pt-4 border-t border-[#E3D7C4] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C4C3E]">
          <div>
            <span className="font-semibold text-[#1E1915] block mb-1">Insured Consignee:</span>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>

          <div>
            <span className="font-semibold text-[#1E1915] block mb-1">Payment &amp; Logistics:</span>
            <p>Payment Mode: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})</p>
            <p>Air Waybill: <strong className="font-mono text-[#825C1B]">{order.trackingNumber}</strong></p>
            <p>Assay Center: Jaipur Directorate of Hallmarking</p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => setCurrentPage('account', { tab: 'orders' })}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#1E1915] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#382F27] transition-colors cursor-pointer"
        >
          Track in Customer Account
        </button>

        <button
          onClick={() => setCurrentPage('shop')}
          className="w-full sm:w-auto px-8 py-3.5 border border-[#1E1915] text-[#1E1915] text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-white transition-colors cursor-pointer"
        >
          Continue Exploring Collection
        </button>
      </div>

    </div>
  );
};
