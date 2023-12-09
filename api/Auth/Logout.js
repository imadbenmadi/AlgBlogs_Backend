// Import necessary modules
const express = require("express");
const router = express.Router();

// Logout route
router.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
});

module.exports = router;
