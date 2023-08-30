import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";

import codeGenerated from "./codeGenerated";
import RegistrationRequestBody from "../interfaces/registrationRequestBody";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alexandraziver@gmail.com",
    pass: "zwaxwrifgilunvge",
  },
  host: "smtp.gmail.com",
  port: 587,
});

const sendConfirmationCode = async (
  req: Request<object, object, RegistrationRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<number> => {
  const randomCode = codeGenerated();
  const email: string = await req.body.email;
  const mailOptions = {
    from: "saschaziwer121212@gmail.com",
    to: email,
    subject: "Confirmation Email",
    text: `Your confirmation code:${randomCode}`,
  };

  try {
    if (!randomCode) {
      throw new Error("Code wasn't generated");
    }
    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      throw new Error("Error sending confirmation email:");
    }

    return randomCode;
  } catch (err) {
    next(err);
  }
};

export default sendConfirmationCode;
