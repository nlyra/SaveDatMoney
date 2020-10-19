const mongoose = require('mongoose');

// User schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    darkMode: Boolean,
    currency: String,
    createdOn: {
        type: String,
        default: Date.now()
    }
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;