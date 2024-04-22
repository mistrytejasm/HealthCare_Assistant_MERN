import Doctor from '../models/DoctorSchema.js'

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try{
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {$set:req.body},
      {new:true}
    );

    res.status(200).json({
      success:true,
      message: "Successfully Update",
      date: updatedDoctor,
    });
  } catch(err){
    res.status(500).json({success:false, message:"Failed to update"})
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try{
    await Doctor.findByIdAndUpdate(
      id,
      
    );

    res.status(200).json({
      success:true,
      message: "Successfully deleted",
    });
  } catch(err){
    res.status(500).json({success:false, message:"Failed to delete"})
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try{
    const doctor = await Doctor.findById(id).populate("reviews").select("-password"); 

    res.status(200).json({success:true,message: "Doctor found", date: doctor,
    });
  } catch(err){
    res.status(404).json({success:false, message:"No Doctor Found"})
  }
};

export const getAllDoctor = async (req, res) => {

  try{
    const {query} = req.query
    let doctors;

    if(query){
      doctors = await Doctor.find({isApproved:'approved', $or: [{name:{$regex: query, $options: "i" } }, {specialization: {$regex: query, $options: "i" } },
     ],
    }).select("-password");
    } else{
      doctors = await Doctor.find({isApproved:'approved'}).select("-password"); //exclude password while sent data
    }


    res.status(200).json({
      success:true,
      message: "Doctor found",
      date: doctors,
    });
  } catch(err){
    res.status(404).json({success:false, message:"No Found"})
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId; // Correctly define doctorId from req.userId

  try {
    // Fetch the doctor by ID
    const doctor = await Doctor.findById(doctorId); // Use doctorId

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Exclude the password from the response
    const { password, ...rest } = doctor._doc;

    // Get appointments associated with the doctor
    const appointments = await Booking.find({ doctor: doctorId });

    // Send the response with doctor details and their appointments
    res.status(200).json({
      success: true,
      message: "Profile information retrieved successfully",
      data: { ...rest, appointments },
    });
  } catch (err) {
    console.error("Error fetching doctor profile:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Unable to retrieve doctor profile.",
    });
  }
};
