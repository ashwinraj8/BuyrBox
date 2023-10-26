const mongoose = require('mongoose');

const interestedUserSchema = new mongoose.Schema({
    name: String,
    id: String,
  });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    interestedUsers:[interestedUserSchema], //People interested on that vintage item.
});

module.exports = mongoose.model("user",userSchema);