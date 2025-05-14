const COMPANY = "Blond";
const DOMAIN_NAME = "blond.com";
const OWNER_NAME = "Steve";
const OWNER_EMAIL = "steve.jobs@blond.com";
const EID_LENGTH = 7;

// Main function to serve the web app
function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setTitle('Cal Prompt Generator')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Include HTML files
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

