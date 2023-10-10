"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const config_1 = require("../config");
/**
 * This middleware validates the request by checking the API KEY
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */
const authMiddleware = (req, res, next) => {
    // To-do : Add Admin Authentication system later on
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            const err = new Error('API Key not found');
            err.status = 400;
            throw err;
        }
        if (token !== config_1.API_KEY) {
            const err = new Error('UnAuthorized: Incorrect API Key');
            err.status = 401;
            throw err;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map