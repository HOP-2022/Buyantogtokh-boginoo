const { model, Schema } = require("mongoose");


const LinkScheme = new Schema({
    URL: String, 
    shortURL: {type: String, required: false},
    userID: String,
    registerDate: { type: Date, default: Date.now, required: false},
});


const LinkModel = model("Link", LinkScheme);
module.exports = LinkModel;