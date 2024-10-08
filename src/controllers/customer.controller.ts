import { db } from "@/db/db";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createCustomer: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    customerType,
    firstName,
    lastName,
    phone,
    gender,
    maxCreditLimit,
    maxCreditDays,
    taxPin,
    dob,
    email,
    nationalId,
    country,
    location,
  } = req.body;
  try {
    const newCustomer = await db.customer.create({
      data: {
        customerType,
        firstName,
        lastName,
        phone,
        gender,
        maxCreditLimit,
        maxCreditDays,
        taxPin,
        dob,
        email,
        nationalId,
        country,
        location,
      },
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

export const getCustomer: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

export const getCustomerById: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const customer = await db.customer.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

export const updateCustomer: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    customerType,
    firstName,
    lastName,
    phone,
    gender,
    maxCreditLimit,
    maxCreditDays,
    taxPin,
    dob,
    email,
    nationalId,
    country,
    location,
  } = req.body;

  try {
    const updatedCustomer = await db.customer.update({
      where: { id: id },
      data: {
        customerType,
        firstName,
        lastName,
        phone,
        gender,
        maxCreditLimit,
        maxCreditDays,
        taxPin,
        dob,
        email,
        nationalId,
        country,
        location,
      },
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

export const deleteCustomer: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const existingCustomer = await db.customer.findUnique({
      where: { id: id },
    });
    if (!existingCustomer) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Customer with id ${id} not found` });
      return;
    }
    await db.customer.delete({
      where: { id: id },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: `Customer with id ${id} deleted`, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};