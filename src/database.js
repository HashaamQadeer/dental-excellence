const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let db;

function initDatabase() {
  db = new sqlite3.Database(
    path.join(__dirname, "dental_excellence.db"),
    (err) => {
      if (err) {
        console.error("Error opening database", err);
      } else {
        console.log("Connected to the SQLite database.");
        createTables();
      }
    }
  );
}

function createTables() {
  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    dob TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS procedures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    date TEXT NOT NULL,
    procedure TEXT NOT NULL,
    cost REAL NOT NULL,
    paid REAL NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
  )`);
}

function getAllPatients() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM patients ORDER BY id ASC", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function addPatient(patientData) {
  return new Promise((resolve, reject) => {
    const { name, gender, dob, address, phone, email } = patientData;
    if (!name ||!gender || !dob || !address || !phone|| !email){
      reject(new Error("All fields are required"));
      return;
    }
    db.run(
      "INSERT INTO patients (name, gender, dob, address, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
      [name, gender, dob, address, phone, email],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getPatientById(patientId) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM patients WHERE id = ?", [patientId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function updatePatient(patientData) {
  return new Promise((resolve, reject) => {
    const { id, name, gender, dob, address, phone, email } = patientData;
    db.run(
      "UPDATE patients SET name = ?,gender = ?, dob = ?, address = ?,  address = ?, email = ? WHERE id = ?",
      [name, gender, dob, address, phone, email, id],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function deletePatient(patientId) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM patients WHERE id = ?", [patientId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

function getPendingPayments() {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT p.id, p.name, SUM(pr.cost - pr.paid) as balance
      FROM patients p
      JOIN procedures pr ON p.id = pr.patient_id
      GROUP BY p.id
      HAVING balance > 0
      ORDER BY balance DESC
    `,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

function addProcedure(procedureData) {
  return new Promise((resolve, reject) => {
    const { patient_id, date, procedure, cost, paid } = procedureData;
    db.run(
      "INSERT INTO procedures (patient_id, date, procedure, cost, paid) VALUES (?, ?, ?, ?, ?)",
      [patient_id, date, procedure, cost, paid],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function updateProcedure(procedureData) {
  return new Promise((resolve, reject) => {
    const { id, patient_id, date, procedure, cost, paid } = procedureData;
    db.run(
      "UPDATE procedures SET patient_id = ?, date = ?, procedure = ?, cost = ?, paid = ? WHERE id = ?",
      [patient_id, date, procedure, cost, paid, id],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}
function deleteProcedure(procedureId) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM procedures WHERE id = ?", [procedureId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

function getProcedures(patientId) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM procedures WHERE patient_id = ? ORDER BY date DESC", [patientId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
function getProcedureById(procedureId) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM procedures WHERE id = ?", [procedureId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}


module.exports = {
  initDatabase,
  getAllPatients,
  addPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  getPendingPayments,
  addProcedure,
  getProcedures,
  getProcedureById,
  updateProcedure,
  deleteProcedure,
};
