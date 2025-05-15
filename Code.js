const COMPANY = "Blond";
const DOMAIN_NAME = "blond.com";
const OWNER_NAME = "Steve";
const OWNER_EMAIL = "steve.jobs@blond.com";
const EID_LENGTH = 7;
const favicon_id = "1Lrjk8HQkfPN_7XzJnM4Tx6GK-ZVMNS1A"

// Main function to serve the web app
function doGet(e) {
  if (e.parameter.type === "favicon") return serveFavicon();

  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Cal-PGT Prompt Generator Tool")
    .setFaviconUrl(ScriptApp.getService().getUrl() + "?type=favicon")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function serveFavicon() {
  const file = DriveApp.getFileById(favicon_id);
  const blob = file.getBlob();
  return ContentService.createOutput(blob).setMimeType(
    ContentService.MimeType.ico
  );
}

// Include HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
