const router = require('express').Router();
let Exercise = require('../models/exercise');

router.get('/', async (req, res) => {
    try {
        let exercises = await Exercise.find();
        res.json(exercises);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/add', async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    try {
        await newExercise.save();
        res.json('Exercise added');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/:id', async (req, res) => {
    try {
        let exercise = await Exercise.findById(req.params.id)
        res.json(exercise);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.post('/:id', async (req, res) => {
    let { username, duration, description, date } = req.body;
    let id = req.params.id;
    console.log(id);
    try {
        await Exercise.findByIdAndUpdate(
            id,
            {
                $set: {
                    username,
                    duration,
                    description,
                    date
                }
            }).exec(
                (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json('result');
                    }
                })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let exercise = await Exercise.findByIdAndDelete(req.params.id)
        res.json(exercise);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;