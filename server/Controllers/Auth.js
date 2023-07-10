const User = require('../Models/User');
const OTP = require('../Models/OTP');
const Profile = require('../Models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const MailSender = require('../Utils/MailSender');
const passwordUpdated = require('../Mail/PasswordUpdate');
const signUpTemplate = require('../Mail/SignUpTemplate');

//SIGN UP controller
exports.signUp = async (req,res) => {
    try {
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber , otp}  = req.body; 

        //verification 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType ||  !otp) {
            return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
        }

       if(password !== confirmPassword ){
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password do not match. Please try again.",
        });
       }
       
       const user = await User.findOne({email});
       if(user) {
        return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
        });
       }
       
     
       //Bring recent OTP corresponding to the current user
       const recentOTP = await OTP.find({email}).sort({createdAt : -1}).limit(1);
     
       if ( recentOTP.length === 0 || otp !==  recentOTP[0].otp) {
        return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
        });
        } 

       
        const hashedPassword = await bcrypt.hash(password, 10);
        

        //create User
        const profileDetails = await Profile.create({
            gender: null,
			dateOfBirth: null,
			about: null, 
			contactNumber: null,
        });

        var userDetails = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});
        userDetails = await User.findOne({email}).populate("additionalDetails").exec();


          //sendMail
        try {
            const emailResponse = await MailSender(email, "SignedUp successfully", signUpTemplate(
                email, `${firstName} ${lastName}`
            ));
        } catch (error) {

            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message, 
			});
            
        }


        return res.status(200).json({
			success: true,
			userDetails,
			message: "User registered successfully",
		});

        

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}


//sign in controller
exports.signIn = async (req,res)=>{
    try {
        const {email, password} = req.body;

        //verification 
        if(!email || !password) {
            return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
        }

        const user = await User.findOne({email}).populate("additionalDetails").exec();
        if(!user){
            return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
        }

     //decrypt the password from the database and verify with the password entered by the user
        const flag = await bcrypt.compare( password, user.password );
        //if not matched
        if(!flag){
            return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
        }


        //created JWT token and save in the form of cookie
        const payload = {
            email : user.email,
            id : user._id,
            accountType : user.accountType,
        }
        
        const token = jwt.sign(  payload,  process.env.JWT_SECRET,
            { expiresIn: "24h", }
        );


        user.token = token;
        user.password = undefined;   //since we are printing the user

        //create the cookie

        res.cookie("jwt-token", token, {
            expires : new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly : true
        }).json({
            success: true,
				token,
				user,
				message: `User Login Success`,
        })

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`+ error.message,
		});
    }
}

exports.sendOTP = async (req, res)=>{
    try {
        const {email} = req.body;

        const user = await User.findOne({email: email});
        if(user) {
            //cant sign up
            return res.json({
				success: false,
				message: `User is Already Registered`,
			});
        }

        //geneate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
        });

        var result = await OTP.findOne({otp:otp});

        while(result) {
           otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
        });
          result = await OTP.findOne({otp:otp});
        }

        //create OTP in db
        const OTPDetails = await OTP.create({email:email, otp:otp});

        res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});


    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


//change password
exports.changePassword = async (req,res)=>{
    try {
        
        // Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Get user data from req.user
		const userDetails = await User.findById(req.user.id);
        //validation
        // Validate old password

		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
        if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

        // Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

        // Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);


        //sendMail
        try {
            const emailResponse = await MailSender(updatedUserDetails.email, "Password updated successfully", passwordUpdated(
                updatedUserDetails.email, `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            ));
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {

            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message, 
			});
            
        }

       // Return success response
		return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });


    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}