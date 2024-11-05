const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateJwt } = require("./middleware");
const mongoURI = process.env.MONGO_URI;
const port = 3001;


const userDetailsSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
}, { collection: 'ShoppingCartAuthentication' });
const Users = mongoose.model('ShoppingCartAuthentication', userDetailsSchema);



mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err)
    );




    app.post('/signup', async (req, res) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }
    
        try {
            const checkEmail = await Users.findOne({ email: email });
            if (checkEmail) {
                return res.status(400).send({ message: "Email is already registered" });
            }
    
            const hash = await bcrypt.hash(password, 10);
            const user = new Users({
                email,
                password: hash
            });
    
            await user.save();
            const payload = { email };
            const tokens = generateJwt(payload);
    
            res.status(201).send({
                message: "Success",
                token: tokens.token,
                refresh_token: tokens.refresh_token
            });
        } catch (error) {
            console.error("Signup error:", error);
            res.status(500).send({
                message: "An error occurred",
                error: error.message
            });
        }
    });
    



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(400).send({ message: "all fields are required" });
        return;
    }
    try {
        let user;


        user = await Users.findOne({ email: email });
        if (!user) {
            res.status(404).send({ message: "User with this email does not exist" });
            return;
        }


        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            res.status(400).send({ message: "Wrong password" });
            return;
        }
        const payload = {
            name: user.name,
            email: user.email
        };
        const tokens = generateJwt(payload);
        res.status(200).send({
            message: "login successfull",
            token: tokens.token,
            refresh_token: tokens.refresh_token
        });
        return;
    }
    catch (e) {
        res.status(500).send({ message: "something went wrong" });
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});