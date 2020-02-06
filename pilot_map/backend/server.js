const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const initializePassport = require('./passport-config');
initializePassport(
    passport
)


require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());



const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).catch((error) => {
    console.log('error!!!');
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully');
});

const locationsRouter = require('./routes/locations');
const usersRouter = require('./routes/users');

app.use('/locations', locationsRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});