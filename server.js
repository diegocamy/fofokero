const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const scraper = require('./utils/scrape');

const app = express();

//MIDDLEWARES
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(express.json());
app.use(cors({ origin: 'http://localhost' }));

//RUTA PARA OBTENER LAS FOFOCAS
app.get('/fofocas', async (req, res, next) => {
  try {
    const perfiles = process.env.PERFILES;
    const fofocas = await scraper(perfiles.split(','));
    return res.status(200).json(fofocas);
  } catch (error) {
    next(error);
  }
});

//ERROR HANDLING
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ Error: error.message });
});

const port = process.env.PORT;

app.listen(port || 5000, () => console.log('Server listening on port 5000'));
