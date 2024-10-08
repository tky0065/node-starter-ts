import { db } from "@/db/db";

import { Request, RequestHandler, Response } from "express";


export const createCustomer: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, phone } = req.body;
  try {
    const newCustomer = await db.customer.create({
      data: {
        name,
        email,
        phone,
      },
    })

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
      }
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
        }
      })
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
  const { name, email, phone } = req.body;

  try {
    const updatedCustomer = await db.customer.update({
      where: { id: id },
      data: { name, email, phone },
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};
