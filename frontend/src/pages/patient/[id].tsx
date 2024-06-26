import MedicationForm from "@/components/MedicationForm";
import TemperatureChart from "@/components/TemperatureChart";
import TemperatureForm from "@/components/TemperatureForm";
import Modal from "react-modal";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  start_date: Date;
  end_date: Date;
}

interface BodyTemperature {
  id: number;
  date: string;
  temperature: number;
}

interface Patient {
  id: string;
  name: string;
  first_name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  Medications: Medication[];
  BodyTemperatures: BodyTemperature[];
}

const PatientProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [scale, setScale] = useState(6);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/patients/${id}`)
        .then((response) => response.json() as Promise<Patient>)
        .then((data) => {
          setPatient(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  // Prepare data for the chart
  const temperatureData = patient.BodyTemperatures.map((record) => ({
    date: new Date(record.date),
    temperature: record.temperature,
  }));

  // Filter data based on the scale
  const latestDate = new Date(
    Math.max.apply(
      null,
      temperatureData.map((record) => new Date(record.date).getTime())
    )
  );

  const filteredData = temperatureData.filter((record) => {
    const pastDate = new Date(latestDate.getTime());
    pastDate.setMonth(pastDate.getMonth() - scale);

    const recordDateStr = record.date.toISOString().split("T")[0];
    const pastDateStr = pastDate.toISOString().split("T")[0];

    return recordDateStr >= pastDateStr;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-500">
      <div className="max-w-2xl w-full p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl mb-4">{patient.name}</h1>
        <hr className="mb-4" />
        <div className="grid grid-cols-2 gap-10 mb-4">
          <div>
            <h2 className="font-bold">First Name</h2>
            <p>{patient.first_name}</p>
          </div>
          <div>
            <h2 className="font-bold">Age</h2>
            <p>{patient.age}</p>
          </div>
          <div>
            <h2 className="font-bold">Height</h2>
            <p>{patient.height}</p>
          </div>
          <div>
            <h2 className="font-bold">Weight</h2>
            <p>{patient.weight}</p>
          </div>
          <div>
            <h2 className="font-bold">Gender</h2>
            <p>{patient.gender}</p>
          </div>
        </div>
        <hr className="mb-4" />
        <h2 className="text-lg mb-4">Body Temperatures</h2>
        <TemperatureForm patientId={patient.id} />
        <div className="mb-4">
          <select
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          >
            <option value={1}>1 Month</option>
            <option value={3}>3 Months</option>
            <option value={6}>6 Months</option>
          </select>
        </div>
        <TemperatureChart data={filteredData} />
        <hr className="mb-4" />
        <h2 className="text-lg mb-4">Medications</h2>
        <div className="space-y-2">
          {patient.Medications.map((medication) => (
            <div
              key={medication.id}
              className="p-4 border border-gray-300 rounded-md"
              onClick={() => {
                setSelectedMedication(medication);
                setIsModalOpen(true);
              }}
            >
              <h3 className="font-bold text-lg">{medication.name}</h3>
              <p>Dosage: {medication.dosage}</p>
              <p>
                Start Date:{" "}
                {new Date(medication.start_date).toLocaleDateString()}
              </p>
              <p>
                End Date: {new Date(medication.end_date).toLocaleDateString()}
              </p>
            </div>
          ))}
          <button onClick={() => setIsModalOpen(true)}>Add Medication</button>
          {isModalOpen && (
            <Modal isOpen={isModalOpen}>
              <MedicationForm
                patientId={patient.id}
                medication={selectedMedication}
                className=""
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
