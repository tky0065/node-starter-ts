import { db } from "@/db/db";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createShop: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, slug, location, adminId, attendantIds } = req.body;

  try {
    // check if shop already exists
    const existingShop = await db.shop.findUnique({
      where: { slug },
    });
    if (existingShop) {
      res.status(StatusCodes.CONFLICT).json({
        error: `Shop with this slug ${slug} already exist`,
        data: null,
      });
    }
    const newShop = await db.shop.create({
      data: {
        name,
        slug,
        location,
        adminId,
        attendantIds,
      },
    });

    res.status(StatusCodes.CREATED).json({
      data: newShop,
      message: "Shop created successfully",
      error: null,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};

export const getShops: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(StatusCodes.OK).json(shops);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};

export const getShopById: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const shop = await db.shop.findUnique({
      where: {
        id: id,
      },
    });

    if (!shop) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Shop with id ${id} not found` });
      return;
    }

    res.status(StatusCodes.OK).json(shop);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};

export const updateShop: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, location, adminId, attendantIds } = req.body;
  try {
    const shop = await db.shop.findUnique({
      where: {
        id: id,
      },
    });

    if (!shop) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Shop with id ${id} not found` });
      return;
    }

    const updatedShop = await db.shop.update({
      where: { id: id },
      data: {
        name,
        location,
        adminId,
        attendantIds,
      },
    });

    res.status(StatusCodes.OK).json(updatedShop);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};

export const deleteShop: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await db.shop.delete({
      where: { id: id },
    });

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};

// get all Shop attendants
export const getShopAttendants: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const existingShop = await db.shop.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingShop) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Shop with id ${id} not found` });
      return;
    }

    // Get the users whose id ar equal to exinsting shop attendantIds
    const attendants = await db.user.findMany({
      where: {
        id: {
          in: existingShop.attendantIds,
        },
      },
    });

    const others = attendants.map(({ password, ...others }) => others);

    res.status(StatusCodes.OK).json({ data: others, error: null });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error ${error}` });
  }
};
