const router = require('express-promise-router')();
const { validateParam, validateBody, schemas } = require('../helpers/routerHelpers');

const UsersController = require('../controllers/users');

router.route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.userSchema), UsersController.newUser);

router.route('/:id')
    .get(validateParam(schemas.idSchema, 'id'), UsersController.get)
    .put([validateParam(schemas.idSchema, 'id'),
          validateBody(schemas.userSchema)],
          UsersController.put)
    .patch([validateParam(schemas.idSchema, 'id'),
            validateBody(schemas.userOptionalSchema)],
            UsersController.patch);

router.route('/:id/cars')
    .get(validateParam(schemas.idSchema, 'id'), UsersController.getUserCars)
    .post([validateParam(schemas.idSchema, 'id'),
           validateBody(schemas.userCarSchema)], 
           UsersController.addNewCar);

module.exports=router;