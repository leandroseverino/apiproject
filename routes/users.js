const express = require('express');
// const router = express.Router();

const router = require('express-promise-router')();


const UsersController = require('../controllers/users');

router.route('/')
    .get(UsersController.index)
    .post(UsersController.newUser);

router.route('/:id')
    .get(UsersController.get)
    .put(UsersController.put)
    .patch(UsersController.patch);

router.route('/:id/cars')
    .get(UsersController.getUserCars)
    .post(UsersController.addNewCar);

module.exports=router;