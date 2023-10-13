import express from 'express';
import { generateRandomData } from '../utils';
import report from "puppeteer-report";
import puppeteer from "puppeteer";
import path from "path";
import fs from 'fs';

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
    ];

    const data = generateRandomData(dataIndexArray);

    res.status(200).json(data);
});

router.get('/report', async (req, res) => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ],
    });

    try {
        // you must use full path `home/puppeteer/index.hmtl`
        const file = path.join(__dirname, 'index.html');
        const result = await report.pdf(browser, file, {
            format: 'a4',
            margin: {
                bottom: '10mm',
                left: '10mm',
                right: '10mm',
                top: '10mm',
            },
        });

        console.log(result)
        const pdfBuffer = Buffer.from(result);


        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=report.pdf');
        res.send(pdfBuffer);
    } finally {
        await browser.close();
    }
});

export default router;