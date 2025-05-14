// Main function to serve the web app
function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setTitle('Cal Prompt Generator')
        .setFaviconUrl('https://www.google.com/s2/favicons?domain=google.com')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Include HTML files
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}