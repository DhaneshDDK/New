import { toast } from "react-hot-toast";
import {apiConnector} from '../apiConnector';
import { setUser } from "../../Redux/Slices/profileSlice";
import { settingsEndpoints } from "./apis";
import {logout} from './authAPI'

const {  UPDATE_DISPLAY_PICTURE_API,  UPDATE_PROFILE_API,  CHANGE_PASSWORD_API,  DELETE_PROFILE_API, DELETE_DISPLAY_PICTURE_API} = settingsEndpoints;

export const updateDisplayPicture = async (formData, token, dispatch, setUploading, setImageFile)=>{
        const toastId = toast.loading('Loading...');
        try {
	    
            const response = await apiConnector('put', UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })

            if (!response.data.success) {
                throw new Error(response.data.message)
              }

              toast.success("Display Picture Updated Successfully")
              dispatch(setUser(response.data.data));
              localStorage.setItem("user", JSON.stringify(response.data.data))
              setImageFile(null);

        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error.message)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
        setUploading(false);
        
}

export const deleteDisplayPicture = async ( url,token, dispatch) => {
    const toastId = toast.loading("Deleting...");
    try {
      
        const response = await apiConnector('put', DELETE_DISPLAY_PICTURE_API, {url},
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(response)
        if (!response.data.success) {
            throw new Error(response.data.message)
          }

          toast.success("Display Picture deleted Successfully")
          dispatch(setUser(response.data.data));
          localStorage.setItem("user", JSON.stringify(response.data.data))
          
    } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error.message)
        toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId);
}



export const updateProfile = async (token, formData, dispatch) =>  {
    const toastId = toast.loading("Loading...")
      try {

        const response = await apiConnector('put', UPDATE_PROFILE_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        // console.log(response.data.userDetails)
        
        if (!response.data.success) {
            throw new Error(response.data.message)
          }

          const userImage = response.data.userDetails.image ??
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        
         dispatch( setUser({...response.data.userDetails, image: userImage}) )
        
         localStorage.setItem("user", JSON.stringify({...response.data.userDetails, image: userImage}))

        toast.success("Profile Updated Successfully")
          
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
        
      }
       toast.dismiss(toastId); 
}

export const updatePassword = async (token,data)=>{
  const toastId = toast.loading("Loading...");
       try {
          const response = await apiConnector('post',CHANGE_PASSWORD_API, data, {
            Authorization: `Bearer ${token}`,
          })
          console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
          
        if (!response.data.success) {
      throw new Error(response.data.message)
        }
         toast.success("Password Changed Successfully")
     } catch (error) {
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        toast.error(error.response.data.message)
       }
       toast.dismiss(toastId);
}


export const deleteProfile = async (token,navigate, dispatch)=>{
  const toastId = toast.loading("Loading...")
       try {
          const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
            Authorization: `Bearer ${token}`,
          })
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
          toast.success("Profile Deleted Successfully")
          logout(navigate,dispatch);
       } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
       }
       toast.dismiss(toastId)
}
