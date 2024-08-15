import { Router } from "express";
import { Register, GetAllReq, ApproveCertificateRequest, DenyCertificateRequest, ClaimCertificates , DeleteRequest} from "../Controller/Certificates.controller.js";
import {AdminAuth} from "../Middlerwere/Admin.Auth.middlewere.js"

const router = Router();

router.route("/Register").post(Register);
router.route("/AllRequest").get(GetAllReq);
router.route("/ClaimCertificates").post(ClaimCertificates); 
router.route("/ApproveCertificateRequest/:id").patch(AdminAuth ,ApproveCertificateRequest);
router.route("/DenyCertificateRequest/:id").patch(AdminAuth , DenyCertificateRequest);
router.route("/DeleteRequest/:id").delete(AdminAuth , DeleteRequest);

export default router;
