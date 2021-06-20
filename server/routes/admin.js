const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel.js");


router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validation
    if (!email || !password)
      return res.status(400).json({ msg: "Not all field have been entered." });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password need to be atleast 5 character long" });

    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new Admin account to the db

    const newAdmin = new Admin({
      email: email,
      passwordHash: passwordHash,
      isAdmin: true
    });
    const savedAdmin = await newAdmin.save();

    //sign the token

    const token = jwt.sign(
      {
        Admin: savedAdmin._id,
        isAdmin: true
      },
      process.env.JWT_SECRET
    );
    // send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin)
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingAdmin.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    //check is coutomer is a admin
    if (!existingAdmin.isAdmin)
      return res
        .status(402)
        .json({
          errorMessage:
            "You are not an admin.Please enter email and password for admin account",
        });
    // sign the token

    const token = jwt.sign(
      {
        Admin: existingAdmin._id,
        isAdmin: true
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)  res.send(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) res.send(false)
    if (!verified.isAdmin)  res.send(false)
      res.send(true)
  } catch {
    res.send(false);
  }
});

module.exports = router;
