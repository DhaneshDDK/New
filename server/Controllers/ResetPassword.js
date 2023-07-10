const User = require('../Models/User');
const crypto = require('crypto');
const MailSender = require('../Utils/MailSender');                                      
const bcrypt = require('bcrypt');

exports.resetPasswordToken = async (req,res) => {
    try {

        //get email from body
        const {email} = req.body;
        const user = await User.findOne({email: email});

        if(!user) {
            return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us. Enter a Valid Email `,
			});
        }

        const token = crypto.randomBytes(20).toString('hex');

        //update token and expiration time in User
        const updatedUserDetails = await User.findOneAndUpdate(
            {email : email}, { 
                token : token,
                resetPasswordExpires : Date.now() + 5*60*1000,
            },  {new : true}
        )

        const url = `http://localhost:3000/update-password/${token}`;

          //sendMail
          try {
            const emailResponse = await MailSender(	email,
                "Password Reset",
                `Your Link for email verification is ${url}. Please click this url to reset your password.`
            );
        } catch (error) {

            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message, 
			});
            
        }

        res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
        
    } catch (error) {
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
    }
}


exports.resetPassword = async (req, res)=>{
    try {
        const {password, confirmPassword, token} = req.body;

        //validate the password
        if(password !== confirmPassword){
            return res.json({	
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
        }

        const userDetails = await User.findOne({token: token});
        if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}

        //verify token
            if(userDetails.resetPasswordExpires < Date.now()) {
                return res.status(403).json({
                    success: false,
                    message: `Token is Expired, Please Regenerate Your Token`,
                });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            //update the user
            await User.findOneAndUpdate(
                {token : token}, 
                {password : encryptedPassword},
                {new : true},
            )

            res.json({
                success: true,
                message: `Password Reset Successful`,
            });

    } catch (error) {

        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
        
    }
}