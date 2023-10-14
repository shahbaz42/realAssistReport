import express from 'express';
import ejs from 'ejs';
import { generateRandomData } from '../utils';
import report from "../lib/pdf-report-with-header-footer";
import puppeteer from "puppeteer";
import path from "path";
import fs from 'fs';
import axios from 'axios';
import { CRIME_API_URL, DEPLOYED_URI } from '../config';

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
    const data2 = [{
        data_year: 2019,
        'Aggravated Assault': 2077,
        'All Other Offenses (Except Traffic)': 10179,
        Arson: 49,
        Burglary: 603,
        'Curfew and Loitering Law Violations': 0,
        'Disorderly Conduct': 742,
        'Driving Under the Influence': 2856,
        'Drug Abuse Violations - Grand Total': 930,
        Drunkenness: 31,
        Embezzlement: 43,
        'Forgery and Counterfeiting': 78,
        Fraud: 121,
        'Gambling - Total': 0,
        'Human Trafficking - Commercial Sex Acts': 0,
        'Human Trafficking - Involuntary Servitude': 0,
        'Larceny - Theft': 1885,
        'Liquor Laws': 310,
        'Manslaughter by Negligence': 4,
        'Motor Vehicle Theft': 476,
        'Murder and Nonnegligent Manslaughter': 46,
        'Offenses Against the Family and Children': 150,
        'Prostitution and Commercialized Vice': 5,
        Rape: 129,
        Robbery: 310,
        'Simple Assault': 4862,
        'Stolen Property: Buying, Receiving, Possessing': 91,
        Suspicion: 0,
        Vagrancy: 2,
        Vandalism: 1161,
        'Weapons: Carrying, Possessing, Etc.': 259,
        'Sex Offenses (Except Rape, and Prostitution and Commercialized Vice)': 243
    }]
    
    const years = data.map(point => point.data_year)
    const burglary_data = data.map(point => point.Burglary); 

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ],
    });

    try {
        const html = await ejs.renderFile(path.resolve(".", "src", "views", "report.ejs"),{
            years,
            burglary_data,
            DEPLOYED_URI
        })

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
        await browser.close();
    }
});

router.get('/previewReport', async (req, res) => {
    const crimeData = await axios.get(CRIME_API_URL);
    const data = crimeData.data.data as CrimeData[];
    
    const years = data.map(point => point.data_year)
    const burglary_data = data.map(point => point.Burglary); 
    res.render(path.resolve(".", "src", "views", "report.ejs") , {
        years,
        burglary_data,
        DEPLOYED_URI
    });
});

export default router;