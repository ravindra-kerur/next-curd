// Which approach we should take to shout the mail. There are two options:
// 1. domain.com/verifytoken/assasasasdr4343434
// 2. domain.com/verifytoken?token=assasasasdr4343434

// Second approch is better for client component
// First approch is better for server component

// There is no right and wrong in this one. Both are equal and depends on the what we want to use.

import nodemailer from "nodemailer";
import Usertwo from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log("Hashed Token: ", hashedToken)

    // forgotPasswordToken, verifyToken (from schema) -> add these things into db
    if (emailType === "VERIFY") {
      await Usertwo.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await Usertwo.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    // create a transporter
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        // user: process.env.TRANSPORTUSER,
        // pass: process.env.TRANSPORTPASS,
        user: "d06fb031ae4166",
        pass: "71324405964347",
      },
    });

    // Create mail options
    var mailOptions = {
      from: "ravindra.spatil@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      //   text: emailType === "VERIFY"? `Click on this link to verify your email: http://localhost:3000/verifytoken?token=${hashedToken}` : `Click on this link to reset your password: http://localhost:3000/resetpassword?token=${hashedToken}`,
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } or copy and paste the link below in your browser. <br/> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error);
  }
};
