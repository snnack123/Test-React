const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/users_db');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    const camp = new User({
        email: 'b_email@gmail.com',
        birthYear: 1967
    })
    await camp.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})

