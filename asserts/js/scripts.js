document.addEventListener("DOMContentLoaded", () => {
  // dom elements
  const patientList = document.getElementById("patient-list");
  const rightProfile = document.getElementById("profile");
  const diagnosticlist = document.getElementById("diagnostic-list");
  const labResultsList = document.getElementById("lab-results");
  const bloodPressureChartCtx = document.getElementById("bloodPressureChart").getContext("2d");
  let bloodPressureChart;


  // Function to fetch patient data
  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "https://fedskillstest.coalitiontechnologies.workers.dev",
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("coalition:skills-test"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (data && data.length > 0) {
        patientList.innerHTML = ""; // Clear loading message
        // Populate patient list
        data.forEach((patient, index) => {
          const patientCard = document.createElement("li");
          patientCard.className = "patient-card";
          patientCard.setAttribute("data-index", index);

          patientCard.innerHTML = `
                        <img src="${patient.profile_picture}" alt="${patient.name}">
                        <div class="details">
                            <h3>${patient.name}</h3>
                            <p>${patient.gender}, ${patient.age}</p>
                        </div>
                        <div class="menu-bar">
                        <img src="asserts/images/icons/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="Menu">
                        </div>`;

          // Attach click event to display details
          patientCard.addEventListener("click", () => {
            // Clear previous selection
            document.querySelectorAll(".patient-card").forEach((card) => {
              card.style.backgroundColor = ""; // Reset background
            });
            // Highlight selected card
            patientCard.style.backgroundColor = "lightgreen";
            // Display patient details
            displayPatientDetails(patient);
          });

          patientList.appendChild(patientCard);
        });
      } else {
        patientList.innerHTML = "<p>No patients found.</p>";
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      patientList.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
  };
  // Fetch patients on page load
  fetchPatients();

  
  console.log(rightProfile);
  // Function to display patient details
  const displayPatientDetails = (patient) => {
    // Clear previous details
    rightProfile.innerHTML = "";
    // Create patient info container dynamically
    const rProfile = document.createElement("div");
    rProfile.className = "rprofile";
    // Determine the gender icon dynamically
    const genderIcon =
      patient.gender.toLowerCase() === "female"
        ? "asserts/images/icons/femaleicon.svg"
        : "asserts/images/icons/maleicon.svg";
    
    rProfile.innerHTML = `
                <img src="${patient.profile_picture}" alt="${patient.name}">
                <h2>${patient.name}</h2>
                <div class="details">
                <img src="asserts/images/icons/BirthIcon.svg" alt="icon">
                <div class="d1">
                <p>Date of Birth</p>
                <p><strong> ${patient.date_of_birth || "N/A"}</strong></p>
                </div>
                </div>
                <div class="details">
                <img src="${genderIcon}" alt="icon">
                <div class="d1">
                <p>Gender</p>
                <p></strong>${patient.gender}</strong></p>
                </div>
                </div>
                <div class="details">
                <img src="asserts/images/icons/PhoneIcon.svg" alt="icon">
                <div class="d1">
                <p>Contact Info</p>
                <p><strong>${patient.phone_number || "N/A"}</strong></p>
                </div>
                </div>
                <div class="details">
                <img src="asserts/images/icons/PhoneIcon.svg" alt="icon">
                <div class="d1">
                <p>Emergency Contacts</strong></p>
                <p><strong> ${patient.emergency_contact || "N/A"}</strong></p>
                </div>
                </div>
                <div class="details">
                <img src="asserts/images/icons/insuranceicon.svg" alt="icon">
                <div class="d1">
                <p>Insurance Provider</p>
                <p><strong>${patient.insurance_type || "N/A"}</strong></p>
                </div>
                </div>
                <button>Show All Information</button>
                `;
              
    // Append the container to the profile section
    rightProfile.appendChild(rProfile);
    // logic for canvas 
    // Display chart for the selected patient
      const diagnosisHistory = patient.diagnosis_history;

      if (!diagnosisHistory || diagnosisHistory.length === 0) {
          alert("No data available for this patient.");
          return;
      }

      // Prepare data
      const labels = diagnosisHistory.map(item => {
      const monthAbbreviation = item.month.slice(0, 3).toUpperCase(); // Get first 3 letters of the month in uppercase
      return `${monthAbbreviation} ${item.year}`;
      });
      const systolicData = diagnosisHistory.map(item => item.blood_pressure?.systolic?.value || 0);
      const diastolicData = diagnosisHistory.map(item => item.blood_pressure?.diastolic?.value || 0);

      // Update or create the chart
      if (bloodPressureChart) {
          bloodPressureChart.destroy(); // Destroy the old chart
      }

      bloodPressureChart = new Chart(bloodPressureChartCtx, {
          type: "line",
          data: {
              labels: labels,
              datasets: [
                  {
                      label: "Systolic",
                      data: systolicData,
                      borderColor: "rgba(255, 99, 132, 1)",
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderWidth: 2,
                      tension: 0.4,
                  },
                  {
                      label: "Diastolic",
                      data: diastolicData,
                      borderColor: "rgba(54, 162, 235, 1)",
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderWidth: 2,
                      tension: 0.4,
                  },
              ],
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      position: "top",
                  },
              },
              scales: {
                  y: {
                      beginAtZero: true,
                      max: 200, // Adjust according to your data
                  },
              },
          },
      });
    // logic for Diagnostic history
    if (patient.diagnosis_history && patient.diagnosis_history.length > 0) {
      const { 
          respiratory_rate: { value: respiratory_value, levels: respiratory_levels },
          temperature: { value: temperature_value, levels: temperature_levels },
          heart_rate: { value: heart_rate_value, levels: heart_rate_levels },
          blood_pressure: {
              systolic: { value: Systolic_value, levels: Systolic_levels },
              diastolic: { value: diastolic_value, levels: diastolic_levels }
          }
      } = patient.diagnosis_history[0];
  
      const dataMap = {
          rvalue: respiratory_value,
          rlevel: respiratory_levels,
          tvalue: temperature_value,
          tlevel: temperature_levels,
          hvalue: heart_rate_value,
          hlevel: heart_rate_levels,
          svalue: Systolic_value,
          slevel: Systolic_levels,
          dvalue: diastolic_value,
          dlevel: diastolic_levels
      };
  
      for (const [id, value] of Object.entries(dataMap)) {
          document.getElementById(id).innerHTML = value;
      }
  } else {
      canvasContainer.innerHTML = "<p>No diagnostic history available.</p>";
  }
  

    // Display Diagnostic List
    if (patient.diagnostic_list && Array.isArray(patient.diagnostic_list) && patient.diagnostic_list.length > 0) {
        // Construct table headers
        let tableContent = `
            <thead>
                <tr>
                    <th>Problem/Diagnosis</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
        `;
    
        // Loop through diagnostic list to create table rows
        patient.diagnostic_list.forEach((diag) => {
            tableContent += `
                <tr>
                    <td>${diag.name || "N/A"}</td>
                    <td>${diag.description || "N/A"}</td>
                    <td>${diag.status || "N/A"}</td>
                </tr>
            `;
        });
    
        // Close the tbody tag
        tableContent += `</tbody>`;
        
        // Insert the constructed HTML into the table
        diagnosticlist.innerHTML = tableContent;
    } else {
        // If no diagnostics, display a message
        diagnosticlist.innerHTML = `<p>No diagnostic details available.</p>`;
    }


   // Display Lab Results
if (patient.lab_results && Array.isArray(patient.lab_results) && patient.lab_results.length > 0) {
    // Clear previous content
    labResultsList.innerHTML = "";

    // Iterate through the lab_results array
    patient.lab_results.forEach((testName) => {
        // Create a list item
        const listItem = document.createElement("li");

        // Populate the list item with the test name and a placeholder download button
        listItem.innerHTML = `
            ${testName || "N/A"}
            <button>
                <img src="asserts/images/icons/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="Download">
            </button>
        `;

        // Append the list item to the lab results container
        labResultsList.appendChild(listItem);
    });
} else {
    // If no lab results are found, display a message
    labResultsList.innerHTML = `<p>No lab results available.</p>`;
}
 
  };
});
