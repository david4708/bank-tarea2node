const express = require('express');
//const {getProducts}=require('./../controllers/products.controllers')

//controllers

const usersController = require('../controllers/users.controllers');

// const validationMiddleware = require('../middlewares/validations.middleware');

//middlewares
const userMiddleware = require('./../middlewares/user.middleware');

const router = express.Router();

//creamos metodos (rutas) http (enpoin) para interactuar con base de datos

router.post('/signup', usersController.signup);
router.post('/login', userMiddleware.validUser, usersController.login);

//todo: hacer history

//  router.get("/", getProducts);

//  router.post('/',createProduct)

//  router.get("/:id/:price",findProduct)

//  router.delete("/:id",deleteProduct)

// router
//   .route('/')
//   .get(usersController.getUsers)
//   .post(validationMiddleware.validuser, usersController.createUser);
// router
//   .route('/:id')

//   .get(usersController.findUser)

//   .patch(usersController.updateUser)
//   .delete(usersController.deleteUser);

module.exports = router;
