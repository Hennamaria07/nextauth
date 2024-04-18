import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";
import User from '@/models/user.model';

const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log("emailtype------>", emailType)
  try {
    // create a hased token
    const token = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId,
        { verifyToken: token, verifyTokenExpiry: Date.now() + 3600000 })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId,
        { forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 3600000 })
    }
    // console.log(process.env.NEXT_PUBLIC_NODEMAILER_USER)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8552f4c19d41d2",
        pass: "0df20e1eefdaf3"
      }
    });
    const mailOption = {
      from: 'hennamaria2001@gmail.com', // sender address
      to: email, // list of receivers
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click <a href=" http://localhost:3000/verifyemail?token=${token}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.
            <br /> http://localhost:3000/verifyemail?token=${token}
            </p>`, // html body
    }
    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default sendEmail;