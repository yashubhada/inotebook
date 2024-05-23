const mongoose = require('mongoose');

const mongoUri = "mongodb://localhost:27017/myapp";

const conectToMongo = () => {
    mongoose.connect(mongoUri)
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = conectToMongo;