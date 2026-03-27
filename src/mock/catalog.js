export const catalog = {
  Apple: {
    'iPhone 6': {
      basePrice: 6500,
      variants: [
        { ram: '1GB', storage: '16GB', priceDelta: -500 },
        { ram: '1GB', storage: '32GB', priceDelta: 200 },
      ],
    },
    'iPhone 7 Plus': {
      basePrice: 10500,
      variants: [
        { ram: '3GB', storage: '32GB', priceDelta: -900 },
        { ram: '3GB', storage: '128GB', priceDelta: 850 },
        { ram: '3GB', storage: '256GB', priceDelta: 1600 },
      ],
    },
    'iPhone 8': {
      basePrice: 12500,
      variants: [
        { ram: '2GB', storage: '64GB', priceDelta: 0 },
        { ram: '2GB', storage: '128GB', priceDelta: 900 },
      ],
    },
    'iPhone 12': {
      basePrice: 20500,
      variants: [
        { ram: '4GB', storage: '64GB', priceDelta: 0 },
        { ram: '4GB', storage: '128GB', priceDelta: 1000 },
        { ram: '4GB', storage: '256GB', priceDelta: 2200 },
      ],
    },
  },
  Samsung: {
    'Galaxy S10': {
      basePrice: 13500,
      variants: [
        { ram: '8GB', storage: '128GB', priceDelta: 0 },
        { ram: '8GB', storage: '512GB', priceDelta: 2500 },
      ],
    },
    'Galaxy S20': {
      basePrice: 18500,
      variants: [
        { ram: '8GB', storage: '128GB', priceDelta: 0 },
        { ram: '12GB', storage: '128GB', priceDelta: 950 },
      ],
    },
  },
  Xiaomi: {
    'Redmi Note 10 Pro': {
      basePrice: 11500,
      variants: [
        { ram: '6GB', storage: '64GB', priceDelta: 0 },
        { ram: '8GB', storage: '128GB', priceDelta: 1200 },
      ],
    },
  },
}

