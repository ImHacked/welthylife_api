module.exports = (app) => {
  // Import routes
  let auth = require("../helper/auth");
  let upload = require("./uploadRouter");
  let authRoute = require("./auth");
  let doctor = require("./doctor/doctor");
  let session = require("./conference/session");
  let country = require("./localData/localData");
  let franchisee = require("./franchisee/franchisee");
  let chat = require("./chat/chat");
  let chatHead = require("./chat/chatHead");
  let manageSlot = require("./doctor/slots");
  //   let test = require("./test");
  let appoinment = require("./doctor/appoinment");
  let qualification = require("./qts/qualification");
  let specialization = require("./qts/specialization");
  let symptoms = require("./qts/symptoms");
  let treatment = require("./qts/treatment");
  let clinic = require("./clinic/clinic");
  let clinicLocation = require("./clinic/clinicLocation");
  let clinicMembers = require("./clinic/clinicMembers");
  let doctorQualification = require("./doctor/doctorsQualification");
  let lab = require("./testAndLabs/lab");
  let doctorSpecialization = require("./doctor/doctorsSpecialization");
  let doctorTreatments = require("./doctor/doctorsTreatments");
  let labPackage = require("./testAndLabs/labPackage");
  let packageTest = require("./testAndLabs/packageTest");
  let profile = require("./testAndLabs/profile");
  let profileTest = require("./testAndLabs/profileTest");
  let test = require("./testAndLabs/tests");
  let mrmberTiming = require("./clinic/memberTimings");
  let happyCustomers = require("./coustemerReviews");
  let topOffer = require("./topOffer");
  let awards = require("./qts/award");
  let membership = require("./qts/memberships");
  let docMemberships = require("./doctor/doctorsMemberships");
  let docAwards = require("./doctor/doctorsAwards");
  let queAns = require("./doctor/queAns");
  let healthFeed = require("./healthFeed");
  let prefix = require("./prefix");
  let doctorDocs = require("./doctor/doctorDoc");
  let doctorSymp = require("./doctor/doctorsSymptoms");
  let facilities = require("./clinic/facilities");
  let clinicfacilities = require("./clinic/clinicFacilities");
  let paymentRoute = require("./payment/payment");
  let contactRoute = require("./contact");
  let medicineRoute = require("./medicine/medicine");
  let receiptRoute = require("./medicine/medicalReceipt");

  //=========PRODUCTS=============
  let product = require("./products/products");
  let prodCat = require("./products/productCatagories");
  let prodSubCat = require("./products/productSubCatagories");
  let userCart = require("./products/usersCart");

  let banner = require('./home/banner.routes')

  app.use("/api/v1/authentication", authRoute);
  app.use("/api/v1/uploads", upload);
  app.use("/api/v1/product", product);
  app.use("/api/v1/doctor", doctor);
  app.use("/api/v1/conference", session);
  app.use("/api/v1/country", country);
  app.use("/api/v1/franchisee", franchisee);
  app.use("/api/v1/chat", chat);
  app.use("/api/v1/chathead", chatHead);
  app.use("/api/v1/slots", manageSlot);
  app.use("/api/v1/appoinment", appoinment);
  app.use("/api/v1/qualification", qualification);
  app.use("/api/v1/specialization", specialization);
  app.use("/api/v1/treatment", treatment);
  app.use("/api/v1/clinic", clinic);
  app.use("/api/v1/clinic/location", clinicLocation);
  app.use("/api/v1/clinic/members", clinicMembers);
  app.use("/api/v1/doctor/qualification", doctorQualification);
  app.use("/api/v1/doctor/specialization", doctorSpecialization);
  app.use("/api/v1/doctor/treatments", doctorTreatments);
  app.use("/api/v1/lab", lab);
  app.use("/api/v1/tests", test);
  app.use("/api/v1/labs/packages", labPackage);
  app.use("/api/v1/package/test", packageTest);
  app.use("/api/v1/profile", profile);
  app.use("/api/v1/profiles/test", profileTest);
  app.use("/api/v1/product/catagories", prodCat);
  app.use("/api/v1/product/subCatagories", prodSubCat);
  app.use("/api/v1/clinic/timings", mrmberTiming);
  app.use("/api/v1/customer/review", happyCustomers);
  app.use("/api/v1/top/offer", topOffer);
  app.use("/api/v1/award", awards);
  app.use("/api/v1/doctor/award", docAwards);
  app.use("/api/v1/membership", membership);
  app.use("/api/v1/doctor/membership", docMemberships);
  app.use("/api/v1/QA", queAns);
  app.use("/api/v1/HF", healthFeed);
  app.use("/api/v1/userCart", userCart);
  app.use("/api/v1/symptoms", symptoms);
  app.use("/api/v1/prefix", prefix);
  app.use("/api/v1/doctorDocs", doctorDocs);
  app.use("/api/v1/doctorSymptoms", doctorSymp);
  app.use("/api/v1/facilities", facilities);
  app.use("/api/v1/clinicFfacilities", clinicfacilities);
  app.use("/api/v1/payment", paymentRoute);
  app.use("/api/v1/contact", contactRoute);
  app.use("/api/v1/medicine", medicineRoute)
  app.use("/api/v1/doctorRegister", doctorReg)
  app.use("/api/v1/receipt", receiptRoute)
};