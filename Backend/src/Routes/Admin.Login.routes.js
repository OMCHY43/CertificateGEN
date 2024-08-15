import {Router} from "express"
import { AdminLogin , AdminCheck } from "../Controller/Admin.controller.js"

const router = Router()

router.route("/Login").post(AdminLogin)
router.route("/Check").get(AdminCheck)

export default router