import { db } from "@/db/db";
import { generateEmailHTML } from "@/utils/generate.email.templ";
import { generateAccessToken } from "@/utils/generate.jwt";
import { generateToken } from "@/utils/generate.token";
import bcrypt from "bcrypt";
import { addMinutes } from "date-fns";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && (await bcrypt.compareSync(password, user.password))) {
      const { password, ...userWithoutPass } = user;
      const accessToken = generateAccessToken(userWithoutPass);
      const result = {
        accessToken,
      };
      console.log(result);
      res
        .status(StatusCodes.OK)
        .json({ token: accessToken, message: "Login successful" });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};

// forget password
export const forgetPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
      return;
    }
    // generate a token and storre it in the resetToken field
    const resetToken = generateToken().toString();
    const resetTokenExpiry = addMinutes(new Date(), 30);
    const currentTime = new Date();
    // set the resetTokenExpiry to 1 hour
    // send the user an email with the reset link

    // update the user with the resetToken and resetTokenExpiry
    const updatedUser = await db.user.update({
      where: {
        email: email,
      },
      data: {
        resetToken: resetToken,
        resetTokenExpiry: resetTokenExpiry,
      },
    });
    // send the user an email with the reset link

    const firstName = updatedUser.username.split(" ")[0];

    const emailHTML = generateEmailHTML({
      firstName,
      resetToken,
    });
    const { data, error } = await resend.emails.send({
      from: "IPOS <info@post-vende.com>",
      to: email,
      subject: "Password Reset Request",
      html: emailHTML,
    });
    if (error) {
      console.error(error);
      res.status(StatusCodes.BAD_REQUEST).json({ error });
      return;
    }
    //  console.log(sendEmail)
    res.status(200).json({
      message: `Password reset email sent to ${email}`,
      data: { userId: updatedUser.id },
      error: null,
    });
    res.status(StatusCodes.OK).json({
      data: { resetToken, resetTokenExpiry, currentTime },
      message: "Reset link sent to your email",
      error: null,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};

// verify  token
export const verifyToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { token } = req.params;
  try {
    
    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ data: null, error: "Invalid or expired token" });
      return;
    }
    res
      .status(StatusCodes.OK)
      .json({   message: "Token is valid" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
    
  }

};

// change password
export const changePassword: RequestHandler = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
      },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password and clear the reset token and expiry
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
