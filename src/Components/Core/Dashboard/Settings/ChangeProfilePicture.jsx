import React from 'react'
import { FiUpload } from 'react-icons/fi'
import IconButton from '../../../Common/IconButton'
import { useRef } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {updateDisplayPicture, deleteDisplayPicture} from '../../../../Services/Operations/Settings'
import { FiTrash2 } from 'react-icons/fi'


const ChangeProfilePicture = () => {
   
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null)
  const uploadFileRef = useRef(null);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  const {user} = useSelector((state)=> state.profile);
  const {token} = useSelector((state)=> state.auth);

  const clickHandler = ()=>{
    uploadFileRef.current.click();
  }

  const handleFileChange = (e)=>{
      const file = e.target.files[0];
      if(file) {
        setImageFile(file);
        previewFile(file);
      }
  }

   const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  

  const handleFileUpload = ()=>{
    
    try {
      console.log('Uploading...');
      setUploading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      updateDisplayPicture(formData, token, dispatch, setUploading, setImageFile,false);
      

    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }

  }
  const handleDeletePic = ()=>{
    try {
      const url = `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;
      setPreviewSource(null);
      setImageFile(null);
      deleteDisplayPicture(url,token,dispatch);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 lg:px-12 text-richblack-5'>
          <div className='flex flex-col justify-center md:flex-row md:justify-start items-center gap-x-4 w-[100%] gap-3'>

             <img src= {previewSource || user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
              alt= {`profile-${user?.firstName}`}
              className='aspect-square w-[75px] rounded-full object-cover'/>

             <div className='space-y-2'>
                 <p className=' text-[16x] text-richblack-200 hidden md:block'>Change Profile Picture</p>
                 <div className='flex flex-wrap items-center justify-center flex-row gap-3 ' >
                       
                         <input type="file" className='hidden '
                           ref={uploadFileRef}
                           onChange={handleFileChange}
                           accept=".png, .jpg, .jpeg"
                          />
                          <button  onClick = {clickHandler}
                           className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                         >{ (imageFile)? ` ${imageFile.name.substring(0,5)}..  ` : `Select`}
                         </button>
                         
                         <IconButton 
                           text={`${ uploading ? "Uploading..." : "Upload"}`}
                           onclick={handleFileUpload}
                          >
                           { (!uploading) && <FiUpload className='text-lg text-richblack-900'/>}
                         </IconButton>

                         <button onClick={()=> { setImageFile(null); setPreviewSource(null);  uploadFileRef.current.value = null; }  }
                           className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                         > Cancel
                         </button>

                 </div>
             </div>



          </div>

          <div className="hidden md:flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-pink-700 cursor-pointer"
           onClick={()=>{uploadFileRef.current.value = null;  handleDeletePic(); }}
          >
          <FiTrash2 className="text-2xl text-pink-200" />
        </div>
    </div>
  )
}

export default ChangeProfilePicture
