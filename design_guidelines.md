# Fratelli Vismara Website Clone - Design Guidelines

## Design Approach

**System Foundation**: Material Design adapted for industrial/manufacturing aesthetic with professional B2B focus. This provides structured components while maintaining the technical credibility required for elevator engineering.

**Reference Inspiration**: Industrial B2B leaders like Siemens, ABB, and Kone for professional product presentation combined with modern catalog interfaces like Shopify's product grids.

## Typography System

**Font Stack**: 
- Primary: 'Inter' or 'Roboto' (400, 500, 600, 700) for clean, technical legibility
- Headings: 'Montserrat' or 'Poppins' (600, 700) for impact and professionalism

**Hierarchy**:
- H1 (Hero): text-4xl lg:text-6xl font-bold (48-60px desktop)
- H2 (Section): text-3xl lg:text-5xl font-bold (36-48px)
- H3 (Subsection): text-2xl lg:text-3xl font-semibold (24-36px)
- Body: text-base lg:text-lg (16-18px)
- Small/Captions: text-sm (14px)

## Layout System

**Spacing Units**: Consistent use of 4, 8, 12, 16, 24, 32 (Tailwind: p-4, p-8, py-12, py-16, py-24, py-32)

**Container Strategy**:
- Full-width sections with inner max-w-7xl mx-auto px-6 lg:px-8
- Product grids: max-w-6xl
- Text content: max-w-4xl for readability

**Vertical Rhythm**: py-16 to py-24 for major sections (desktop), py-12 mobile

## Core Layout Sections

### 1. Header/Navigation
Fixed top navigation with:
- Company logo (left)
- Main navigation menu (center): Products, Services, Configurators, Downloads, Contact
- Product search icon (right)
- Phone number and address (top utility bar above main nav)
- Language selector (IT/EN)
- Sticky on scroll with subtle shadow

### 2. Hero Carousel (Full-width, 70vh minimum)
Multi-slide carousel featuring:
- Slide 1: New bidirectional speed limiters with product image
- Slide 2: Slim operators and suspensions showcase
- Slide 3: Gearless elevators and platforms
- Each slide: Large hero image (left/background), headline + description (overlay), 2-3 CTA buttons
- Navigation dots below, prev/next arrows on hover
- Auto-advance every 5 seconds

### 3. Quick Access CTAs
Prominent card row immediately after hero:
- "Configure Elevator" configurator link
- "Configure Platform" configurator link  
- "Download Catalogs" link
- Grid: 1 column mobile, 3 columns desktop (grid-cols-1 md:grid-cols-3 gap-6)

### 4. Services Overview Section
4-column grid (2 mobile, 4 desktop) with icon cards:
- Development & Design
- Tooling Services
- Stamping & Pressing
- Components & Spare Parts
Each card: Icon, title, brief description, subtle hover lift effect

### 5. Featured Products Catalog
"Components and Spare Parts - A Vast Catalog"
- Header with large section title and supporting image
- Product grid: 3-4 columns desktop, 2 tablet, 1 mobile
- Each product card: Image, product code, title, link to detail page
- "View Complete Catalog" CTA button below grid

### 6. Elevator Systems Section
Split layout (image left, content right on desktop):
- Large elevator installation image
- Content: "Vertical Mobility to New Levels" headline
- 4 subsections in 2x2 grid: Solid Structures, High-Efficiency Panels, Gearless Reduced Systems, Electric Platforms
- Each with icon, title, description
- "Request Information" CTA

### 7. Technology Section
Full-width with industrial imagery background:
- "Cutting-Edge Technology" headline
- Description of 3D modeling and manufacturing capabilities
- "Learn More" CTA button

### 8. Why Choose Us Section
"A Reality in Strong Expansion" 
- 4-column feature grid (stacks to 2 then 1 on smaller screens)
- Each feature: Large icon, title, descriptive paragraph
- Features: Collaboration, Efficiency, Progress, Timely Delivery
- Include growth visualization (icon or simple graphic)

