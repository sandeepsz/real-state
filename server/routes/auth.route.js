import express from "express";
import {
  signup,
  signin,
  google,
  logout,
  reset,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/logout", logout);
router.post("/reset", reset);

export default router;
