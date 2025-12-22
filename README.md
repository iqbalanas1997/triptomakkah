# Trip To Makkah - Modern React Website

A fully responsive, modern, and accessible React.js frontend for Trip To Makkah travel services. Built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Fully Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Modern UI/UX** - Clean, professional design with smooth animations
- **SEO Optimized** - Meta tags, Open Graph, and semantic HTML
- **Accessible** - Keyboard navigation and screen reader support
- **Interactive Components** - Animated sections, modals, and smooth scrolling
- **Form Validation** - Contact form with Formik and Yup validation
- **Package Filtering** - Filter packages by type (All, Premium, Economy)

## 📦 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Formik + Yup** - Form handling and validation
- **React Router** - Navigation (ready for multi-page expansion)
- **Lucide React** - Beautiful icon library

## 🏗️ Project Structure

```
TripToMakkah/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with mobile drawer
│   │   ├── HeroBanner.jsx       # Hero section with CTA
│   │   ├── PackagesList.jsx     # Packages grid with filtering
│   │   ├── PackageCard.jsx      # Individual package card
│   │   ├── WhyChooseUs.jsx      # Features and trust badges
│   │   ├── AboutSection.jsx     # About us content
│   │   ├── ContactForm.jsx      # Contact form with validation
│   │   └── Footer.jsx           # Footer with links and info
│   ├── data/
│   │   └── packages.js          # Package data
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

## 🎨 Components Overview

### Navbar
- Sticky navigation with scroll effect
- Mobile drawer menu
- Smooth scroll to sections
- CTA button

### HeroBanner
- Welcome message and company info
- Trust badges (IATA, ATOL, Ministry)
- Contact information
- Call-to-action buttons

### PackagesList
- Grid layout of all packages
- Filter by type (All, Premium, Economy)
- Responsive card design
- Custom package CTA

### PackageCard
- Package details (nights, hotels, stars)
- Price display
- Included services
- Book Now button

### WhyChooseUs
- Feature cards
- Statistics (20+ years, 10k+ customers)
- Certification badges

### AboutSection
- Company information
- Mission statement
- Core values grid

### ContactForm
- Form validation with Formik/Yup
- Contact information display
- Success modal
- Google Map placeholder

### Footer
- Company info and links
- Services list
- Newsletter subscription
- Social media links

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📱 Responsive Breakpoints

- **Mobile**: up to 640px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Features Implemented

✅ Fully responsive design
✅ Modern UI with Tailwind CSS
✅ Smooth animations with Framer Motion
✅ Form validation
✅ Mobile navigation drawer
✅ Package filtering
✅ Smooth scroll navigation
✅ SEO-friendly meta tags
✅ Accessible components
✅ Floating contact buttons
✅ Success modals
✅ Trust badges and certifications

## 🔧 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  primary: { ... },
  gold: { ... }
}
```

### Packages Data

Edit `src/data/packages.js` to add or modify packages.

### Styling

Global styles and utility classes are in `src/index.css`.

## 📝 API Integration

The contact form is ready for backend integration. Update the `onSubmit` handler in `ContactForm.jsx`:

```jsx
onSubmit: async (values) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  // Handle response
}
```

## 🌐 SEO

The site includes:
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Semantic HTML
- Proper heading hierarchy

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Semantic HTML structure
- Focus states on all interactive elements
- Screen reader friendly

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Via Vercel Dashboard** (Easiest):
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import `iqbalanas1997/triptomakkah`
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

2. **Via Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

3. **Environment Variables** (for EmailJS):
   - Add in Vercel Dashboard → Project Settings → Environment Variables:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

📖 **Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Build Output

- **Output Directory**: `dist`
- **Build Command**: `npm run build`
- **Framework**: Vite

## 📄 License

Copyright © 2024 Trip To Makkah. All rights reserved.

## 📞 Contact

- **Phone**: +44 0203 727 6364
- **Email**: info@triptomakkah.co.uk
- **Address**: 344-348 High Road, Ilford, Essex IG1 1QP, United Kingdom

---

Built with ❤️ for Trip To Makkah

