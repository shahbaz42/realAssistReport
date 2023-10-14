"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_1 = __importDefault(require("ejs"));
const utils_1 = require("../utils");
const pdf_report_with_header_footer_1 = __importDefault(require("../lib/pdf-report-with-header-footer"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const router = express_1.default.Router();
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
    const data = (0, utils_1.generateRandomData)(dataIndexArray);
    res.status(200).json(data);
});
router.get('/report', async (req, res) => {
    const crimeData = await axios_1.default.get(config_1.CRIME_API_URL);
    const data = crimeData.data.data;
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
        }];
    const years = data.map(point => point.data_year);
    const burglary_data = data.map(point => point.Burglary);
    const browser = await puppeteer_1.default.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ],
    });
    try {
        const html = await ejs_1.default.renderFile(path_1.default.resolve(".", "src", "views", "report.ejs"), {
            years,
            burglary_data,
            DEPLOYED_URI: config_1.DEPLOYED_URI
        });
        const result = await pdf_report_with_header_footer_1.default.pdfFromHTML(browser, html, {
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
    }
    finally {
        await browser.close();
    }
});
router.get('/previewReport', async (req, res) => {
    const crimeData = await axios_1.default.get(config_1.CRIME_API_URL);
    const data = crimeData.data.data;
    const years = data.map(point => point.data_year);
    const burglary_data = data.map(point => point.Burglary);
    res.render(path_1.default.resolve(".", "src", "views", "report.ejs"), {
        years,
        burglary_data,
        DEPLOYED_URI: config_1.DEPLOYED_URI
    });
});
exports.default = router;
//# sourceMappingURL=dataRouter.js.map