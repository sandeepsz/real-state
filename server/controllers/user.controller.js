import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    msg: "User API is working",
  });
};

export const updateUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    console.log("updatedUser", updatedUser);
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("err");
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
