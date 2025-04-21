const express = require('express');
const router = express.Router();
const User = require('../models/UsersSchema'); 

// GET /api/users/allusers
router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});
module.exports = router;