const mongoose = require('mongoose');
require('dotenv').config();
key = process.env.key;

const connectDB = async () => {
    try {
        await mongoose.connect(key, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('MongoDB Connected')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;