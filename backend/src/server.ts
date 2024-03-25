// File: server.ts
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import * as cliProgress from "cli-progress";
import sequelize, {
  Patient,
  Medication,
  BodyTemperature,
  BodyTemperatureInstance,
  MedicationInstance,
} from "./models";
import router from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../patient_data.json"), "utf-8")
);

const bar = new cliProgress.SingleBar(
  {
    format:
      "Populating the database: |" +
      "{bar}" +
      "| {percentage}% || {value}/{total} Patients",
  },
  cliProgress.Presets.shades_classic
);

sequelize.sync().then(async () => {
  const patientCount = await Patient.count();

  if (patientCount === 0) {
    console.log("Populating the database...");
    bar.start(data.length, 0);

    for (const patient of data) {
      bar.increment();
      const { medications, body_temperatures, ...patientData } = patient;

      const newPatient = await Patient.create(patientData);

      const medicationsWithPatientId = medications.map(
        (medication: MedicationInstance) => ({
          ...medication,
          PatientId: newPatient.id,
        })
      );
      await Medication.bulkCreate(medicationsWithPatientId);

      const bodyTemperaturesWithPatientId = body_temperatures.map(
        (bodyTemperature: BodyTemperatureInstance) => ({
          ...bodyTemperature,
          PatientId: newPatient.id,
        })
      );
      await BodyTemperature.bulkCreate(bodyTemperaturesWithPatientId);
    }
    bar.stop();
  }

  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
