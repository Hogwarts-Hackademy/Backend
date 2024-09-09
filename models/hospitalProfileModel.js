const mongoose = require("mongoose");

const hospitalProfileSchema = new mongoose.Schema({
  hospitalID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactInformation: {
    phone: { type: String },
    email: { type: String },
    address: { type: String },
  },
  established: { type: Date },
  ownership: { type: String },
  affiliations: [{ type: String }],
  missionStatement: { type: String },
  visionStatement: { type: String },
  coreValues: [{ type: String }],
  infrastructure: {
    totalBeds: {
      generalBeds: { type: Number },
      icuBeds: { type: Number },
      neonatalBeds: { type: Number },
      maternityBeds: { type: Number },
      pediatricBeds: { type: Number },
      isolationBeds: { type: Number },
    },
    departments: [{ type: String }],
    specializedUnits: [{ type: String }],
    diagnosticFacilities: [{ type: String }],
    operationTheaters: [{ type: String }],
    supportServices: [{ type: String }],
  },
  medicalStaff: {
    doctors: [{ type: String }],
    nurses: [{ type: String }],
    alliedHealthProfessionals: [{ type: String }],
  },
  administrativeStaff: [{ type: String }],
  servicesOffered: [{ type: String }],
  patientCareAndSafety: {
    qualityStandards: { type: String },
    patientSafetyProtocols: { type: String },
    patientRights: { type: String },
  },
  technologyAndInnovation: {
    medicalEquipment: [{ type: String }],
    informationSystems: [{ type: String }],
    innovativePractices: [{ type: String }],
  },
  contactDetails: {
    hospitalAdministration: { type: String },
    patientServices: { type: String },
    feedbackAndComplaints: { type: String },
  },
});

const hospitalProfileCollection = mongoose.model(
  "hospital_profiles",
  hospitalProfileSchema
);

module.exports = { hospitalProfileCollection };
