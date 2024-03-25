import { useState } from "react";

interface MedicationFormProps {
  patientId: string;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ patientId }) => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send a POST or PUT request to the server to add or update the medication
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Medication name"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        placeholder="Dosage"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default MedicationForm;
