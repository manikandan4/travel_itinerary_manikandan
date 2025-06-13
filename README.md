# 🏝️ Langkawi Travel Journal - Personal Vlog Companion

An interactive web application showcasing a 4-day Langkawi itinerary (June 16-19, 2025). Designed as a personal travel vlog aid, it features a modern, responsive interface for easy navigation and viewing of travel plans.

---

## ✨ Core Features

*   **📅 Daily Itinerary**: `langkawi.html` dynamically displays the travel schedule.
*   **🗺️ Interactive Route Cards**: Clickable cards for each activity, linking to detailed route pages with embedded maps.
*   **📱 Responsive Design**: Ensures a seamless experience on desktops, tablets, and mobile devices.
*   **🎨 Modern UI**: Clean, visually appealing design with a consistent travel theme.
*   **📄 Static Site**: Simple HTML, CSS, and JavaScript structure, easy to host.
*   **⚙️ Asset Management**: `package.json` includes a script to copy image assets to a `dist/images` folder for organization.

---

## 🗂️ Project Files

```
map/
├── css/                     # Stylesheets
│   ├── global_styles.css    # Base styles (colors, fonts)
│   ├── index_styles.css     # Styles for index.html & langkawi.html (cards, timeline)
│   ├── diary_styles.css     # Additional styles for index.html sections
│   └── route_styles.css     # Styles for individual route pages
├── images/                  # Source images for the travel diary
├── js/                      # JavaScript files
│   ├── diary_main.js        # Main JS for langkawi.html (itinerary page)
│   └── index_templates.js   # Dynamically renders itinerary cards and timelines
├── routePages/              # HTML files for each travel segment/route
├── dist/                    # Output folder for built assets (currently images)
├── index.html               # Homepage: travel group selection
├── langkawi.html            # Main itinerary display page
├── favicon.svg              # Site favicon
├── package.json             # NPM scripts (primarily for asset copying)
├── netlify.toml             # Netlify deployment configuration (optional)
└── README.md                # This guide
```

---

## 🚀 Getting Started

1.  **View Locally**: Simply open `index.html` in a web browser.
    *   Path: `/Users/manikandan/Work/JS_workspace/TravelDiary/map/index.html`
2.  **Build Assets (Optional)**: If you need to ensure images are copied to the `dist` folder (e.g., for deployment or a clean structure):
    *   Navigate to the project root: `/Users/manikandan/Work/JS_workspace/TravelDiary/map/`
    *   Run `npm install` (if you haven't already, though for basic viewing it's not strictly needed).
    *   Run `npm run build` (this executes the `copy:assets` script in `package.json`).

---

## 🛠️ How It Works

*   **Homepage (`index.html`)**: Select a travel group.
*   **Itinerary Page (`langkawi.html`)**: Displays the selected group's daily schedule. JavaScript (`js/index_templates.js`) dynamically generates the activity cards and timeline.
*   **Route Pages (`routePages/*.html`)**: Clicking an activity card navigates to a detailed page for that segment, showing notes and an embedded map.

---

## 🌐 Deployment

*   The project is structured for easy deployment on static hosting platforms like Netlify or GitHub Pages.
*   The `netlify.toml` file is included for straightforward Netlify deployment (uses `npm run build` and publishes the root directory, as `dist/` only contains images for now).

---

## 💡 Personal Notes & Future Ideas

*   This is primarily a visual aid for a personal travel vlog.
*   Keep styling and scripts minimal for easy maintenance.
*   Possible future additions:
    *   Light/dark mode.
    *   More photo integration directly into the itinerary.
    *   Simple blog-like entries for each day.

---
