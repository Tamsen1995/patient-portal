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

router.post(
  "/patients/:id/temperatures",
  async (req: Request, res: Response) => {
    const { temperature, date } = req.body;
    const { id } = req.params;

    if (!temperature || !date) {
      return res
        .status(400)
        .json({ error: "Temperature and date are required" });
    }

    try {
      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const newTemperature = await BodyTemperature.create({
        temperature,
        date,
        PatientId: id,
      });
      console.log("newTemperature : ", newTemperature);
      res.json(newTemperature);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while adding the temperature" });
    }
  }
);

router.post("/patients", async (req: Request, res: Response) => {
  const patient = await Patient.create(req.body, {
    include: [Medication, BodyTemperature],
  });
  res.json(patient);
});

export default router;
