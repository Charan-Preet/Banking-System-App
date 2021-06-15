const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Coustomer = require("../models/coustomerModel.js");

router.post("/register", async (req, res) => {
  try {
    const { user, email, password, passwordVerify } = req.body;

    // validation
    if (!user || !email || !password || !passwordVerify)
      return res.status(400).json({ msg: "Not all field have been entered." });
    if (user.length < 6)
      return res
        .status(400)
        .json({ msg: "The Username needs to be atleast 5 character long" });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password need to be atleast 5 character long" });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification" });

    const existingCoustomer = await Coustomer.findOne({ email: email });
    const existingName = await Coustomer.findOne({ userName: user });
    if (existingCoustomer) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }
    if (existingName) {
      return res
        .status(400)
        .json({ msg: "An Account With this username already exist." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new Coustomer account to the db

    const newCoustomer = new Coustomer({
      user: user,
      email: email,
      passwordHash: passwordHash,
    });
    const savedCoustomer = await newCoustomer.save();

    //sign the token

    const token = jwt.sign(
      {
        coustomer: savedCoustomer._id,
      },
      process.env.JWT_SECRET
    );
    // send the token in a HTTP-only cookie
    res
      .cookie("coustomerToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// log in

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingCoustomer = await Coustomer.findOne({ email });
    if (!existingCoustomer)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingCoustomer.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        coustomer: existingCoustomer._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie
    res
      .cookie("coustomerToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("coustomerToken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});
//middleware to check wheather user is logged in or not
router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.coustomerToken;
    if (!token) return res.send(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.send(false)

    const findUser = await Coustomer.findById(verified.coustomer);
    if (!findUser) return res.send(false)
    if (findUser.isAdmin === false && findUser.isAgent === false) res.send(true)
  } catch {
    res.json(false);
  }
});

router.get("/loanrequest", (req, res) => {
  try {
    const token = req.cookies.coustomerToken;
    if (!token) return res.json({ errorMessage: "User Not LoggedIn" });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified)
      Coustomer.findById(verified.coustomer, (error, data) => {
        if (error) res.status(404).json(error);
        else res.json(data);
      });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
