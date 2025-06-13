# 🏝️ Langkawi Travel Journal - MVP v1.0

A comprehensive, interactive travel itinerary web application for a 4-day Langkawi vacation (June 16-19, 2025). This MVP version features a revamped modern design, detailed route planning with embedded maps, and a responsive, mobile-friendly user experience.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Key Features (MVP v1.0)](#key-features-mvp-v10)
- [Folder Structure](#folder-structure)
- [Styling Approach](#styling-approach)
- [JavaScript Functionality](#javascript-functionality)
- [Build & Production Optimization](#build--production-optimization)
- [Deployment (Netlify)](#deployment-netlify)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview
This project is a personal travel journal web application that presents a detailed 4-day Langkawi itinerary. The current version (MVP v1.0) focuses on a consistent and modern UI, clear daily timelines, and detailed route pages.

### Key Features (MVP v1.0)
- 📅 **Day-by-day Itinerary Display**: `langkawi.html` dynamically renders daily activities.
- 🗺️ **Interactive Activity Cards**: Each activity is presented as a card, linking to a detailed route page if available.
- ⏳ **Minimalist Daily Timelines**: Clean and easy-to-read timeline for each day's events, styled for clarity.
- 📄 **Standardized HTML Structure**: Consistent use of header, main, and sectioning elements across all pages.
- 🎨 **Modern & Cohesive Design**:
    - **Global Stylesheet (`css/global_styles.css`)**: Defines a travel-themed color palette, modern fonts (Playfair Display, Lato), and base styles for common elements (cards, navigation, buttons).
    - **Specific Stylesheets**: `css/index_styles.css` (for homepage and Langkawi overview), `css/diary_styles.css` (primarily for index.html specific content, now largely superseded or integrated), and `css/route_styles.css` (for individual route pages) build upon global styles.
    - **Responsive Design**: Adapts to various screen sizes using media queries, CSS Grid, and Flexbox.
    - **Consistent Card Layout**: `group-selection` cards (e.g., on `langkawi.html` for day selection) and daily activity cards share a similar flexbox-based aesthetic for visual harmony.
- 📍 **Embedded Google Maps**: Each route page in `routePages/` includes an embedded map.
- 📱 **Mobile-First Responsive Layout**: Ensures a good user experience on both mobile and desktop devices.
- ⚙️ **Build Process**: `package.json` scripts for cleaning, minifying HTML/CSS/JS, and obfuscating JS for production, outputting to the `dist/` folder.
- 🔗 **Favicon**: `favicon.svg` included and copied to `dist/` during build.

---

## 🗂️ Folder Structure
```
map/
├── css/
│   ├── global_styles.css    # Core styles, color palette, fonts
│   ├── index_styles.css     # Styles for langkawi.html, index.html, including card & timeline
│   ├── diary_styles.css     # Styles for index.html specific sections
│   └── route_styles.css     # Styles for individual route pages
├── js/
│   ├── diary_main.js        # Main JS for index.html (if any specific logic remains)
│   └── index_templates.js   # Handles dynamic rendering of timelines and activity cards
├── routePages/
│   └── [all route HTML files] # Detailed views for each travel segment
├── dist/                    # Build output (minified/obfuscated, for deployment)
├── index.html               # Main homepage/entry point
├── langkawi.html            # Main itinerary overview page
├── favicon.svg              # Site favicon
├── package.json             # NPM scripts & dev dependencies
├── netlify.toml             # Netlify deployment configuration
└── README.md                # This file (MVP v1.0)
```

---

## 🎨 Styling Approach
- **Centralized Global Styles**: `global_styles.css` provides the foundational design language (colors, typography, base element styling, primary button styles, basic card structure).
- **Component-Specific Styles**: 
    - `index_styles.css` handles the layout and specific styling for `langkawi.html`'s hero section, day selection cards (`group-selection`), daily activity cards (`.card-grid[id^=\"cards-\"]`), and the minimalist event timeline (`.trip-timeline`).
    - `diary_styles.css` contains styles for unique sections on `index.html`.
    - `route_styles.css` styles the content within individual route pages.
- **CSS Variables**: Extensively used for theme colors, fonts, and spacing, promoting consistency and easier maintenance.
- **Responsive Techniques**: Media queries, Flexbox, and CSS Grid are employed to ensure adaptability across devices.

---

## JavaScript Functionality
- **`js/index_templates.js`**: 
    - `renderCards()`: Dynamically creates and injects HTML for daily activity cards based on data objects. Includes logic for handling icons, titles, descriptions, meta-information, and links.
    - `renderTimeline()`: Dynamically generates the HTML for the daily event timeline, including time and description for each item. (SVG icon generation logic is present but currently visually hidden by CSS for a more minimal look).
    - Event listeners to trigger rendering based on day selection (e.g., on `langkawi.html`).

---

## 🚀 Build & Production Optimization
- **NPM Scripts** (defined in `package.json`):
  - `clean`: Removes `dist/` and `temp_html/` directories.
  - `build:html`: Copies and minifies HTML files to `dist/`.
  - `build:css`: Minifies CSS files and outputs them to `dist/css/`.
  - `build:js`: Minifies JavaScript files to `dist/js/`.
  - `copy:assets`: Copies `favicon.svg` to `dist/`.
  - `obfuscate:js`: Obfuscates the minified JavaScript in `dist/js/`.
  - `build`: Runs all the above tasks in sequence to create a production-ready build in `dist/`.
- **Output**: All optimized assets are placed in the `dist/` directory, which is the target for deployment.

---

## 🌐 Deployment (Netlify)
- **Configuration**: `netlify.toml` specifies the build command (`npm run build`) and the publish directory (`dist`).
- **Process**: Pushing to the connected Git repository triggers Netlify to execute the build command and deploy the contents of the `dist/` folder.

---

## ✨ Future Enhancements (Post-MVP)
- Re-evaluate SVG icons for the timeline for a more visually rich experience if desired, ensuring no layout issues.
- Add more interactive elements or animations.
- Implement a light/dark mode toggle.
- Expand content with more destinations or travel tips.
- Consider a more dynamic data source for itineraries (e.g., JSON files or a headless CMS).
