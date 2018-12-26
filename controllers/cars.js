const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    index: async (req, res, next) => {
        const cars = await Car.find({});
        res.status(200).json(cars);
    },
    get: async (req, res, next) => {
        const { id } = req.value.params;
        const car = await Car.findById(id);
        res.status(200).json(car);
    },
    post: async (req, res, next) => {
        const seller = await User.findById(req.value.body.seller);
        
        const newCar = req.value.body;
        delete newCar.seller;

        const car = new Car(newCar);
        car.seller = seller;

        await car.save();

        seller.cars.push(car);
        await seller.save();

        res.status(201).json(car);
    },
    put: async (req, res, next) => {
        // replace the Car content
        // Enforce that req.body must contain all the fields
        const { id } = req.value.params;
        const newCarData = req.value.body;

        const updatedCar = await Car.findByIdAndUpdate(id, newCarData);
        res.status(200).json( { success: true } );

    },
    patch: async (req, res, next) => {
        // Update the User content
        // req.body may contain any number of fields
        const { id } = req.value.params;
        const newCarData = req.value.body;

        const updatedCar = await Car.findByIdAndUpdate(id, newCarData);
        res.status(200).json( { success: true } );
    },
    delete: async (req, res, next) => {
        const { id } = req.value.params;
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ error: 'Car does not exist !'});
        }
        
        sellerId = car.seller;
        const seller = await User.findById(sellerId);
        await car.remove();

        seller.cars.pull(car);
        await seller.save();

        res.status(200).json( { success: true } );
    },
    /*
    * Return the Cars collection associeted with a specific User (ID).
    */
    getUserCars: async (req, res, next) => {
        const { id } = req.value.params;
        const user = await User.findById(id).populate('cars');
        res.status(200).json(user.cars);
    },
    /*
    *  Add a new Car to a specific User (ID).
    */
    addNewCar: async (req, res, next) => {
        // Get the User
        const { id } = req.value.params;
        const user = await User.findById(id);
        // Create a new Car object
        const newCar = new Car(req.value.body);
        // Assign the User with the Car.
        newCar.seller = user;
        // Save the new Car Object
        const car = await newCar.save();
        console.log('new car added to collection !', car);
        // Add the saved Car to the User.cars collection:
        user.cars.push(newCar);
        const updatedCar = await user.save();
        res.status(201).json(car);
    }  
};