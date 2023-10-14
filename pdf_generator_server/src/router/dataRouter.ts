import express from 'express';
import ejs from 'ejs';
import { generateRandomData } from '../utils';
import report from "../lib/pdf-report-with-header-footer";
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
        const html = await ejs.renderFile(path.resolve(".", "src", "views", "report.ejs"))
        const result = await report.pdfFromHTML(browser, html, {
            format: 'a4',
            margin: {
                bottom: '10mm',
                left: '10mm',
                right: '10mm',
                top: '10mm',
            },
        });
        
        const pdfBuffer = Buffer.from(result);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=report.pdf');
        res.send(pdfBuffer);
    } finally {
        await browser.close();
    }
});

export default router;