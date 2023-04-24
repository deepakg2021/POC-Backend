'use strict';

const HttpStatus = require('http-status-codes');
const BasicResponse = {
    "success": false,
    "message": "",
    "data": {}
};

class ResponseManager {
    constructor() {

    }

    static get HTTP_STATUS() {
        return HttpStatus;
    }

    static respondWithSuccess(res, code, message = "", data = "") {
        code = code || ResponseManager.HTTP_STATUS.OK;
        let response = Object.assign({}, BasicResponse);
        response.success = true;
        response.message = message;
        response.data = data;
        return res.status(code).json(response);
    }

    static respondWithError(res, errorCode, message = "", data = "") {
        errorCode = errorCode || 500;
        let response = Object.assign({}, BasicResponse);
        response.success = false;
        response.message = message;
        response.data = data;
        return res.status(errorCode).json(response);
    }

}
module.exports = ResponseManager;