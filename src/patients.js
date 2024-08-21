async function loadPatients() {
  try {
    const patients = await window.electronAPI.getAllPatients();
    const tableBody = document.getElementById("patients-table-body");
    tableBody.innerHTML = "";

    patients.forEach((patient) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${patient.name}</td>
        <td>${patient.age}</td>
        <td>${patient.contact}</td>
        <td>${patient.email}</td>
        <td>
          <input type="checkbox" ${patient.diabetes ? "checked" : ""} disabled> Diabetes
          <input type="checkbox" ${patient.hypertension ? "checked" : ""} disabled> Hypertension
          <input type="checkbox" ${patient.heartDisease ? "checked" : ""} disabled> Heart Disease
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading patients:", error);
    alert("Failed to load patients. Please try again.");
  }
}

// Call loadPatients when the page loads
// document.addEventListener('DOMContentLoaded', loadPatients);

// async function addPatient() {
//   const name = document.getElementById("patient-name").value;
//   const age = document.getElementById("patient-age").value;
//   const contact = document.getElementById("patient-contact").value;
//   const email = document.getElementById("patient-email").value;

//   if (!name || !age || !contact || !email) {
//     alert("Please fill in all fields");
//     return;
//   }

//   const newPatient = {
//     name: name,
//     age: parseInt(age),
//     contact: contact,
//     email: email
//   };

//   try {
//     await window.electronAPI.addPatient(newPatient);

//     // Clear the form
//     document.getElementById("patient-name").value = "";
//     document.getElementById("patient-age").value = "";
//     document.getElementById("patient-contact").value = "";
//     document.getElementById("patient-email").value = "";

//     // Refresh the patients list
//     await loadPatients();

//     // Hide the form after adding
//     document.getElementById("add-patient-form").style.display = "none";

//     alert("New patient added successfully!");
//   } catch (error) {
//     console.error("Error adding patient:", error);
//     alert("Failed to add patient. Please try again.");
//   }
// }

// function addPatient(event) {
//   event.preventDefault();

//   const name = document.getElementById("patient-name").value;
//   const age = document.getElementById("patient-age").value;
//   const contact = document.getElementById("patient-contact").value;

//   if (!name || !age || !contact) {
//     alert("Please fill in all fields");
//     return;
//   }

//   const newPatient = {
//     id: Date.now(), // Using timestamp as a simple unique ID
//     name: name,
//     age: parseInt(age),
//     contact: contact,
//   };

//   // Assuming we have a patients array to store patient data
//   patients.push(newPatient);

//   // Clear the form
//   document.getElementById("patient-name").value = "";
//   document.getElementById("patient-age").value = "";
//   document.getElementById("patient-contact").value = "";

//   // Refresh the patients list
//   loadPatients();

//   // Hide the form after adding
//   document.getElementById("add-patient-form").style.display = "none";

//   alert("New patient added successfully!");
// }

document.addEventListener("DOMContentLoaded", () => {
  loadPatients();
  loadPendingPayments();
  setupTabSwitching();
  populateMedicalHistoryCheckboxes();

  const addPatientBtn = document.getElementById("add-patient");
  const addPatientForm = document.getElementById("add-patient-form");
  const searchInput = document.getElementById("search-input");
  const addAppointmentBtn = document.getElementById("add-appointment");
  const addItemBtn = document.getElementById("add-item");
  const inventorySearch = document.getElementById("inventory-search");
  const patientsTable = document.getElementById("patients-table");
  if (patientsTable) {
    patientsTable.addEventListener("click", handlePatientClick);
  }
  if (addPatientBtn) {
    addPatientBtn.addEventListener("click", showAddPatientForm);
  }

  if (addPatientForm) {
    addPatientForm.addEventListener("submit", addPatient);
  }

  if (searchInput) {
    searchInput.addEventListener("input", searchPatients);
  } else {
    console.error("Search input field not found");
  }

  if (addAppointmentBtn) {
    addAppointmentBtn.addEventListener("click", showAddAppointmentForm);
  }

  if (addItemBtn) {
    addItemBtn.addEventListener("click", showAddInventoryItemForm);
  }

  if (inventorySearch) {
    inventorySearch.addEventListener("input", searchInventory);
  }

  document
    .getElementById("generate-financial-report")
    .addEventListener("click", generateFinancialReport);
  document
    .getElementById("generate-patient-report")
    .addEventListener("click", generatePatientReport);
  document
    .getElementById("generate-inventory-report")
    .addEventListener("click", generateInventoryReport);

  const patientsTabLink = document.querySelector('a[href="#patients"]');
  if (patientsTabLink) {
    patientsTabLink.addEventListener("click", loadPatientsTab);
  }

  const patientForm = document.getElementById("patient-form");
  if (patientForm) {
    patientForm.addEventListener("submit", savePatientInfo);
  }
});

function setupTabSwitching() {
  const tabButtons = document.querySelectorAll(".sidebar .tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.classList.add("active");
        if (tabId === "patients") {
          loadPatientsTab();
        }
      }
    });
  });
}

