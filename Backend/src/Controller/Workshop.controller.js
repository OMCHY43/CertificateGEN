import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { WorkShop } from "../models/AddWorkShop.model.js";

const getCurrentDateString = () => {
  const date = new Date();
  return date.toISOString().split('T')[0]; 
};

const AddWorkShop = asyncHandler(async (req, res) => {
  const { WorkShopName, FromClosing , Category , Type , EventDate , EventEndDate} = req.body;
  if (!WorkShopName || !FromClosing || !Category ||!Type ||!EventEndDate || !EventDate) {
    return res.status(400).json(
      new ApiResponse(400, null, "WorkShopName , Category , type , EventDate , EventEndDate and FromClosing are required")
    );
  }

  try {
    // Create the workshop
    const addworkshop = await WorkShop.create({ WorkShopName, FromClosing , status: 'active' , Category , Type , EventDate , EventEndDate});

    const currentDate = getCurrentDateString();

    // Check if the current date matches the closing date
    if (currentDate === FromClosing.split('T')[0]) {
      await WorkShop.findByIdAndUpdate(addworkshop._id, { status: 'closed' });
      return res.json(
        new ApiResponse(400, null, "form has been closed")
      );
    }

    
    return res.status(201).json(new ApiResponse(200, addworkshop, "Workshop Created Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

const OnOffForm = asyncHandler(async(req,res) =>{

  try {
    const { id } = req.params;
    const { OnOffStatus } = req.body; 
    
    const workshop = await WorkShop.findById(id);

    if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
    }

    workshop.OnOffStatus = OnOffStatus; 
    await workshop.save();

    res.status(200).json({
        message: `Workshop ${OnOffStatus} successfully!`,
        data: workshop
    });
} catch (error) {
    res.status(500).json({ message: "Error updating workshop status", error });
}

})

const UpdateWorkShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { WorkShopName, FromClosing , Category , Type} = req.body;

  if (!WorkShopName || !FromClosing || !Category ||!Type) {
    return res.status(400).json({ message: 'WorkShopName, Category and FromClosing are required' });
  }

  const currentDate = getCurrentDateString();

  const updateWorkshop = await WorkShop.findById(id);

  if (!updateWorkshop) {
    return res.status(404).json({ message: 'Workshop not found' });
  }

  // Update workshop
  updateWorkshop.WorkShopName = WorkShopName;
  updateWorkshop.FromClosing = FromClosing;
  updateWorkshop.Type = Type;

  
  if (currentDate === FromClosing.split('T')[0]) {
    updateWorkshop.status = 'closed';
  }

  await updateWorkshop.save();

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

export { AddWorkShop, DeleteWorkShop, UpdateWorkShop, GetAlLWorkShop , OnOffForm};
