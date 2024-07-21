import mongoose from "mongoose";

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/User');
const CookieParser = require('cookie-parser');
const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'oijrwgoirejgoiejgoiejgoiegorejgeoirg';

require('dotenv').config();

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_DB_URL);

app.get('/test', (req: any, res: any) => {
    res.json('test ok');
});

app.post('/register', async (req: any, res: any) => {
    const { name, email, password } = req.body;
    try {
        const new_user = await User.create({ name, email, password:bcrypt.hashSync(password, salt) });
        res.json(new_user);
    } catch(e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req: any, res: any) => {
    const { email, password } = req.body;
        const user_document = await User.findOne({email})
        if (user_document) {
            const password_exists = bcrypt.compareSync(password, user_document.password);
            if (password_exists) {
                // use underscore id because mongoose uses _id
                jwt.sign({email: user_document.email, id: user_document._id}, jwtSecret, {}, (err: any, token: any) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user_document);
                })
            } else {
                res.status(400).json('password not found');
            }
        } else {
            res.json('not found');
        }
})

app.get('/profile', (req: any, res: any) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err: any, userData: any) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }
}) 

app.post('/logout', (req: any, res: any) => {
    res.cookie('token', '').json(true);
});

app.listen(4000);