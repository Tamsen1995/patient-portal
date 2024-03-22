import express, { Request, Response } from "express";
import { Sequelize, DataTypes, Model } from "sequelize";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Define a "Medication" model
interface MedicationInstance extends Model {
  name: string;
  dosage: string;
}

const Medication = sequelize.define<MedicationInstance>("Medication", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define a "BodyTemperature" model
interface BodyTemperatureInstance extends Model {
  date: string;
  temperature: number;
}

const BodyTemperature = sequelize.define<BodyTemperatureInstance>(
  "BodyTemperature",
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }
);

// Define a "Patient" model
interface PatientInstance extends Model {
  name: string;
  first_name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
}

const Patient = sequelize.define<PatientInstance>("Patient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define relationships
Patient.hasMany(Medication);
Patient.hasMany(BodyTemperature);

// Read the JSON file
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../patient_data.json"), "utf-8")
);

// Define routes
app.get("/patients", async (req: Request, res: Response) => {
  const patients = await Patient.findAll({
    include: [Medication, BodyTemperature],
  });
  res.json(patients);
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
  for (const patient of data) {
    await Patient.create(patient, {
      include: [Medication, BodyTemperature],
    });
  }

  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
