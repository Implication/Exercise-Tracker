const mongoose = require('mongoose');
require('dotenv').config();
uri = "mongodb+srv://dbUser:tra123@cluster0-m86qd.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        console.log("Here");
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('MongoDB Connected')
    } catch (err) {
        console.error(err.message);
        console.error("Database is fucking up");
        process.exit(1);
    }
}

module.exports = connectDB;