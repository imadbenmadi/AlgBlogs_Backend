const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Users } = require("../../models/Db");

router.post("/", async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(409).json({ error: "Missing Data" });
        }
    
        const user = await Users.findOne({ Email: Email });
        if (user && user.Password === Password) {
            const accessToken = generateToken(user._id, "access");
            const refreshToken = generateToken(user._id, "refresh");
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
            });
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({
                error: "Username or Password isn't correct",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Token Generation Function
function generateToken(userId, type) {
    const secret =
        type === "access"
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET;
    const expiresIn = type === "access" ? "15m" : "7d"; // Adjust token lifetimes as needed

    return jwt.sign({ userId }, secret, { expiresIn });
}

module.exports = router;
