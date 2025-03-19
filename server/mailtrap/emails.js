// import { mailtrapClient, sender } from './mailtrap.config.js';
import { mailtrapClient } from './mailtrap.config.js';
import {VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE} from './emailTemplate.js';
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]
    try {
        // const response = await mailtrapClient.send({
        //     from: sender,
        //     to: recipient,
        //     subject: "Verify your email",
        //     html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        //     category: "Email Verification",
        // })
		const response = await mailtrapClient.sendMail({
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken)
        })
        console.log("Email sent", response);
        
    } catch (error) {
        console.log("error sending email");
        throw new Error(error);
    }
}

// export const sendWelcomeEmail = async (email, name) => {
// 	const recipient = [{ email }];

// 	try {
// 		// const response = await mailtrapClient.send({
// 		// 	from: sender,
// 		// 	to: recipient,
// 		// 	template_uuid: "67fa0d5e-d084-4845-b733-9882945ec2af",
// 		// 	template_variables: {
// 		// 		company_info_name: "GopiAndAhem",
// 		// 		name: name,
// 		// 	},
// 		// });
// 		const response = await mailtrapClient.sendMail({
// 			to: email,
// 			template_uuid: "67fa0d5e-d084-4845-b733-9882945ec2af",
// 			template_variables: {
// 				company_info_name: "GopiAndAhem",
// 				name: name,
// 			},
// 		});

// 		console.log("Welcome email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending welcome email`, error);

// 		throw new Error(`Error sending welcome email: ${error}`);
// 	}
// };

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		// const response = await mailtrapClient.send({
		// 	from: sender,
		// 	to: recipient,
		// 	subject: "Reset your password",
		// 	html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
		// 	category: "Password Reset",
		// });
		const response = await mailtrapClient.sendMail({
			to: email,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
		});
        console.log("PRESET email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		// const response = await mailtrapClient.send({
		// 	from: sender,
		// 	to: recipient,
		// 	subject: "Password Reset Successful",
		// 	html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		// 	category: "Password Reset",
		// });
		const response = await mailtrapClient.sendMail({
			to: email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};