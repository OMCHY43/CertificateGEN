import { Router } from "express";
import {
  Register,
  GetAllReq,
  ApproveCertificateRequest,
  DenyCertificateRequest,
  ClaimCertificates,
  DeleteRequest,
  acceptAllreq,
  deniedAllreq,
  deleteAllReq,
  VerifyIndividualUser
} from "../Controller/Certificates.controller.js";
import { AdminAuth } from "../Middlerwere/Admin.Auth.middlewere.js";

const router = Router();

router.route("/Register").post(Register);
router.route("/AllRequest").get(GetAllReq);
router.route("/ClaimCertificates").post(ClaimCertificates);
router
  .route("/ApproveCertificateRequest/:id")
  .patch(AdminAuth, ApproveCertificateRequest);
router
  .route("/DenyCertificateRequest/:id")
  .patch(AdminAuth, DenyCertificateRequest);
router.route("/DeleteRequest/:id").delete(AdminAuth, DeleteRequest);

router.route("/DeleteAllReq").delete( AdminAuth , deleteAllReq)
router.route("/DeniedAllReq").patch( AdminAuth , deniedAllreq)
router.route("/AcceptAllReq").patch( AdminAuth , acceptAllreq)

router.route("/Verify/:id").get(VerifyIndividualUser)

export default router;
