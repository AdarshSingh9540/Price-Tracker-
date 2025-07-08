
# Price Tracker

**Price Tracker** is a Next.js web application that lets users compare product prices across multiple websites in real-time.
It features a modular, responsive UI with search, results display, and robust error handling — built using **TypeScript**, **Radix UI**, and **Lucide icons**, with optional **Tailwind CSS** styling.
The app supports multiple countries for localized price comparisons.

---

## Features

* **Real-Time Price Comparison** — Search products and compare prices across supported websites like Amazon, Flipkart, and eBay.
* **Country Selection** — Choose from a wide range of supported countries (e.g., US, IN, UK, CA, AU, DE, FR, JP).
* **Responsive UI** — Built with Radix UI components and optionally styled with Tailwind CSS.
* **Loading & Error States** — Displays a loading spinner while fetching and a clear message when no results are found.
* **Sample Queries** — Quick suggestions like *iPhone 16 Pro* and *MacBook Pro M4* for testing.
* **API Routes** — Two endpoints (`/api/search-prices` and `/api/scrape-product`) for fetching and processing product data.
* **TypeScript Support** — Strongly-typed codebase with a `PriceResult` type for consistent data handling.
* **Error Boundary** — Handles client-side errors gracefully.

---

## Tech Stack

| Category        | Technology                     |
| --------------- | ------------------------------ |
| Framework       | Next.js (App Router, v15.2.4)  |
| Language        | TypeScript                     |
| UI Components   | Radix UI (`@radix-ui/react-*`) |
| Icons           | Lucide React                   |
| Optional Drawer | Vaul (`vaul@0.9.9`)            |
| Styling         | Tailwind CSS (optional)        |
| Deployment      | Vercel                         |
| Package Manager | npm                            |

---

## Project Structure

```
price-tracker/
├── app/
│   ├── page.tsx                 # Main page with PriceComparisonTool
│   ├── error.tsx                # Client-side error boundary
│   └── api/
│       ├── search-prices/       # Search endpoint
│       └── scrape-product/      # Scraping endpoint
├── components/
│   ├── PriceComparisonTool.tsx  # Orchestrates search and results
│   ├── SearchForm.tsx           # Search bar & country selector
│   ├── ResultsDisplay.tsx       # Displays search results
│   ├── LoadingSpinner.tsx       # Shows loading state
│   └── NoResults.tsx            # Message when no results found
│   └── ui/                      # Reusable UI components
├── types/
│   └── PriceResult.ts           # Defines PriceResult type
├── public/                      # Static assets
├── package.json                 # Scripts & dependencies
├── tsconfig.json                # TypeScript config
├── vercel.json                  # Vercel deployment config
└── .nvmrc                       # Node version
```

---

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm

### Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/AdarshSingh9540/Price-Tracker-.git
cd Price-Tracker-
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**
   Create a `.env` file in the project root:

```env
SCRAPER_API_KEY=your_scraper_api_key_here
```

> `SCRAPER_API_KEY` is required for `/api/scrape-product` to fetch product data via an external scraping service.

4. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**

```bash
npm run build
npm start
```

---

## Environment Variables

| Variable          | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `SCRAPER_API_KEY` | API key for scraping service (`/api/scrape-product`) |

* Store environment variables in `.env` or `.env.local`.
* Do not commit `.env` files to version control.
* For deployment, configure them in Vercel’s dashboard.

---

## API Routes

### `/api/search-prices`

* **Method:** GET
* **Query Params:**

  * `query` — Product name (e.g., `iPhone 16 Pro`)
  * `country` — Country code (e.g., `US`, `IN`, `UK`)
* **Response:** Array of `PriceResult` objects:

```json
[
  {
    "website": "amazon",
    "title": "Apple iPhone 16 Pro",
    "price": 999.99,
    "currency": "USD",
    "availability": "In Stock",
    "url": "https://amazon.com/..."
  }
]
```

### `/api/scrape-product`

* **Method:** GET
* **Query Params:**

  * `url` — Product page URL
  * `country` — Country code
* **Response:** JSON object with product details.

---

## Supported Countries

Includes but not limited to:
US, IN, UK, CA, AU, DE, FR, JP, CN, BR, IT, ES, NL, SG, ZA, MX, AE, SE.

See `components/SearchForm.tsx` for the full list.

---

## Deployment

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login & deploy:

```bash
vercel login
vercel --prod
```

3. Add `SCRAPER_API_KEY` in the Vercel dashboard under project > Settings > Environment Variables.

---

## Troubleshooting

* **Missing `SCRAPER_API_KEY`**

  * Add it to `.env.local` for local or in Vercel settings for production.

* **Large build size**

  * Lazy-load components or remove unused dependencies.
  * Check with: `npx depcheck`

* **Debugging**

  * Inspect dependency tree: `npm ls`
  * Simulate build locally: `vercel build`
  * Check logs: `vercel logs`

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For issues, suggestions, or contributions:

* Open an issue or pull request on [GitHub](https://github.com/AdarshSingh9540/Price-Tracker-)
* Email: **[singhadarsh9540@gmail.com](mailto:singhadarsh9540@gmail.com)**

---

If you’d like, I can also create a shorter, more marketing-friendly version or a CONTRIBUTING guide. Let me know!
