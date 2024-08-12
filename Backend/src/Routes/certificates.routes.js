import { Router } from "express";
import { Register, GetAllReq, ApproveCertificateRequest, DenyCertificateRequest, ClaimCertificates } from "../Controller/Certificates.controller.js";

const router = Router();

router.route("/Register").post(Register);
router.route("/AllRequest").get(GetAllReq);
router.route("/ClaimCertificates").post(ClaimCertificates); // Changed to POST
router.route("/ApproveCertificateRequest/:id").patch(ApproveCertificateRequest);
router.route("/DenyCertificateRequest/:id").patch(DenyCertificateRequest);

export default router;
