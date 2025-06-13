# 🏝️ Langkawi Travel Journal

A comprehensive, interactive travel itinerary web application for a 4-day Langkawi vacation (June 16-19, 2025), featuring detailed route planning, embedded maps, and a modern, responsive design.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Current Folder Structure](#current-folder-structure)
- [Technical Implementation](#technical-implementation)
- [Build & Production Optimization](#build--production-optimization)
- [Deployment (Netlify)](#deployment-netlify)
- [Navigation & Asset Management](#navigation--asset-management)
- [Customization & Adding Content](#customization--adding-content)
- [Documentation & References](#documentation--references)

---

## 🎯 Project Overview
This project is a personal travel journal web application that presents a detailed 4-day Langkawi itinerary with:
- **Interactive timeline views** for each day
- **Route-specific detail pages** with embedded Google Maps
- **Responsive design** optimized for mobile and desktop
- **Modern glassmorphism UI** with smooth animations
- **Hierarchical navigation** between overview and detailed views

### Key Features
- 📅 **Day-by-day itinerary** with timeline views
- 🗺️ **Interactive route cards** linking to detailed pages
- 📍 **Embedded Google Maps** for each route
- 🚗 **Multi-modal transportation** (flights, trains, taxis, walking)
- 📱 **Fully responsive design**
- 🎨 **Modern UI** with glassmorphism effects
- 🧭 **Robust navigation** and mobile-first layout
- 🛡️ **Production-ready**: minified, obfuscated, and organized for static hosting

---

## 🗂️ Current Folder Structure
```
map/
├── css/
│   ├── diary_styles.css
│   ├── index_styles.css
│   └── route_styles.css
├── js/
│   ├── diary_main.js
│   └── index_templates.js
├── routePages/
│   └── [all route HTML files]
├── dist/                # Build output (minified/obfuscated, for deployment)
├── index.html           # Main homepage
├── langkawi.html        # Itinerary overview
├── favicon.svg          # Custom SVG favicon
├── package.json         # Build scripts & dependencies
├── netlify.toml         # Netlify config (publish: dist/)
├── README.md            # This file
├── PRODUCTION_OPTIMIZATION.md
├── routePages_move_plan.md
└── ... (other docs)
```

---

## ⚙️ Technical Implementation
- **Multi-page static site**: Each route/segment is a separate HTML file in `routePages/`.
- **Shared CSS/JS**: All pages use root-relative links to `/css/` and `/js/` for consistent styling and interactivity.
- **Navigation**: Classic, robust navigation bar with root-relative links for static hosting compatibility.
- **Responsive Design**: Mobile-first layout, touch-friendly navigation, and card-based UI.
- **Favicon**: Custom SVG favicon referenced in all main HTML files.
- **Google Maps Embeds**: Each route page includes an embedded map for visual guidance.

---

## 🚀 Build & Production Optimization
- **Build scripts** (see `package.json`):
  - Minify HTML (including all `routePages/` files) using `html-minifier-terser`.
  - Minify CSS with `clean-css-cli`.
  - Minify and obfuscate JS with `terser` and `javascript-obfuscator`.
  - Output all minified assets to `dist/` (`dist/css/`, `dist/js/`, etc.).
- **No build artifacts committed**: Only source files are tracked; Netlify builds from source.
- **All asset and navigation links** are root-relative for static hosting.
- **See** `PRODUCTION_OPTIMIZATION.md` for details on minification, obfuscation, and best practices.

---

## 🌐 Deployment (Netlify)
- **Netlify config**: See `netlify.toml`:
  - `publish = "dist"`
  - `command = "npm run build"`
- **Deploy steps**:
  1. Push changes to your repository.
  2. Netlify will run the build and deploy from the `dist/` folder.
  3. All navigation and asset links will work out-of-the-box on Netlify/static hosts.
- **No need to commit `dist/`**: It is generated on each deploy.

---

## 🧭 Navigation & Asset Management
- **All navigation links** (in HTML and JS) use root-relative paths (e.g., `/routePages/airport_bayview.html`).
- **All CSS/JS links** are root-relative (e.g., `/css/route_styles.css`).
- **Favicon**: `/favicon.svg` is referenced in all main HTML files.
- **Adding new pages**: Place new route HTML files in `routePages/` and use root-relative links.
- **JS/CSS**: Add new scripts/styles to `js` or `css` and update build scripts if needed.

---

## 🛠️ Customization & Adding Content
- **To add a new route/page**:
  1. Create a new HTML file in `routePages/`.
  2. Use root-relative links for all assets and navigation.
  3. Add to navigation in `index.html` or `langkawi.html` as needed.
- **To add new CSS/JS**:
  1. Place in `css/` or `js/`.
  2. Update `package.json` build scripts if you want them minified/obfuscated.
- **To update navigation**: Edit the nav bar in `index.html`, `langkawi.html`, and/or relevant route pages.

---

## 📚 Documentation & References
- **For issues or suggestions**: [GitHub Issues](https://github.com/manikandan4/travel_itinerary_manikandan/issues)

---

## 📝 Changelog (Recent Major Updates)
- All route HTML files moved to `routePages/` and all links updated to root-relative.
- Build scripts for minification/obfuscation and output to `dist/`.
- Netlify deployment from `dist/` with source build.
- Navigation bar restored and made robust/responsive.
- Favicon and asset links standardized.
- Documentation updated for new structure and workflow.

---
