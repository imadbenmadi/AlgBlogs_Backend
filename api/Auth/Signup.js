const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Users } = require("../../models/Db");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../Public/Profilepics");
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName =
            file.fieldname +
            "-" +
            uniqueSuffix +
            path.extname(file.originalname);

        // Store only the filename in the database, not the entire path
        req.uploadedFileName = fileName;

        cb(null, fileName);
    },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("ProfilePic"), async (req, res) => {
    try {
        const { Name, UserName, Email, Password, Age, Gender } = req.body;
        if (!Name || !UserName || !Email || !Password) {
            return res.status(409).json({ message: "Missing Data" });
        }
        const existingUser = await Users.findOne({ UserName: UserName });
        if (existingUser) {
            res.sendStatus(400).json({ error: "Username already exists" });
        } else {
            const profilePicPath = req.uploadedFileName; 
            const newUser = new Users({
                Name: Name,
                UserName: UserName,
                Email: Email,
                Password: Password,
                Profile_Pic: profilePicPath,
            });
            await newUser.save();
            res.status(200).json({ message: "Account Created Successfully" });
        }
    } catch (err) {
        res.status(500);
    }
});

module.exports = router;
