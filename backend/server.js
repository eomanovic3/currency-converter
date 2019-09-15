const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
var cors = require('cors');
app.use(cors());

// this is our MongoDB database
const dbRoute =
    'mongodb+srv://dbUser:dbUserPassword@cluster0-tiscu.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// router ======================================================================
require('./router/router')(app);

app.listen(port, function(){
    console.log("Server running on port : 3001");
});
