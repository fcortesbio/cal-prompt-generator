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

// Get user data by EID
function getUserDataByEID(eid) {
  const sheet = getSheet("user_data");
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (String(data[i][0]) === String(eid)) {
      return {
        agent_eid: data[i][0],
        agent_name: data[i][1],
        agent_division: data[i][2],
        agent_role: data[i][3],
      };
    }
  }

  return null;
}
