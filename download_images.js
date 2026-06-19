const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { url: 'https://images.unsplash.com/photo-1550547660-d15459f41508?q=80&w=800&auto=format&fit=crop', name: 'double_trouble.jpg' },
  { url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop', name: 'wings_party.jpg' },
  { url: 'https://images.unsplash.com/photo-1541592102-42c2e8cfa3ee?q=80&w=800&auto=format&fit=crop', name: 'large_fries.jpg' },
  { url: 'https://images.unsplash.com/photo-1585032226651-72da304c0858?q=80&w=800&auto=format&fit=crop', name: 'large_drink.jpg' },
  { url: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=800&auto=format&fit=crop', name: 'mineral_water.jpg' },
  { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop', name: 'about_kitchen.jpg' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function main() {
  for (const img of images) {
    const dest = path.join('public', 'images', img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await download(img.url, dest);
      console.log(`Saved ${img.name}`);
    } catch(e) {
      console.error(`Failed ${img.name}`, e);
    }
  }
}

main();
