const { model, Schema } = require("mongoose");


const userScheme = new Schema({
    email: String, 
    password: String,
    registerDate: { type: Date, default: Date.now, required: false},
});


const UserModel = model("User", userScheme);
module.exports = UserModel;