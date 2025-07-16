//Describes schema User, which save user name. Unique _id generates automatically
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true }
});



module.exports = mongoose.model('User', userSchema);