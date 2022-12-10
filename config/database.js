const config = require('config');
const mongoose = require('mongoose');

const MONGO_HOST = config.get('MONGO_HOST');

mongoose.connect(MONGO_HOST, { dbName: 'interview' }).then(() => {
    console.log("DB connection successful");
}).catch((err) => {
    console.log("Error while connecting to DB", err);
});