import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FormData } from "../models/CertificatesReq.model.js";

const Register = asyncHandler(async (req, res) => {
  try {
    const { FullName, phone, email, Workshop, state } = req.body;

    if (
      [FullName, phone, email, Workshop, state].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    console.log("Searching for email:", email);

    const normalizedEmail = email.trim().toLowerCase();
    const existedRequest = await FormData.findOne({
      $or : [{ email: normalizedEmail }, { phone }],
    });

    console.log("Existing request found:", existedRequest);

    if (existedRequest) {
      throw new ApiError(409, "Your request is already submitted");
    }

    const CreatedData = await FormData.create({
      FullName,
      email: normalizedEmail,
      phone,
      Workshop,
      state,
    });

    if (!CreatedData) {
      throw new ApiError(
        500,
        "Something went wrong on the server while registering the user"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        CreatedData,
        "Request is submitted. Please come back in 24 hours."
      )
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .json(new ApiResponse(500, { error }, "Error on the server"));
  }
});
const GetAllReq = asyncHandler(async (req, res) => {
  try {
    const Requests = await FormData.find();
    if (!Requests) {
      throw new ApiError(500, "Cannot find requests");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, Requests, "Requests fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, error.message, "Error on the server"));
  }
});

// Admin approves certificate request
const ApproveCertificateRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const FindRequest = await FormData.findById(id);

    if (!FindRequest) {
      throw new ApiError(404, "Request not found");
    }

    FindRequest.CertificatesStatus = "approved";
    await FindRequest.save();

    const Certificates = (await FormData.CertificatesStatus) === "approved";

    if (Certificates) {
    }

    res
      .status(200)
      .json(new ApiResponse(200, FindRequest, "Certificate request approved."));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, error.message, "Error on the server"));
  }
});

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

export {
  Register,
  GetAllReq,
  ApproveCertificateRequest,
  DenyCertificateRequest,
};
