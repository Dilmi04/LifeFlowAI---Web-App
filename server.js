const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();


require("./config/db");

const app = express();
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("LifeFlow AI Backend Running 🚀");
});
app.post("/register", async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        ...req.body,
        password: hashedPassword
    });

    await user.save();

    res.json({
        message: "User registered successfully",
    });
});

const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user == null) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const isMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
    );

    res.json({
        message: "Login successful",
        token: token
    });
});

app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed ✅",
        user: req.user
    });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


