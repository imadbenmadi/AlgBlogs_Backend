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
            const token = generateToken(user._id);
            res.status(200).json({ token });
        } else {
            res.status(401).json({
                error: "Username or Password isn't correct",
            });
        }
    } catch {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
function generateToken(userId) {
    const token = jwt.sign({ userId }, "mySecret", {
        expiresIn: "1h",
    });
    return token;
}
module.exports = router;
