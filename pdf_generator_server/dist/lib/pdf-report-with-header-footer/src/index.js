"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfPage = exports.pdfFromHTML = exports.pdf = void 0;
const fs = __importStar(require("fs"));
const core = __importStar(require("./core"));
/**
 * Convert HTML file to PDF
 * @param browser puppeteer/puppeteer-core browser object
 * @param file full path of HTML file
 * @param options output PDF options
 * @returns PDF as an array of bytes
 */
async function pdf(browser, file, options) {
    const page = await browser.newPage();
    try {
        await page.goto("file:///" + file);
        return await pdfPage(page, options);
    }
    finally {
        await page.close();
    }
}
exports.pdf = pdf;
/**
 * Convert HTML text to PDF
 * @param browser puppeteer/puppeteer-core browser object
 * @param html html content
 * @param options output PDF options
 * @returns PDF as an array of bytes
 */
async function pdfFromHTML(browser, html, options) {
    const page = await browser.newPage();
    try {
        await page.setContent(html);
        return await pdfPage(page, options);
    }
    finally {
        await page.close();
    }
}
exports.pdfFromHTML = pdfFromHTML;
/**
 * Convert a Page to PDF
 * @param page puppeteer/puppeteer-core page object
 * @param options output PDF options
 * @returns PDF as an array of bytes
 */
async function pdfPage(page, options) {
    const { path, ...pdfOptions } = options ?? {};
    const margin = {
        marginTop: pdfOptions?.margin?.top ?? 0,
        marginBottom: pdfOptions?.margin?.bottom ?? 0,
    };
    const [getHeightFunc, getHeightArg] = core.getHeightEvaluator(margin.marginTop, margin.marginBottom, pdfOptions?.scale);
    const { headerHeight, footerHeight } = await page.evaluate(getHeightFunc, getHeightArg);
    const [basePageEvalFunc, basePageEvalArg] = core.getBaseEvaluator(headerHeight, footerHeight);
    await page.evaluate(basePageEvalFunc, basePageEvalArg);
    const basePdfBuffer = await page.pdf(pdfOptions);
    const [doc, headerEvalFunc, headerEvalArg] = await core.getHeadersEvaluator(basePdfBuffer);
    await page.evaluate(headerEvalFunc, headerEvalArg);
    const headerPdfBuffer = await page.pdf(pdfOptions);
    const result = await core.createReport(doc, headerPdfBuffer, headerHeight, footerHeight);
    if (path) {
        await fs.promises.writeFile(path, result);
    }
    return result;
}
exports.pdfPage = pdfPage;
exports.default = { pdf, pdfFromHTML, pdfPage };
//# sourceMappingURL=index.js.map