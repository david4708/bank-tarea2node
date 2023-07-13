const User = require('../models/user.model');
const accountNumberGenerator = require('../utils/accountNumberGenerator');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const accountNumber = accountNumberGenerator();

  //para encriptar
  // const salt = await bcrypt.genSalt(12);
  // const secretPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    password,
    accountNumber,
  });
  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect accountNumber or password'));
  }

  //crea un token
  const token = generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

// const User = require('../models/user.model');

// exports.getUsers = async (req, res) => {
//   const time = req.requesTime;

//   const users = await User.findAll();

//   return res.status(200).json({
//     requesTime: time,
//     status: 'success',
//     message: 'users found',
//     products,
//   });
// };

// exports.createUser = async (req, res) => {
//   try {
//     //obtener informacion a crear de la req.body

//     const { name, accountNumber, password, amount } = req.body;

//     //crear el producto utilizando el modelo
//     const user = await User.create({
//       name,
//       accountNumber,
//       password,
//       amount,
//     });

//     //enviar respuesta al cliente
//     return res.status(201).json({
//       message: 'The usuario has been create!',
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       status: 'fail',
//       message: 'something went very wrong',
//     });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     //identificamos el  producto a actualizar
//     const { id } = req.params;
//     //todo: definir variables a actualizar
//     //definimos los campos de body a actualizar
//     const { quantity, price } = req.body;

//     //buscar el producto a actualizar
//     const user = await User.findOne({
//       where: {
//         id,
//         status: true,
//       },
//     });

//     //validar si exuiste el producto
//     if (!user) {
//       return res.status(404).json({
//         status: 'error',
//         message: `user with id: ${id} not found`,
//       });
//     }

//     //todo:definir variables a actualizar
//     //actualzar producto
//     await user.update({ quantity, price });

//     //enviar respuesta al cliente
//     res.status(200).json({
//       status: 'success',
//       message: 'the user has been updated',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 'fail',
//       message: 'something wwent very wrong',
//     });
//   }
// };

// exports.findUser = async (req, res) => {
//   try {
//     //traemos el id de los parametros

//     const { id } = req.params;

//     // bucar product in databaseS
//     const user = await User.findOne({
//       where: {
//         //aqplica SC+6
//         id,
//         status: true,
//       },
//     });
//     //Validar si el producto existe, sino enviar error 404
//     if (!user) {
//       return res.status(404).json({
//         status: 'error',
//         message: `the user whith id: ${id} not found`,
//       });
//     }

//     //enviar respuesta al cliente
//     return res.status(200).json({
//       message: 'user found',
//       status: 'success',
//       id,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       status: 'fail',
//       message: 'something went very wrong',
//     });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     //traer id de los parametros
//     const { id } = req.params;

//     //buscar  el product
//     const user = await User.findOne({
//       where: {
//         status: true,
//         id,
//       },
//     });

//     //validar si existe el producto

//     if (!user) {
//       return res.status(404).json({
//         status: 'fail',
//         message: `the user id: ${id} not found`,
//       });
//     }

//     //actualizar el producto encntrado
//     await user.update({ status: false });

//     //enviar respuesta al cliente
//     res.status(200).json({
//       status: 'success',
//       message: `the user id: ${id} has been inactivado`,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       status: 'fail',
//       message: 'something went very wrong',
//     });
//   }
// };