### 9. Call-to-Action Section
Full-width with industrial worker/team image:
- "Ready for a New Challenge?" headline
- Compelling paragraph about partnership and custom solutions
- Prominent "Request Quote" button

### 10. Footer
Comprehensive multi-column layout:
- Column 1: Company info, logo, brief description
- Column 2: Quick links (Products, Services, About, Contact)
- Column 3: Product categories
- Column 4: Contact details (phone, email, address with map icon)
- Column 5: Newsletter signup form
- Bottom bar: Copyright, privacy policy, terms

## Component Library

### Navigation
- Desktop: Horizontal menu with dropdown for product categories
- Mobile: Hamburger menu with slide-out drawer
- Search overlay: Click search icon opens full-screen search with autocomplete

### Buttons
- Primary: Solid with medium padding (px-6 py-3), rounded corners (rounded-lg)
- Secondary: Outline style with border
- CTA on images: Backdrop blur (backdrop-blur-md bg-white/20) with white text
- All buttons: Consistent hover states with subtle scale/shadow

### Cards
- Product cards: White background, subtle shadow, border radius, padding p-4 to p-6
- Hover: Transform translateY(-4px) with enhanced shadow
- Image aspect ratio: 4:3 or 1:1 for consistency

### Carousel/Slider
- Smooth transitions between slides
- Progress indicators (dots) below content
- Directional arrows appearing on hover at slide edges

### Forms
- Contact/Quote forms: Stacked labels, full-width inputs
- Input styling: border, rounded corners, focus ring
- Validation states with clear error messaging

### Product Configurators
Interactive step-by-step interfaces:
- Progress indicator at top
- Visual selections with images/icons
- Real-time preview (if possible) or specification summary
- "Next/Previous" navigation between steps
- Final summary with "Request Quote" action

## Multi-Column Strategy

**Use 3-4 columns for**:
- Product grids (catalog pages)
- Services overview cards
- Feature highlights (Why Choose Us)
- Footer navigation

**Use 2 columns for**:
- Split content/image layouts (Technology, About sections)
- Comparison layouts (if needed for products)

**Single column for**:
- Hero content (centered/overlay)
- Long-form text sections
- Mobile viewports (all grids collapse)

## Images Strategy

### Required Images:
1. **Hero Carousel** (3 slides): High-quality industrial product photography
   - Slide 1: Speed limiters close-up with technical detail
   - Slide 2: Operators and suspensions showcase  
   - Slide 3: Complete elevator installation
   
2. **Section Headers**: Supporting contextual images
   - Service sections: Manufacturing facility, tooling equipment
   - Technology section: 3D modeling screens, precision machinery
   
3. **Product Catalog**: Individual product photography (square format, white background)

4. **About/CTA Section**: Professional team or worker in industrial setting

5. **Icons**: Use Heroicons for consistency (outline style for services, solid for features)

### Image Treatment:
- Professional product photography with clean backgrounds
- Industrial facility images with subtle overlays for text readability
- Consistent aspect ratios within each section
- WebP format with fallbacks for performance

## Responsive Behavior

**Breakpoints**:
- Mobile: base (< 640px) - single column, stacked navigation
- Tablet: md (768px) - 2 columns where appropriate
- Desktop: lg (1024px) - full multi-column layouts
- Wide: xl (1280px) - maximum container width

**Key Adaptations**:
- Hero reduces from 70vh to 60vh on mobile
- Grid layouts collapse: 4 → 2 → 1 columns progressively
- Navigation transforms to mobile hamburger menu below 1024px
- Font sizes scale down 20-30% on mobile
- Section padding reduces from py-24 to py-12 on mobile

## Specific Page Types

### Product Detail Pages
- Large product image gallery (main image + thumbnails)
- Technical specifications table
- Related products carousel below
- "Request Information" form in sidebar/bottom

### Configurator Pages
- Multi-step wizard interface
- Visual selection tiles
- Specification summary panel (sticky on desktop)
- Progress indicator showing step completion

This design creates a professional, credible B2B industrial website that balances technical information with visual appeal while maintaining excellent usability for both product browsing and lead generation.