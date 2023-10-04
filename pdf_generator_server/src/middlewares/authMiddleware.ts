import { NextFunction, Request, Response } from 'express';
import { API_KEY } from '../config';
import { APIError } from '../utils';

/**
 * This middleware validates the request by checking the API KEY
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // To-do : Add Admin Authentication system later on
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            const err: APIError = new Error('API Key not found');
            err.status = 400;
            throw err;
        }
        
        if (token !== API_KEY) {
            const err: APIError = new Error('UnAuthorized: Incorrect API Key');
            err.status = 401;
            throw err;
        }
        next();
    } catch (error) {
        next(error);
    }
}

