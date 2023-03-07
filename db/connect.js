const mongoose = require('mongoose');

//function to connect to the mongoDB with mongoose
const connectDB = (url) => {
    return mongoose.connect(url)
}
    
module.exports = connectDB;