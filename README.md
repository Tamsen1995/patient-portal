# Medical Platform for Healthcare Providers

## Introduction

This platform is designed to empower healthcare providers with a comprehensive tool to manage patient information effectively. Tailored for a medical company, it offers an intuitive interface to access and update patient data, including health metrics and medication schedules. It's built with the focus on enhancing the quality of care and streamlining the process of patient data management.

## Features

- **Patient List:** View a list of patients with the option to access each patient's dedicated page.
- **Patient Summary:** Access patient details including name, age, height, weight, and gender.
- **Health Highlights:** Recommendations for daily actions like temperature readings and medication administration.
- **Historical Data:** View temperature charts and current medication details for the past 1, 3, or 6 months.
- **Data Management:** Ability to add or modify temperature readings and medication details, including dosage and administration records.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.

### Getting Started

1. **Backend Setup:**

   - Navigate to the `backend` directory:
     ```sh
     cd backend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the backend server:
     ```sh
     npm start
     ```

2. **Frontend Setup:**
   - Open a new terminal and navigate to the `frontend` directory:
     ```sh
     cd frontend
     ```
   - Install dependencies (if not already done):
     ```sh
     npm install
     ```
   - Start the development server:
     ```sh
     npm start
     ```
   - To launch in development mode, run:
     ```sh
     npm run dev
     ```

### Switching Between Patients

To switch between patients for demonstration purposes, use the provided interface to select a patient from the list. The platform utilizes `patient_data.json` to populate the database with sample patient information.

## Planned Enhancements

- **Expanded Patient Data:** We plan to include more comprehensive patient data in our system. This will include detailed medical history, known allergies, genetic information, lifestyle factors, and more. By having a more holistic view of the patient's health, healthcare providers can make more informed decisions and provide personalized care.

- **Real-Time Data Integration:** We aim to integrate our system with various medical devices and wearables. This will allow us to receive and process real-time health metrics such as heart rate, blood pressure, glucose levels, etc. This real-time data integration will enable healthcare providers to monitor patient health remotely and intervene promptly when necessary.

- **AI-Powered Suggestions:** We are working on leveraging AI models, specifically Long Short-Term Memory (LSTM) models, trained on vast medical datasets to offer relevant health suggestions. These LSTM models are particularly effective for time-series data, such as body temperature readings and medication intake records. They can help identify potential health risks, suggest preventive measures, and even assist in predicting future health trends based on past data.

- **Alert System:** We plan to implement an alert mechanism in our system. This feature will monitor the vital signs and other health metrics of patients and trigger alerts when these fall below safe thresholds. These alerts can be sent to both patients and their healthcare providers, ensuring immediate attention and action when a patient's health deteriorates.

## Going for Production

Before going into production, consider adding security measures, data encryption, and compliance with healthcare regulations. An action plan for these aspects will ensure a smooth transition to a production environment.

## Future Roadmap

The long-term vision includes implementing the planned enhancements with a clear tech roadmap and deploying the system on Google Cloud Platform. Details on the specific GCP services to be used and the infrastructure setup will be provided.
