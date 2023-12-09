// Add this to your router
router.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token not provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, "horld");
        const userId = decoded.userId;

        // Generate a new access token
        const newAccessToken = generateToken(userId, "access");

        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid refresh token" });
    }
});
