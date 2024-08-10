const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const {
  initDatabase,
  getAllPatients,
  addPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  getPendingPayments,
  updatePendingPayment,
  deletePendingPayment,
  addProcedure,
  getProcedures,
  getProcedureById,
  updateProcedure,
  deleteProcedure,
} = require("./src/database");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  initDatabase();
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// IPC handlers
ipcMain.handle("get-all-patients", async () => {
  return await getAllPatients();
});

ipcMain.handle("add-patient", async (event, patientData) => {
  return await addPatient(patientData);
});

ipcMain.handle("add-patient-form", async (event, patientData) => {
  return await showAddPatientForm(patientData);
});

ipcMain.handle("get-patient-by-id", async (event, patientId) => {
  return await getPatientById(patientId);
});

ipcMain.handle("update-patient", async (event, patientData) => {
  return await updatePatient(patientData);
});

ipcMain.handle("delete-patient", async (event, patientId) => {
  return await deletePatient(patientId);
});
ipcMain.handle("get-pending-payments", async () => {
  return await getPendingPayments();
});
ipcMain.handle("get-pending-payment-by-id", async (event, paymentId) => {
  return await getPendingPaymentById(paymentId);
});

ipcMain.handle("add-procedure", async (event, procedureData) => {
  return await addProcedure(procedureData);
});
ipcMain.handle("get-procedures", async (event, patientId) => {
  return await getProcedures(patientId);
});
ipcMain.handle("get-procedure-by-id", async (event, procedureId) => {
  return await getProcedureById(procedureId);
});
ipcMain.handle("update-procedure", async (event, procedureData) => {
  return await updateProcedure(procedureData);
});
ipcMain.handle("delete-procedure", async (event, procedureId) => {
  return await deleteProcedure(procedureId);
});
ipcMain.handle("update-pending-payment", async (event, paymentData) => {
  return await updatePendingPayment(paymentData);
});

ipcMain.handle("delete-pending-payment", async (event, paymentId) => {
  return await deletePendingPayment(paymentId);
});
