const { time } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/api');


const app = express();
const PORT = process.env.PORT || 8080;

const username = 'arjun-pherwani', password = 'nLZpC5fi5Oglpl5H';
const MONGODB_URI = 'mongodb+srv://'+username+':'+password+'@cluster0.mcinj.mongodb.net/save-dat-money-db?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));