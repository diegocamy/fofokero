const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const scraper = require('./utils/scrape');

const app = express();

//MONGOOSE SCHEMA
const Schema = mongoose.Schema;

const fofocasSchema = new Schema({
  hora: {
    type: Number,
    required: true,
  },
  fofocas: [
    {
      timeStamp: {
        type: String,
      },
      titulo: {
        type: String,
      },
      imagen: {
        type: String,
      },
      titular: {
        type: String,
      },
      enlace: {
        type: String,
      },
      fuente: {
        type: String,
      },
      linkPerfil: {
        type: String,
      },
      fotoUsuario: {
        type: String,
      },
    },
  ],
});

const Fofocas = mongoose.model('fofocas', fofocasSchema);

mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('CONNECTED TO DB'))
  .catch(err => console.log(err));

mongoose.connection.on('error', err => console.log(err));

//MIDDLEWARES
app.use(express.static('client/build'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);
app.use(express.json());
app.use(cors({ origin: 'http://localhost' }));

//BUSCAR Y GUARDAR FOFOCAS A CADA 15 MINUTOS
setInterval(async () => {
  try {
    //Obtener los perfiles
    const perfiles = process.env.PERFILES;
    //Hacer el scraping de los datos
    const fofocasFetcheadas = await scraper(perfiles.split(','));
    //crear objeto fofocas para ingresar a la db
    const fofoca = new Fofocas({
      hora: new Date().getTime(),
      fofocas: fofocasFetcheadas,
    });
    //verificar si ya existen fofocas en la db
    const fofocasDB = await Fofocas.find();
    //si existen, extraer la hora
    const hora = fofocasDB.length > 0 && fofocasDB[0].hora;
    //crear el objeto filtro con la hora para filtrar o vacio si no hay nada en db
    const filtro = hora ? { hora: hora } : {};
    //actualizar o insertar por primera vez las fofocas en db
    await Fofocas.findOneAndUpdate(
      filtro,
      {
        hora: fofoca.hora,
        fofocas: fofoca.fofocas,
      },
      {
        new: true,
        upsert: true,
      },
    );
  } catch (error) {
    console.log(error);
  }
}, 300000);

//RUTA PARA OBTENER LAS FOFOCAS
app.get('/fofocas', async (req, res, next) => {
  try {
    const respuesta = await Fofocas.find();
    const fofocas = respuesta[0];
    return res.status(200).json(fofocas);
  } catch (error) {
    next(error);
  }
});

//serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
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
