"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            status: 422,
            message: 'Validation error',
            errors: errors.array()
        });
    }
    else {
        next();
    }
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequestUtil.js.map