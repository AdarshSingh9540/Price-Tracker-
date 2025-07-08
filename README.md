Price Tracker
Price Tracker is a Next.js-based web application that allows users to compare product prices across multiple websites in real-time. It features a modularized UI with a search form, results display, and loading states, built with TypeScript, Radix UI, and Lucide icons. The app includes API routes for scraping product data and supports multiple countries for localized price comparisons.
Features

Real-Time Price Comparison: Search for products and compare prices across supported websites (e.g., Amazon, Flipkart, eBay) in various countries.
Country Selection: Choose from a list of supported countries (e.g., US, IN, UK, CA, AU, DE, FR, JP, etc.) for localized results.
Responsive UI: Built with Radix UI components (Select, Tabs, Alert) and styled with Tailwind CSS (optional, if used).
Loading and Error States: Displays a loading spinner during searches and a "No Results" message when no products are found.
Sample Queries: Predefined product suggestions (e.g., iPhone 16 Pro, MacBook Pro M4) for quick searches.
API Routes: Two API endpoints (/api/search-prices, /api/scrape-product) for fetching and processing product data.
TypeScript Support: Strongly typed codebase with a PriceResult type for structured data.
Error Handling: Client-side error boundary (app/error.tsx) for robust user experience.

Tech Stack

Framework: Next.js 15.2.4 (App Router)
Language: TypeScript
UI Components: Radix UI (@radix-ui/react-alert, @radix-ui/react-select, @radix-ui/react-tabs)
Icons: Lucide React (lucide-react)
Drawer (Optional): Vaul (vaul@0.9.9, used for drawer components if present)
Styling: Tailwind CSS (optional, if configured)
Package Manager: npm
Deployment: Vercel

Project Structure
price-tracker/
├── app/
│   ├── page.tsx                # Main page rendering PriceComparisonTool
│   ├── error.tsx               # Client-side error boundary
│   ├── api/
│   │   ├── search-prices/      # API route for searching prices
│   │   └── scrape-product/     # API route for scraping product data
├── components/
│   |   |
│   │   ├── PriceComparisonTool.tsx  # Main component orchestrating search and results
│   │   ├── SearchForm.tsx           # Search input and country selector
│   │   ├── ResultsDisplay.tsx       # Displays search results
│   │   ├── LoadingSpinner.tsx       # Loading state UI
│   │   └── NoResults.tsx           # No results found UI
│   └── ui/                         # Reusable UI components (e.g., Button, Input)
├── types/
│   └── PriceResult.ts              # TypeScript type for price data
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vercel.json                     # Vercel deployment configuration
└── .nvmrc                          # Node version specification

Prerequisites

Setup Instructions
1. Clone the Repository
git clone https://github.com/AdarshSingh9540/Price-Tracker-.git
cd Price-Tracker-

2. Install Dependencies
Remove any existing dependency artifacts and install using npm:
Remove-Item -Path node_modules,package-lock.json,pnpm-lock.yaml -Recurse -Force -ErrorAction SilentlyContinue
npm install

3. Configure Environment Variables
Create a .env file in the project root and add the required environment variables:
# API keys for external services (replace with your own)
SCRAPER_API_KEY=your_scraper_api_key_here


SCRAPER_API_KEY: Required for the /api/scrape-product endpoint to fetch product data from external websites. Obtain from your preferred scraping service (e.g., ScraperAPI, BrightData).

4. Run the Development Server
Start the Next.js development server:
npm run dev

Open http://localhost:3000 in your browser to view the app.
5. Build for Production
Test the production build locally:
npm run build

Start the production server:
npm run start

Environment Variables
The following environment variables are required for the app to function correctly:



Variable
Description
Example Value



SCRAPER_API_KEY
API key for the scraping service used by /api/scrape-product
abc123xyz789



Location: Store in a .env file in the project root.
Security: Do not commit .env to version control. Use .env.local for local development and configure variables in Vercel’s dashboard for deployment.
Usage: The SCRAPER_API_KEY is used in /api/scrape-product to authenticate requests to the scraping service.

API Routes
The app includes two API routes for fetching and processing product data:
1. /api/search-prices

Method: GET
Query Parameters:
query: Product name to search for (e.g., iPhone 16 Pro)
country: Country code (e.g., US, IN, UK)


Response: JSON array of PriceResult objects (defined in types/PriceResult.ts):[
  {
    "website": "amazon",
    "title": "Apple iPhone 16 Pro",
    "price": 999.99,
    "currency": "USD",
    "availability": "In Stock",
    "url": "https://amazon.com/..."
  },
  ...
]


Description: Searches for prices across supported websites for the given product and country.

2. /api/scrape-product

Method: GET
Query Parameters:
url: Product page URL to scrape
country: Country code for localization


Response: JSON object with scraped product details (e.g., price, title, availability).
Description: Scrapes a specific product page using an external service (requires SCRAPER_API_KEY).

Supported Countries
The app supports price comparisons in the following countries (defined in components/PriceComparisonTool/SearchForm.tsx):

United States (US)
India (IN)
United Kingdom (UK)
Canada (CA)
Australia (AU)
Germany (DE)
France (FR)
Japan (JP)
China (CN)
Brazil (BR)
Italy (IT)
Spain (ES)
Netherlands (NL)
Singapore (SG)
South Africa (ZA)
Mexico (MX)
United Arab Emirates (AE)
Sweden (SE)

The country list is synchronized with the websites object in PriceHelpers.ts for consistent scraping.
Deployment
The app is deployed on Vercel for scalable hosting.
Deploying to Vercel

Install Vercel CLI (if not already installed):
npm install -g vercel


Login to Vercel:
vercel login


Deploy the App:
vercel --prod


Configure Environment Variables:

In the Vercel dashboard, go to your project > Settings > Environment Variables.
Add SCRAPER_API_KEY with the appropriate value.


Vercel Configuration:Ensure the vercel.json file is present in the project root:
{
  "installCommand": "npm install",
  "buildCommand": "next build",
  "outputDirectory": ".next"
}



Troubleshooting

Missing Environment Variables:

Cause: SCRAPER_API_KEY not set in Vercel or local .env.
Solution: Add SCRAPER_API_KEY to .env.local locally and Vercel’s dashboard for deployment.


Build Size Concerns:

Cause: The / route has a First Load JS size of 141 kB (from build output).
Solution: Optimize by lazy-loading ResultsDisplay.tsx or removing unused dependencies with:npx depcheck





Debugging

Check Dependency Tree:
npm ls vaul react


Simulate Vercel Build Locally:
vercel build


Review Vercel Logs:Check /vercel/.npm/_logs/*.log for detailed errors.


License
This project is licensed under the MIT License.
Contact
For issues or questions, open an issue on the GitHub repository or contact the maintainer.

email - singhadarsh9540@gmail.com