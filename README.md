# HealthCare_Dashboard_fetchapi

# HealthCare Dashboard

A comprehensive and interactive dashboard for monitoring patient health metrics, diagnosis history, vitals, and lab results. This project provides a streamlined user interface for healthcare professionals to manage patient data efficiently.

![HealthCare Dashboard Preview](screenshots/after%20selecting%20patient.jpg)

---

## Features

- **Patient Overview**: View patient details, including profile, contact information, and emergency contacts.
- **Vitals Monitoring**: Display key metrics such as blood pressure, heart rate, temperature, and respiratory rate.
- **Diagnosis History**: Graphical representation of blood pressure trends (systolic and diastolic) over the last six months.
- **Lab Results**: List of lab tests with easy download functionality.
- **Diagnostic List**: Detailed table of medical diagnoses and descriptions.

---

## Technologies Used

- **Frontend**: 
  - HTML5, CSS3, JavaScript (ES6+)
  - Responsive grid layout using CSS
  - Chart.js for graphical data representation
- **Backend**: 
  - Fetching data from a REST API
  - JSON parsing and DOM manipulation
- **Design Tools**: 
  - Google Fonts for typography
  - Icons and SVGs for enhanced UI

---

## Project Structure

```
├── index.html             # Main HTML file
├── assets/                # Folder for project resources
│   ├── css/
│   │   └── style.css      # Stylesheet for the project
│   ├── js/
│   │   └── scripts.js     # JavaScript for interactivity
│   ├── images/            # Images and icons used in the project
├── screenshots/           # Folder for project screenshots
│   └── output.png         # Screenshot showcasing the dashboard
├── README.md              # Project documentation

```

## API Integration
The dashboard fetches data from the following endpoint:

URL: https://fedskillstest.coalitiontechnologies.workers.dev
Method: GET
Authorization: Basic Auth
Username: coalition
Password: skills-test
Example code snippet for fetching patient data:

javascript
```
const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
    method: "GET",
    headers: {
        Authorization: "Basic " + btoa("coalition:skills-test"),
    },
});
const data = await response.json();
```


## Key Components
### Navigation Panel
Provides access to the following sections:
* Overview
* Patients
* Schedule
* Messages
* Transactions
### Patients Section
* Displays a list of patients with basic information.
* Dynamic updates for selected patient details.
### Dashboard
* Diagnosis History: Line charts for blood pressure trends.
* Vitals Section: Cards showcasing key health metrics.
* Diagnostic List: Comprehensive table of diagnoses.
* Lab Results: Test names with download functionality.

## Future Improvements
* Mobile Responsiveness: Enhance the dashboard experience on smaller screens.
* Edit Functionality: Add features to edit and update patient details directly.
* Real-Time Notifications: Integrate alerts for critical health changes.
* Advanced Analytics: Include predictive analytics for early diagnosis.

## Screenshots

### Dashboard Overview before selecting Patient Profile
![Dashboard Preview](screenshots/before%20selecting%20patient.jpg)
### Patient Profile
![Patient Profile Preview](screenshots/after%20selecting%20patient.jpg)