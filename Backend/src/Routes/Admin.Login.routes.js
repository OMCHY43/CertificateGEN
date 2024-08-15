import {Router} from "express"
import { AdminLogin , AdminCheck , AdminRegister} from "../Controller/Admin.controller.js"

const router = Router()
router.route("/Register").post(AdminRegister)
router.route("/Login").post(AdminLogin)
router.route("/Check").get(AdminCheck)

export default router