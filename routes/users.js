//Contaigns API-routes: user creating,
// getting list (POST, GET /api/users)
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const newUser = new User({ username: req.body.username });
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/', async (__dirname, res) => {
    const users = await User.find({});
    res.json(users);
});


module.exports = router;