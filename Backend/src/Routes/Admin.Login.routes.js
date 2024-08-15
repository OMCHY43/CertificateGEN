import {Router} from "express"
import { AdminLogin } from "../Controller/Admin.controller.js"

const router = Router()

router.route("/Login").post(AdminLogin)

export default router