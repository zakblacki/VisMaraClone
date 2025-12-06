# Logo and Branding Update Guide

## 1. Update Company Logo

### Header Logo (client/src/components/layout/header.tsx)

**Current placeholder (lines 115-127):**
```tsx
<div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-md flex items-center justify-center">
  <span className="text-primary-foreground font-bold text-lg lg:text-xl">FV</span>
</div>
```

**Replace with:**
```tsx
<img 
  src="/logo.png" 
  alt="Prodlift Logo" 
  className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
/>
```

### Footer Logo (client/src/components/layout/footer.tsx)

**Current placeholder (lines 52-55):**
```tsx
<div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
  <span className="text-primary-foreground font-bold text-xl">FV</span>
</div>
```

**Replace with:**
```tsx
<img 
  src="/logo.png" 
  alt="Prodlift Logo" 
  className="w-12 h-12 object-contain"
/>
```

### Admin Dashboard Logo (client/src/pages/admin-dashboard.tsx)

**Current placeholder (line 26-28):**
```tsx
<div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
  <span className="text-primary-foreground font-bold">FV</span>
</div>
```

**Replace with:**
```tsx
<img 
  src="/logo.png" 
  alt="Prodlift Admin" 
  className="w-10 h-10 object-contain"
/>
```

## 2. Update Favicon

### Replace Favicon (client/index.html)

**Current (line 18):**
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

**Steps:**
1. Place your company favicon in `client/public/favicon.png` (or .ico)
2. If using .ico format, update the link:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

## 3. Logo File Placement

Place your logo files in:
- `client/public/logo.png` - Main logo (transparent background recommended)
- `client/public/logo-white.png` - White version for dark backgrounds (optional)
- `client/public/favicon.png` or `favicon.ico` - Browser tab icon

### Recommended Logo Specifications:
- **Main Logo**: PNG format, transparent background, 200x200px minimum
- **Favicon**: 32x32px or 64x64px, PNG or ICO format
- **File size**: Keep under 100KB for optimal loading

## 4. Update Meta Tags (Optional)

In `client/index.html`, update Open Graph image:
```html
<meta property="og:image" content="/logo.png" />
```

## 5. Dark Mode Logo Support (Optional)

If you want different logos for light/dark themes:

```tsx
import { useTheme } from "@/components/theme-provider";

const { theme } = useTheme();

<img 
  src={theme === "dark" ? "/logo-white.png" : "/logo.png"}
  alt="Prodlift Logo" 
  className="w-10 h-10 object-contain"
/>
```
