import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP, signUp } from "../Services/Operations/authAPI";
import { toast } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signUpData, loading , endTime} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const  [ minutes, setMinutes ] = useState('0');
  const [ seconds, setSeconds ] = useState('0');
  const [resend, setResend] = useState(false);

  const getTime = ()=>{
    const time = endTime - Date.now();
    if(time > 0){
    setMinutes(Math.floor(time/(1000*60)));
    setSeconds( Math.floor((time/(1000))%60) );
    }
  }
 
  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
    const interval = setInterval(()=>getTime(), 0);
    return ()=> clearInterval(interval);

  }, [resend]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signUpData;
    
    if(!otp) {
      toast.error('Please enter your otp');
      return;
    }

    signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate, dispatch
      )
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center md:justify-center md:pt-0 pt-[4em]">
      {loading ? (
        <div>
        <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center'><ScaleLoader color='lime'/></div>
        </div>
      ) : 
      (
        <div className="w-100vh max-w-[500px] p-4 lg:p-8 relative">
          
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() =>{ setResend(!resend); sendOTP(signUpData.email, dispatch, navigate)}}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
          <div className="text-[20px] font-mono font-semibold text-richblack-5 absolute right-0 p-4 lg:p-8 flex flex-row gap-2 items-center justify-center"> 
          Time remaining -
           {
             (minutes===0 && seconds===0 )? <div> OTP expired </div> : <div> {minutes}:{seconds} </div>
           }
           </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;