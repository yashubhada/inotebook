const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../middelware/getuser');
const JWT_SECRET = "User@123##*";

// create user : /api/auth/createUser
// create user router
router.post('/createUser',
    [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
        body('email').isEmail().withMessage('Please enter a valid email'),
    ],
    async (req, res) => {
        let success = false;
        // validation error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        } else {
            try {
                // check email exist or not
                let user = await User.findOne({ email: req.body.email })
                if (user) {
                    return res.status(404).json({ success, errors: [{ msg: "Sorry a user with this email already exist" }] });
                }
                // Convert password into hash (bcrypt)
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt);
                // Create A new User
                user = await User.create({
                    name: req.body.name,
                    password: secPass,
                    email: req.body.email,
                    date: req.body.date
                })

                // create token
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, JWT_SECRET)
                success = true;
                res.send({ success, userToken: token })
            } catch (error) {
                console.error(error.message)
                res.status(500).send({ success, error: "Internal server error" })
            }
        }
    })


// Authenticate a user : api/auth/login
// Login user Router

router.post('/login'
    , [
        body('password').exists().withMessage('Password can not be blank'),
        body('email').isEmail().withMessage('Please enter a valid email')
    ]
    , async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        // check email or password are match or not from DB
        // const { email, password } = req.body;
        try {
            let user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(404).json({ success, errors: [{ msg: "Invalid credentials" }] });
            }
            const passwordCompare = await bcrypt.compare(req.body.password, user.password)
            if (!passwordCompare) {
                return res.status(404).json({ success, errors: [{ msg: "Invalid credentials" }] });
            }
            // create token
            const payload = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(payload, JWT_SECRET)
            success = true;
            res.send({ success, token })
        } catch (error) {
            console.error(error.message)
            res.status(500).send({ "error": "Internal server error" })
        }
    }
)


// Fetch User Data from DB : api/auth/getuser

router.post('/getuser'
    , getUser
    , async (req, res) => {
        try {
            let userId = req.decode.id;
            const user = await User.findById(userId).select("-password");
            res.json(user);
        } catch (err) {
            console.error(err.message)
            res.status(500).send({ error: "Internal server error" })
        }
    }
)


module.exports = router;