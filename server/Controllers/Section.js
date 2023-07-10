const Course = require('../Models/Course');
const Section = require('../Models/Section');
const SubSection = require('../Models/SubSection');

exports.createSection = async (req,res) => {
    try {
        //get data from body 
        const { sectionName, courseId } = req.body;

        //validation 
        if(!sectionName || !courseId ) {
            return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
        }

        //create a new section
        const newSection = await Section.create({sectionName: sectionName});

        //update course 
        const updatedCourse = await Course.findByIdAndUpdate(
                courseId , {
                $push : {courseContent : newSection._id},
            }
            , {new : true}
        ).populate(
            {
                path:"courseContent",
                populate:{
                  path:"subSection",
                },
            }
        )

        res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});

    } catch (error) {
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}

exports.updateSection = async (req, res)=>{
    try {
        const {sectionName, sectionId, courseId} = req.body;
        const section = await Section.findByIdAndUpdate(sectionId, 
            {  sectionName } , {new : true}
            )

           //update course 
        const updatedCourse = await Course.findById(courseId).populate(
            {
                path:"courseContent",
                populate:{
                  path:"subSection",
                },
            }
        )

            res.status(200).json({
                success: true,
                data : updatedCourse,
            }); 

    } catch (error) {
        res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}

exports.deleteSection = async (req,res) => {
    try {
        const { sectionId, courseId, subSections} = req.body;
        // console.log(sectionId, courseId, subSections);
        let updatedCourse = await Course.findByIdAndUpdate(courseId, {
                $pull : {
                   courseContent : sectionId
                }
        }, {new:true}).populate(
            {
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }
        )
        .exec();;

        await Section.findByIdAndDelete(sectionId);
        
        subSections?.map(async (arr)=>{
            await SubSection.findByIdAndDelete(arr._id);
        })
        
        // console.log(updatedCourse)
    
        res.status(200).json({
			success: true,
			message: "Section deleted",
            data : updatedCourse
		});


    } catch (error) {
        res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}