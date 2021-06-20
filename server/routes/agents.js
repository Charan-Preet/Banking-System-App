const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Agent = require("../models/AgentModel.js");
const Coustomer = require("../models/coustomerModel");

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

    const existingAgent = await Agent.findOne({ email: email });
    if (existingAgent) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new Agent account to the db

    const newAgent = new Agent({
      email: email,
      passwordHash: passwordHash,
      isAgent: true,
    });
    const savedAgent = await newAgent.save();

    //sign the token

    const token = jwt.sign(
      {
        Agent: savedAgent._id,
        isAgent: true,
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

    const existingAgent = await Agent.findOne({ email });
    if (!existingAgent)
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingAgent.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    //check is coutomer is a agent

    if (!existingAgent.isAgent)
      return res.status(402).json({
        errorMessage:
          "You are not an agent.Please enter email and password for agent account",
      });
    // sign the token

    const token = jwt.sign(
      {
        Agent: existingAgent._id,
        isAgent: true,
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
    if (!token) res.send(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) res.send(false);
    if (!verified.isAgent) res.send(false);
    res.send(true);
  } catch {
    res.send(false);
  }
});

router.get("/data", async (req, res) => {
  try {
    await Coustomer.find((error, data) => {
      if (error) res.json(error);
      res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/getloan", async (req, res) => {
  try {
    const { user, amount, duration } = req.body;
    if (user || amount || duration)
      await Coustomer.findOneAndUpdate(
        { user: user },
        {
          loan: { amount: amount, duration: duration, Date: Date.now(),status:"Pending",user:user }
        }
      );
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
