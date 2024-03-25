import { Medication } from "@/pages/patient/[id]";
import { useState } from "react";

interface MedicationFormProps {
  patientId: string;
  className?: string;
  medication?: Medication | null;
}

const MedicationForm: React.FC<MedicationFormProps> = ({
  patientId,
  className,
  medication,
}) => {
  // State for form fields
  const [name, setName] = useState(medication ? medication.name : "");
  const [dosage, setDosage] = useState(medication ? medication.dosage : "");
  const [startDate, setStartDate] = useState(
    medication ? new Date(medication.start_date) : new Date()
  );
  const [endDate, setEndDate] = useState(
    medication ? new Date(medication.end_date) : new Date()
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = medication
      ? `http://localhost:3001/patients/${patientId}/medications/${medication.id}`
      : `http://localhost:3001/patients/${patientId}/medications`;

    const method = medication ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          dosage,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear form fields after successful submission
      setName("");
      setDosage("");
      setStartDate(new Date());
      setEndDate(new Date());
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  // Render form
  return (
    <div className={className}>
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
          value={startDate.toISOString().split("T")[0]}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={endDate.toISOString().split("T")[0]}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MedicationForm;
