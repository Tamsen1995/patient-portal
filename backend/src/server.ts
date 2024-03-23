import express, { Request, Response } from "express";
import { Sequelize, DataTypes, Model } from "sequelize";
import cors from "cors";
import fs from "fs";
import path from "path";
import * as cliProgress from "cli-progress";

// Initialize Express and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

// Define a "Medication" model
interface MedicationInstance extends Model {
  name: string;
  dosage: string;
  start_date: string;
  end_date: string;
}

const Medication = sequelize.define<MedicationInstance>("Medication", {
  name: { type: DataTypes.STRING, allowNull: false },
  dosage: { type: DataTypes.STRING, allowNull: false },
  start_date: { type: DataTypes.DATE, allowNull: true },
  end_date: { type: DataTypes.DATE, allowNull: true },
});

// Define a "BodyTemperature" model
interface BodyTemperatureInstance extends Model {
  date: string;
  temperature: number;
}

const BodyTemperature = sequelize.define<BodyTemperatureInstance>(
  "BodyTemperature",
  {
    date: { type: DataTypes.DATE, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
  }
);

// Define a "Patient" model
interface PatientInstance extends Model {
  id: any;
  name: string;
  first_name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
}

const Patient = sequelize.define<PatientInstance>("Patient", {
  name: { type: DataTypes.STRING, allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  height: { type: DataTypes.FLOAT, allowNull: false },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
});

// Define relationships
Patient.hasMany(Medication);
Patient.hasMany(BodyTemperature);

// Read the JSON file
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../patient_data.json"), "utf-8")
);

// Initialize progress bar
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(data.length, 0);

// Define routes
app.get("/patients", async (req: Request, res: Response) => {
  const patients = await Patient.findAll({
    include: [Medication, BodyTemperature],
  });
  res.json(patients);
});

app.get("/patients/:id", async (req: Request, res: Response) => {
  const patient = await Patient.findOne({
    where: { id: req.params.id },
    include: [Medication, BodyTemperature],
  });

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  res.json(patient);
});

app.post("/patients", async (req: Request, res: Response) => {
  const patient = await Patient.create(req.body, {
    include: [Medication, BodyTemperature],
  });
  res.json(patient);
});

// Sync database and start server
sequelize.sync({ force: true }).then(async () => {
  // Populate the database
  console.log("Populating the database...");
  for (const patient of data) {
    bar.increment();
    const { medications, body_temperatures, ...patientData } = patient;

    const newPatient = await Patient.create(patientData);

    // Use bulkCreate to insert all medications and body temperatures at once
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

  // Start the server
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
