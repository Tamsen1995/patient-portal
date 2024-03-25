import { useState } from "react";
import Modal from "react-modal";

interface MedicationFormProps {
  patientId: string;
  className?: string;
}

const MedicationForm: React.FC<MedicationFormProps> = ({
  patientId,
  className,
}) => {
  // State for form fields
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/patients/${patientId}/medications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            dosage,
            start_date: startDate,
            end_date: endDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear form fields after successful submission
      setName("");
      setDosage("");
      setStartDate("");
      setEndDate("");
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  // Render form
  return (
    <div className={className}>
      <button onClick={() => setModalIsOpen(true)}>Add medication</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
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
      </Modal>
    </div>
  );
};

export default MedicationForm;
