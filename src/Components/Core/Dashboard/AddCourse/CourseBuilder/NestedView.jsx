import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import {BsMenuUp} from 'react-icons/bs'
import { AiFillCaretUp } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { deleteSection , deleteSubSection} from '../../../../../Services/Operations/CourseAPI'
import { setCourse } from '../../../../../Redux/Slices/CourseSlice'
import ConfirmationModal from '../../../../Common/ConfirmationModal'
import SubSectionModal from './subSectionModal'

const NestedView = ({handleChangeEditSectionName}) => {
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection]= useState(null);
  const [viewSubSection, setViewSubSection]= useState(null);
  const [editSubSection, setEditSubSection]= useState(null);
  

  const [confirmationModal , setConfirmationModal] = useState(false);
  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  const handleDeleleSection = async (sectionId, subSections) => {
    // console.log(sectionId, course._id, subSectionId);
    console.log(subSections);
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      subSections,
      token,
    })
    // console.log("delete",result)
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }
  
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const courseId = course._id;
    const result = await deleteSubSection({ subSectionId, sectionId, courseId , token })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }


  return (
    <div   className="rounded-lg bg-richblack-700 p-6 px-8">
       {
       
        course?.courseContent?.map((section)=>(

          <details key={section._id} open>
             <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2"
              onClick={()=> handleActive(section._id)}
             >
             <div className="flex items-center gap-x-3">
                <BsMenuUp className="text-xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id, section.subSection),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretUp className={`text-xl text-richblack-300 transition-all duration-100 ease-linear ${isActive.includes(section._id) ? "rotate-180" : "rotate-0"}`} />
              </div>
             </summary>


             
             <div className="px-6 pb-4">
               {

                  section?.subSection?.map((data)=>(
                     <div
                        key={data?._id}
                        onClick={() => setViewSubSection(data)}
                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                     >

                 <div className="flex items-center gap-x-3 py-2 ">
                    <BsMenuUp className="text-  xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>

                       </div>
                  ))

               }

               {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>

             </div>
              


             </details>
             
        ))
        
       }

       { confirmationModal && <ConfirmationModal modalData={confirmationModal} /> }

       {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}

    </div>
  )
}

export default NestedView
