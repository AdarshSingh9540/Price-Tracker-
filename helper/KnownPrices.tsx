 interface PriceResult {
  link: string
  price: string
  currency: string
  productName: string
  website: string
  availability: string
  rating?: string
  reviews?: string
  shipping?: string
  discount?: string
  image?: string
}


 export const knownPrices: Record<string, Record<string, PriceResult[]>> = {
    "cmf phone 1": {
      IN: [
        {
          link: "https://www.amazon.in/Nothing-Phone-Storage-Charger-Included/dp/B0D3J4K8L9",
          price: "15999",
          currency: "INR",
          productName: "CMF Phone 1 by Nothing (Black, 128GB)",
          website: "amazon.in",
          availability: "In stock",
          rating: "4.2",
          reviews: "1,247",
          shipping: "Free",
          image: "https://m.media-amazon.com/images/I/61eDXs9QPNL._SL1500_.jpg",
        },
        {
          link: "https://www.flipkart.com/cmf-nothing-phone-1-black-128-gb/p/itm123456789",
          price: "16999",
          currency: "INR",
          productName: "CMF Phone 1 by Nothing (Orange, 128GB)",
          website: "flipkart.com",
          availability: "In stock",
          rating: "4.1",
          reviews: "892",
          shipping: "Free",
          image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/h/c/-original-imagwkgxhvkfhgvs.jpeg",
        },
        {
          link: "https://www.croma.com/cmf-by-nothing-phone-1-black-128gb-8gb-ram-/p/272742",
          price: "15999",
          currency: "INR",
          productName: "CMF Phone 1 by Nothing 128GB",
          website: "croma.com",
          availability: "In stock",
          rating: "4.3",
          reviews: "156",
          shipping: "Free",
          image:
            "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1695203160/Croma%20Assets/Communication/Mobiles/Images/300872_0_qgwhjt.png",
        },
      ],
    },
    "iphone 16 pro": {
      IN: [
        {
          link: "https://www.amazon.in/Apple-iPhone-Pro-128GB-Natural/dp/B0DGHXM2CZ",
          price: "119900",
          currency: "INR",
          productName: "Apple iPhone 16 Pro (128GB) - Natural Titanium",
          website: "amazon.in",
          availability: "In stock",
          rating: "4.5",
          reviews: "2,341",
          shipping: "Free",
          image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
        },
        {
          link: "https://www.flipkart.com/apple-iphone-16-pro-natural-titanium-128-gb/p/itm123456789",
          price: "121900",
          currency: "INR",
          productName: "Apple iPhone 16 Pro 128GB Natural Titanium",
          website: "flipkart.com",
          availability: "In stock",
          rating: "4.4",
          reviews: "1,876",
          shipping: "Free",
          image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/5/w/3/-original-imaghxcpnf8aay8h.jpeg",
        },
      ],
      US: [
        {
          link: "https://www.amazon.com/Apple-iPhone-Pro-128GB-Natural/dp/B0DGHXM2CZ",
          price: "999",
          currency: "USD",
          productName: "Apple iPhone 16 Pro (128GB) - Natural Titanium",
          website: "amazon.com",
          availability: "In stock",
          rating: "4.6",
          reviews: "5,432",
          shipping: "Free",
          image: "https://m.media-amazon.com/images/I/81SigpJN1KL._AC_SL1500_.jpg",
        },
      ],
    },
    "macbook pro m4": {
      IN: [
        {
          link: "https://www.amazon.in/Apple-MacBook-14-inch-10-core-14-core/dp/B0DGFZ7HQD",
          price: "169900",
          currency: "INR",
          productName: "Apple MacBook Pro 14-inch M4 chip (512GB SSD)",
          website: "amazon.in",
          availability: "In stock",
          rating: "4.7",
          reviews: "234",
          shipping: "Free",
          image: "https://m.media-amazon.com/images/I/61RdR83e-mL._SL1500_.jpg",
        },
        {
          link: "https://www.flipkart.com/apple-macbook-pro-m4-chip-14-inch-display-16-gb-512-gb-ssd-macos-sonoma-mq1e3hn-a/p/itm123456789",
          price: "172900",
          currency: "INR",
          productName: "Apple MacBook Pro M4 14-inch 512GB Space Black",
          website: "flipkart.com",
          availability: "In stock",
          rating: "4.6",
          reviews: "89",
          shipping: "Free",
          image: "https://rukminim2.flixcart.com/image/416/416/xif0q/computer/v/y/z/-original-imagtke6rhxjcj5j.jpeg",
        },
      ],
    },
    "boat airdopes 311 pro": {
      IN: [
        {
          link: "https://www.amazon.in/boAt-Airdopes-311-Pro-Earbuds/dp/B0BF56JGSW",
          price: "1499",
          currency: "INR",
          productName: "boAt Airdopes 311 Pro True Wireless Earbuds",
          website: "amazon.in",
          availability: "In stock",
          rating: "4.0",
          reviews: "12,345",
          shipping: "Free",
          discount: "50% off",
          image: "https://m.media-amazon.com/images/I/61o2urRxrcL._SL1500_.jpg",
        },
        {
          link: "https://www.flipkart.com/boat-airdopes-311-pro-bluetooth-headset/p/itm123456789",
          price: "1599",
          currency: "INR",
          productName: "boAt Airdopes 311 Pro Bluetooth Headset",
          website: "flipkart.com",
          availability: "In stock",
          rating: "4.1",
          reviews: "8,765",
          shipping: "Free",
          discount: "47% off",
          image: "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/p/r/z/-original-imaghbgcgusgucgg.jpeg",
        },
      ],
    },
    "nothing phone 2a": {
      IN: [
        {
          link: "https://www.amazon.in/Nothing-Phone-Black-128GB-Storage/dp/B0CTVT2XZX",
          price: "23999",
          currency: "INR",
          productName: "Nothing Phone (2a) Black 128GB 8GB RAM",
          website: "amazon.in",
          availability: "In stock",
          rating: "4.3",
          reviews: "3,456",
          shipping: "Free",
          image: "https://m.media-amazon.com/images/I/71YdE55GwjL._SL1500_.jpg",
        },
        {
          link: "https://www.flipkart.com/nothing-phone-2a-black-128-gb/p/itm123456789",
          price: "24999",
          currency: "INR",
          productName: "Nothing Phone (2a) Black 128GB",
          website: "flipkart.com",
          availability: "In stock",
          rating: "4.2",
          reviews: "2,345",
          shipping: "Free",
          image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/9/z/o/-original-imaghxcpzcmrqbp8.jpeg",
        },
      ],
    },
    "oneplus 12": {
      IN: [
        {
          link: "https://www.amazon.in/OnePlus-Flowy-Emerald-Storage-SuperVOOC/dp/B0CQPYNS9Q",
          price: "64999",
          currency: "INR",
          productName: "OnePlus 12 (Flowy Emerald, 12GB RAM, 256GB Storage)",
          website: "amazon.in",
          availability: "In stock",
          rating: "4.4",
          reviews: "5,678",
          shipping: "Free",
          image: "https://m.media-amazon.com/images/I/71nzwXGWEEL._SL1500_.jpg",
        },
        {
          link: "https://www.flipkart.com/oneplus-12-flowy-emerald-256-gb/p/itm123456789",
          price: "65999",
          currency: "INR",
          productName: "OnePlus 12 (Flowy Emerald, 256GB)",
          website: "flipkart.com",
          availability: "In stock",
          rating: "4.5",
          reviews: "4,567",
          shipping: "Free",
          image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/o/t/a/-original-imagwy3ymvjkqkzd.jpeg",
        },
      ],
    },
    "samsung galaxy s24 ultra": {
      IN: [
        {
          link: "https://www.amazon.in/Samsung-Galaxy-Ultra-Titanium-Storage/dp/B0CTVT2XZX",
          price: "129999",
          currency: "INR",
          productName: "Samsung Galaxy S24 Ultra (Titanium Gray, 12GB, 256GB Storage)",
          website: "amazon.in",
          availability: "In stock",
          rating: "4.5",
          reviews: "6,789",
          shipping: "Free",
          image: "https://m.media-amazon.com/images/I/71NjjYCkZhL._SL1500_.jpg",
        },
        {
          link: "https://www.flipkart.com/samsung-galaxy-s24-ultra-titanium-gray-256-gb/p/itm123456789",
          price: "131999",
          currency: "INR",
          productName: "Samsung Galaxy S24 Ultra (Titanium Gray, 256GB)",
          website: "flipkart.com",
          availability: "In stock",
          rating: "4.6",
          reviews: "5,678",
          shipping: "Free",
          image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/g/t/u/-original-imagx9ew5sgsirgn.jpeg",
        },
      ],
    },
  }