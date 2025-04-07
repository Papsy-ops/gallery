const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();
<<<<<<< HEAD
=======

// connecting the database

//const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env]
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://papetuanarina:FMySwBDqf2O93rar@ip1.90y7ear.mongodb.net/darkroom-dev?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if (err) {
        console.log(err)
    }else{
        console.log(`Connected to Database: ${MONGODB_URI}`)
    }
});

// test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })


>>>>>>> test

// Connecting to the database using async/await
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://papetuanarina:FMySwBDqf2O93rar@ip1.90y7ear.mongodb.net/darkroom-dev?retryWrites=true&w=majority";

// Define an async function to connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to Database: ${MONGODB_URI}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Call the function to connect to the database
connectToDatabase();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

app.use('/', index);
app.use('/image', image);

// Start the server
const PORT = process.env.PORT || 5000;
<<<<<<< HEAD
app.listen(PORT, '0.0.0.0' ,() => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
=======
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});


module.exports = app;
>>>>>>> test
