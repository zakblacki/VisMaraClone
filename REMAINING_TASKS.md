# Remaining Tasks & Quick Reference

## Critical - Must Do First

### 1. Database Setup
```bash
npm run db:setup
```
This fixes the 500 errors on API endpoints.

---

## High Priority

### 1. Logo Updates

**Header Logo** (`client/src/components/layout/header.tsx`):
```tsx
// Replace this:
<div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-md flex items-center justify-center">
  <span className="text-primary-foreground font-bold text-lg lg:text-xl">FV</span>
</div>

// With your logo image:
<img src="/logo.png" alt="Prodlift" className="h-10 lg:h-12 w-auto" />
```

**Footer Logo** (`client/src/components/layout/footer.tsx`):
```tsx
// Replace this:
<div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
  <span className="text-primary-foreground font-bold text-xl">FV</span>
</div>

// With your logo image:
<img src="/logo.png" alt="Prodlift" className="h-12 w-auto" />
```

**Favicon** (`client/index.html`):
```html
<!-- Replace the favicon link -->
<link rel="icon" type="image/svg+xml" href="/your-favicon.svg" />
```

---

### 2. PDF Download Feature - Complete Integration

**Current State**: Admin panel can upload PDFs, but they're not connected to products yet.

**To Complete**:
1. Add `pdfUrl` field to products table in `shared/schema.ts`
2. Update product form to allow PDF selection
3. Update product detail page to show PDF download
4. Implement PDF storage backend

---

### 3. Admin Authentication

**Current State**: Admin panel is accessible without login.

**To Add**:
1. Create login page at `/admin/login`
2. Add session management
3. Protect `/admin` route with authentication check
4. Add logout functionality

---

## Medium Priority

### 1. API Endpoints - Complete Implementation

**Currently Stubbed**:
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/pdfs/upload` - Upload PDF
- `DELETE /api/pdfs/:id` - Delete PDF

**To Implement**:
- Add actual database operations
- Add file storage for PDFs
- Add proper error handling

---

### 2. Product Images

**Current State**: Using placeholder images from `attached_assets/generated_images/`

**To Improve**:
1. Allow image upload in admin panel
2. Store images in `/public/images/products/`
3. Update product image field to store image URL
4. Add image preview in admin form

---

## Low Priority

### 1. Enhanced Admin Features
- Bulk operations (select multiple products)
- Export products to CSV
- Import products from CSV
- Advanced filtering and sorting
- Product categories management

### 2. User Features
- Wishlist/favorites (requires user accounts)
- Product comparison
- Advanced search filters
- Product reviews and ratings

### 3. Performance
- Image optimization
- Lazy loading for product images
- Caching strategies
- Database query optimization

---

## Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:setup      # Complete setup
npm run db:push       # Push schema changes
npm run db:seed       # Seed sample data

# Type checking
npm run typecheck

# Linting
npm run lint
```

---

## File Locations Reference

### Frontend Components
- Header: `client/src/components/layout/header.tsx`
- Footer: `client/src/components/layout/footer.tsx`
- Admin Dashboard: `client/src/pages/admin-dashboard.tsx`
- Product Management: `client/src/components/admin/admin-products.tsx`
- PDF Management: `client/src/components/admin/admin-pdfs.tsx`

### Backend
- Routes: `server/routes.ts`
- Database: `server/db.ts`
- Storage: `server/storage.ts`
- Schema: `shared/schema.ts`

### Configuration
- Environment: `.env` (copy from `.env.example`)
- Tailwind: `tailwind.config.ts`
- TypeScript: `tsconfig.json`
- Vite: `vite.config.ts`

---

## Testing URLs

```
Homepage:           http://localhost:5000/
Catalog:            http://localhost:5000/catalogo
Product Detail:     http://localhost:5000/prodotto/limitatore-velocita-bidirezionale-240mm
Admin Dashboard:    http://localhost:5000/admin
Legal Pages:
  - Terms:          http://localhost:5000/termini
  - Privacy:        http://localhost:5000/privacy
  - Cookies:        http://localhost:5000/cookie
  - About:          http://localhost:5000/chi-siamo
```

---

## Environment Variables

Create `.env` file (copy from `.env.example`):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/prodlift
NODE_ENV=development
SESSION_SECRET=your-secret-key-here
PORT=5000
```

---

## Common Issues & Solutions

### Issue: 500 errors on API endpoints
**Solution**: Run `npm run db:setup`

### Issue: TypeScript errors after file creation
**Solution**: Restart the dev server or run `npm run typecheck`

### Issue: Styles not applying
**Solution**: Make sure Tailwind CSS is properly configured in `tailwind.config.ts`

### Issue: Images not loading
**Solution**: Check that image paths are correct and files exist in `attached_assets/generated_images/`

---

## Support Resources

- README.md - Full project documentation
- PROJECT_SUMMARY.md - Detailed project analysis
- IMPLEMENTATION_SUMMARY.md - What was implemented
- Component files - Individual component documentation

---

## Next Session Checklist

- [ ] Run `npm run db:setup`
- [ ] Test API endpoints
- [ ] Update logo in header and footer
- [ ] Test admin panel
- [ ] Implement admin authentication
- [ ] Complete PDF integration
- [ ] Test all pages load correctly
- [ ] Run `npm run build` to check for errors
