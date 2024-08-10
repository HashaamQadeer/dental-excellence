const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getAllPatients: () => ipcRenderer.invoke("get-all-patients"),
  addPatient: (patientData) => ipcRenderer.invoke("add-patient", patientData),
  addPatientForm: (patientData) => ipcRenderer.invoke("add-patient-form", patientData),
  getPatientById: (patientId) =>
    ipcRenderer.invoke("get-patient-by-id", patientId),
  updatePatient: (patientData) =>
    ipcRenderer.invoke("update-patient", patientData),
  deletePatient: (patientId) => ipcRenderer.invoke("delete-patient", patientId),
  getPendingPaymentById: (paymentId) =>
    ipcRenderer.invoke("get-pending-payment-by-id", paymentId),
  addProcedure: (procedureData) =>
    ipcRenderer.invoke("add-procedure", procedureData),
  getProcedureById: (procedureId) =>
    ipcRenderer.invoke("get-procedure-by-id", procedureId),
  updateProcedure: (procedureData) =>
    ipcRenderer.invoke("update-procedure", procedureData),
  deleteProcedure: (procedureId) =>
    ipcRenderer.invoke("delete-procedure", procedureId),
  getPendingPayments: () => ipcRenderer.invoke("get-pending-payments"),
  getPendingPaymentById: (paymentId) =>
    ipcRenderer.invoke("get-pending-payment-by-id", paymentId),
  updatePendingPayment: (paymentData) =>
    ipcRenderer.invoke("update-pending-payment", paymentData),
  deletePendingPayment: (paymentId) =>
    ipcRenderer.invoke("delete-pending-payment", paymentId),
  getProcedures: (patientId) => ipcRenderer.invoke("get-procedures", patientId),
});
