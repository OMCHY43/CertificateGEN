import { Router } from "express";
import { AddWorkShop , DeleteWorkShop , UpdateWorkShop , GetAlLWorkShop } from "../Controller/Workshop.controller.js";

const router = Router() ;

router.route("/GetAllWorkShop").get(GetAlLWorkShop) ;
router.route("/AddWorkShop").post(AddWorkShop) ;
router.route("/DeleteWorkShop/:id").delete(DeleteWorkShop) ;
router.route("/UpdateWorkShop/:id").put(UpdateWorkShop) ;

export default router
