import { db } from "@/db/db";
import { generateAccessToken } from "@/utils/generate.jwt";
import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

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
