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

app.set('port', (process.env.PORT || 8080));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

// For Heroku deployment 

if (process.env.NODE_ENV === 'production') {
    //app.use(express.static('client/build'));
    //Set static folder  
    app.use(express.static('frontend/build'));  
    app.get('*', (req, res) =>  {    
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));  
    });
}

app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
<<<<<<< HEAD
=======

app.post('/api/login', async (req, res, next) => 
{
    console.log("hey there friend");
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

 var error = '';

  const { login, password } = req.body;

  const db = client.db();
  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});
>>>>>>> firebase
