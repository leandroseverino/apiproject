const router = require('express-promise-router')();

const { validateParam, validateBody, schemas } = require('../helpers/routerHelpers');

const CarsController = require('../controllers/cars');

router.route('/')
    .get(CarsController.index)
    .post(validateBody(schemas.carSchema), CarsController.post);

router.route('/:id')
    .get(validateParam(schemas.idSchema, 'id'), CarsController.get)
    .put([validateParam(schemas.idSchema, 'id'),
          validateBody(schemas.putCarSchema)],
          CarsController.put)
    .patch([validateParam(schemas.idSchema, 'id'),
            validateBody(schemas.carOptionalSchema)],
            CarsController.patch)
    .delete(validateParam(schemas.idSchema, 'id'), CarsController.delete);

module.exports=router;