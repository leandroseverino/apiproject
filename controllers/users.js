const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    get: async (req, res, next) => {
        const { id } = req.value.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    },
    put: async (req, res, neDataxt) => {
        // replace the User content
        // Enforce that req.body must contain all the fields
        const { id } = req.value.params;
        const newUserData = req.value.body;

        const updatedUser = await User.findByIdAndUpdate(id, newUserData);
        res.status(200).json( { success: true } );

    },
    patch: async (req, res, next) => {
        // Update the User content
        // req.body may contain any number of fields
        const { id } = req.value.params;
        const newUserData = req.value.body;

        const updatedUser = await User.findByIdAndUpdate(id, newUserData);
        res.status(200).json( { success: true } );
    },
    delete: async (req, res, next) => {
        const { id } = req.value.params;
        User.findById(id)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                next(err);
            });
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
    },
     newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        console.log('new user added to collection !', user);
        res.status(201).json(user);
    }  
};