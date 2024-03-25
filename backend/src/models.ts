// File: models.ts
import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

export interface MedicationInstance extends Model {
  name: string;
  dosage: string;
  start_date: string;
  end_date: string;
}

export const Medication = sequelize.define<MedicationInstance>("Medication", {
  name: { type: DataTypes.STRING, allowNull: false },
  dosage: { type: DataTypes.STRING, allowNull: false },
  start_date: { type: DataTypes.DATE, allowNull: true },
  end_date: { type: DataTypes.DATE, allowNull: true },
});

export interface BodyTemperatureInstance extends Model {
  date: string;
  temperature: number;
}

export const BodyTemperature = sequelize.define<BodyTemperatureInstance>(
  "BodyTemperature",
  {
    date: { type: DataTypes.DATE, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
  }
);

export interface PatientInstance extends Model {
  id: any;
  name: string;
  first_name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
}

export const Patient = sequelize.define<PatientInstance>("Patient", {
  name: { type: DataTypes.STRING, allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  height: { type: DataTypes.FLOAT, allowNull: false },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
});

Patient.hasMany(Medication);
Patient.hasMany(BodyTemperature);

export default sequelize;
