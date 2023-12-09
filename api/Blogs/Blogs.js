const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Blogs } = require("../../models/Db"); // Assuming you have a Db module with your mongoose models

router.get("/", async (req, res) => {
    try {
        const blogs = await Blogs.find().populate("owner", "UserName"); 
        res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blogs.find({_id:req.params.id}).populate("owner", "UserName");
        res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});
module.exports = router;
