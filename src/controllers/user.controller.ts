import { db } from "@/db/db";
import e, { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";



export const createUser: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { username, email, password, firstName, lastName, phone, dob, gender, image, role } = req.body;

    try {
        //check if user already exists
        const existinUserEmail = await db.user.findUnique({ where: { email: email }, });
        const existinUserPhone = await db.user.findUnique({ where: { phone: phone }, });
        const existinUserName = await db.user.findUnique({  where: { username:username }, });
        if (existinUserEmail ) { 
            res.status(409).json({ error: `User with this email( ${email}) already exist`, data: null });
            return;
        }
        if (existinUserPhone ) {
          res
            .status(409)
            .json({
              error:
                `User with  this( ${phone}) already exists`,
              data: null,
            });
          return;
        }
        if ( existinUserName) {
          res
            .status(409)
            .json({
              error:
                `User with  this (${username}) already exists`,
              data: null,
            });
          return;
        }
        const hashedPassword : string = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            dob,
            gender,
            image: image
              ? image
              : "https://utfs.io/f/irA39Q64G7WRu6dordcskJy5SWnRPwVmc4jqhgAe3ZMHvdxi",
            role,
          },
        });

        const { password :savePass, ...others } = newUser;

        res.status(201).json({
            data: others,
            message: "User created successfully",
            error: null,
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Internal Server Error ${error}` });
    }
};

export const getUser: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await db.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            
        });

        const others = users.map(({ password, ...others }) => others);

        res.status(StatusCodes.OK).json(others);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error ${error}` });
    }
};

export const getUserById: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await db.user.findUnique({
            where: {
                id: id,
            },
        });
        
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ error: `User with id ${id} not found` });
            return;
        }
        const { password, ...others } = user;
        res.status(200).json(others);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error ${error}` });
    }
};

// export const loginUser: RequestHandler = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     const { email, password } = req.body;
//     try {
//         const user = await db.user.findUnique({
//             where: {
//                 email: email,
//             },
//         });

//         if (user && (await bcrypt.compare(password, user.password))) {
//             res.status(StatusCodes.OK).json({ message: "Login successful" });
//         } else {
//             res
//               .status(StatusCodes.UNAUTHORIZED)
//               .json({ error: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: `Internal Server Error ${error}` });
//     }
// };

export const updateUser: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const { username, email, firstName, lastName, phone, dob, gender, image, role,password } = req.body;
    try {
        const user = await db.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ error: `User with id ${id} not found` });
            return;
        }

        // verify if email, phone and username already exist and unique
        if (email && email !== user.email) {
            const existinUserEmail = await db.user.findUnique({ where: { email: email }, });
            if (existinUserEmail) {
                res.status(StatusCodes.CONFLICT).json({ error: `User with this email( ${email}) already exist` });
                return;
            }
            
        }

        if (phone && phone !== user.phone) {
            const existinUserPhone = await db.user.findUnique({ where: { phone: phone }, });
            if (existinUserPhone) {
                res.status(StatusCodes.CONFLICT).json({ error: `User with this phone( ${phone}) already exist` });
                return;
            }
        }

        if (username && username !== user.username) {
            const existinUserName = await db.user.findUnique({ where: { username: username }, });
            if (existinUserName) {
                res.status(StatusCodes.CONFLICT).json({ error: `User with this username( ${username}) already exist` });
                return;
            }
        }

        let  hashedPassword = user.password; ;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await db.user.update({
            where: { id: id },
            data: {
                username,
                email,
                firstName,
                lastName,
                phone,
                dob,
                gender,
                image,
                password: hashedPassword ,
                role,
            },
        });
       const { password: savePass, ...others } = updatedUser;
        res.status(StatusCodes.OK).json(others);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Internal Server Error ${error}` });
    }
};

export const deleteUser: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        
        await db.user.delete({
            where: { id: id },
        });

        res.status(StatusCodes.OK).send({
            success: true,
            message: `User with id ${id} deleted successfully`,
            error: null,
        });
    } catch (error) {
        console.error(error);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: `Internal Server Error ${error}` });
    }
};

// update user password ask old password and new password

export const updateUserPassword: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await db.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ error: `User with id ${id} not found` });
            return;
        }
        if (await bcrypt.compare(oldPassword, user.password)) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await db.user.update({
                where: { id: id },
                data: {
                    password: hashedPassword,
                },
            });
            
            res.status(StatusCodes.OK).json(
                {
                    message: "Password updated successfully",
                    error: null,}
            );
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid old password" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Internal Server Error ${error}` });
    }
};

export const getAttendants: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
        },
        where: {
            role: "ATTENDANT",
        }
    });

    const others = users.map(({ password, ...others }) => others);

    res.status(StatusCodes.OK).json(others);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};
