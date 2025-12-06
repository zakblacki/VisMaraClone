# Fratelli Vismara - Elevator Company Website Clone

A full-stack clone of the Fratelli Vismara elevator company website (fratellivismara.it), featuring a professional B2B industrial website with product catalog, interactive configurators, and contact functionality.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)

## 🚀 Tech Stack

### Frontend
- **React** 18.3.1 with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components built on Radix UI
- **Wouter** - Client-side routing (lightweight React Router alternative)
- **TanStack Query** - Powerful data synchronization
- **React Hook Form** + **Zod** - Form handling and validation
- **Framer Motion** - Smooth animations
- **Recharts** - Chart visualizations

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe development
- **Drizzle ORM** - Type-safe SQL database toolkit
- **PostgreSQL** - Relational database
- **Passport.js** - Authentication middleware

### Build & Development
- **Vite** - Lightning-fast build tool
- **tsx** - TypeScript execution engine
- **esbuild** - Extremely fast bundler

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── home/       # Homepage sections
│   │   │   ├── layout/     # Header, Footer, Navigation
│   │   │   └── ui/         # Shadcn UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and data
│   │   └── App.tsx         # Main application component
│   └── index.html
├── server/                 # Backend application
│   ├── index.ts            # Express server
│   ├── routes.ts           # API routes
│   ├── db.ts               # Database connection
│   ├── seed.ts             # Database seeding
│   └── setup-db.ts         # Database setup script
├── shared/                 # Shared code between client and server
│   └── schema.ts           # Database schema and types
└── dist/                   # Production build output
```

## 🎯 Key Features

1. **Homepage** - Hero carousel with dynamic slides, services showcase, featured products
2. **Product Catalog** - Comprehensive product listing with search, filter, and grid/list views
3. **Product Details** - Detailed specifications, high-quality images, related products
4. **Elevator Configurator** - Multi-step wizard for customizing elevator components
5. **Platform Configurator** - Accessibility lift configuration tool
6. **Contact Form** - Professional inquiry form with validation
7. **Downloads Area** - Technical documentation and catalogs
8. **Service Pages** - Design, tooling, and stamping services
9. **Dark/Light Theme** - Seamless theme switching
10. **Responsive Design** - Mobile-first approach, works on all devices

## 📍 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, services, and products |
| `/catalogo` | Product catalog with search and filters |
| `/prodotto/:slug` | Individual product detail page |
| `/contatti` | Contact form |
| `/configuratore-ascensore` | Elevator configurator wizard |
| `/configuratore-piattaforma` | Platform configurator wizard |
| `/download` | Downloads area |
| `/servizi/:slug` | Service detail pages |

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 14.x

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd VisMaraClone
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and configure your database
nano .env
```

Required environment variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/vismara_clone
NODE_ENV=development
SESSION_SECRET=your-secret-key-here
```

### Step 4: Set Up the Database

The easiest way to set up your database is to use the automated setup script:

```bash
npm run db:setup
```

This script will:
1. ✅ Validate your DATABASE_URL
2. 📦 Create/update database tables (schema push)
3. 🌱 Seed the database with sample data (if empty)

**Manual Setup (Alternative)**

If you prefer to set up the database manually:

```bash
# Push schema to create tables
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5000**

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run typecheck` | Alias for type checking |
| `npm run lint` | Run TypeScript linting |
| `npm run db:push` | Push database schema changes |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:setup` | Complete database setup (recommended) |

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

The build process:
1. Bundles the React frontend with Vite
2. Outputs optimized chunks (React vendor, UI vendor, charts, etc.)
3. Bundles the Express backend with esbuild
4. Generates production-ready files in `dist/`

### Build Optimization

The build is configured with:
- **Code splitting** - Separate chunks for vendors, UI libraries, and application code
- **Tree shaking** - Removes unused code
- **Minification** - Compresses JavaScript and CSS
- **Asset optimization** - Optimizes images and fonts

Chunk strategy:
- `react-vendor.js` - React core libraries
- `ui-vendor.js` - Radix UI components
- `charts.js` - Recharts library
- `motion.js` - Framer Motion
- `index.js` - Application code

## 🎨 Design System

The application uses a consistent design system with:

- **Primary Color**: Blue (210 hue) - Professional industrial aesthetic
- **Typography**: 
  - Headings: Montserrat font family
  - Body: Inter font family
- **Spacing Scale**: 4/8/12/16/24 (consistent rhythm)
- **Component Library**: Shadcn UI (Radix UI primitives with custom styling)
- **Responsive Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

### Categories
- Product categories (e.g., "Limitatori di velocità", "Operatori porta")
- Includes name, slug, description, and icon

### Products
- Elevator components and parts
- Links to categories
- Includes code, name, slug, description, specifications, and images

### Inquiries
- Contact form submissions
- Captures customer information and messages
- Can be linked to specific products

### Elevator Configurations
- Saved elevator customizations from the configurator
- Tracks cabin type, capacity, floors, door type, finishes, etc.

### Platform Configurations
- Saved platform lift customizations
- Tracks platform type, capacity, travel height, safety features, etc.

### Users
- Admin/staff users for backend management
- Username and hashed password authentication

## 🔒 Security Considerations

### Current Security Measures
- ✅ Environment variables for sensitive data
- ✅ Type-safe database queries with Drizzle ORM
- ✅ Input validation with Zod schemas
- ✅ Session-based authentication with Passport.js

### Known Vulnerabilities

**Development Dependencies (Non-Critical)**
- `drizzle-kit` has a transitive dependency on an older `esbuild` version with a moderate severity vulnerability (GHSA-67mh-4wv8-2f99)
- **Impact**: Only affects development server, not production builds
- **Status**: Waiting for drizzle-kit to update dependencies
- **Mitigation**: The vulnerability only allows requests during development. Production builds are unaffected.

To check for vulnerabilities:
```bash
npm audit
```

## 🚧 Troubleshooting

### Database Connection Issues

**Error**: `DATABASE_URL must be set`
**Solution**: Make sure you have a `.env` file with a valid `DATABASE_URL`

```bash
cp .env.example .env
# Edit .env and set your database URL
```

### Build Warnings

**Warning**: "Some chunks are larger than 500 kB after minification"
**Status**: ✅ Fixed with manual chunking configuration
**Solution**: The build is now optimized to split large dependencies into separate chunks

### TypeScript Errors

Run the type checker to identify issues:
```bash
npm run typecheck
```

### Port Already in Use

If port 5000 is already in use, modify `server/index.ts` to use a different port, or stop the process using port 5000:

```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

## 🤝 Contributing

This project follows standard Git workflow:

1. Create a feature branch
2. Make your changes
3. Run `npm run typecheck` and `npm run lint`
4. Build to ensure no errors: `npm run build`
5. Submit a pull request

## 📄 License

MIT License

## 📞 Support

For questions or issues, please open an issue on the repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
