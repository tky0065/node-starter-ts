import { db } from "@/db/db";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createSupplier: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {
        supplierType,
        name,
        contactPerson,
        phone,
        email,
        location,
        country,
        website,
        registrationNumber,
        bankAccountNumber,
        bankName,
        paymentTerms,
        logo,
        rating,
        notes,
    } = req.body;
    try {
        // check if phone , registrationNumber,and email are unique
        const existingSupplierPhone = await db.supplier.findUnique({
            where: { phone: phone },
        });
        if (email) {
            const existingSupplierEmail = await db.supplier.findUnique({
                where: { email: email },
            });

            if (existingSupplierEmail) {
                res
                    .status(StatusCodes.CONFLICT)
                    .json({ error: `Supplier with this email ${email} already exists` });
                return;
            }
        }

        if (existingSupplierPhone) {
            res
                .status(StatusCodes.CONFLICT)
                .json({ error: `Supplier with this phone ${phone} already exists` });
            return;
        }

        if (registrationNumber) {
            const existingSupplierRegistrationNumber = await db.supplier.findUnique({
                where: { registrationNumber: registrationNumber },
            });

            if (existingSupplierRegistrationNumber) {
                res.status(StatusCodes.CONFLICT).json({
                    error: `Supplier with this registration number ${registrationNumber} already exists`,
                });
                return;
            }
        }

        const newSupplier = await db.supplier.create({
            data: {
                supplierType,
                name,
                contactPerson,
                phone,
                email,
                location,
                country,
                website,
                registrationNumber,
                bankAccountNumber,
                bankName,
                paymentTerms,
                logo,
                rating,
                notes,
            },
        });

        res.status(StatusCodes.CREATED).json({ data: newSupplier, error: null });
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: `Internal Server Error ${error}` });
    }
};

export const getSuppliers: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const suppliers = await db.supplier.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(StatusCodes.OK).json({ data: suppliers, error: null });
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: `Internal Server Error ${error}` });
    }
};

export const getSupplierById: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const supplier = await db.supplier.findUnique({
            where: {
                id: id,
            },
        });
        if (!supplier) {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: `Supplier with id ${id} not found` });
            return;
        }
        res.status(StatusCodes.OK).json(supplier);
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: `Internal Server Error ${error}` });
    }
};

export const updateSupplier: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const {
        supplierType,
        name,
        contactPerson,
        phone,
        email,
        location,
        country,
        website,
        registrationNumber,
        bankAccountNumber,
        bankName,
        paymentTerms,
        logo,
        rating,
        notes,
    } = req.body;

    try {
        const existingSupplier = await db.supplier.findUnique({
            where: { id: id },
        });
        if (!existingSupplier) {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: `Supplier with id ${id} not found` });
            return;
        }
        // verify if email and phone already exist and unique
        if (email && email !== existingSupplier.email) {
            const existingSupplierEmail = await db.supplier.findUnique({
                where: { email: email },
            });
            if (existingSupplierEmail) {
                res
                    .status(StatusCodes.CONFLICT)
                    .json({ error: `Supplier with this email ${email} already exists` });
                return;
            }
        }

        if (phone && phone !== existingSupplier.phone) {
            const existingSupplierPhone = await db.supplier.findUnique({
                where: { phone: phone },
            });
            if (existingSupplierPhone) {
                res
                    .status(StatusCodes.CONFLICT)
                    .json({ error: `Supplier with this phone ${phone} already exists` });
                return;
            }
        }

        if (
            registrationNumber &&
            registrationNumber !== existingSupplier.registrationNumber
        ) {
            const existingSupplierRegistrationNumber = await db.supplier.findUnique({
                where: { registrationNumber: registrationNumber },
            });
            if (existingSupplierRegistrationNumber) {
                res
                    .status(StatusCodes.CONFLICT)
                    .json({
                        error: `Supplier with this registration number ${registrationNumber} already exists`,
                    });
                return;
            }
        }
        const updatedSupplier = await db.supplier.update({
            where: { id: id },
            data: {
                supplierType,
                name,
                contactPerson,
                phone,
                email,
                location,
                country,
                website,
                registrationNumber,
                bankAccountNumber,
                bankName,
                paymentTerms,
                logo,
                rating,
                notes,
            },
        });

        res.status(StatusCodes.OK).json({
            data: updatedSupplier,
            message: "Supplier Updated Succesfully",
            error: null,
        });
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: `Internal Server Error ${error}` });
    }
};

export const deleteSupplier: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const existingSupplier = await db.supplier.findUnique({
            where: { id: id },
        });
        if (!existingSupplier) {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: `Supplier with id ${id} not found` });
            return;
        }
        await db.supplier.delete({
            where: { id: id },
        });

        res
            .status(StatusCodes.OK)
            .json({ message: `Supplier with id ${id} deleted`, error: null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error ${error}` });
    }
};
