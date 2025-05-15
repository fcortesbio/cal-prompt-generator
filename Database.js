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
function buildEidMap() {
  const sheet = getSheet("user_data");
  const data = sheet.getDataRange().getValues();

  const eidMap = {};
  data.forEach(row => {
    eidMap[row[0]] = {
      agent_eid: row[0].toString(),
      agent_name: row[1],
      agent_division: row[2],
      agent_role: row[3],
    };
  });
  return eidMap;
}

// Get user data by EID using a map
function getUserByEid(eid) {
  const eidMap = buildEidMap();
  return eidMap[eid] || null;
}