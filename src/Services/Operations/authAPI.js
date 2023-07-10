import { endpoints } from '../Operations/apis'
import {apiConnector} from '../apiConnector';
import { setLoading , setToken} from '../../Redux/Slices/authSlice';
import { toast } from 'react-hot-toast';
import { setEndTime } from '../../Redux/Slices/authSlice';
import {setUser} from '../../Redux/Slices/profileSlice'


const {SENDOTP_API, SIGNUP_API, LOGIN_API , RESETPASSTOKEN_API, RESETPASSWORD_API} = endpoints;

export async function sendOTP(email, dispatch, navigate){
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...")
  
    dispatch(setEndTime(Date.now() + (5*60*1000)));
  
   try {
    const res = await apiConnector('post', SENDOTP_API, {email});
    
    if(res.data.message === "User is Already Registered"){
        toast.error("User already registered");
        dispatch(setLoading(false));
        toast.dismiss(toastId)
        return;
    }

    if (!res.data.success) {
        throw new Error(res.data.message);
      }

    else { 
      toast.success('OTP sent successfully');
      navigate('/verify-email');

    }

    
   } catch (error) {
      console.log("Error while sending OTP" ,error);
      toast.error("Could Not Send OTP")
   }

   dispatch(setLoading(false));
   toast.dismiss(toastId)
}

export async function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp , navigate, dispatch) {
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...")

 try {
  const res = await apiConnector('post', SIGNUP_API, {accountType, firstName, lastName, email, password, confirmPassword, otp});
  
  if (!res.data.success) {
      toast.error(res.data.message);
      throw new Error(res.data.message);
    }
  else {
  toast.success('Signed Up successfully');
  navigate('/login');
  }
  
 } catch (error) {
    console.log(error);
    toast.error("Could Not Verify OTP")
 }
 dispatch(setLoading(false));
 toast.dismiss(toastId)
} 


export const login = async (email,password,navigate,dispatch)=>{
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...")

 try {
  const res = await apiConnector('post', LOGIN_API, { email, password });
  
  if (!res.data.success) {
      throw new Error(res.data.message);
    }

  toast.success('Signed In successfully');
  dispatch(setToken(res.data.token))
  const userImage = res.data?.user?.image
  ? res.data.user.image
  : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.firstName} ${res.data.user.lastName}`
  dispatch(setUser({ ...res.data.user, image: userImage }))
  
  localStorage.setItem("token", JSON.stringify(res.data.token))
  localStorage.setItem("user", JSON.stringify(res.data.user))
  navigate("/dashboard/my-profile")

  
 } catch (error) {
  console.log("LOGIN API ERROR............", error)
  toast.error("Login Failed")
 }
 dispatch(setLoading(false));
 toast.dismiss(toastId)
}


export const getResetPasswordToken = async (email, setEmailSent, navigate,dispatch) => {
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...")

 try {
  const res = await apiConnector('post', RESETPASSTOKEN_API, {email});
  
  if (!res.data.success) {
      throw new Error(res.data.message);
    }
  else {
    toast.success("Reset Email Sent");
    setEmailSent(true);
  }
  
 } catch (error) {
  console.log("RESET PASSWORD TOKEN Error", error);
  toast.error("Failed to send email for resetting password");
 }
 dispatch(setLoading(false));
 toast.dismiss(toastId)
} 


export const resetPassword = async (password, confirmPassword, token, navigate, dispatch) => {
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...")

 try {
  const res = await apiConnector('post', RESETPASSWORD_API, {password, confirmPassword, token});
  
  if (!res.data.success) {
      throw new Error(res.data.message);
    }
  else {
    toast.success("Password has been reset successfully");
  }
  
 } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
 }
 dispatch(setLoading(false));
 toast.dismiss(toastId) 
}


export function logout(navigate, dispatch) {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
}