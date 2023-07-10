import React from 'react'
import {useForm} from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchCourseCategories } from '../../../../../Services/Operations/CourseAPI'
import ChipInput from './ChipInput'
import Upload from '../Upload'
import RequirementsField from './RequirementField'
import IconButton from '../../../../Common/IconButton'
import { useSelector } from 'react-redux'
import { setCourse, setStep, setCategoryVal } from '../../../../../Redux/Slices/CourseSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../Services/Operations/CourseAPI'
import { addCourseDetails } from '../../../../../Services/Operations/CourseAPI'

const CourseInformationForm = () => {
    const {register, setValue, getValues, handleSubmit , formState : {errors}} = useForm();
    const [loading,setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse, categoryVal } = useSelector((state) => state.course)
    const dispatch = useDispatch();

    const [catVal, setCatVal] = useState("");
   

    useEffect(()=>{

        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            if (categories.length > 0) {
              setCourseCategories(categories)
            }
            setLoading(false)
          }

          getCategories();    

          if (editCourse && !catVal) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            // console.log(course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category );
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
          }

        
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        // console.log(currentValues.courseTitle=== course.courseName);
        // console.log(currentValues.courseShortDesc=== course.courseDescription);
        // console.log(currentValues.coursePrice=== course.price);
        // console.log(currentValues.courseTags?.toString() === course?.tag?.toString());
        // console.log(currentValues.courseBenefits=== course?.whatYouWillLearn )
        // console.log( currentValues.courseCategory._id === course?.category._id)
        // console.log(currentValues.courseRequirements?.toString() === course?.instructions?.toString() )
        // console.log(currentValues.courseImage=== course.thumbnail)

        if (
          currentValues.courseTitle !== course?.courseName ||
          currentValues.courseShortDesc !== course?.courseDescription ||
          currentValues.coursePrice !== course?.price ||
          currentValues.courseTags?.toString() !== course?.tag?.toString() ||
          currentValues.courseBenefits !== course?.whatYouWillLearn ||
          currentValues.courseCategory._id !== course?.category._id ||
          currentValues.courseRequirements?.toString() !== course?.instructions?.toString() ||
          currentValues.courseImage !== course.thumbnail
        ) {
          return true
        }
        return false
      }
   
 
      const onSubmit = async (data) => {
        // console.log(data.courseTags);
         if(editCourse){
            if (isFormUpdated()) {
                const currentValues = getValues();
            
                const formData = new FormData()
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                  formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                  formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                  formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                  formData.append("tag", data.courseTags)
                }
            
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                  formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory !== course.category) {
                  formData.append("Category", data.courseCategory)
                }
                if (
                  currentValues.courseRequirements.toString() !==
                  course.instructions.toString()
                ) {
                  formData.append(
                    "instructions",
                    data.courseRequirements
                  )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                  formData.append("thumbnailImage", data.courseImage)
                }
                // console.log("Edit Form data: ", formData)
           
                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)
                console.log(result);
                if (result) {
                  dispatch(setStep(2))
                  dispatch(setCourse(result))
                  dispatch(setCategoryVal(getValues("courseCategory")))
                }
              } else {
                toast.error("No changes made to the form")
              }
              return
         }


    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", data.courseTags)
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", data.courseRequirements)
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)

    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
      dispatch(setCategoryVal(getValues("courseCategory")))
    }
    setLoading(false)
            
      }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
     className="space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 max-w-[600px]">
      {/* course title     */}
     <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>

        {/* Course Short Description */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>


        {/* Course Price */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

       {/* Course Category */}
       <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          name="courseCategory"
          id="courseCategory"
          value={ categoryVal || catVal || getValues("courseCategory")}
          onChange={(e)=> {
            setCatVal(e.target.value);
          }}
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

       {/* Course Tags */}
       <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

        {/* Course Thumbnail Image */}
        <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

        {/* Benefits of the course */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />


      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconButton
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconButton>
      </div>
      

    </form>
      
  )
}

export default CourseInformationForm