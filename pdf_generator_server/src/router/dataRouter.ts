import express from 'express';
import { generateRandomData } from '../utils';

const router = express.Router();

router.get('/', (req, res) => {
    const dataIndexArray = [
        {
            name: 'Asset A',
        },
        {
            name: 'Asset B',
        },
        {
            name: 'Asset C',
        },
        {
            name: 'Asset D',
        },
        {
            name: 'Asset E',
        },
        {
            name: 'Asset F',
        },
    ]

    const data = generateRandomData(dataIndexArray);

    res.status(200).json(data);
});

export default router;