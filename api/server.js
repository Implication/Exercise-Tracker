const express = require('express');
const connetDB = require('./connect/connection')
const cors = require('cors');
const path = require('path');

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');





const app = express();
const port = process.env.PORT || 8000

app.use(cors());
connetDB();
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);


app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../build"));
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})