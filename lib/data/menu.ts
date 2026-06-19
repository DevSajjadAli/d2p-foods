export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  image: string;
  category: Category;
  tags?: string[];
  popular?: boolean;
  spicy?: boolean;
  // Zomato-style metadata
  veg: boolean;
  rating: number; // 0..5
  ratingCount: number;
  prepTime: number; // minutes
  customizable?: boolean;
  customizations?: CustomizationCategory[];
};

export type CustomizationOption = {
  id: string;
  name: string;
  priceDelta: number;
};

export type CustomizationCategory = {
  id: string;
  name: string;
  required: boolean;
  options: CustomizationOption[];
};

export type Category = 'grilled' | 'wings' | 'combos' | 'sides' | 'drinks';

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: 'grilled', label: 'Grilled', emoji: '🔥' },
  { id: 'wings', label: 'Wings', emoji: '🍗' },
  { id: 'combos', label: 'Combos', emoji: '🥤' },
  { id: 'sides', label: 'Sides', emoji: '🥗' },
  { id: 'drinks', label: 'Drinks', emoji: '🧃' },
];

// "What's on Your Mind" — intent-based cuisine tiles for the homepage carousel.
// Each cuisine is a photo + label, exactly the Zomato pattern.
export const cuisineTiles: { id: string; label: string; image: string }[] = [
  { id: 'burgers', label: 'Burgers', image: '/images/hero_burger_cinematic.png' },
  { id: 'wings', label: 'Wings', image: '/images/spicy_wings.png' },
  { id: 'combos', label: 'Combos', image: '/images/combo_meal.png' },
  { id: 'wraps', label: 'Wraps', image: '/images/chicken_wrap_moody.png' },
  { id: 'chicken', label: 'Chicken', image: '/images/grilled_chicken_plate.png' },
  { id: 'sides', label: 'Sides', image: '/images/crispy_fries.png' },
  { id: 'drinks', label: 'Drinks', image: '/images/soft_drink.png' },
  { id: 'family', label: 'Family Meals', image: '/images/family_feast.png' },
];

