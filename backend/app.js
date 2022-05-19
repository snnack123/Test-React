const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require("cors");
const User = require('./models/user');
var jwt = require('./node_modules/jsonwebtoken');

const secret = "grf1d2f1ee";

mongoose.connect('mongodb://localhost:27017/users_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('home')
})

app.get('/users', async (req, res) => {
    const users = await User.find({});
    let result = {
        message: 'Here is your data',
        data: users
    }
    res.send(result);
})

app.post('/user', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    let new_user = {
        _id: user._id
    }
    res.send(new_user);
})

app.post('/login', (req, res) => {
    let response = {};
    let token = jwt.sign({
        loggedIn: req.body.msg,
    },
        secret, { expiresIn: 60 * 60 }
    );
    response.is_logged_in = token;
    response.msg = 'Succesfully logged in';
    res.send(response);
})

app.post('/check', (req, res) => {
    const token = JSON.parse(req.headers["authorization"]);

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            if (err.expiredAt) {
                res.json({ message: "Your token expired!" });
            } else {
                res.json({ message: "Decoding error!" });
            }
        } else {
            res.send(decoded);
        }
    })
})

app.listen(port, () => {
    console.log(`I'm listening on port ${port}`);
})