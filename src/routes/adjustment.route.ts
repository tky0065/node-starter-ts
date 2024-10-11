import { createAdjustement, deleteAdjustement, getAdjustementById, getAdjustements, updateAdjustement } from "@/controllers/adjustement.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { auth } from "@/middleware/verifyTokenMiddleware";
import { createAdjustementSchema, updateAdjustementSchema } from "@/validators/adjustement.form";
import { Router } from "express";

const adjustementRouter = Router();

/**
 * @swagger
 * /api/v1/adjustements:
 *   get:
 *     summary: Retrieve a list of adjustements
 *     tags: [Adjustements]
 *     description: Retrieve a list of all adjustements from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of adjustements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adjustement'
 */
adjustementRouter.get("/adjustements", auth, getAdjustements);

/**
 * @swagger
 * /api/v1/adjustements/{id}:
 *   get:
 *     summary: Get an adjustement by ID
 *     tags: [Adjustements]
 *     description: Retrieve a single adjustement by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single adjustement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adjustement'
 *       404:
 *         description: Adjustement not found.
 */
adjustementRouter.get("/adjustements/:id", auth, getAdjustementById);

/**
 * @swagger
 * /api/v1/adjustements:
 *   post:
 *     summary: Create a new adjustement
 *     tags: [Adjustements]
 *     description: Creates a new adjustement in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adjustement'
 *     responses:
 *       201:
 *         description: Adjustement successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adjustement'
 */
adjustementRouter.post(
    "/adjustements",
    auth,
    validateData(createAdjustementSchema),
    createAdjustement
);

/**
 * @swagger
 * /api/v1/adjustements/{id}:
 *   put:
 *     summary: Update an adjustement by ID
 *     tags: [Adjustements]
 *     description: Update an existing adjustement's information by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adjustement'
 *     responses:
 *       200:
 *         description: Adjustement information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adjustement'
 *       404:
 *         description: Adjustement not found.
 */
adjustementRouter.put(
    "/adjustements/:id",
    auth,
    validateData(updateAdjustementSchema),
    updateAdjustement
);

/**
 * @swagger
 * /api/v1/adjustements/{id}:
 *   delete:
 *     summary: Delete an adjustement by ID
 *     tags: [Adjustements]
 *     description: Delete an adjustement from the system by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adjustement successfully deleted.
 *       404:
 *         description: Adjustement not found.
 */
adjustementRouter.delete("/adjustements/:id", auth, deleteAdjustement);

export default adjustementRouter;
