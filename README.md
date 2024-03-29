# Medical Platform for Healthcare Providers

## Introduction

I designed this platform to empower healthcare providers with a comprehensive tool for managing patient information effectively. Tailored for a medical company, it provides an intuitive interface for accessing and updating patient data, including health metrics and medication schedules. My focus was on enhancing the quality of care and streamlining the process of patient data management.

## Features

- **Patient List:** I've made it possible to view a list of patients, each with the option to access a dedicated page for detailed information.
- **Patient Summary:** Users can access patient details, including name, age, height, weight, and gender.
- **Historical Data:** There's functionality to view temperature charts and current medication details for the past 1, 3, or 6 months.
- **Data Management:** I've enabled the ability to add or modify temperature readings and medication details, including dosage and administration records.

## Setup Instructions

### Prerequisites

- Ensure Node.js and npm are installed on your machine.

### Getting Started

0. **Make sure the right node version is installed:**

   ```sh
   nvm install
   ```

1. **Backend Setup:**

   - First, navigate to the `backend` directory:
     ```sh
     cd backend
     ```
   - Then, install dependencies:
     ```sh
     npm install
     ```
   - Finally, start the backend server:
     ```sh
     npm start
     ```

   The server will populate itself with the patient_data.json. You will see a progress bar.

2. **Frontend Setup:**
   - In a new terminal window, navigate to the `frontend` directory:
     ```sh
     cd frontend
     ```
   - Install dependencies if you haven't already:
     ```sh
     npm install
     ```
   - Start the development server:
     ```sh
     npm start
     ```
   - To launch in development mode, execute:
     ```sh
     npm run dev
     ```

### Switching Between Patients

For demonstration purposes, I've included an interface to switch between patients. The platform utilizes `patient_data.json` to populate the database with sample patient information.

## Planned Enhancements

- **Expanded Patient Data:** I plan to include more comprehensive patient data in our system. This will cover detailed medical history, known allergies, genetic information, lifestyle factors, and more. Having a holistic view of the patient's health will allow healthcare providers to make informed decisions and provide personalized care.

- **Real-Time Data Integration:** My aim is to integrate our system with various medical devices and wearables. This will enable us to receive and process real-time health metrics, such as heart rate, blood pressure, glucose levels, etc., allowing healthcare providers to monitor patient health remotely and intervene promptly when necessary.

- **AI-Powered Suggestions:** I'm working on leveraging AI models, specifically Long Short-Term Memory (LSTM) models, trained on vast medical datasets to offer relevant health suggestions. These models are effective for analyzing time-series data and can help identify potential health risks and predict future health trends.

- **Alert System:** I plan to implement an alert mechanism in our system to monitor vital signs and other health metrics, triggering alerts when these metrics fall below safe thresholds. This will ensure immediate attention and action to protect patient health.

## Going for Production

Before moving this project into production, I plan to implement key security measures, including data encryption and ensuring compliance with healthcare regulations. Developing a comprehensive action plan for these critical aspects will facilitate a seamless transition to a production environment, protecting patient data and adhering to legal and ethical standards.

## Future Roadmap

The long-term vision includes implementing the planned enhancements with a clear tech roadmap and deploying the system on Google Cloud Platform. I will provide details on the specific GCP services to be used and the infrastructure setup.
