const mongoose = require('mongoose');
// Connect to Mongoose
mongoose.connect('mongodb://localhost/appchat', { useMongoClient: true });
const db = mongoose.connection;