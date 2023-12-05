import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

// creating Register controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newHashPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: newHashPassword });

  try {
    await newUser.save();

    res.status(201).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};

// creating Login controller

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );

    if (!validPassword)
      return next(errorHandler(400, "Incorrect email or password "));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-4);
      const newHashPassword = await bcryptjs.hash(generatePassword, 10);

      const generateUsername =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: generateUsername,
        email: req.body.email,
        password: newHashPassword,
        avatar: req.body.photo,
      });
      await newUser.save();

      const validUser = await User.findOne({ email });
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
