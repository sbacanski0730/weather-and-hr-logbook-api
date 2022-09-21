require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const routesAuth = require('./routes/auth.js');

app.get('/', (req, res) => {
	console.log("Hello World it's me Postman");
	res.json('I can hear you');
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/auth', routesAuth);

//DataBase Connection
mongoose.connect(process.env.DEV_DB_CONNECTION, () => {
	console.log('Database connected');
});

//Listening
app.listen(process.env.PORT || 4013, () => {
	console.log(`Server is running at port: ${process.env.PORT}`);
});
