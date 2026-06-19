const fs = require('fs');

let content = fs.readFileSync('lib/data/menu.ts', 'utf8');

const replacements = {
  // Tiles
  "image: '/images/hero_burger.png'": "image: '/images/hero_burger_cinematic.png'",
  "image: '/images/spicy_wings_platter.png'": "image: '/images/spicy_wings.png'",
  "image: '/images/combo_meal.png'": "image: '/images/combo_meal.png'",
  "image: '/images/grilled_wrap.png'": "image: '/images/chicken_wrap_moody.png'",
  "image: '/images/grilled_chicken.png'": "image: '/images/grilled_chicken_plate.png'",
  "image: '/images/crispy_fries.png'": "image: '/images/crispy_fries.png'",
  "image: '/images/soft_drinks.png'": "image: '/images/soft_drink.png'",
  "image: '/images/family_combo.png'": "image: '/images/family_feast.png'",

  // Specific items (using exact IDs to avoid colliding replacements)
};

// Replace Tiles
for (const [key, value] of Object.entries(replacements)) {
  content = content.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
}

// Replace Menu Items explicitly by item ID block
function updateItem(id, newImageUrl) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?image:\\s*')[^']+(')`, 'g');
  content = content.replace(regex, `$1${newImageUrl}$2`);
}

updateItem('flame-burger', '/images/hero_burger_cinematic.png');
updateItem('double-smash', '/images/double_smash_moody.png');
updateItem('zinger-burger', '/images/zinger_burger_moody.png');
updateItem('grilled-chicken', '/images/grilled_chicken_plate.png');
updateItem('grilled-wrap', '/images/chicken_wrap_moody.png');

updateItem('bbq-wings-6', '/images/bbq_wings.png');
updateItem('bbq-wings-12', '/images/bbq_wings_large.png');
updateItem('spicy-wings-6', '/images/spicy_wings.png');
updateItem('spicy-wings-12', '/images/spicy_wings_large.png');

updateItem('solo-combo', '/images/combo_meal.png');
updateItem('double-combo', 'https://images.unsplash.com/photo-1550547660-d15459f41508?q=80&w=800&auto=format&fit=crop');
updateItem('family-feast', '/images/family_feast.png');
updateItem('wings-combo', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop');

updateItem('regular-fries', '/images/crispy_fries.png');
updateItem('large-fries', 'https://images.unsplash.com/photo-1541592102-42c2e8cfa3ee?q=80&w=800&auto=format&fit=crop');
updateItem('garlic-bread', '/images/garlic_bread.png');
updateItem('coleslaw', '/images/coleslaw.png');
updateItem('onion-rings', '/images/onion_rings.png');

updateItem('regular-drink', '/images/soft_drink.png');
updateItem('large-drink', 'https://images.unsplash.com/photo-1585032226651-72da304c0858?q=80&w=800&auto=format&fit=crop');
updateItem('mineral-water', 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=800&auto=format&fit=crop');
updateItem('fresh-lemonade', '/images/lemonade.png');

fs.writeFileSync('lib/data/menu.ts', content);
console.log('menu.ts updated');
