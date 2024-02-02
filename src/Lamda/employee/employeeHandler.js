const { getLogObject, logErr, logInfo } = require("../utils/logger");
const {
  httpStatusCodes,
  responseCodes,
} = require("../../environment/appconfig");
const { apiResponse } = require("../../http-helpers/api-response");
const { apiError } = require("../../http-helpers/api-error");
const _ = require("lodash");
const { Helper } = require("../../utils/helper");
const { getGetEmployeeDetailsById } = require("../../service/query-dynamodb");

async function getEmployeeDetails(event, context) {
  let responseBody = "";
  let errorCode = 0;
  let message = "";
  const logEvent = getLogObject(event);
  const activityName = "Get Employee Details";
  const empId = event.pathParameters?.empId;

  if (!empId) {
    const msg = "empId is missing";
    responseBody = { msg };
    errorCode = responseCodes.BAD_REQUEST;
    message = "Bad Request";
    logInfo(
      logEvent,
      `Response Body => ${JSON.stringify(responseBody)} for ${empId}`,
      activityName
    );

    const response = { errorCode, message, result: responseBody };
    return apiResponse(response, event, logEvent);
  }

  try {
    let data = await getGetEmployeeDetailsById(empId, logEvent);
    if (!data) {
      const msg = "No employee details found.";
      responseBody = { msg };
      errorCode = responseCodes.NOT_FOUND;
      message = "Not Found";

      logInfo(
        logEvent,
        `Response Body => ${JSON.stringify(responseBody)} for ${empId}`,
        activityName
      );

      const response = { errorCode, message, result: responseBody };
      return apiResponse(response, event, logEvent);
    }
    let responseData = {
      firstName: data.firstName,
      lastName: data.lastName,
      dOB: data.dOB,
      gender: data.gender,
      nationality: data.nationality,
      martialStatus: data.martialStatus,
      mobileNumber: data.mobileNumber,
      personalEmailAddress: data.personalEmailAddress,
      officeEmailAddress: data.officeEmailAddress,
      sSN: data.sSN,
      adaharNumber: data.adaharNumber,
      passportNumber: data.passportNumber,
      permanantAddress: data.permanantAddress,
      contactPersonOrRelation: data.contactPersonOrRelation,
      contactNumber: data.contactNumber,
      presentAddress: data.presentAddress,
      emergencyContactPersonOrRelation: data.emergencyContactPersonOrRelation,
      emergencyContactNumber: data.emergencyContactNumber,
      leaveStructure: data.leaveStructure,
      joiningDate: data.joiningDate,
      isOnHold: data.isOnHold,
      resignedDate: data.resignedDate,
      relievedDate: data.relievedDate,
      isResigned: data.isResigned,
      isDeleted: data.isDeleted,
      isActive: data.isActive,
      createdDateTime: data.createdDateTime,
      updatedDateTime: data.updatedDateTime,
    };

    let msg = "Retrieved employee details successfully.";
    responseBody = { msg, employeeDetails: responseData };
    errorCode = responseCodes.SUCCESS;
    message = "Success";

    logInfo(
      logEvent,
      `Response Body => ${JSON.stringify(responseBody)} for ${empId}`,
      activityName
    );

    response = { errorCode, message, result: responseBody };
    // if (responseData != null) {
    //   let msg = "Retrieved employee details Successfully.";
    //   responseBody = {
    //     msg: msg,
    //     employeeDetails: responseData,
    //   };
    //   errorCode = responseCodes.SUCCESS;
    //   message = "Success";
    //   logInfo(
    //     logEvent,
    //     "Response Body =>" + responseBody + " for  " + empId,
    //     activityName
    //   );
    // } else {
    //   let msg = "No employee details found.";
    //   responseBody = {
    //     msg: msg,
    //   };
    //   errorCode = responseCodes.NOT_FOUND;
    //   message = "Not Found";
    //   logInfo(
    //     logEvent,
    //     "Response Body =>" + responseBody + " for  " + empId,
    //     activityName
    //   );
    // }

    // const response = {
    //   errorCode: errorCode,
    //   message: message,
    //   result: responseBody,
    // };

    return apiResponse(response, event, logEvent);
  } catch (err) {
    responseBody = err;
    errorCode = responseCodes.INTERNAL_SERVER_ERROR;
    message = "Failure";

    logErr(
      logEvent,
      `${message} ${err} for ${event.pathParameters?.empId}`,
      activityName
    );

    response = { errorCode, message, result: `${responseBody}` };
    return apiError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      response,
      event,
      logEvent
    );
  }
}

module.exports = {
  getRegisteredDevices,
};
