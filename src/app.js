//importar libreria express

const express = require('express');

//importar las cors, para permitir recursos entre diferentes dominios
const cors = require('cors');

const morgan = require('morgan');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appError');

//routes
const userRouter = require('./routes/users.routes');

const transferRouter = require('./routes/transfer.routes');

//creo variable app para guardar todas las herramientas de express
const app = express();

// midleware para crear primera ruta para usar en un navegador o para consumir en un front
//sirve para q el servidor entienda formato json

//ojo el MIDDLEWARE en js debe siempre ir antes de las rutas http
app.use(express.json());

app.use(cors());

const router = require('./routes/users.routes');

//las cors se deben ejecutar antes de llamar las ruras

//activar modo desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//todo:actualizar rutas
//accede a todas las rutas de productos
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfers', transferRouter);
//creamos metodos (rutas) http (enpoin) para interactuar con base de datos
//(trasladados a router)

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
