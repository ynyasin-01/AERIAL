# AERIAL ✈️

### Your next journey starts with Aerial.

A cinematic flight-booking frontend built with React and TypeScript. AERIAL combines a scroll-driven aviation background, glassmorphism, and an interactive booking flow to turn travel planning into an engaging web experience.

**[Live Demo](https://ynyasin-01.github.io/AERIAL/)** · **[Repository](https://github.com/ynyasin-01/AERIAL)**

> AERIAL is a frontend demonstration. Flights, fares, account access, reservations, and checkout are simulated. It does not issue real airline tickets or process payments.

## Features

- **Cinematic scrolling:** A canvas-based, 300-frame image sequence animates the aviation background as visitors scroll.
- **Modern interface:** Translucent panels, animated transitions, custom typography, and responsive navigation.
- **Destination discovery:** Explore destinations including Dhaka, Bangkok, Dubai, Kuala Lumpur, Singapore, and Tokyo.
- **Flight search and comparison:** Choose a route, travel date, passenger count, and cabin class, then compare sample flights and sort by price.
- **Interactive seat selection:** Choose seats on an aircraft layout with available, selected, and reserved states.
- **Guided booking flow:** Flight selection → seat selection → booking review → simulated checkout → confirmation.
- **My Bookings:** View saved reservations and itinerary details, remove individual bookings, or clear the booking list.
- **Local persistence:** Demo sessions, bookings, and reserved seats are stored in the browser with `localStorage`.
- **Supporting sections:** Flight offers, about information, contact UI, and FAQs.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based interface and state management |
| TypeScript | Typed application code |
| Vite | Development server and production builds |
| Tailwind CSS 4 | Styling and responsive layouts |
| Motion | Interface animations and transitions |
| Lucide React | Interface icons |
| HTML Canvas | Scroll-driven background rendering |
| GitHub Actions + GitHub Pages | Automated builds and static hosting |

## Getting Started

Install a current Node.js LTS release and npm, then run:

```bash
git clone https://github.com/ynyasin-01/AERIAL.git
cd AERIAL
npm ci
npm run dev
```

Open **http://localhost:3000** in your browser.

The current booking frontend uses locally generated sample data and does not require an API key. A Gemini environment-variable template exists in the repository, but the booking interface does not call Gemini.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Generate the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript checks with `tsc --noEmit` |
| `npm run clean` | Remove `dist/` and `server.js` using a Unix-style shell |

To preview a production build:

```bash
npm run build
npm run preview
```

Use the URL printed by Vite, including `/AERIAL/` for the production base path.

## Key Files

| Path | Contents |
| --- | --- |
| `src/App.tsx` | Main interface, destination data, and booking logic |
| `src/ScrollAnimationBackground.tsx` | Canvas animation and progressive frame loading |
| `src/index.css` | Global styles |
| `src/main.tsx` | React entry point |
| `public/` | Publicly served assets |
| `vite.config.ts` | Plugins, development settings, and deployment base path |
| `.github/workflows/deploy.yml` | GitHub Pages deployment workflow |

## Deployment

The included GitHub Actions workflow builds and deploys the site to GitHub Pages when changes are pushed to `main` or `master`. It also supports manual execution.

1. Open the repository's **Settings → Pages** and select **GitHub Actions** as the deployment source.
2. Push changes to a configured deployment branch.
3. Check the workflow run in the **Actions** tab.

The production base path in `vite.config.ts` is `/AERIAL/`. Update it when deploying under a different repository name or hosting path. Keep public asset URLs compatible with that base path.

## Demo Data and Limitations

- Flight options and fares are generated in the frontend, rather than retrieved from live airline inventory.
- Login and signup are demo interactions without server-side identity verification.
- Card and PayPal checkout screens simulate the booking experience; no payment gateway is integrated.
- Bookings are local to the current browser and website origin. They do not synchronize across devices, and clearing browser storage removes them.
- Reserved seats are tracked locally and do not represent shared, real-time availability.

Use fictional details when exploring the demo.

## Future Improvements

- Connect live flight search and availability APIs.
- Add secure backend authentication and database-backed bookings.
- Integrate a payment provider in test mode.
- Add automated tests for the booking flow.
- Expand accessibility checks and optimize animation assets further.

## Author

Developed by **[ynyasin-01](https://github.com/ynyasin-01)**.
