const scraper = require('./utils/scrape');
const fs = require('fs');

scraper().then(() => {
  const noticias = JSON.parse(fs.readFileSync('noticias.json'));
  //guardar en bd
  console.log(noticias.length);
});
