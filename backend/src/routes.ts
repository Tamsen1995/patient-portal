import express, { Request, Response } from "express";
import { Patient, Medication, BodyTemperature } from "./models";

const router = express.Router();

// Patient routes
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

// Temperature routes
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
      res.json(newTemperature);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while adding the temperature" });
    }
  }
);

// Medication routes
router.post(
  "/patients/:id/medications",
  async (req: Request, res: Response) => {
    const { name, dosage, start_date, end_date } = req.body;
    const { id } = req.params;

    if (!name || !dosage || !start_date || !end_date) {
      return res
        .status(400)
        .json({ error: "All medication fields are required" });
    }

    try {
      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const newMedication = await Medication.create({
        name,
        dosage,
        start_date,
        end_date,
        PatientId: id,
      });
      res.json(newMedication);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while adding the medication" });
    }
  }
);

router.put(
  "/patients/:patientId/medications/:medicationId",
  async (req: Request, res: Response) => {
    const { name, dosage, start_date, end_date } = req.body;
    const { patientId, medicationId } = req.params;

    try {
      const patient = await Patient.findByPk(patientId);

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const medication = await Medication.findOne({
        where: { id: medicationId, PatientId: patientId },
      });

      if (!medication) {
        return res.status(404).json({ error: "Medication not found" });
      }

      await medication.update({ name, dosage, start_date, end_date });
      res.json(medication);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the medication" });
    }
  }
);

export default router;
