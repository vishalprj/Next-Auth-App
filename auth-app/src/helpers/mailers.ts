import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';

const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            const updatedUser =  await User.findByIdAndUpdate(userId, {
                $set: {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
                }
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                forgotPassword: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c828cc2622ce4a",
                pass: "b4190a8ed86220"
            }
        });

        const mailOptions = {
            from: 'vishalpraj188@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? 'verify your email' : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("Error in sendEmail:", error);
        throw new Error(error.message);
    }
}

export default sendEmail;
