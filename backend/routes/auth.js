const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async(req, res)=> {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser)
            return res.status(400).json({ message: 'User already exist' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password:hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'User not found' });

        if (password){
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', name: user.name });
    }catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;