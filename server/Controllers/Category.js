const Category = require('../Models/Category');

//create a new category
exports.createCategory = async (req,res) => {
    try {
        const {name, description} = req.body;

        //validation 
        if(!name) {
            return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
        }

        const categoryDetails = await Category.create({
            name : name,
            description : description,
        });

        return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});


    } catch (error) {
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
}


exports.showAllCategories = async (req,res) => {
    try {
        const allCategories = await Category.find({}, {name : true, description: true});
        res.status(200).json({
			success: true,
			data: allCategories,
		});
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}


//delete a category from database
exports.deleteCategory = async (req,res)=>{
    try {
        const {name} = req.body;
        const CategoryDetails = await Category.findOne({name: name});
        if(!CategoryDetails) {
            return res.status(404).json({
                success : false,
                message: 'Category not found to delete',
            })
        }

        await Category.findOneAndDelete({name: name});

        res.status(200).json({
			success: true,
			message : 'Category deleted successfully',
		});
        

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}



//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;
            //get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
                populate: {
                  path: "instructor",
                },
              }) .exec();
              
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }

             // Handle the case when there are no courses
    //   if (selectedCategory.courses.length === 0) {
    //     console.log("No courses found for the selected category.")
    //     return res.status(404).json({
    //       success: false,
    //       message: "No courses found for the selected category.",
    //     })
    //   }

            //get coursesfor different categories
            const categoriesExceptSelected  = await Category.find({
                                         _id: {$ne: categoryId},
                                         })
              

            let differentCategory = await Category.findOne(
                  categoriesExceptSelected[Math.floor(Math.random()*(categoriesExceptSelected?.length+1))]
                    ?._id
                )
                  .populate({
                    path: "courses",
                    match: { status: "Published" },
                    populate: {
                      path: "instructor",
                  },
                  })
                  .exec()                            
                                    
            //get top 10 selling courses
            //HW - write it on your own
             // Get top-selling courses across all categories
      const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
      },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
      .slice(0, 10)
     // console.log("mostSellingCourses COURSE", mostSellingCourses)

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategory,
                    mostSellingCourses,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}