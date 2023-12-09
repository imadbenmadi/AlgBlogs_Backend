const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Users } = require("../../models/Db");

router.get("/", async (req, res) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.json({ isAuthenticated: false });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        try {
            const user = await Users.findOne(
                { _id: decoded._id },
                { UserName: 1, Profile_Pic: 1 }
            );

            if (!user) {
                // User not found, handle accordingly (maybe consider logging out the user)
                return res.status(401).json({ isAuthenticated: false });
            }

            return res.status(200).json({ isAuthenticated: true, user });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } catch (error) {
        return res.status(401).json({ isAuthenticated: false });
    }
});

module.exports = router;
