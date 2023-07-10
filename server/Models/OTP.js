const mongoose = require('mongoose');
const MailSender = require('../Utils/MailSender');
const otpTemplate = require('../Mail/MailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	    // The document will be automatically deleted after 5 minutes of its creation time
        expires: 60 * 5, 
	},
});

//function to sendGmail
async function sendGmail(email, otp){
    try {
        const mailResponse = await MailSender(email, "Verfication Email", otpTemplate(otp));
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
		throw error;
    }
}


OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	// Only send an email when a new document is created
	if (this.isNew) {
		await sendGmail(this.email, this.otp);
	}
	next();
});


module.exports = mongoose.model('OTP', OTPSchema);  