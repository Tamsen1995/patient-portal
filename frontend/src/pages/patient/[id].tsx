import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Medication {
  id: number;
  name: string;
  dosage: string;
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

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>First Name: {patient.first_name}</p>
      <p>Age: {patient.age}</p>
      <p>Height: {patient.height}</p>
      <p>Weight: {patient.weight}</p>
      <p>Gender: {patient.gender}</p>
      <h2>Medications</h2>
      {patient.Medications.map((medication) => (
        <div key={medication.id}>
          <p>Name: {medication.name}</p>
          <p>Dosage: {medication.dosage}</p>
        </div>
      ))}
      <h2>Body Temperatures</h2>
      {patient.BodyTemperatures.map((bodyTemperature) => (
        <div key={bodyTemperature.id}>
          <p>Date: {new Date(bodyTemperature.date).toLocaleDateString()}</p>
          <p>Temperature: {bodyTemperature.temperature}</p>
        </div>
      ))}
    </div>
  );
};

export default PatientProfile;
