const Case = require("../models/Case.model");
const ResponseManager = require("../response/response-manager");
const ROLES = require('../models/user.model').ROLES;
const UserModel = require('../models/user.model').UserModel;

class UserController {
  static async addCases(req, res, next) {
    try {
      const Cases = new Case({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        sex: req.body.sex,
        height: req.body.height,
        drivingLicenseNo: req.body.drivingLicenseNo,
        pvcNo: req.body.pvcNo,
        ninNo: req.body.ninNo,
        nationalIdNo: req.body.nationalIdNo,
        passportNo: req.body.passportNo,
        issuingAuthority: req.body.issuingAuthority,
        nationality: req.body.nationality,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        telephoneNo: req.body.telephoneNo,
        injuryOrDisability: req.body.injuryOrDisability,
        dateOfOffence: req.body.dateOfOffence,
        timeOfOffence: req.body.timeOfOffence,
        locationOfOffence: req.body.locationOfOffence,
        offenceType: req.body.offenceType,
        penaltiesOrFine: req.body.penaltiesOrFine,
        typeOfCar: req.body.typeOfCar,
        carRegistration: req.body.carRegistration,
        carColour: req.body.carColour,
        nameOfInsurance: req.body.nameOfInsurance,
        insNo: req.body.insNo,
        expiryDate: req.body.expiryDate,
        vehicleRoadWorthinessNo: req.body.vehicleRoadWorthinessNo,
        vehicleRoadWorthinessExpiryDate:
          req.body.vehicleRoadWorthinessExpiryDate,
        chassisNo: req.body.chassisNo,
        arrestingOfficerBadgeNo: req.body.arrestingOfficerBadgeNo,
        arrestingOfficersName: req.body.arrestingOfficersName,
        arrestingAgency: req.body.arrestingAgency,
        policeStationAddress: req.body.policeStationAddress,
        offenderStatement: req.body.offenderStatement,
        officersStation: req.body.officersStation,
        propertiesInPoliceSafe: req.body.propertiesInPoliceSafe,
        policeSafeNo: req.body.policeSafeNo,
        policeReleaseDate: req.body.policeReleaseDate,
        bailDate: req.body.bailDate,
        guarantorName: req.body.guarantorName,
        dpoName: req.body.dpoName,
        cidName: req.body.cidName,
        cidStatement: req.body.cidStatement,
        solicitorOrLawyerName: req.body.solicitorOrLawyerName,
        solicitorOrLawyerAddress: req.body.solicitorOrLawyerAddress,
        solicitorOrLawyerContactDetails:
          req.body.solicitorOrLawyerContactDetails,
        courtDate: req.body.courtDate,
        courtAddress: req.body.courtAddress,
        judgmentOrSentencingOrFine: req.body.judgmentOrSentencingOrFine,
        judgeName: req.body.judgeName,
        propertiesInPrisonSafe: req.body.propertiesInPrisonSafe,
        prisonSafeNo: req.body.prisonSafeNo,
        jailDate: req.body.jailDate,
        prisonAddress: req.body.prisonAddress,
        prisonerNo: req.body.prisonerNo,
        prisonReleaseDate: req.body.prisonReleaseDate,
        prisonState: req.body.prisonState,
      });
      console.log(Cases, "Cases");
      const caseDetails = await Cases.save();
      console.log(caseDetails._id, "userDetails");
      if (!caseDetails) {
        return ResponseManager.respondWithError(
          res,
          200,
          "category not created plz check details"
        );
      } else {
        return ResponseManager.respondWithSuccess(
          res,
          200,
          "success",
          caseDetails
        );
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(
        res,
        200,
        "An error encounterd",
        error
      );
    }
  }

  static async getCaseDetails(req, res, next) {
    console.log(req.query._id, "query");
    if (!req.query._id) {
      throw new Error("Crime Id not find");
    }
    try {
      const caseDetails = await Case.findOne({ _id: req.query._id });
      if (!caseDetails) {
        return ResponseManager.respondWithError(
          res,
          200,
          "Category not find plz check id"
        );
      } else {
        return ResponseManager.respondWithSuccess(
          res,
          200,
          "success",
          caseDetails
        );
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(res, 200, "An error encounterd");
    }
  }

  static getAll(req, res, next) {
    Case.find({},function(err, users){
      if(err)
        return ResponseManager.respondWithError(res, 404, err);
      else
         return ResponseManager.respondWithSuccess(res, 200, "", users);
     });
 }


  static async updateCaseDetails (req, res, next) {
    try {
      const update = { ...req.body };
      const found = { _id: req.query._id };
      const updateCaseDetails = await Case.findOneAndUpdate(found, update, {
        new: true,
      });
      if (!updateCaseDetails) {
        return ResponseManager.respondWithError(
          res,
          200,
          "category not found plz check id"
        );
      } else {
        return ResponseManager.respondWithSuccess(
          res,
          200,
          "success",
          updateCaseDetails
        );
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(res, 200, "An error encounterd");
    }
  }

  static create(req, res, next) {
    let newUser = {firstName:req.body.firstName, password:req.body.password, email:req.body.email, role:req.body.role};
    
    UserModel.create(newUser, function(err, user){
       if(err || user === null){
         console.log("Error "+err);
         if(err.code === 11000){
           return ResponseManager.respondWithError(res, 200, "Username taken");
         } else{
           return ResponseManager.respondWithError(res, 200, "An error was encountered");
         }
       } else {
           return ResponseManager.respondWithSuccess(res, 200, "User created", user);
       }
    });
}
}

exports = module.exports = UserController;
