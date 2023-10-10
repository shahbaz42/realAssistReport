"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
/**
 * This is the error handler middleware it handles all the errors, If NODE_ENV is dev then it will send the stack trace
 * @param err error object
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */
const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'dev' ? err.stack : {}
    });
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandlerUtil.js.map