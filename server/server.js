require('./config/config');

const express = require('express')
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use( express.static( path.resolve(__dirname, '../client' )));

//routes configuration
app.use(require('./routes/index'));

mongoose.connect(process.env.urlDB,{ useNewUrlParser: true }, (err, res) =>{
	if(err) throw err;
	console.log('connected to mlab')
});

app.listen(process.env.PORT, () =>{
	console.log('Escuchando puerto', process.env.PORT);
});