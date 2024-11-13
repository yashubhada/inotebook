const mongoose = require('mongoose');

const mongoUri = "mongodb://localhost:27017";

const conectToMongo = () => {
    mongoose.connect(mongoUri, {
        dbName:'myapp'
    })
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = conectToMongo;
