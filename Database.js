// Get active spreadsheet
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

// Get sheet by name
function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

// Get sheet by name
function getSheetByName(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

// Get sheet by index
function getSheetByIndex(index) {
  return getSpreadsheet().getSheets()[index];
}

// Build a map of EID to user data
// Assumes user_data sheet has a header row
function buildEidMap() {
  const sheet = getSheet("user_data");
  const data = sheet.getDataRange().getValues();

  const eidMap = {};
  
  for (let i = 1; i < data.length; i++) { // Start from row 2 (index 1)
    const row = data[i];
    eidMap[row[0]] = {
      agent_eid: row[0].toString(),
      agent_name: row[1],
      agent_division: row[2],
      agent_role: row[3],
    };
  }

  return eidMap;
}

// Get user data by EID using a map
function getUserByEid(eid) {
  const eidMap = buildEidMap();
  return eidMap[eid] || null;
}


// Get all prompt categories (inquiry_reason)
function getPromptCategories() {
  const sheet = getSheet("promt_data");
  const data = sheet.getDataRange().getValues();
  const categories = new Set();

  for (let i = 0; i < data.length; i++) {
    if (data[i][1]) {
      // inquirt_reason
      categories.add(data[i][1]);
    }
  }

  return Array.from(categories)
}