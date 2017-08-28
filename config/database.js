const mongoose = require('mongoose');
// Connect to Mongoose
// mongoose.connect('mongodb://localhost:27017/appchat', { useMongoClient: true });

// connect to mongodb on mlap.com
// mongoose.connect('mongodb://@ds127963.mlab.com:27963/appchat', {user: 'seanghai', pass: 'Seanghai@123'});
mongoose.connect('mongodb://sh:123@ds127963.mlab.com:27963/appchat', { useMongoClient: true });
const db = mongoose.connection;
