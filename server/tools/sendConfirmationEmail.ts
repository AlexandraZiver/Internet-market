import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alexandraziver@gmail.com",
    pass: "zwaxwrifgilunvge",
  },
  host: "smtp.gmail.com",
  port: 587,
});

const sendConfirmedCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<number> => {
  const min = 1000;
  const max = 9999;
  const randomCode: number = Math.floor(Math.random() * (max - min + 1)) + min;

  const email: string = await req.body.email;
  const mailOptions = {
    from: "saschaziwer121212@gmail.com",
    to: email,
    subject: "Confirmation Email",
    text: `Your confirmation code:${randomCode}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      throw new Error("Error sending confirmation email:");
    }
    return randomCode;
  } catch (err) {
    next(err);
  }
};

export default sendConfirmedCode;
