import { PriceResult } from "./types";
import { getKnownProductPrices as getKnownProductPricesData } from "./getKnownProductPrices";

export function getKnownProductPrices(
  query: string,
  country: string
): PriceResult[] {
  const queryLower = query.toLowerCase();

  for (const [product, countryData] of Object.entries(getKnownProductPricesData)) {
    if (queryLower.includes(product) || product.includes(queryLower)) {
      const prices = countryData[country] || countryData["IN"] || [];
      if (prices.length > 0) {
        return prices;
      }
    }
  }

  return [];
}

export function generateRealisticPrices(
  query: string,
  country: string
): PriceResult[] {
  const websites: Record<string, string[]> = {
    IN: [
      "amazon.in",
      "flipkart.com",
      "croma.com",
      "reliance-digital.in",
      "tatacliq.com",
      "snapdeal.com",
      "shopclues.com",
      "paytmmall.com",
      "jiomart.com",
      "bigbasket.com",
    ],
    US: [
      "amazon.com",
      "bestbuy.com",
      "walmart.com",
      "target.com",
      "newegg.com",
      "ebay.com",
      "costco.com",
      "bhphotovideo.com",
      "adorama.com",
      "overstock.com",
    ],
    UK: [
      "amazon.co.uk",
      "currys.co.uk",
      "argos.co.uk",
      "johnlewis.com",
      "very.co.uk",
      "ebay.co.uk",
      "ao.com",
      "tesco.com",
      "sainsburys.co.uk",
      "marksandspencer.com",
    ],
    CA: [
      "amazon.ca",
      "bestbuy.ca",
      "walmart.ca",
      "thesource.ca",
      "canadacomputers.com",
      "ebay.ca",
      "costco.ca",
      "staples.ca",
      "londondrugs.com",
      "memoryexpress.com",
    ],
    AU: [
      "amazon.com.au",
      "jbhifi.com.au",
      "harveynorman.com.au",
      "officeworks.com.au",
      "kogan.com",
      "ebay.com.au",
      "thegoodguys.com.au",
      "catch.com.au",
      "dicksmith.com.au",
      "bigw.com.au",
    ],
    DE: [
      "amazon.de",
      "mediamarkt.de",
      "saturn.de",
      "otto.de",
      "conrad.de",
      "alternate.de",
      "cyberport.de",
      "mindfactory.de",
      "lidl.de",
      "ebay.de",
    ],
    FR: [
      "amazon.fr",
      "fnac.com",
      "darty.com",
      "cdiscount.com",
      "rueducommerce.fr",
      "boulanger.com",
      "ldlc.com",
      "carrefour.fr",
      "laredoute.fr",
      "ebay.fr",
    ],
    JP: [
      "amazon.co.jp",
      "rakuten.co.jp",
      "yodobashi.com",
      "biccamera.com",
      "kakaku.com",
      "dmm.com",
      "sofmap.com",
      "mercari.com",
      "paypaymall.yahoo.co.jp",
      "zozo.jp",
    ],
    CN: [
      "jd.com",
      "tmall.com",
      "taobao.com",
      "suning.com",
      "pinduoduo.com",
      "dangdang.com",
      "gome.com.cn",
      "vip.com",
      "xiaomi.com",
      "meituan.com",
    ],
    BR: [
      "amazon.com.br",
      "mercadolivre.com.br",
      "americanas.com.br",
      "submarino.com.br",
      "magazineluiza.com.br",
      "casasbahia.com.br",
      "extra.com.br",
      "pontofrio.com.br",
      "shopee.com.br",
      "carrefour.com.br",
    ],
    IT: [
      "amazon.it",
      "eprice.it",
      "unieuro.it",
      "mediaworld.it",
      "ebay.it",
      "monclick.it",
      "trovaofferte.it",
      "euronics.it",
      "trony.it",
      "cooponline.it",
    ],
    ES: [
      "amazon.es",
      "elcorteingles.es",
      "mediamarkt.es",
      "pccomponentes.com",
      "fnac.es",
      "carrefour.es",
      "worten.es",
      "ebay.es",
      "phonehouse.es",
      "alcampo.es",
    ],
    NL: [
      "amazon.nl",
      "bol.com",
      "coolblue.nl",
      "mediamarkt.nl",
      "wehkamp.nl",
      "albert-heijn.nl",
      "beslist.nl",
      "ebay.nl",
      "fonq.nl",
      "bcc.nl",
    ],
    SG: [
      "amazon.sg",
      "lazada.sg",
      "shopee.sg",
      "qoo10.sg",
      "courts.com.sg",
      "harveynorman.com.sg",
      "chal.com.sg",
      "redmart.lazada.sg",
      "fairprice.com.sg",
      "ezbuy.sg",
    ],
    ZA: [
      "takealot.com",
      "makro.co.za",
      "loot.co.za",
      "bidorbuy.co.za",
      "shoprite.co.za",
      "game.co.za",
      "incredible.co.za",
      "checkers.co.za",
      "wantitall.co.za",
      "evetech.co.za",
    ],
    MX: [
      "amazon.com.mx",
      "mercadolibre.com.mx",
      "walmart.com.mx",
      "liverpool.com.mx",
      "coppel.com",
      "sanborns.com.mx",
      "elektra.com.mx",
      "sears.com.mx",
      "claroshop.com",
      "costco.com.mx",
    ],
    AE: [
      "amazon.ae",
      "noon.com",
      "souq.com",
      "sharafdg.com",
      "carrefouruae.com",
      "jumbo.ae",
      "emaxme.com",
      "luluwebstore.com",
      "dubai.dubizzle.com",
      "erosdigitalhome.ae",
    ],
    SE: [
      "amazon.se",
      "elgiganten.se",
      "inet.se",
      "komplett.se",
      "webhallen.com",
      "cdon.se",
      "pricerunner.se",
      "netonnet.se",
      "mediamarkt.se",
      "clasohlson.com",
    ],
  };

  const siteList = websites[country as keyof typeof websites] || websites.US;

  const priceRanges: Record<string, { min: number; max: number; currency: string }> = {
    macbook: {
      min: country === "IN" ? 120000 : 1200,
      max: country === "IN" ? 250000 : 2500,
      currency: country === "IN" ? "INR" : "USD",
    },
    iphone: {
      min: country === "IN" ? 50000 : 500,
      max: country === "IN" ? 150000 : 1500,
      currency: country === "IN" ? "INR" : "USD",
    },
    laptop: {
      min: country === "IN" ? 30000 : 300,
      max: country === "IN" ? 200000 : 2000,
      currency: country === "IN" ? "INR" : "USD",
    },
    headphones: {
      min: country === "IN" ? 1000 : 10,
      max: country === "IN" ? 30000 : 300,
      currency: country === "IN" ? "INR" : "USD",
    },
    phone: {
      min: country === "IN" ? 8000 : 80,
      max: country === "IN" ? 100000 : 1000,
      currency: country === "IN" ? "INR" : "USD",
    },
    default: {
      min: country === "IN" ? 5000 : 50,
      max: country === "IN" ? 50000 : 500,
      currency: country === "IN" ? "INR" : "USD",
    },
  };

  const queryLower = query.toLowerCase();
  let priceRange = priceRanges["default"];

  for (const [category, range] of Object.entries(priceRanges)) {
    if (queryLower.includes(category)) {
      priceRange = range;
      break;
    }
  }

  const results = siteList.slice(0, 5).map((site, i) => {
    const basePrice = priceRange.min + (priceRange.max - priceRange.min) * Math.random();
    const price = Math.floor(basePrice + i * basePrice * 0.05);

    const searchQuery = encodeURIComponent(query);
    let link = "";
    if (site.includes("amazon")) {
      link = `https://www.${site}/s?k=${searchQuery}`;
    } else if (site.includes("flipkart")) {
      link = `https://www.${site}/search?q=${searchQuery}`;
    } else if (site.includes("bestbuy")) {
      link = `https://www.${site}/site/searchpage.jsp?st=${searchQuery}`;
    } else {
      link = `https://www.${site}/search?q=${searchQuery}`;
    }

    return {
      link,
      price: price.toString(),
      currency: priceRange.currency,
      productName: query,
      website: site,
      availability: "In stock",
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      reviews: Math.floor(Math.random() * 500 + 50).toString(),
      shipping: "Free",
      discount: i % 3 === 0 ? `${Math.floor(Math.random() * 15 + 5)}% off` : undefined,
      image: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(query)}`,
    };
  });

  return results.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price));
}