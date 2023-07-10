const SubSection = require('../Models/SubSection');
const Section = require('../Models/Section');
const Course = require('../Models/Course');
const uploadImageToCloudinary = require('../Utils/ImageUploader');

exports.createSubSection = async (req,res)=>{
    try {
       // Extract necessary information from the request body
       const { sectionId, sectionTitle, description, courseId } = req.body;
       const video = req.files.video;

       //validation
       // Check if all necessary fields are provided
      if (!sectionId || !sectionTitle || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }

       // Upload the video file to Cloudinary
       const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )

      console.log(uploadDetails);

      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: sectionTitle,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
       
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection").exec();

      const updatedCourse = await Course.findById(courseId).populate(
        {
          path:"courseContent",
          populate:{
            path:"subSection",
          },
      }
    )

      return res.status(200).json({ success: true, data: updatedCourse });

    } catch (error) {
        console.error("Error creating new sub-section:", error)
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
    }
}


exports.updateSubSection = async (req,res)=>{
    try {
      const { subSectionId, sectionTitle, description, courseId } = req.body;
      const subSection = await SubSection.findById(subSectionId);

      console.log(sectionTitle, description, courseId);

      if(!subSection){
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }

      if (sectionTitle !== undefined) {
        subSection.title = sectionTitle
      }

      if (description !== undefined) {
        subSection.description = description
      }

      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }

      await subSection.save();

      const updatedCourse = await Course.findById(courseId).populate(
        {
          path:"courseContent",
          populate:{
            path:"subSection",
          },
      }
    )


      return res.json({
        success: true,
        message: "Section updated successfully",
        data : updatedCourse
      })

    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the subsection",
        data : error.message
      })
    }
}

 exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId, courseId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

      const updatedCourse = await Course.findById(courseId).populate(
        {
          path:"courseContent",
          populate:{
            path:"subSection",
          },
      }
    )

  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data : updatedCourse
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }