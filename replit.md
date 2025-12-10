# Fratelli Vismara - Elevator Company Website Clone

## Overview
This is a full-stack clone of the Fratelli Vismara elevator company website (fratellivismara.it). The application features a professional B2B industrial website with product catalog, interactive configurators, and contact functionality.

## Tech Stack
- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── home/           # Homepage sections
│   │   ├── layout/         # Header, Footer
│   │   ├── ui/             # Shadcn UI components
│   │   └── theme-provider.tsx
│   ├── pages/              # Page components
│   ├── lib/
│   │   ├── data.ts         # Static data (products, services, config options)
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── hooks/
│   └── App.tsx
├── index.html
└── public/

server/
├── index.ts
├── routes.ts
├── storage.ts
└── vite.ts

shared/
└── schema.ts               # Data models and TypeScript types
```

## Key Features
1. **Homepage** - Hero carousel, services, products showcase, why choose us
2. **Product Catalog** - Search, filter, grid/list view for elevator components
3. **Product Details** - Technical specifications, related products
4. **Elevator Configurator** - Step-by-step customization wizard
5. **Platform Configurator** - Accessibility lift configuration
6. **Contact Form** - With validation and subject selection
7. **Downloads** - Catalog and technical documentation downloads
8. **Services Pages** - Design, tooling, stamping services
9. **Dark/Light Theme** - Toggle support

## Routes
- `/` - Homepage
- `/catalogo` - Product catalog
- `/prodotto/:slug` - Product detail
- `/contatti` - Contact page
- `/configuratore-ascensore` - Elevator configurator
- `/configuratore-piattaforma` - Platform configurator
- `/download` - Downloads area
- `/servizi/:slug` - Service pages

## Design System
- **Primary Color**: Blue (210 hue) - Professional industrial look
- **Typography**: Inter for body, Montserrat for headings
- **Spacing**: Consistent 4/8/12/16/24 scale
- **Components**: Uses Shadcn UI with custom theming

## Running the Application
The application runs on port 5000 with both frontend and backend served from the same port.

```bash
npm run dev
```

## Security Features (Production-Ready)

### Rate Limiting
- Login endpoint: 5 attempts per 15 minutes per IP
- General API: 100 requests per minute
- Uses Express trust proxy configuration for accurate IP detection

### CSRF Protection
- Token-based CSRF protection for all authenticated mutating endpoints
- Tokens generated on login, validated on each request
- Frontend stores token in localStorage, clears on logout
- Exempt endpoints (protected by rate limiting instead):
  - `/api/auth/login` - Pre-authentication
  - `/api/auth/setup` - Initial setup
  - `/api/inquiries` - Public contact form
  - `/api/newsletter` - Public signup

### File Upload Security
- Extension whitelist validation (MIME type + file extension)
- Images: .jpg, .jpeg, .png, .gif, .webp (max 10MB)
- PDFs: .pdf only (max 50MB)
- Images auto-converted to WebP at 80% quality
- Unique filenames with crypto hash
- Async cleanup on optimization failure

### Authentication
- JWT-based admin authentication
- Bearer token in Authorization header
- Secure headers (X-Content-Type-Options, X-Frame-Options, etc.)

## File Upload Paths
- Images: `/public/uploads/images/`
- PDFs: `/public/uploads/pdfs/`
- Static serving with 1-year cache for uploads

## Recent Changes
- Added production-ready security features (rate limiting, CSRF, file validation)
- Implemented file upload system with Sharp image optimization
- Added CSV export for products
- Implemented lazy loading for product images
- Added advanced search/filter API endpoint
- Initial implementation of full website clone
- Added all major pages and components
- Implemented interactive configurators
- Added product catalog with search/filter
- Created responsive header/footer with navigation
