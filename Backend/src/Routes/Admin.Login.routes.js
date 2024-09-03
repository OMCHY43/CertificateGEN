import { Router } from "express";
import { AdminAuth } from "../Middlerwere/Admin.Auth.middlewere.js";
import { AdminLogin, AdminCheck, AdminRegister } from "../Controller/Admin.controller.js";

const router = Router();

router.route("/Register").post(AdminRegister);
router.route("/Login").post(AdminLogin);
router.route("/Check").get(AdminCheck);

router.get('/CheckToken', AdminAuth, (req, res) => {
  try {
    const token = req.admin; // Using req.admin from the middleware
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: "No token" });
  }
});

export default router;
