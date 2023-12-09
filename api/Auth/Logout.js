const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
});

module.exports = router;
