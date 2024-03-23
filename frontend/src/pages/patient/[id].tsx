import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Medication {
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
  id: number;
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
  // Get the latest date from the temperatureData array
  const latestDate = new Date(
    Math.max.apply(
      null,
      temperatureData.map((record) => new Date(record.date).getTime())
    )
  );

  const filteredData = temperatureData.filter((record) => {
    const pastDate = new Date(latestDate.getTime());
    pastDate.setMonth(pastDate.getMonth() - scale);

    // Convert dates to YYYY-MM-DD format for comparison
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
        <h2 className="text-lg mb-4">Medications</h2>
        <ul className="list-disc list-inside mb-4">
          {patient.Medications.map((medication) => (
            <li key={medication.id}>
              {medication.name} - {medication.dosage}
              {medication.start_date &&
                ` (Start Date: ${new Date(
                  medication.start_date
                ).toLocaleDateString()})`}
              {medication.end_date &&
                ` (End Date: ${new Date(
                  medication.end_date
                ).toLocaleDateString()})`}
            </li>
          ))}
        </ul>
        <hr className="mb-4" />
        <h2 className="text-lg mb-4">Body Temperatures</h2>
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
        <div className="mb-8">
          <LineChart width={500} height={300} data={filteredData}>
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
