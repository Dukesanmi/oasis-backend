const log = console.log;

//EXPRESS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//DOTENV
require('dotenv').config();
const port = process.env.PORT || 6000;

//SETUP DB
const dbConnect = require('./database/config.js');
dbConnect();

//REQUIRE ROUTES
const authRoutes = require('./routes/authRoutes');
const siteRoutes = require('./routes/siteRoutes');

app.set('view engine', 'ejs');

//Express.json and ROUTES MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/auth', authRoutes);
app.use('/', siteRoutes);
app.use(cors());


//SEEDERS
const seedAdmin = require('./seeders/admin.js');
seedAdmin();


//SERVER LISTENING
app.listen(port, function() {
	log(`Server is listening on port ${port}`);
	log(`Check http://localhost:${port}`);
});