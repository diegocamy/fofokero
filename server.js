const scraper = require('./utils/scrape');
const fs = require('fs');

const perfiles = [
  'https://www.facebook.com/marcio.silva.1272',
  'https://www.facebook.com/sentinela24h/posts'
];

scraper(perfiles).then(() => {
  const noticias = JSON.parse(fs.readFileSync('noticias.json'));
  //guardar en bd
  console.log(noticias.length);
});
