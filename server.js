//Dependencies
const express = require('express');
const mongoose = require('mongoose');

// declare port
const app = express();
const PORT = process.env.PORT || 3001;

//connect to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to mongo database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/SNA-18', {
    useUnifiedTopology: true
});


// log mongo queries
mongoose.set('debug', true);

//require routes
app.use(require('./routes'));

//connect to server
app.listen(PORT, () => console.log(`Connected at ${PORT}`));