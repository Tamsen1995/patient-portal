import { useState } from "react";

interface TemperatureFormProps {
  patientId: string;
}

const TemperatureForm: React.FC<TemperatureFormProps> = ({ patientId }) => {
  const [temperatureDate, setTemperatureDate] = useState("");
  const [temperatureValue, setTemperatureValue] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission here
    // For example, you might make a POST request to your API
    const response = await fetch(
      `http://localhost:3001/patients/${patientId}/temperatures`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: temperatureDate,
          temperature: temperatureValue,
        }),
      }
    );

    const data = await response.json();
    // Handle the response data
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-md my-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date:
        </label>
        <input
          type="date"
          value={temperatureDate}
          onChange={(e) => setTemperatureDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Temperature:
        </label>
        <input
          type="number"
          value={temperatureValue}
          onChange={(e) => setTemperatureValue(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add/Update Temperature
      </button>
    </form>
  );
};

export default TemperatureForm;
