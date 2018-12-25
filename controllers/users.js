const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    /* Callback way */
    indexCallback: (req, res, next) => {
        User.find({}, (err, users) => {
            if (err) {
                next(err);
            }
            res.status(200).json(users);
        });
    },
    /* Promisses way */
    indexPromisse: (req, res, next) => {
        User.find({})
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            });
    },
    /* Async / Await way */
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    get: async (req, res, next) => {
        const { id } = req.value.params;
        //const { id } = req.params;
        //User.findById(result.value.id)
        const user = await User.findById(id);
        res.status(200).json(user);
    },
    put: async (req, res, neDataxt) => {
        // replace the User content
        // Enforce that req.body must contain all the fields
        const { id } = req.params;
        const newUserData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, newUserData);
        res.status(200).json( { success: true } );

    },
    patch: async (req, res, next) => {
        // Update the User content
        // req.body may contain any number of fields
        const { id } = req.params;
        const newUserData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, newUserData);
        res.status(200).json( { success: true } );
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
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
        const { id } = req.params;
        const user = await User.findById(id).populate('cars');
        res.status(200).json(user.cars);
    },
    /*
    *  Add a new Car to a specific User (ID).
    */
    addNewCar: async (req, res, next) => {
        // Get the User
        const { id } = req.params;
        const user = await User.findById(id);
        // Create a new Car object
        const newCar = new Car(req.body);
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
    /* Callback way */
    newUserCallback: (req, res, next) => {
        // console.log('Request body content', req.body);
        const newUser = new User(req.body); // console.log('New User contents !', newUser);
        newUser.save((err, user) => {
            if (err) {
                next(err);
            }
            console.log('new user added to collection !', user);
            res.status(201).json(user);
        });
    },
    /* Promisse way */
    newUserPromisse: (req, res, next) => {
        // console.log('Request body content', req.body);
        const newUser = new User(req.body); // console.log('New User contents !', newUser);
        newUser.save()
            .then(user => {
                console.log('new user added to collection !', user);
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            });
    },
     /* Async / Await way */
     newUser: async (req, res, next) => {
        // console.log('Request body content', req.body);
        const newUser = new User(req.body); // console.log('New User contents !', newUser);
        const user = await newUser.save();
        console.log('new user added to collection !', user);
        res.status(201).json(user);
    }  
};