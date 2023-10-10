"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
const connectToDatabase = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await (0, mongoose_1.connect)(config_1.DB_URI);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.default = connectToDatabase;
//# sourceMappingURL=connection.js.map