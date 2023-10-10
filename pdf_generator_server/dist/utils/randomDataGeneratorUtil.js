"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to generate a random number within a specified range
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to generate random data similar to the provided data
function generateRandomData(data) {
    const randomData = [];
    for (const item of data) {
        const newItem = {
            name: item.name,
            Yesterday: getRandomInRange(1000, 5000),
            Today: getRandomInRange(1000, 5000),
            amt: getRandomInRange(1000, 5000), // Adjust the range as needed
        };
        randomData.push(newItem);
    }
    return randomData;
}
exports.default = generateRandomData;
//# sourceMappingURL=randomDataGeneratorUtil.js.map