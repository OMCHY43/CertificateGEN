import { Router } from "express";
import { AddWorkShop , DeleteWorkShop , UpdateWorkShop , GetAlLWorkShop , OnOffForm} from "../Controller/Workshop.controller.js";
import {AdminAuth} from "../Middlerwere/Admin.Auth.middlewere.js"

const router = Router() ;

router.route("/GetAllWorkShop").get(GetAlLWorkShop) ;
router.route("/AddWorkShop").post(AdminAuth ,AddWorkShop) ;
router.route("/DeleteWorkShop/:id").delete( AdminAuth , DeleteWorkShop) ;
router.route("/UpdateWorkShop/:id").put( AdminAuth , UpdateWorkShop) ;
router.route("/OnOffForm/:id").put( AdminAuth , OnOffForm) ;

export default router