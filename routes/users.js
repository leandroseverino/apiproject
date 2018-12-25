const express = require('express');
// const router = express.Router();

const router = require('express-promise-router')();
const { validateParam, schemas } = require('../helpers/routerHelpers');

const UsersController = require('../controllers/users');

router.route('/')
    .get(UsersController.index)
    .post(UsersController.newUser);

router.route('/:id')
    .get(validateParam(schemas.idSchema, 'id'), UsersController.get)
    .put(UsersController.put)
    .patch(UsersController.patch);

router.route('/:id/cars')
    .get(UsersController.getUserCars)
    .post(UsersController.addNewCar);

module.exports=router;