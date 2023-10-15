// @ts-nocheck

import express from 'express';
import ejs from 'ejs';
import { generateRandomData } from '../utils';
import report from '../lib/pdf-report-with-header-footer';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { CRIME_API_URL, DEPLOYED_URI } from '../config';
import genericPool from 'generic-pool';

const POOL_MAX = 2;
const POOL_MIN = 1;
const PAGE_MAX = 2;

const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
];

const factory = {
    create: async () => {
        const browser = await puppeteer.launch({
            headless: "new",
        }, minimal_args);
        return browser;
    },
    destroy: async (browser) => {
        await browser.close();
    }
};

const browserPool = genericPool.createPool(factory, {
    max: POOL_MAX,
    min: POOL_MIN,
});

let count = 0;

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

interface CrimeData {
    data_year: number;
    'Aggravated Assault': number;
    'All Other Offenses (Except Traffic)': number;
    Arson: number;
    Burglary: number;
    'Curfew and Loitering Law Violations': number;
    'Disorderly Conduct': number;
    'Driving Under the Influence': number;
    'Drug Abuse Violations - Grand Total': number;
    Drunkenness: number;
    Embezzlement: number;
    'Forgery and Counterfeiting': number;
    Fraud: number;
    'Gambling - Total': number;
    'Human Trafficking - Commercial Sex Acts': number;
    'Human Trafficking - Involuntary Servitude': number;
    'Larceny - Theft': number;
    'Liquor Laws': number;
    'Manslaughter by Negligence': number;
    'Motor Vehicle Theft': number;
    'Murder and Nonnegligent Manslaughter': number;
    'Offenses Against the Family and Children': number;
    'Prostitution and Commercialized Vice': number;
    Rape: number;
    Robbery: number;
    'Simple Assault': number;
    'Stolen Property: Buying, Receiving, Possessing': number;
    Suspicion: number;
    Vagrancy: number;
    Vandalism: number;
    'Weapons: Carrying, Possessing, Etc.': number;
    'Sex Offenses (Except Rape, and Prostitution and Commercialized Vice)': number;
}

router.get('/report', async (req, res) => {
    const crimeData = await axios.get(CRIME_API_URL);
    const data = crimeData.data.data as CrimeData[];

    const years = data.map((point) => point.data_year);
    const burglary_data = data.map((point) => point.Burglary);

    // console.log(browserPool.pending);
    if(browserPool.pending >= POOL_MAX) {
        // console.log("Service Unavailable");
        return res.status(503).send("Service Unavailable");
    }
    let browser = null;


    try {
        browser = await browserPool.acquire();

        const html = await ejs.renderFile(
            path.resolve('.', 'src', 'views', 'report.ejs'),
            {
                years,
                burglary_data,
                DEPLOYED_URI,
            }
        );

        const result = await report.pdfFromHTML(browser, html, {
            format: 'a4',
            margin: {
                bottom: '4mm',
                left: '4mm',
                right: '4mm',
                top: '4mm',
            },
        });

        const pdfBuffer = Buffer.from(result);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=report.pdf');
        res.send(pdfBuffer);
    } finally {
        // console.log("Closing Page");
        if(browser !== null) {
            await browserPool.release(browser);
        }
    }
});

router.get('/previewReport', async (req, res) => {
    const crimeData = await axios.get(CRIME_API_URL);
    const data = crimeData.data.data as CrimeData[];

    const years = data.map((point) => point.data_year);
    const burglary_data = data.map((point) => point.Burglary);
    res.render(path.resolve('.', 'src', 'views', 'report.ejs'), {
        years,
        burglary_data,
        DEPLOYED_URI,
    });
});

export default router;
