const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const uri =  process.env.MONGODB_ATLAS_URI || ' ';

mongoose.set('strictQuery', false);
const connect= async () => {
    try {
        await mongoose.connect(uri);
        console.log(("database is successfully connected"));
    } catch(error) {
        console.log(error);
    }
};

module.exports = connect;
