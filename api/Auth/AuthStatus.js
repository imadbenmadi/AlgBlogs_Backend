const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/authStatus", (req, res) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.json({ isAuthenticated: false });
    }
    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({ isAuthenticated: true });
    } catch (error) {
        return res.json({ isAuthenticated: false });
    }
});

module.exports = router;
