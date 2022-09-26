//go in package.json, write start:nodemon sever.js
//if you get Nonstop loading, that means you didnt add a res. (response) statement at end
//if get error "Cannot read properties of undefined"you must use body-parser
//need it always usually

//Whenever you make a change of code, the server is reset and atabase is reset
//so you have to add user again, a server that never goes down is the GOAL
//we will be using npm install bcrypt-nodejs, to help encrypt passwords
//need to use cors when connecting to front-end or else
//chrome wont allow, npm install cors

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

//need knex to connect to database npm install knex
const knex = require('knex');


//linking all files, we created in contrllers for clean
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


//connecting to database
const db = knex({ 
  client: 'pg',  //to connect to postGres 
  connection: {
    host : '127.0.0.1', //this is actually localhost: but in another format
    port : 5432,
    user : 'postgres',  //user for database, check on GUI, pgAdmin
    password : 'test',  //to sign in, check on cmd when loggging into database
    database : 'smart-brain'
  }
});



const app = express();
app.use(bodyParser.json());
app.use(cors());



//This is called the ROOT function, since it will always execute regardless of which dirr
app.get('/', (req, res) => {
	//res.send(database.users);
})


//signin --> POST = sucess/fail  (work or not, send pwd inside body)
//the /signin is when you user server you do localhost:3000/signin, new dirr
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
// We can change the format of this statement and still get same effect - advance


//register --> POST = user       
//to create a new user, add to array with push()
//you use req to request something from server. req.body from body of server
//YOU HAVE TO SEND A RESPONSE, res, at the end or else servers keeps loaindg
//creating a controller folder and linking a seperate file for register.js
//																													Dependecies Injection!!!
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})




//profile/userId --> GET = user
//gets the user in /profile/id# dirrectory of serer
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})



//image --> PUT (update user profile) --> user
//put is used to update thing in STANDARD
app.put('/image', (req, res) => { image.handleImage(req, res, db)})



//we create a method in image.js dealing with API CALL
//Security Check: we want the API Key in backend to avoid publicizing it
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})



//bcrypt -----------------------------------------------------------------------------------------
//creates a hash, takes a string and Jumbles it up so theirs no way to find the string

//crypts the password
//bcrypt.hash("bacon", null, null, function(err, hash) {
//    console.log(hash);
//});

// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});

//-----------------------------------------------------------------------------------------

//Since were using Heroku which has its own PORT number, we sya takes herokus OR just 3000
app.listen(process.env.PORT || 3000, ()=> {
	console.log('app is running on port ${process.env.PORT}');
})


/* Plan
--> res = this is working
/signin --> POST = sucess/fail  (work or not, send pwd inside body)
/register --> POST = user       
/profile/userId --> GET = user
/image --> PUT (update user profile) --> user
*/