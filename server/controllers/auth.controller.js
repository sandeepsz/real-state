import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import otp from "../models/otp.js";
import sendEmail from "../utils/verifyOtp.js";

// creating Register controller
export const signup = async (req, res, next) => {
  `
`;
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

    const token = jwt.sign({ id: validUser._id }, "helooYT24", {
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
      const token = jwt.sign({ id: user._id }, "hello1234", {
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

export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.json({ msg: "Logged out successfully" });
};

export const reset = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({
        message: "Email Does not exist",
      });

    const otpCode = Math.ceil(Math.random() * 10000);
    const otpData = new otp({
      email: req.body.email,
      code: otpCode,
      expireIn: new Date().getTime() + 300000,
    });

    await otpData.save();

    if (user) await sendEmail(user.email, "Reset Password", String(otpCode));
    res.status(200).json({
      msg: "Code has been sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

// update password

export const update = async (req, res, next) => {
  console.log(req);
  try {
    const data = await otp.findOne({ code: req.body.code });
    console.log(data);

    let email = data.email;

    if (!data) return next(errorHandler(400, "Invalid OTP!"));

    if (data) {
      const currentTime = new Date().getTime();
      const remainingTime = data.expireIn - currentTime;

      console.log(data._id);

      if (remainingTime < 0) return next(errorHandler(400, "OTP expired !"));
      await otp.findByIdAndDelete(data._id);
    }

    const user = await User.findOne({ email: email });

    const hashPassword = await bcryptjs.hash(req.body.password, 10);
    if (user) {
      user.password = hashPassword;
      await user.save();
    }

    res.status(200).json({
      message: "Password changed successfully",
    });
    await otp.findByIdAndUpdate(otp._id);
  } catch (error) {
    next(error);
  }
};
