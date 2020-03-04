const express = require('express');
const cors = require('cors');
require('dotenv').config();

const scraper = require('./utils/scrape');

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: 'localhost' }));

//RUTA PARA OBTENER LAS FOFOCAS
app.get('/fofocas', async (req, res) => {
  try {
    const perfiles = req.body.perfiles.split(',');
    const fofocas = await scraper(perfiles);
    res.status(200).json(fofocas);
  } catch (error) {
    res.status(400).json(error);
  }
});

const port = process.env.PORT;

app.listen(port || 5000, () => console.log('Server listening on port 5000'));
