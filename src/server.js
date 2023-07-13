//para acceder a todas ls variables de entorno de la applicacion

require('dotenv').config();

const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('database authenticated 😃'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('database synced 😃'))
  .catch((err) => console.log(err));

//cear el puerto para acceder al los procesos del sistema
const PORT = process.env.PORT;

//metodo de express q va a escuchar bajo un puerto 3000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!👍 `);
});