export const menuItems: MenuItem[] = [
  // GRILLED
  {
    id: 'flame-burger',
    name: 'D2P Flame Burger',
    description: 'Flame-grilled beef patty, cheddar cheese, crispy lettuce, tomato, special D2P sauce in a toasted sesame bun.',
    price: 850,
    image: '/images/hero_burger_cinematic.png',
    category: 'grilled',
    popular: true,
    tags: ['bestseller'],
    veg: false,
    rating: 4.6,
    ratingCount: 1284,
    prepTime: 9,
    customizable: true,
    customizations: [
      {
        id: 'size',
        name: 'Size',
        required: true,
        options: [
          { id: 'regular', name: 'Regular', priceDelta: 0 },
          { id: 'large', name: 'Large (+150)', priceDelta: 150 },
        ],
      },
      {
        id: 'add-ons',
        name: 'Add-ons',
        required: false,
        options: [
          { id: 'cheese', name: 'Extra Cheese', priceDelta: 60 },
          { id: 'jalapenos', name: 'Jalapeños', priceDelta: 40 },
        ],
      },
    ],
  },
  {
    id: 'double-smash',
    name: 'Double Smash Burger',
    description: 'Two smashed beef patties, double American cheese, caramelized onions, pickles, and signature ember sauce.',
    price: 1150,
    image: '/images/double_smash_moody.png',
    category: 'grilled',
    popular: true,
    veg: false,
    rating: 4.7,
    ratingCount: 942,
    prepTime: 11,
  },
  {
    id: 'zinger-burger',
    name: 'Zinger Classic',
    description: 'Crispy spiced chicken fillet, jalapeño mayo, fresh coleslaw in a pillowy brioche bun.',
    price: 750,
    image: '/images/zinger_burger_moody.png',
    category: 'grilled',
    spicy: true,
    veg: false,
    rating: 4.4,
    ratingCount: 612,
    prepTime: 9,
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken Plate',
    description: 'Half chicken marinated in 12-spice rub, flame-grilled to perfection. Served with garlic naan.',
    price: 1200,
    image: '/images/grilled_chicken_plate.png',
    category: 'grilled',
    popular: true,
    veg: false,
    rating: 4.5,
    ratingCount: 421,
    prepTime: 14,
  },
  {
    id: 'grilled-wrap',
    name: 'Grilled Chicken Wrap',
    description: 'Tender grilled chicken strips, fresh veggies, chipotle sauce, wrapped in warm tortilla.',
    price: 650,
    image: '/images/chicken_wrap_moody.png',
    category: 'grilled',
    veg: false,
    rating: 4.3,
    ratingCount: 318,
    prepTime: 8,
  },

  // WINGS
  {
    id: 'bbq-wings-6',
    name: 'BBQ Wings (6 pcs)',
    description: 'Slow-cooked, flame-finished wings tossed in smoky BBQ glaze. Served with ranch dip.',
    price: 750,
    image: '/images/bbq_wings.png',
    category: 'wings',
    popular: true,
    veg: false,
    rating: 4.5,
    ratingCount: 871,
    prepTime: 12,
  },
  {
    id: 'bbq-wings-12',
    name: 'BBQ Wings (12 pcs)',
    description: 'Same great wings, doubled up. Perfect to share — or not.',
    price: 1350,
    image: '/images/bbq_wings_large.png',
    category: 'wings',
    veg: false,
    rating: 4.5,
    ratingCount: 290,
    prepTime: 14,
  },
  {
    id: 'spicy-wings-6',
    name: 'Inferno Wings (6 pcs)',
    description: 'Our hottest wings coated in ghost-pepper sauce. Not for the faint-hearted.',
    price: 800,
    image: '/images/spicy_wings.png',
    category: 'wings',
    spicy: true,
    veg: false,
    rating: 4.4,
    ratingCount: 552,
    prepTime: 13,
  },
  {
    id: 'spicy-wings-12',
    name: 'Inferno Wings (12 pcs)',
    description: 'Twelve ghost-pepper wings with blue cheese dip to cool the burn.',
    price: 1450,
    image: '/images/spicy_wings_large.png',
    category: 'wings',
    spicy: true,
    veg: false,
    rating: 4.4,
    ratingCount: 188,
    prepTime: 15,
  },

  // COMBOS
  {
    id: 'solo-combo',
    name: 'Solo Combo',
    description: 'Any burger of your choice + regular fries + regular drink. The everyday deal.',
    price: 1100,
    image: '/images/combo_meal.png',
    category: 'combos',
    popular: true,
    tags: ['value'],
    veg: false,
    rating: 4.6,
    ratingCount: 1063,
    prepTime: 16,
    customizable: true,
    customizations: [
      {
        id: 'drink',
        name: 'Choose Drink',
        required: true,
        options: [
          { id: 'pepsi', name: 'Pepsi', priceDelta: 0 },
          { id: '7up', name: '7-Up', priceDelta: 0 },
          { id: 'mirinda', name: 'Mirinda', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'double-combo',
    name: 'Double Trouble Combo',
    description: 'Double Smash Burger + large fries + large drink. Built for serious hunger.',
    price: 1650,
    image: '/images/double_trouble.jpg',
    category: 'combos',
    veg: false,
    rating: 4.5,
    ratingCount: 487,
    prepTime: 18,
  },
  {
    id: 'family-feast',
    name: 'Family Feast Box',
    description: '2 burgers, 6 BBQ wings, 2 large fries, 2 drinks, and a coleslaw. Feeds 2–3 people.',
    price: 3200,
    image: '/images/family_feast.png',
    category: 'combos',
    popular: true,
    tags: ['value', 'family'],
    veg: false,
    rating: 4.7,
    ratingCount: 238,
    prepTime: 22,
  },
  {
    id: 'wings-combo',
    name: 'Wings Party Pack',
    description: '12 wings (BBQ or Inferno), large fries, 2 drinks. Your next watch-party sorted.',
    price: 2400,
    image: '/images/wings_party.jpg',
    category: 'combos',
    veg: false,
    rating: 4.6,
    ratingCount: 174,
    prepTime: 20,
  },

  // SIDES
  {
    id: 'regular-fries',
    name: 'Crispy Fries (Regular)',
    description: 'Golden, seasoned crinkle-cut fries straight from the fryer.',
    price: 299,
    image: '/images/crispy_fries.png',
    category: 'sides',
    veg: true,
    rating: 4.4,
    ratingCount: 1421,
    prepTime: 5,
  },
  {
    id: 'large-fries',
    name: 'Crispy Fries (Large)',
    description: 'Extra-large portion of golden crinkle-cut fries.',
    price: 399,
    image: '/images/large_fries.jpg',
    category: 'sides',
    veg: true,
    rating: 4.5,
    ratingCount: 612,
    prepTime: 6,
  },
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    description: 'Thick-cut bread toasted with herb-butter and roasted garlic.',
    price: 350,
    image: '/images/garlic_bread.png',
    category: 'sides',
    veg: true,
    rating: 4.3,
    ratingCount: 287,
    prepTime: 5,
  },
  {
    id: 'coleslaw',
    name: 'Creamy Coleslaw',
    description: 'House-made coleslaw with a tangy, creamy dressing. Always fresh.',
    price: 250,
    image: '/images/coleslaw.png',
    category: 'sides',
    veg: true,
    rating: 4.2,
    ratingCount: 154,
    prepTime: 3,
  },
  {
    id: 'onion-rings',
    name: 'Crispy Onion Rings',
    description: 'Beer-battered, golden onion rings with chipotle mayo.',
    price: 350,
    image: '/images/onion_rings.png',
    category: 'sides',
    veg: true,
    rating: 4.4,
    ratingCount: 198,
    prepTime: 6,
  },

  // DRINKS
  {
    id: 'regular-drink',
    name: 'Soft Drink (Regular)',
    description: 'Pepsi, 7-Up, or Mirinda — your choice, ice cold.',
    price: 199,
    image: '/images/soft_drink.png',
    category: 'drinks',
    veg: true,
    rating: 4.3,
    ratingCount: 624,
    prepTime: 1,
  },
  {
    id: 'large-drink',
    name: 'Soft Drink (Large)',
    description: 'Large cup — because regular never cuts it.',
    price: 249,
    image: '/images/large_drink.jpg',
    category: 'drinks',
    veg: true,
    rating: 4.3,
    ratingCount: 188,
    prepTime: 1,
  },
  {
    id: 'mineral-water',
    name: 'Mineral Water',
    description: 'Chilled Nestle PureLife or Kinley.',
    price: 150,
    image: '/images/mineral_water.jpg',
    category: 'drinks',
    veg: true,
    rating: 4.0,
    ratingCount: 412,
    prepTime: 1,
  },
  {
    id: 'fresh-lemonade',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with mint and a pinch of salt.',
    price: 299,
    image: '/images/lemonade.png',
    category: 'drinks',
    popular: true,
    veg: true,
    rating: 4.6,
    ratingCount: 538,
    prepTime: 3,
  },
];

export const featuredItems = menuItems.filter((item) => item.popular);

export const getItemsByCategory = (category: Category) =>
  menuItems.filter((item) => item.category === category);

export const getItemById = (id: string) =>
  menuItems.find((item) => item.id === id);

// Average aggregate for restaurant-page header band
export const restaurantStats = () => {
  const total = menuItems.length;
  const avgRating =
    menuItems.reduce((sum, i) => sum + i.rating, 0) / total;
  const totalRatings = menuItems.reduce((sum, i) => sum + i.ratingCount, 0);
  return {
    avgRating: Math.round(avgRating * 10) / 10,
    totalRatings,
    itemCount: total,
  };
};
