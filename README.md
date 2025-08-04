<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Project Overview
This is a React + Vite web application for visualizing and exploring public data about Ksar El Kebir, Morocco. The platform is fully client-side, multilingual (Arabic, French, English), and mobile-first. It uses Tailwind CSS for styling and includes interactive charts and tables.

## Main Features
- Budget Explorer: Users can search, filter, and view detailed municipal budget data (revenues & expenses) from 2019–2025. Data is loaded from static JSON/CSV files.
- Insights: Visual summaries and answers to civic questions (e.g., biggest income sources, spending trends) using charts (bar, pie, line) and tables.
RGPH Census Data: Demographic and housing statistics from the Moroccan census, with filtering and search.
- Medicine Prices: Searchable database of medicine prices, forms, and availability.
- Support Grants: Data on municipal grants to sports associations, with filtering by year and sport.
- About & Contact: Information about the project, its goals, and contact details.

## Technical Stack
- React for UI
- Vite for fast development/build
- Tailwind CSS for styling
- Recharts for data visualizations
- Papaparse for CSV parsing
- Multilingual support via JSON translation files
- No backend: All data is loaded from static files in /public
UI/UX
# Navbar with links to all main sections (Home, Budget, Insights, RGPH, Medicines, Support, About, Contact)
- Responsive design for mobile and desktop
- Dark/Light mode toggle
- Search and filter functionality on all data pages
Pagination for large tables
Data
- Budget data: 
- RGPH data: 
- Medicine prices:
- Support grants: 

## Code Organization
- src/pages/: Main pages (Home, Search, Insights, RGPH, Medicines, Support, About, Contact)
- src/components/: Reusable UI components (Navbar, Chart cards, Table cards, Sidebar, etc.)
- src/i18n/: Translation files for multilingual support
- src/insights/: Insight configurations and data processors
# Summary
The app is a civic tech platform for making municipal data accessible, visual, and understandable for citizens. It’s modular, scalable, and designed for transparency and public engagement.
>>>>>>> 7e8ebbb (update readme')
