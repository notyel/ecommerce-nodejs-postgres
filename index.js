const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { config } = require('./config/config');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = config.port;

// Middleware para parsear JSON
app.use(express.json());

// Lista blanca de dominios permitidos para CORS
const whitelist = ['http://localhost:8080', 'https://myapp.co'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};

// Habilitar CORS con opciones personalizadas
app.use(cors(corsOptions));

// Rutas principales
app.get('/', (req, res) => {
  res.send('Hola, bienvenido a mi servidor en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Configuración de rutas API
routerApi(app);

// Manejo de errores (middlewares)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
