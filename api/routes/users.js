const router = require('express').Router();
let User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    console.log("Usrname is " + username);
    const newUser = new User({ username });
    try {
        await newUser.save();
        res.json('User added');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;