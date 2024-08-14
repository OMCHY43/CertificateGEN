import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { WorkShop } from "../models/AddWorkShop.model.js";

const getCurrentDateString = () => {
  const date = new Date();
  return date.toISOString().split('T')[0]; 
};

const AddWorkShop = asyncHandler(async (req, res) => {
  const { WorkShopName, FromClosing } = req.body;

  if (!WorkShopName || !FromClosing) {
    return res.status(400).json(
      new ApiResponse(400, null, "WorkShopName and FromClosing are required")
    );
  }

  try {
    const addworkshop = await WorkShop.create({ WorkShopName, FromClosing });

    const currentDate = getCurrentDateString();

    if (currentDate === FromClosing) {
      return res.json(
        new ApiResponse(400, null, "Workshop has been ended")
      );
    }

    return res.status(201).json(new ApiResponse(200, addworkshop, "Workshop Created Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

const UpdateWorkShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { WorkShopName, FromClosing } = req.body;

  if (!WorkShopName || !FromClosing) {
    return res.status(400).json({ message: 'WorkShopName and FromClosing are required' });
  }

  const currentDate = getCurrentDateString();

  const updateWorkshop = await WorkShop.findByIdAndUpdate(
    id,
    { WorkShopName, FromClosing },
    { new: true, runValidators: true }
  );

  if (currentDate === FromClosing) {
    return res.json(
      new ApiResponse(400, null, "Workshop has been ended")
    );
  }

  if (!updateWorkshop) {
    return res.status(404).json({ message: 'Workshop not found' });
  }
  
  res.status(200).json(updateWorkshop);
});

const DeleteWorkShop = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'Workshop ID is required' });
    }
  
    const deleteworkshop = await WorkShop.findByIdAndDelete(id);
  
    if (!deleteworkshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
  
    return res.status(200).json(new ApiResponse(200, deleteworkshop, "Workshop is deleted successfully"));
  });
  

const GetAlLWorkShop = asyncHandler(async (req, res) => {
  const allworkshop = await WorkShop.find();

  if (!allworkshop) {
    return res.json(new ApiResponse(400, null, "No Workshop is here"));
  }

  return res.json(new ApiResponse(200, allworkshop, "Data Fetched successfully"));
});

export { AddWorkShop, DeleteWorkShop, UpdateWorkShop, GetAlLWorkShop };
