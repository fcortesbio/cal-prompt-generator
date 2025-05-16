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

  for (let i = 1; i < data.length; i++) {
    // Start from row 2 (index 1)
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
  const sheet = getSheet("prompt_data");
  const data = sheet.getDataRange().getValues();
  const categories = new Set();

  for (let i = 1; i < data.length; i++) {
    if (data[i][1]) {
      // inquirt_reason
      categories.add(data[i][1]);
    }
  }

  return Array.from(categories)
}

function getTopicsByCategory(category) {
  const sheet = getSheet("prompt_data")
  const data = sheet.getDataRange().getValues();
  const topics = new Set();

  for (let i = 1; i < data.length; i++) {
    // match an inquiry_reason with a topic_name
    if (data[i][1] === category && data[i][2]) {
      topics.add(data[i][2])
    }
  }
  return Array.from(topics);
}

function getCasesByTopic(category, topic) {
  const sheet = getSheet("prompt_data")
  const data = sheet.getDataRange().getValues();
  const cases = [];

  for (let i = 1; i < data.length; i++) {
    // match an inquiry_reason with a topic_name
    if (data[i][1] === category && data[i][2] === topic && data[i][3]) {
      cases.push({
        prompt_id: data[i][0],
        case_name: data[i][3],
        backend_log: data[i][6] ?? "",
        email_subject: data[i][7] ?? "",
      })
    }
  }
  return cases
}

function debugPromptStructure() {
  const testCategory = "Subscription Issues";
  const testTopic = "Plan Upgrades";

  Logger.log("🔍 Testing getPromptCategories()...");
  const categories = getPromptCategories();
  Logger.log("Categories found: " + JSON.stringify(categories));

  Logger.log(`\n🔍 Testing getTopicsByCategory('${testCategory}')...`);
  const topics = getTopicsByCategory(testCategory);
  Logger.log("Topics found: " + JSON.stringify(topics));

  Logger.log(`\n🔍 Testing getCasesByTopic('${testCategory}', '${testTopic}')...`);
  const cases = getCasesByTopic(testCategory, testTopic);
  Logger.log("Cases found:");
  cases.forEach((c, i) => {
    Logger.log(`#${i + 1}: ${JSON.stringify(c)}`);
  });

  Logger.log("\n✅ Prompt structure debug complete.");
}
