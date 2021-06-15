const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Coustomer = require("../models/coustomerModel.js");

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
    //check is coutomer is a agent

    if (!existingCoustomer.isAgent)
      return res
        .status(402)
        .json({
          errorMessage:
            "You are not an agent.Please enter email and password for agent account",
        });
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

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.coustomerToken;
    if (!token) res.send(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) res.send(false);
    const findUser = await Coustomer.findById(verified.coustomer);
    if (!findUser.isAgent) res.send(false)
    res.send(true)
  } catch {
    res.send(false)
  }

})

module.exports = router;
