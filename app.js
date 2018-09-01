const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const mainRoutes = require('./api/routes/mainRoutes');

mongoose.connect(`mongodb+srv://main:${process.env.MONGO_ATLAS_PW}@message-app-ldfh3.mongodb.net/test?retryWrites=true`, {
	useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'POST, GET');
		res.status(200).send('');
	}
	next();
});

app.use('/api', mainRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 400;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		message: error.message
	});
});

module.exports = app;
