// File: routes.ts
import express, { Request, Response } from "express";
import { Patient, Medication, BodyTemperature } from "./models";

const router = express.Router();

router.get("/patients", async (req: Request, res: Response) => {
  const patients = await Patient.findAll();
  res.json(patients);
});

router.get("/patients/:id", async (req: Request, res: Response) => {
  const patient = await Patient.findOne({
    where: { id: req.params.id },
    include: [Medication, BodyTemperature],
  });

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  res.json(patient);
});

router.post("/patients", async (req: Request, res: Response) => {
  const patient = await Patient.create(req.body, {
    include: [Medication, BodyTemperature],
  });
  res.json(patient);
});

export default router;
