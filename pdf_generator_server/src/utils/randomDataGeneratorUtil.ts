import { item } from '../types';

// Function to generate a random number within a specified range
function getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random data similar to the provided data
export default function generateRandomData(data: item[]) {
    const randomData = [];

    for (const item of data) {
        const newItem = {
            name: item.name,
            Yesterday: getRandomInRange(1000, 5000), // Adjust the range as needed
            Today: getRandomInRange(1000, 5000), // Adjust the range as needed
            amt: getRandomInRange(1000, 5000), // Adjust the range as needed
        };

        randomData.push(newItem);
    }

    return randomData;
}