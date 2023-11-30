import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newHashPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: newHashPassword });

  await newUser.save();

  res.status(200).json({
    msg: "Signup Success!",
    user: newUser,
  });
};
