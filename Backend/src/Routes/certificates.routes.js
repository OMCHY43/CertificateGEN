import { Router } from "express";
import {Register , GetAllReq} from "../Controller/Certificates.controller.js"

const router = Router();

router.route("/Register").post(Register) ;
router.route("/AllRequest").get(GetAllReq) ;
// router.route("/")
// router.route("/")

export default router