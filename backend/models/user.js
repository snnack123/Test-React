const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    birthYear: Number,
})

module.exports = mongoose.model('User', UserSchema);