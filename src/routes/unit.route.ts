import {
  createUnit,
  deleteUnit,
  getUnitById,
  getUnits,
  updateUnit,
} from "@/controllers/unit.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { auth } from "@/middleware/verifyTokenMiddleware";
import { createUnitSchema, updateUnitSchema } from "@/validators/unit.form";
import express from "express";

const unitRouter = express.Router();
/**
 * @swagger
 * /api/v1/units:
 *   get:
 *     summary: Retrieve a list of units
 *     tags: [Units]
 *     description: Retrieve a list of all units from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of units.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 */
unitRouter.get("/units", auth, getUnits);

/**
 * @swagger
 * /api/v1/units/{id}:
 *   get:
 *     summary: Get a unit by ID
 *     tags: [Units]
 *     description: Retrieve a single unit by its ID.
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
 *         description: A single unit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         description: Unit not found.
 */
unitRouter.get("/units/:id", auth, getUnitById);

/**
 * @swagger
 * /api/v1/units:
 *   post:
 *     summary: Create a new unit
 *     tags: [Units]
 *     description: Creates a new unit in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Unit'
 *     responses:
 *       201:
 *         description: Unit successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 */
unitRouter.post("/units", auth, validateData(createUnitSchema), createUnit);

/**
 * @swagger
 * /api/v1/units/{id}:
 *   put:
 *     summary: Update a unit by ID
 *     tags: [Units]
 *     description: Update an existing unit's information by its ID.
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
 *             $ref: '#/components/schemas/Unit'
 *     responses:
 *       200:
 *         description: Unit information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         description: Unit not found.
 */
unitRouter.put("/units/:id", auth, validateData(updateUnitSchema), updateUnit);

/**
 * @swagger
 * /api/v1/units/{id}:
 *   delete:
 *     summary: Delete a unit by ID
 *     tags: [Units]
 *     description: Delete a unit from the system by its ID.
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
 *         description: Unit successfully deleted.
 *       404:
 *         description: Unit not found.
 */
unitRouter.delete("/units/:id", auth, deleteUnit);

export default unitRouter;
