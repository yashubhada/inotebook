const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://yash:yash123@cluster0.cyv4dtd.mongodb.net";

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