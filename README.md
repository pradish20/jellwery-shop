# Your Antique Jewellery — E-Commerce Storefront

A luxury, editorial-grade **Antique Jewellery E-Commerce Website** built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## 🌟 Features

- **Luxury Antique Aesthetic**: Warm Ivory/Cream, Deep Brown, Antique Gold, Champagne, and subtle black palette with `Cormorant Garamond` and `Cinzel` serif typography.
- **Resilient Media Architecture**: Automatic graceful fallback for all jewellery assets ensuring 100% zero broken images.
- **11 Complete Pages & Portals**:
  1. **Home**: Editorial hero campaign, featured collections category grid, featured products, craftsmanship & Karigar heritage story, and private bridal consultation concierge banner.
  2. **Shop / Collection**: Responsive product grid (4/desktop, 2/mobile) with 7 filters (Category, Price Range, Gender, Collection, Availability, Material, Occasion), live search, and sorting.
  3. **Product Details**: Image gallery with zoom modal, complete gemology & gold purity specs, traditional Indian bangle/ring size guide, reviews, and direct WhatsApp concierge.
  4. **About Our Heritage**: Lost-wax casting (*cire-perdue*), temple nakshi, Jadau polki, and master Karigar guild traditions.
  5. **Boutique & Concierge**: Jaipur flagship & Mumbai viewing salon info, bridal appointment scheduler, and collector FAQs.
  6. **Shopping Bag**: Slide-over drawer and dedicated cart page with quantity stepper, coupon engine (`ROYAL10`, `ANTIQUE15`), velvet box add-on, and free shipping progress meter.
  7. **Checkout**: Multi-step checkout with Indian PIN code auto-fill, armored insured delivery (BVC / Sequel), and multiple payment simulations (UPI QR, Card, Net Banking, COD).
  8. **Order Success**: Detailed tax invoice receipt with milestone delivery tracking and print option.
  9. **Customer Account**: Insured order tracking, saved wishlist with 1-click move to bag, and saved addresses.
  10. **Admin Login**: Security key portal.
  11. **Admin Dashboard**: Revenue KPIs, order milestone updater, product catalog CRUD (Add/Edit/Delete), and live Brand Configuration editor.

---

## 🚀 How to Deploy to GitHub

### Option A: Automatic Deployment via GitHub Actions (Recommended)

This repository includes a pre-configured workflow at `.github/workflows/deploy.yml`.

1. **Initialize Git and Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Antique Jewellery Store"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages** (under Code and automation).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - Your site will automatically build and publish! The live URL will appear at `https://<your-username>.github.io/<your-repo-name>/`.

---

### Option B: Manual Static Build

1. Build the production files:
   ```bash
   npm run build
   ```
2. The compiled assets will be in the `dist/` directory, ready to deploy to GitHub Pages, Vercel, Netlify, or any static hosting provider.

---

## 🛠 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Type check & lint
npm run lint

# 4. Production build
npm run build
```

---

## 🔐 Administrative Access

- **Admin Login Route**: Accessible via the lock icon in the footer or by navigating to Admin Portal in the menu.
- **Default Master Key**: `antique123` or `admin123`
- From the **Brand & Business Config** tab inside the admin portal, you can customize the brand name, contact details, currency, and addresses live.
