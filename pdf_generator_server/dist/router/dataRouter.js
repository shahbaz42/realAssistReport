"use strict";
// @ts-nocheck
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
const generic_pool_1 = __importDefault(require("generic-pool"));
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
        const browser = await puppeteer_1.default.launch({
            headless: "new",
        }, minimal_args);
        return browser;
    },
    destroy: async (browser) => {
        await browser.close();
    }
};
const browserPool = generic_pool_1.default.createPool(factory, {
    max: POOL_MAX,
    min: POOL_MIN,
});
let count = 0;
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
    const years = data.map((point) => point.data_year);
    const burglary_data = data.map((point) => point.Burglary);
    // console.log(browserPool.pending);
    if (browserPool.pending >= POOL_MAX) {
        // console.log("Service Unavailable");
        return res.status(503).send("Service Unavailable");
    }
    let browser = null;
    try {
        browser = await browserPool.acquire();
        const html = await ejs_1.default.renderFile(path_1.default.resolve('.', 'src', 'views', 'report.ejs'), {
            years,
            burglary_data,
            DEPLOYED_URI: config_1.DEPLOYED_URI,
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
        // console.log("Closing Page");
        if (browser !== null) {
            await browserPool.release(browser);
        }
    }
});
router.get('/previewReport', async (req, res) => {
    const crimeData = await axios_1.default.get(config_1.CRIME_API_URL);
    const data = crimeData.data.data;
    const years = data.map((point) => point.data_year);
    const burglary_data = data.map((point) => point.Burglary);
    res.render(path_1.default.resolve('.', 'src', 'views', 'report.ejs'), {
        years,
        burglary_data,
        DEPLOYED_URI: config_1.DEPLOYED_URI,
    });
});
exports.default = router;
//# sourceMappingURL=dataRouter.js.map