const express = require('express');
const cors = require('cors');
require('dotenv').config();

const scraper = require('./utils/scrape');

const fs = require('fs');

const perfiles = [
  'https://www.facebook.com/marcio.silva.1272',
  'https://www.facebook.com/sentinela24h/posts',
  'https://www.facebook.com/aplateia/posts'
];

scraper(perfiles).then(res => {
  fs.writeFileSync('noticias.json', JSON.stringify(res));
});
