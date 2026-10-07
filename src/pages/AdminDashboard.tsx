import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Save, 
  RotateCcw,
  Truck,
  DollarSign
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryType, CollectionType, OrderStatus, Product } from '../types';
import { AdminLoginPage } from './AdminLoginPage';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    adminLogout, 
    brandConfig, 
    updateBrandConfig, 
    resetBrandConfig, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    formatPrice, 
    setCurrentPage 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'settings'>('overview');

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Antique Necklaces' as CategoryType,
    collection: 'Temple Heritage' as CollectionType,
    price: 15000,
    originalPrice: 18000,
    shortDescription: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    goldPurity: '22 Karat (916 BIS)',
    netGoldWeight: '32.50 grams',
    grossWeight: '36.00 grams',
    gemstones: 'Natural Rubies & Seed Pearls',
    dimensions: 'Standard 16 in',
    craftTechnique: 'Temple Nakshi & Repoussé',
    hallmarkCert: 'BIS 916 Laser Hallmarked',
    provenance: 'Jaipur Atelier',
    stockCount: 5,
    gender: 'Women' as 'Women' | 'Unisex' | 'Men',
    material: '22K Antique Gold' as any,
    occasion: 'Bridal & Wedding' as any,
    availability: 'In Stock' as any,
    isFeatured: true
  });

  // Brand Config Form state
  const [brandForm, setBrandForm] = useState({ ...brandConfig });
  const [brandSavedToast, setBrandSavedToast] = useState(false);

  if (!isAdminLoggedIn) {
    return <AdminLoginPage />;
  }

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((is, i) => is + i.quantity, 0), 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const pendingOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'Antique Necklaces',
      collection: 'Temple Heritage',
      price: 15000,
      originalPrice: 18000,
      shortDescription: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      goldPurity: '22 Karat (916 BIS)',
      netGoldWeight: '32.50 grams',
      grossWeight: '36.00 grams',
      gemstones: 'Natural Rubies & Seed Pearls',
      dimensions: 'Standard 16 in',
      craftTechnique: 'Temple Nakshi & Repoussé',
      hallmarkCert: 'BIS 916 Laser Hallmarked',
      provenance: 'Jaipur Atelier',
      stockCount: 5,
      gender: 'Women',
      material: '22K Antique Gold',
      occasion: 'Bridal & Wedding',
      availability: 'In Stock',
      isFeatured: true
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category,
      collection: prod.collection,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      shortDescription: prod.shortDescription,
      description: prod.description,
      image: prod.images[0] || '',
      goldPurity: prod.specs.goldPurity,
      netGoldWeight: prod.specs.netGoldWeight,
      grossWeight: prod.specs.grossWeight,
      gemstones: prod.specs.gemstones,
      dimensions: prod.specs.dimensions,
      craftTechnique: prod.specs.craftTechnique,
      hallmarkCert: prod.specs.hallmarkCert,
      provenance: prod.specs.provenance,
      stockCount: prod.stockCount,
      gender: prod.gender,
      material: prod.material,
      occasion: prod.occasion,
      availability: prod.availability,
      isFeatured: !!prod.isFeatured
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: productForm.name,
        category: productForm.category,
        collection: productForm.collection,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        shortDescription: productForm.shortDescription,
        description: productForm.description,
        images: [productForm.image],
        stockCount: Number(productForm.stockCount),
        gender: productForm.gender,
        material: productForm.material,
        occasion: productForm.occasion,
        availability: productForm.availability,
        isFeatured: productForm.isFeatured,
        specs: {
          goldPurity: productForm.goldPurity,
          netGoldWeight: productForm.netGoldWeight,
          grossWeight: productForm.grossWeight,
          gemstones: productForm.gemstones,
          dimensions: productForm.dimensions,
          craftTechnique: productForm.craftTechnique,
          hallmarkCert: productForm.hallmarkCert,
          provenance: productForm.provenance
        }
      });
    } else {
      addProduct({
        name: productForm.name,
        category: productForm.category,
        collection: productForm.collection,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        shortDescription: productForm.shortDescription,
        description: productForm.description,
        images: [productForm.image],
        stockCount: Number(productForm.stockCount),
        gender: productForm.gender,
        material: productForm.material,
        occasion: productForm.occasion,
        availability: productForm.availability,
        isFeatured: productForm.isFeatured,
        specs: {
          goldPurity: productForm.goldPurity,
          netGoldWeight: productForm.netGoldWeight,
          grossWeight: productForm.grossWeight,
          gemstones: productForm.gemstones,
          dimensions: productForm.dimensions,
          craftTechnique: productForm.craftTechnique,
          hallmarkCert: productForm.hallmarkCert,
          provenance: productForm.provenance
        }
      });
    }
    setIsProductModalOpen(false);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandConfig(brandForm);
    setBrandSavedToast(true);
    setTimeout(() => setBrandSavedToast(false), 3000);
  };

  const handleResetBrand = () => {
    if (confirm('Reset brand settings to default?')) {
      resetBrandConfig();
      setBrandForm({ ...brandConfig });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1E1915]">
      
      {/* Top Bar */}
      <div className="bg-[#1E1915] text-[#F5EFEB] border-b border-[#362C24] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg tracking-[0.15em] uppercase text-[#D4AF37] font-semibold">
              {brandConfig.brandName}
            </span>
            <span className="text-[11px] bg-[#3B2F25] text-[#DFCBB0] px-2 py-0.5 rounded-xs font-mono">
              Administration Portal
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B2F25] hover:bg-[#503F32] text-[#F3EEE7] rounded-xs transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>View Storefront</span>
            </button>

            <button
              onClick={adminLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8F2824] hover:bg-[#A5322E] text-white rounded-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#EDE5D8] rounded-xs w-fit text-xs font-medium text-[#5C4C3E]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#1E1915] text-white shadow-xs' : 'hover:text-[#1E1915]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Overview &amp; Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#1E1915] text-white shadow-xs' : 'hover:text-[#1E1915]'
            }`}
          >
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'products' ? 'bg-[#1E1915] text-white shadow-xs' : 'hover:text-[#1E1915]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>Products &amp; Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#1E1915] text-white shadow-xs' : 'hover:text-[#1E1915]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#D4AF37]" />
            <span>Brand &amp; Business Config</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 bg-white border border-[#E3D7C4] rounded-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#8C7A68]">Total Atelier Revenue</span>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1915] tabular-nums block">
                  {formatPrice(totalRevenue)}
                </span>
                <span className="text-[11px] text-[#2C6B3F] font-medium">100% Settled Gross Volume</span>
              </div>

              <div className="p-5 bg-white border border-[#E3D7C4] rounded-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#8C7A68]">Total Orders</span>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1915] tabular-nums block">
                  {orders.length}
                </span>
                <span className="text-[11px] text-[#8C7A68]">{pendingOrdersCount} active in transit</span>
              </div>

              <div className="p-5 bg-white border border-[#E3D7C4] rounded-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#8C7A68]">Average Order Value</span>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1915] tabular-nums block">
                  {formatPrice(averageOrderValue)}
                </span>
                <span className="text-[11px] text-[#8C7A68]">High-value antique basket</span>
              </div>

              <div className="p-5 bg-white border border-[#E3D7C4] rounded-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#8C7A68]">Catalog In Vault</span>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1915] tabular-nums block">
                  {products.length} Designs
                </span>
                <span className="text-[11px] text-[#2C6B3F] font-medium">100% BIS Hallmarked</span>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white border border-[#E3D7C4] rounded-xs overflow-hidden space-y-4 p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE0]">
                <h3 className="font-serif text-lg font-semibold text-[#1E1915]">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#947432] hover:underline font-medium cursor-pointer"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] text-[#8C7A68] border-b border-[#EAE0CF]">
                      <th className="p-3">Order #</th>
                      <th className="p-3">Consignee</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE0]">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-[#FAF7F2]">
                        <td className="p-3 font-mono font-bold text-[#1E1915]">{o.orderNumber}</td>
                        <td className="p-3">{o.shippingAddress.fullName} ({o.shippingAddress.city})</td>
                        <td className="p-3">{o.items.length} piece(s)</td>
                        <td className="p-3 font-serif font-semibold text-[#825C1B] tabular-nums">{formatPrice(o.total)}</td>
                        <td className="p-3">{o.paymentMethod}</td>
                        <td className="p-3">
                          <span className="text-[11px] font-semibold text-[#825C1B] bg-[#F4ECDA] px-2 py-0.5 rounded-xs">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#1E1915]">
                  Orders &amp; Armored Transit Manager
                </h2>
                <p className="text-xs text-[#7A6959]">
                  Update order milestones, tracking air waybills, and delivery statuses.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E3D7C4] rounded-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] text-[#7A6959] border-b border-[#EAE0CF]">
                      <th className="p-3.5">Order Ref</th>
                      <th className="p-3.5">Customer &amp; Contact</th>
                      <th className="p-3.5">Address</th>
                      <th className="p-3.5">Settlement</th>
                      <th className="p-3.5">Waybill #</th>
                      <th className="p-3.5">Current Status</th>
                      <th className="p-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE0]">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="p-3.5">
                          <span className="font-mono font-bold text-[#1E1915] block">{order.orderNumber}</span>
                          <span className="text-[10px] text-[#8C7A68]">
                            {new Date(order.createdAt).toLocaleDateString('en-GB')}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <strong className="text-[#1E1915] block">{order.shippingAddress.fullName}</strong>
                          <span className="text-[11px] text-[#7A6959]">{order.shippingAddress.phone}</span>
                        </td>

                        <td className="p-3.5 max-w-xs">
                          <span className="truncate block">{order.shippingAddress.addressLine1}</span>
                          <span className="text-[11px] text-[#7A6959]">
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="font-serif font-semibold text-[#825C1B] tabular-nums block">
                            {formatPrice(order.total)}
                          </span>
                          <span className="text-[10px] text-[#2C6B3F]">{order.paymentMethod} ({order.paymentStatus})</span>
                        </td>

                        <td className="p-3.5">
                          <input
                            type="text"
                            defaultValue={order.trackingNumber || ''}
                            onBlur={(e) => updateOrderStatus(order.id, order.status, e.target.value)}
                            placeholder="Assign Waybill"
                            className="p-1.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs font-mono text-[11px] text-[#1E1915] w-28"
                          />
                        </td>

                        <td className="p-3.5">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="p-1.5 bg-white border border-[#D5C9B8] rounded-xs text-xs font-medium text-[#1E1915] focus:border-[#947432]"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Hallmarked & Inspected">Hallmarked &amp; Inspected</option>
                            <option value="Shipped">Dispatched via Armored Courier</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="p-3.5">
                          <button
                            onClick={() => setCurrentPage('order-success', { orderId: order.id })}
                            className="px-2.5 py-1 bg-[#1E1915] text-white text-[11px] rounded-xs hover:bg-[#382F27] cursor-pointer"
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & INVENTORY MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#1E1915]">
                  Antique Jewellery Catalog &amp; Inventory
                </h2>
                <p className="text-xs text-[#7A6959]">
                  Add, edit prices, images, purity specifications, or remove pieces from the collection.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Add New Antique Piece</span>
              </button>
            </div>

            <div className="bg-white border border-[#E3D7C4] rounded-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] text-[#7A6959] border-b border-[#EAE0CF]">
                      <th className="p-3">Piece</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Collection</th>
                      <th className="p-3">Price / MRP</th>
                      <th className="p-3">Purity &amp; Wt</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE0]">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF7F2]/60">
                        <td className="p-3 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xs overflow-hidden bg-[#F5EFEA] border border-[#E5DDD0] shrink-0">
                            <ImageWithFallback
                              src={prod.images[0]}
                              alt={prod.name}
                              fallbackTitle={prod.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <strong className="text-[#1E1915] font-serif text-sm block">{prod.name}</strong>
                            <span className="text-[10px] text-[#8C7A68]">{prod.availability}</span>
                          </div>
                        </td>

                        <td className="p-3">{prod.category}</td>
                        <td className="p-3">{prod.collection}</td>

                        <td className="p-3">
                          <span className="font-serif font-semibold text-[#1E1915] tabular-nums block">
                            {formatPrice(prod.price)}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-[11px] text-[#8C7A68] line-through tabular-nums">
                              {formatPrice(prod.originalPrice)}
                            </span>
                          )}
                        </td>

                        <td className="p-3">
                          <span className="block font-medium">{prod.specs.goldPurity}</span>
                          <span className="text-[11px] text-[#8C7A68]">{prod.specs.netGoldWeight}</span>
                        </td>

                        <td className="p-3">
                          <span className="tabular-nums font-semibold text-[#1E1915]">{prod.stockCount} in vault</span>
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 text-[#5C4C3E] hover:text-[#947432] border border-[#D5C9B8] rounded-xs cursor-pointer"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove "${prod.name}" from catalog?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-[#8F2824] hover:bg-[#8F2824]/10 border border-[#E0C0C0] rounded-xs cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BRAND CONFIGURATION EDITOR (Per prompt instruction) */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#1E1915]">
                  Brand &amp; Business Information Configuration
                </h2>
                <p className="text-xs text-[#7A6959]">
                  Easily customize the brand name, contact phone, boutique addresses, and policies anytime.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleResetBrand}
                  className="px-4 py-2 border border-[#D5C9B8] text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </div>

            {brandSavedToast && (
              <div className="p-3 bg-[#EAF5ED] border border-[#A6D6B3] text-xs text-[#2C6B3F] rounded-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Brand changes saved successfully! All storefront pages have updated.</span>
              </div>
            )}

            <form onSubmit={handleSaveBrand} className="bg-white border border-[#E3D7C4] p-6 sm:p-8 rounded-xs space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Store Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={brandForm.brandName}
                    onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915] text-sm font-serif"
                  />
                  <span className="text-[10px] text-[#8C7A68]">Shown in top navigation, footer, hero, and invoices.</span>
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Brand Tagline</label>
                  <input
                    type="text"
                    value={brandForm.tagline}
                    onChange={(e) => setBrandForm({ ...brandForm, tagline: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Hero Subtitle</label>
                  <input
                    type="text"
                    value={brandForm.subTitle}
                    onChange={(e) => setBrandForm({ ...brandForm, subTitle: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Contact Email</label>
                  <input
                    type="email"
                    value={brandForm.contactEmail}
                    onChange={(e) => setBrandForm({ ...brandForm, contactEmail: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Contact Phone</label>
                  <input
                    type="text"
                    value={brandForm.contactPhone}
                    onChange={(e) => setBrandForm({ ...brandForm, contactPhone: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">WhatsApp Concierge Number</label>
                  <input
                    type="text"
                    value={brandForm.whatsappNumber}
                    onChange={(e) => setBrandForm({ ...brandForm, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                  <span className="text-[10px] text-[#8C7A68]">Used for 1-click WhatsApp customer concierge inquiries.</span>
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Currency Symbol &amp; Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={brandForm.currencySymbol}
                      onChange={(e) => setBrandForm({ ...brandForm, currencySymbol: e.target.value })}
                      className="w-20 p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                    />
                    <input
                      type="text"
                      value={brandForm.currencyCode}
                      onChange={(e) => setBrandForm({ ...brandForm, currencyCode: e.target.value })}
                      className="w-24 p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Flagship Boutique Address</label>
                  <input
                    type="text"
                    value={brandForm.boutiqueAddress}
                    onChange={(e) => setBrandForm({ ...brandForm, boutiqueAddress: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Boutique City &amp; State</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={brandForm.boutiqueCity}
                      onChange={(e) => setBrandForm({ ...brandForm, boutiqueCity: e.target.value })}
                      className="w-1/2 p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                    />
                    <input
                      type="text"
                      value={brandForm.boutiqueState}
                      onChange={(e) => setBrandForm({ ...brandForm, boutiqueState: e.target.value })}
                      className="w-1/2 p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-semibold">Free Shipping Threshold ({brandForm.currencySymbol})</label>
                  <input
                    type="number"
                    value={brandForm.freeShippingThreshold}
                    onChange={(e) => setBrandForm({ ...brandForm, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE0CF] flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save Brand Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FAF7F2] p-6 sm:p-8 max-w-2xl w-full rounded-xs border border-[#DFD1B8] shadow-2xl relative space-y-4 my-8">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 text-[#6E5D4C] hover:text-[#1E1915]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl font-semibold text-[#1E1915]">
              {editingProductId ? 'Edit Antique Piece' : 'Add New Antique Jewellery Creation'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[#4E3F32] mb-1 font-medium">Piece Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Royal Padmavati Kundan Choker"
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as CategoryType })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  >
                    <option>Antique Necklaces</option>
                    <option>Earrings</option>
                    <option>Bangles</option>
                    <option>Rings</option>
                    <option>Chains</option>
                    <option>Bracelets</option>
                    <option>Maang Tikka</option>
                    <option>Nose Pins</option>
                    <option>Bridal Jewellery</option>
                    <option>Temple Jewellery</option>
                    <option>Vintage Collections</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Collection</label>
                  <select
                    value={productForm.collection}
                    onChange={(e) => setProductForm({ ...productForm, collection: e.target.value as CollectionType })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  >
                    <option>Royal Rajputana</option>
                    <option>Temple Heritage</option>
                    <option>Nizami Polki</option>
                    <option>Victorian Heirloom</option>
                    <option>South Indian Kasu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Selling Price ({brandConfig.currencySymbol}) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Original MRP ({brandConfig.currencySymbol})</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4E3F32] mb-1 font-medium">Image URL</label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Gold Purity</label>
                  <input
                    type="text"
                    value={productForm.goldPurity}
                    onChange={(e) => setProductForm({ ...productForm, goldPurity: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Net Gold Weight</label>
                  <input
                    type="text"
                    value={productForm.netGoldWeight}
                    onChange={(e) => setProductForm({ ...productForm, netGoldWeight: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Craft Technique</label>
                  <input
                    type="text"
                    value={productForm.craftTechnique}
                    onChange={(e) => setProductForm({ ...productForm, craftTechnique: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4E3F32] mb-1 font-medium">Short Description (for product cards)</label>
                  <textarea
                    rows={2}
                    value={productForm.shortDescription}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4E3F32] mb-1 font-medium">Full Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#DFD1B8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#6E5D4C] hover:text-[#1E1915]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E1915] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#382F27] transition-colors cursor-pointer"
                >
                  {editingProductId ? 'Save Changes' : 'Create Piece in Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