function showAddAppointmentForm() {
  // Implement this function to show a form for adding a new appointment
  console.log("Add appointment form should be shown");
}

function showAddInventoryItemForm() {
  // Implement this function to show a form for adding a new inventory item
  console.log("Add inventory item form should be shown");
}

function searchInventory() {
  // Implement this function to search the inventory
  console.log("Inventory search functionality should be implemented");
}

function generateFinancialReport() {
  // Implement this function to generate a financial report
  console.log("Financial report should be generated");
}

function generatePatientReport() {
  // Implement this function to generate a patient report
  console.log("Patient report should be generated");
}

function generateInventoryReport() {
  // Implement this function to generate an inventory report
  console.log("Inventory report should be generated");
}

async function loadPatientsTab() {
  const patientsTab = document.getElementById("patients");
  if (!patientsTab) return;
  // Create and insert the patients list structure
  patientsTab.innerHTML = `
      <h2>Patients</h2>
       <div id="patient-actions">
    <input type="text" id="search-input" placeholder="Search patients...">
  </div>
      <table id="patients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="patients-body">
          <!-- Patient rows will be dynamically inserted here -->
        </tbody>
      </table>
      <div id="patient-details" style="display: none;"></div>
    `;

  // Now load the patients data
  loadPatients();

  // Add event listener for patient row clicks
  document.getElementById("patients-table").addEventListener("click", handlePatientClick);
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", searchPatients);
  } else {
    console.error("Search input field not found");
  }
}

async function handlePatientClick(event) {
  const patientRow = event.target.closest("tr");
  if (patientRow && patientRow.dataset.patientId) {
    const patientId = patientRow.dataset.patientId;
    await loadPatientDetails(patientId);
  }
}

async function loadPatientDetails(patientId) {
  const patientDetails = document.getElementById("patient-details");
  if (!patientDetails) return;

  try {
    // Fetch the patient.html content
    const response = await fetch("patient.html");
    const content = await response.text();

    // Insert the content into the patient-details div
    patientDetails.innerHTML = content;
    patientDetails.style.display = "block";

    // Fetch patient data and populate the form
    const patient = await window.api.getPatientById(patientId);
    document.getElementById("patient-id").value = patient.id;
    document.getElementById("name").value = patient.name;
    document.getElementById("gender").value = patient.gender;

    document.getElementById("dob").value = patient.dob;
    document.getElementById("address").value = patient.address;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("email").value = patient.email;
    // Populate medical history checkboxes
    populateMedicalHistoryCheckboxes();
    // Check the appropriate medical history checkboxes
    Object.keys(patient).forEach((key) => {
      const checkbox = document.getElementById(key);
      if (checkbox && checkbox.type === "checkbox") {
        checkbox.checked = patient[key];
      }
    });

    // Load procedures
    await loadProcedures(patientId);

    // Add event listeners for the form and buttons
    const patientForm = document.getElementById("patient-form");
    if (patientForm) {
      patientForm.addEventListener("submit", savePatientInfo);
    }

    const deletePatientBtn = document.getElementById("delete-patient");
    if (deletePatientBtn) {
      deletePatientBtn.addEventListener("click", () => deletePatient(patientId));
    }

    const addProcedureBtn = document.getElementById("add-procedure");
    if (addProcedureBtn) {
      addProcedureBtn.addEventListener("click", () => showAddProcedureForm(patientId));
    }
  } catch (error) {
    console.error("Error loading patient details:", error);
  }
}

