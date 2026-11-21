// Plain shopping links for packing lists. NOT affiliate links.
// To switch a retailer to an affiliate link later, change only the builder below
// (and add rel="sponsored" plus a disclosure line in the components).
export const RETAILERS = [
  { id: 'amazon', name: 'Amazon', url: (q) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}` },
  { id: 'flipkart', name: 'Flipkart', url: (q) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}` },
  // Decathlon India: homepage only, because its search URL format is not verified.
  { id: 'decathlon', name: 'Decathlon', url: () => 'https://www.decathlon.in/' },
];
