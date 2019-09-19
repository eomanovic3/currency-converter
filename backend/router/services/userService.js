const auth = require("../auth");
const bcrypt = require("bcrypt");
const {User, validate} = require("../models/user");
const express = require("express");
const router = express.Router();


router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(user){
        const token = user.generateAuthToken();
        res.send({
            token: token,
        });
    }
    return res.status(400).send("Bad credentials");
});

router.get("/current", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.post("/user", async (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send({
        token: token,
    });
});


module.exports = router;