async function loadPatients() {
  try {
    const patients = await window.api.getAllPatients();
    const tableBody = document.getElementById("patients-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    patients.forEach((patient) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
              <td>${patient.id}</td>
              <td>${patient.name}</td>
              <td>
                <button onclick="editPatient(${patient.id})">Edit</button>
                <button onclick="deletePatient(${patient.id})">Delete</button>
              </td>
            `;
      row.dataset.patientId = patient.id;
      row.addEventListener("click", (event) => {
        if (!event.target.closest("button")) {
          togglePatientDetails(row, patient);
        }
      });
    });
  } catch (error) {
    console.error("Error loading patients:", error);
  }
}

async function togglePatientDetails(row, patient) {
  const detailsRow = row.nextElementSibling;
  if (detailsRow && detailsRow.classList.contains("patient-details")) {
    detailsRow.remove();
  } else {
    const procedures = await window.api.getProcedures(patient.id);
    const newRow = row.insertAdjacentElement("afterend", document.createElement("tr"));
    newRow.classList.add("patient-details");
    newRow.innerHTML = `
          <td colspan="3">
            <div>
            <p><strong>Gender:</strong> ${patient.gender}</p>
              <p><strong>Date of Birth:</strong> ${patient.dob}</p>
              <p><strong>Address:</strong> ${patient.address}</p>
              <p><strong>Phone:</strong> ${patient.phone}</p>
              <p><strong>Email:</strong> ${patient.email}</p>
              <p><strong>Medical History:</strong> ${patient.medical_history}</p>

              <h4>Procedures</h4>
              <table class="procedures-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Procedure</th>
                    <th>Cost</th>
                    <th>Paid</th>
                    <th>Balance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${procedures
                    .map(
                      (proc) => `
                    <tr>
                      <td>${proc.date}</td>
                      <td>${proc.procedure}</td>
                      <td>$${proc.cost.toFixed(2)}</td>
                      <td>$${proc.paid.toFixed(2)}</td>
                      <td>$${(proc.cost - proc.paid).toFixed(2)}</td>
                      <td>
                        <button onclick="editProcedure(${proc.id})">Edit</button>
                        <button onclick="deleteProcedure(${proc.id})">Delete</button>
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
              <button onclick="showAddProcedureForm(${patient.id})">Add Procedure</button>
            </div>
          </td>
        `;
  }
}

async function editPatient(patientId) {
  try {
    const patient = await window.api.getPatientById(patientId);
    showEditPatientForm(patient);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    alert("Error fetching patient data");
  }
}

function showEditPatientForm(patient) {
  const form = document.createElement("form");
  form.innerHTML = `
        <div class="form-header">
          <h2>Edit Patient</h2>
          <button type="button" class="close-btn">&times;</button>
        </div>
        <input type="hidden" id="edit-patient-id" value="${patient.id}">
        <label for="edit-name">Name:</label>
        <input type="text" id="edit-name" value="${patient.name}" required>

        <label for="edit-gender">Gender:</label>
        <input type="text" id="edit-gender" value="${patient.gender}" required>

        <label for="edit-dob">Date of Birth:</label>
        <input type="date" id="edit-dob" value="${patient.dob}" required>
        <label for="edit-address">Address:</label>
        <input type="text" id="edit-address" value="${patient.address}" required>
        <label for="edit-phone">Phone Number:</label>
        <input type="tel" id="edit-phone" value="${patient.phone}" required>

        <label for="edit-email">Email:</label>
        <input type="text" id="edit-email" value="${patient.email}" required>

         <h3>Medical History</h3>
    <div class="medical-history">
      ${generateMedicalHistoryCheckboxes(patient)}
    </div>

        <button type="submit">Save Changes</button>
      `;
  form.addEventListener("submit", updatePatient);

  const container = document.createElement("div");
  container.appendChild(form);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(container);

  document.body.appendChild(modal);

  const closeBtn = form.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => modal.remove());
}

async function updatePatient(event) {
  event.preventDefault();
  const patientData = {
    id: document.getElementById("edit-patient-id").value,
    name: document.getElementById("edit-name").value,
    gender: document.getElementById("edit-gender").value,
    dob: document.getElementById("edit-dob").value,
    address: document.getElementById("edit-address").value,
    phone: document.getElementById("edit-phone").value,
    email: document.getElementById("edit-email").value,
  };

  // Add medical history fields
  const medicalHistoryCheckboxes = document.querySelectorAll(
    '.medical-history input[type="checkbox"]'
  );
  medicalHistoryCheckboxes.forEach((checkbox) => {
    patientData[checkbox.id] = checkbox.checked;
  });

  try {
    await window.api.updatePatient(patientData);
    loadPatients();
    event.target.closest(".modal").remove();
    alert("Patient information updated successfully");
  } catch (error) {
    console.error("Error updating patient:", error);
    alert("Error updating patient: " + error.message);
  }
}

async function deletePatient(patientId) {
  if (confirm("Are you sure you want to delete this patient?")) {
    try {
      await window.api.deletePatient(patientId);
      loadPatients(); // Refresh the patient list after deletion
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Error deleting patient");
    }
  }
}

async function loadPendingPayments() {
  try {
    const pendingPayments = await window.api.getPendingPayments();
    const tableBody = document.getElementById("pending-payments-body");
    tableBody.innerHTML = "";
    pendingPayments.forEach((payment) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
            <td>${payment.id}</td>
            <td>${payment.name}</td>
            <td>$${payment.balance.toFixed(2)}</td>
              <td>
            <button onclick="editPendingPayment(${payment.id})">Edit</button>
            <button onclick="deletePendingPayment(${payment.id})">Delete</button>
          </td>
          `;
    });
  } catch (error) {
    console.error("Error loading pending payments:", error);
  }
}

function showAddPatientForm() {
  const form = document.createElement("form");
  form.innerHTML = `
        <div class="form-header">
          <h2>Add New Patient</h2>
          <button type="button" class="close-btn">&times;</button>
        </div>
        <label for="name">Name:</label>
        <input type="text" id="name" required>
        <label for="gender">Gender:</label>
        <select id="gender" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" required>
        <label for="address">Address:</label>
        <input type="text" id="address" >
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" required>
        <label for="email">Email:</label>
        <input type="email" id="email" >
        <h3>Medical History</h3>
          <div class="medical-history">
      ${generateMedicalHistoryCheckboxes()}
    </div>
    
    <button type="submit">Add Patient</button>
  `;
  form.addEventListener("submit", addPatient);

  const container = document.createElement("div");
  container.appendChild(form);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(container);

  document.body.appendChild(modal);

  const closeBtn = form.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => modal.remove());
  populateMedicalHistoryCheckboxes();
}
function showAddPatientForm() {
  const form = document.getElementById("add-patient-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

async function addPatient(event) {
  event.preventDefault(); // stop the form from submitting

  const data = new FormData(event.target);
  console.log([...data.keys()]);

  const patientData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
  };
  const conditions = [];
  [...data.keys()].forEach((key) => {
    conditions.push(key);
  });
  patientData.medical_history = conditions.join(", ");

  // Add medical history fields
  const medicalHistoryCheckboxes = document.querySelectorAll(
    '.medical-history input[type="checkbox"]'
  );
  medicalHistoryCheckboxes.forEach((checkbox) => {
    patientData[checkbox.id] = checkbox.checked;
  });

  if (
    !patientData.name ||
    !patientData.gender ||
    !patientData.dob ||
    !patientData.address ||
    !patientData.phone ||
    !patientData.email
  ) {
    alert("Please fill in all fields");
    return;
  }

  try {
    await window.api.addPatient(patientData);
    loadPatients();
    alert("Patient added successfully");
    this.reset();
    window.location.reload();
    return;
  } catch (error) {
    console.error("Error adding patient:", error);
    alert("Error adding patient: " + error.message);
  }
}

function searchPatients() {
  // Get the search input value
  const searchTerm = document.getElementById("search-input").value.toLowerCase().trim();

  // Get all patient rows
  const rows = document.querySelectorAll("#patients-body tr");

  // Loop through each row and check if it matches the search term
  rows.forEach((row) => {
    const id = row.cells[0].textContent.toLowerCase();
    const name = row.cells[1].textContent.toLowerCase();
    const phone = row.cells[2]?.textContent.toLowerCase() || "";

    const matches =
      id.includes(searchTerm) || name.includes(searchTerm) || phone.includes(searchTerm);

    // Show or hide the row based on the match
    row.style.display = matches ? "" : "none";
  });

  // Log the number of visible rows after search
  const visibleRows = document.querySelectorAll("#patients-body tr:not([style*='display: none'])");
  console.log(`Visible rows after search: ${visibleRows.length}`);
}

// Add event listener to the search input
document.getElementById("search-input").addEventListener("input", searchPatients);
const searchTerm = document.getElementById("search-input").value.toLowerCase();
const rows = document.querySelectorAll("#patients-body tr");

rows.forEach((row) => {
  const id = row.cells[0].textContent.toLowerCase(); // Patient ID
  const name = row.cells[1].textContent.toLowerCase(); // Patient Name
  const phone = row.cells[2]?.textContent.toLowerCase() || ""; // Patient Phone (if present)
  console.log("Checking row:", name, "against search term:", searchTerm);

  const matches =
    id.includes(searchTerm) || name.includes(searchTerm) || phone.includes(searchTerm);
  row.style.display = matches ? "" : "none";
});

function openPatientDetails(patientId) {
  window.location.href = `patient.html?id=${patientId}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the patientId from the query string
  const patientId = new URLSearchParams(window.location.search).get("id");

  // If a patientId exists, load the patient info and procedures
  if (patientId) {
    loadPatientInfo(patientId);
    loadProcedures(patientId);
  }

  // Safely attach event listeners if elements are present in the DOM
  const patientForm = document.getElementById("patient-form");
  if (patientForm) {
    patientForm.addEventListener("submit", savePatientInfo);
  }

  const deletePatientBtn = document.getElementById("delete-patient");
  if (deletePatientBtn) {
    deletePatientBtn.addEventListener("click", deletePatient);
  }

  const addProcedureBtn = document.getElementById("add-procedure");
  if (addProcedureBtn) {
    addProcedureBtn.addEventListener("click", showAddProcedureForm);
  }
});

async function loadPatientInfo(patientId) {
  try {
    const patient = await window.api.getPatientById(patientId);
    document.getElementById("name").value = patient.name;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("dob").value = patient.dob;
    document.getElementById("address").value = patient.address;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("email").value = patient.email;
    document.getElementById("patient-id").value = patient.id;
  } catch (error) {
    console.error("Error loading patient info:", error);
  }
}

function showAddProcedureForm(patientId) {
  const form = document.createElement("form");
  form.innerHTML = `
        <div class="form-header">
          <h2>Add New Procedure</h2>
          <button type="button" class="close-btn">&times;</button>
        </div>
        <input type="hidden" id="procedure-patient-id" value="${patientId}">
        <label for="procedure-date">Date:</label>
        <input type="date" id="procedure-date" required>
        <label for="procedure-name">Procedure:</label>
        <input type="text" id="procedure-name" required>
        <label for="procedure-cost">Cost:</label>
        <input type="number" id="procedure-cost" step="0.01" required>
        <label for="procedure-paid">Paid:</label>
        <input type="number" id="procedure-paid" step="0.01" required>
        <button type="submit">Add Procedure</button>
      `;
  form.addEventListener("submit", addProcedure);

  const container = document.createElement("div");
  container.appendChild(form);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(container);

  document.body.appendChild(modal);

  const closeBtn = form.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => modal.remove());
}

async function loadProcedures(patientId) {
  try {
    const procedures = await window.api.getProcedures(patientId);
    const tableBody = document.getElementById("procedures-body");
    tableBody.innerHTML = "";
    procedures.forEach((procedure) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
            <td>${procedure.date}</td>
            <td>${procedure.procedure}</td>
            <td>$${procedure.cost.toFixed(2)}</td>
            <td>$${procedure.paid.toFixed(2)}</td>
            <td>$${(procedure.cost - procedure.paid).toFixed(2)}</td>
            <td>
              <button onclick="editProcedure(${procedure.id})">Edit</button>
              <button onclick="deleteProcedure(${procedure.id})">Delete</button>
            </td>
          `;
    });
  } catch (error) {
    console.error("Error loading procedures:", error);
  }
}

async function savePatientInfo(event) {
  event.preventDefault();
  const patientData = {
    id: document.getElementById("patient-id").value,
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
  };

  try {
    await window.api.updatePatient(patientData);
    alert("Patient information updated successfully");
  } catch (error) {
    console.error("Error updating patient info:", error);
    alert("Error updating patient information");
  }
}

async function addProcedure(event) {
  event.preventDefault();
  const procedureData = {
    patient_id: document.getElementById("procedure-patient-id").value,
    date: document.getElementById("procedure-date").value,
    procedure: document.getElementById("procedure-name").value,
    cost: parseFloat(document.getElementById("procedure-cost").value),
    paid: parseFloat(document.getElementById("procedure-paid").value),
  };

  try {
    await window.api.addProcedure(procedureData);
    event.target.closest(".modal").remove();
    loadPatients(); // Refresh the patient list to show updated procedures
  } catch (error) {
    console.error("Error adding procedure:", error);
    alert("Error adding procedure: " + error.message);
  }
}

function editProcedure(procedureId) {
  window.api
    .getProcedureById(procedureId)
    .then((procedure) => {
      showEditProcedureForm(procedure);
    })
    .catch((error) => {
      console.error("Error fetching procedure:", error);
      alert("Error fetching procedure details");
    });
}

function showEditProcedureForm(procedure) {
  const form = document.createElement("form");
  form.innerHTML = `
        <div class="form-header">
          <h2>Edit Procedure</h2>
          <button type="button" class="close-btn">&times;</button>
        </div>
        <input type="hidden" id="edit-procedure-id" value="${procedure.id}">
        <input type="hidden" id="edit-procedure-patient-id" value="${procedure.patient_id}">
        <label for="edit-procedure-date">Date:</label>
        <input type="date" id="edit-procedure-date" value="${procedure.date}" required>
        <label for="edit-procedure-name">Procedure:</label>
        <input type="text" id="edit-procedure-name" value="${procedure.procedure}" required>
        <label for="edit-procedure-cost">Cost:</label>
        <input type="number" id="edit-procedure-cost" step="0.01" value="${procedure.cost}" required>
        <label for="edit-procedure-paid">Paid:</label>
        <input type="number" id="edit-procedure-paid" step="0.01" value="${procedure.paid}" required>
        <button type="submit">Save Changes</button>
      `;
  form.addEventListener("submit", updateProcedure);

  const container = document.createElement("div");
  container.appendChild(form);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(container);

  document.body.appendChild(modal);

  const closeBtn = form.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => modal.remove());
}

async function updateProcedure(event) {
  event.preventDefault();
  const procedureData = {
    id: document.getElementById("edit-procedure-id").value,
    patient_id: document.getElementById("edit-procedure-patient-id").value,
    date: document.getElementById("edit-procedure-date").value,
    procedure: document.getElementById("edit-procedure-name").value,
    cost: parseFloat(document.getElementById("edit-procedure-cost").value),
    paid: parseFloat(document.getElementById("edit-procedure-paid").value),
  };

  try {
    await window.api.updateProcedure(procedureData);
    event.target.closest(".modal").remove();
    loadPatients(); // Refresh the patient list to show updated procedures
  } catch (error) {
    console.error("Error updating procedure:", error);
    alert("Error updating procedure: " + error.message);
  }
}

async function deleteProcedure(procedureId) {
  if (confirm("Are you sure you want to delete this procedure?")) {
    try {
      await window.api.deleteProcedure(procedureId);
      loadPatients(); // Refresh the patient list to show updated procedures
    } catch (error) {
      console.error("Error deleting procedure:", error);
      alert("Error deleting procedure");
    }
  }
}

function deleteProcedure(procedureId) {
  // TODO: Implement delete procedure functionality
  console.log("Delete procedure:", procedureId);
}

function editPendingPayment(paymentId) {
  window.api
    .getPendingPaymentById(paymentId)
    .then((payment) => {
      showEditPendingPaymentForm(payment);
    })
    .catch((error) => {
      console.error("Error fetching pending payment:", error);
      alert("Error fetching pending payment details");
    });
}

function showEditPendingPaymentForm(payment) {
  const form = document.createElement("form");
  form.innerHTML = `
        <div class="form-header">
          <h2>Edit Pending Payment</h2>
          <button type="button" class="close-btn">&times;</button>
        </div>
        <input type="hidden" id="edit-payment-id" value="${payment.id}">
        <label for="edit-payment-amount">Amount:</label>
        <input type="number" id="edit-payment-amount" step="0.01" value="${payment.balance}" required>
        <button type="submit">Save Changes</button>
      `;
  form.addEventListener("submit", updatePendingPayment);

  const container = document.createElement("div");
  container.appendChild(form);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(container);

  document.body.appendChild(modal);

  const closeBtn = form.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => modal.remove());
}

async function updatePendingPayment(event) {
  event.preventDefault();
  const paymentData = {
    id: document.getElementById("edit-payment-id").value,
    balance: parseFloat(document.getElementById("edit-payment-amount").value),
  };

  try {
    await window.api.updatePendingPayment(paymentData);
    event.target.closest(".modal").remove();
    loadPendingPayments(); // Refresh the pending payments list
  } catch (error) {
    console.error("Error updating pending payment:", error);
    alert("Error updating pending payment: " + error.message);
  }
}

async function deletePendingPayment(paymentId) {
  if (confirm("Are you sure you want to delete this pending payment?")) {
    try {
      await window.api.deletePendingPayment(paymentId);
      loadPendingPayments(); // Refresh the pending payments list
    } catch (error) {
      console.error("Error deleting pending payment:", error);
      alert("Error deleting pending payment");
    }
  }
}

function generateMedicalHistoryCheckboxes() {
  const medicalConditions = [
    "Heart failure",
    "Hypertension",
    "Angina",
    "Heart disease/Attack",
    "Tuberculosis (TB)",
    "Asthma",
    "Artificial heart valve",
    "Cardiac pacemaker",
    "Congenital heart lesions",
    "Heart surgery",
    "Anemia",
    "Angioplasty",
    "Chemotherapy",
    "Radiotherapy",
    "Cough",
    "Flu",
    "Stroke",
    "Kidney trouble",
    "Ulcers",
    "Hyperacidity",
    "Sinus trouble",
    "Allergies",
    "Diabetes",
    "Thyroid disease",
    "Arthritis",
    "Steroids",
    "Pain in jaw joints",
    "Hemophilia",
    "Blood transfusion",
    "Epilepsy/Seizures",
    "Fainting spells",
    "Nervousness",
    "Psychiatric treatment",
    "Smoker",
    "Anticoagulants",
    "AIDS/HIV",
    "Hepatitis A",
    "Hepatitis B",
    "Hepatitis C",
    "Alcohol Abuse",
    "Drug abuse",
  ];

  return medicalConditions
    .map((condition) => {
      const id = condition.toLowerCase().replace(/[^a-z0-9]/g, "_");
      return `
      <div class="checkbox-group">
        <input type="checkbox" id="${id}" name="${id}">
        <label for="${id}">${condition}</label>
      </div>
    `;
    })
    .join("");
}

function populateMedicalHistoryCheckboxes() {
  const medicalConditions = [
    "Heart failure",
    "Hypertension",
    "Angina",
    "Heart disease/Attack",
    "Tuberculosis (TB)",
    "Asthma",
    "Artificial heart valve",
    "Cardiac pacemaker",
    "Congenital heart lesions",
    "Heart surgery",
    "Anemia",
    "Angioplasty",
    "Chemotherapy",
    "Radiotherapy",
    "Cough",
    "Flu",
    "Stroke",
    "Kidney trouble",
    "Ulcers",
    "Hyperacidity",
    "Sinus trouble",
    "Allergies",
    "Diabetes",
    "Thyroid disease",
    "Arthritis",
    "Steroids",
    "Pain in jaw joints",
    "Hemophilia",
    "Blood transfusion",
    "Epilepsy/Seizures",
    "Fainting spells",
    "Nervousness",
    "Psychiatric treatment",
    "Smoker",
    "Anticoagulants",
    "AIDS/HIV",
    "Hepatitis A",
    "Hepatitis B",
    "Hepatitis C",
    "Alcohol Abuse",
    "Drug abuse",
  ];

  const container = document.getElementById("medical-history-checkboxes");
  container.innerHTML = ""; // Clear existing checkboxes
  medicalConditions.forEach((condition) => {
    const id = condition;

    const checkboxDiv = document.createElement("div");
    checkboxDiv.className = "checkbox-group";
    checkboxDiv.innerHTML = `
      <input type="checkbox" id="${id}" name="${id}">
      <label for="${id}">${condition}</label>
    `;
    container.appendChild(checkboxDiv);
  });
}
