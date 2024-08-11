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
      throw new ApiError(400, "All Fields are required");
    }

    const existedRequest = await FormData.findOne({
      email,
    });

    if (existedRequest) {
      throw new ApiError(409, "Your request is alredy submited");
    }

    const CreatedData = await FormData.create({
      FullName,
      email,
      phone,
      Workshop,
      state,
    });

    if (!CreatedData) {
      throw new ApiError(
        500,
        "Something went woring in server to register the user"
      );
    }

    return res.json(
      new ApiResponse(
        200,
        CreatedData,
        "Reqest is submited please come back in 24h"
      )
    );
  } catch (error) {
    return res.json(new ApiError(500, error, "error in server"));
  }
});

const GetAllReq = asyncHandler(async(req, res)=>{
  const  Requests = await FormData.find()
  if(!Requests){
    throw new ApiError(500 , "cannot find requests")
  }

  return res.json(200 , Requests , "Requets Fetched successfully")
})

export { Register , GetAllReq};
