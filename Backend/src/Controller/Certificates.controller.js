import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FormData } from "../models/CertificatesReq.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from 'fontkit';
import { WorkShop } from "../models/AddWorkShop.model.js";


const Register = asyncHandler(async (req, res) => {


  try {
    const { FullName, phone, email, Workshop, state, WorkShopid } = req.body;

    if ([FullName, phone, email, Workshop, state, WorkShopid].some(field => !field.trim())) {
      throw new ApiError(400, 'All fields are required');
    }



    console.log('Searching for email:', email);

    const normalizedEmail = email.trim().toLowerCase();
    const existedRequest = await FormData.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });

    console.log('Existing request found:', existedRequest);

    if (existedRequest) {
      throw new ApiError(409, 'Your request is already submitted');
    }

    const expired = await WorkShop.findById(WorkShopid);
    if (expired.status === "closed") {
      throw new ApiError(400, "Form is closed now")
    }



    const CreatedData = await FormData.create({
      FullName,
      email: normalizedEmail,
      phone,
      Workshop,
      state,
      WorkShopid
    });

    if (!CreatedData) {
      throw new ApiError(500, 'Something went wrong on the server while registering the user');
    }

    return res.status(200).json(
      new ApiResponse(200, CreatedData, 'Request is submitted. Please come back in 24 hours.')
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, { error: error.message }, 'Error on the server'));
  }
});

// Get all requests
const GetAllReq = asyncHandler(async (req, res) => {
  try {
    const Requests = await FormData.find();
    if (!Requests) {
      throw new ApiError(500, 'Cannot find requests');
    }

    return res.status(200).json(new ApiResponse(200, Requests, 'Requests fetched successfully'));
  } catch (error) {
    return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, { error: error.message }, 'Error on the server'));
  }
});

// Approve certificate request
const ApproveCertificateRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const FindRequest = await FormData.findById(id);

    if (!FindRequest) {
      throw new ApiError(404, 'Request not found');
    }

    FindRequest.CertificatesStatus = 'approved';
    await FindRequest.save();

    return res.json(
      new ApiResponse(200, { FindRequest }, 'Certificate request approved and certificate generated.')
    );
  } catch (error) {
    console.error('Error during certificate approval:', error);
    return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, { error: error.message }, 'Error on the server'));
  }
});

// Claim certificate
const ClaimCertificates = asyncHandler(async (req, res) => {
  try {
    const { email, Workshop } = req.body;
    const user = await FormData.findOne({ email, Workshop });
    const MatchWorkshop = await FormData.findOne({ Workshop });

    if (!user) {
      throw new ApiError(400, 'No request found');
    }

    if (!MatchWorkshop) {
      throw new ApiResponse(400, null, "Please selecet Your correct workshop Name")
    }

    if (user.CertificatesStatus !== 'approved') {
      throw new ApiError(403, 'Certificate not approved');
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const existingPDFPath = path.join(__dirname, '../public', 'Certificate.pdf');

    if (!fs.existsSync(existingPDFPath)) {
      throw new ApiError(500, 'PDF template not found');
    }

    const existingPDFBytes = fs.readFileSync(existingPDFPath);
    const pdfDoc = await PDFDocument.load(existingPDFBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const x = 320;
    const y = 270;
    const fontSize = 30;
    const Name = user.FullName || 'test';

    // Fonts 
    pdfDoc.registerFontkit(fontkit);
    const fontPath = path.join(__dirname, '../public/Allura-Regular.ttf'); // Adjust path as needed
    const fontBytes = fs.readFileSync(fontPath);
    const font = await pdfDoc.embedFont(fontBytes);

    // Draw text on the PDF
    firstPage.drawText(Name, {
      x: x,
      y: y,
      size: fontSize,
      color: rgb(0.85, 0.65, 0.13),
      font: font,
    });

    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
    res.setHeader('Content-Length', pdfBytes.length); // Ensure Content-Length is set
    res.send(Buffer.from(pdfBytes)); // Send as a Buffer

  } catch (error) {
    console.error('Error during certificate claim:', error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
});

export default ClaimCertificates;



const DenyCertificateRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const FindRequest = await FormData.findById(id);

    if (!FindRequest) {
      throw new ApiError(404, "Request not found");
    }

    FindRequest.CertificatesStatus = "denied";
    await FindRequest.save();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          FindRequest,
          "You are not eligible to get certificates."
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, error.message, "Error on the server"));
  }
});


const DeleteRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const Delete = await FormData.findByIdAndDelete(id);

  return res.json(new ApiResponse(200, null, " Request Deleted"))
})

const acceptAllreq = asyncHandler(async (req, res) => {
  try {

    const allReq = await FormData.updateMany({}, { CertificatesStatus: "approved" });

    res.json(new ApiResponse(200, allReq, "all request is accepted"))
  } catch (error) {
    res.json(new ApiError(401, "something went wrong"))
  }
});

const deniedAllreq = asyncHandler(async (req, res) => {
  const allReq = await FormData.updateMany({}, { CertificatesStatus: "denied" });

  res.json(new ApiResponse(200, allReq, "all request is denied"))

});

const deleteAllReq = asyncHandler(async (req, res) => {
  const allReq = await FormData.deleteMany({});

  res.json(new ApiResponse(200, allReq, "all request is deleted"))
});

export {
  Register,
  GetAllReq,
  ApproveCertificateRequest,
  DenyCertificateRequest,
  DeleteRequest,
  ClaimCertificates,
  acceptAllreq,
  deniedAllreq,
  deleteAllReq,
};
