// Get navigation data (categories, topics, cases)
function getNavigationData() {
    const categories = getPromptCategories();
    const navigation = [];

    for (const category of categories) {
        const topics = getTopicsByCategory(category);
        const topicData = [];

        for (const topic of topics) {
            const cases = getCasesByTopic(category, topic);
            topicData.push({
                name: topic,
                cases: cases
            });
        }
        navigation.push({
            name: category,
            topics: topicData
        });
    }

    return navigation;

}

// Generate prompt object
function generatePromptObject(promptId, agentData, formData) {
  const promptTemplate = getPromptById(promptId);
  
  if (!promptTemplate) {
    return { 
      success: false, 
      message: 'Prompt template not found.' 
    };
  }
  
  // Extract first name
  const nameParts = agentData.name.split(', ');
  const firstName = nameParts.length > 1 ? nameParts[1] : agentData.name;
  
  // Build prompt object
  const promptObject = {
    agent_details: {
      agent_name: firstName,
      agent_team: "Customer Solutions Tech Team"
    },
    context: {},
    options: {}
  };
  
  // Fill in context from template
  for (const key in promptTemplate.context) {
    promptObject.context[key] = promptTemplate.context[key];
  }
  
  // Fill in options from form data
  for (const key in promptTemplate.options) {
    if (formData && formData[key]) {
      promptObject.options[key] = formData[key];
    } else {
      promptObject.options[key] = promptTemplate.options[key];
    }
  }
  
  // Generate the full prompt text
  const promptText = generatePromptText(promptObject);
  
  return {
    success: true,
    promptObject: promptObject,
    promptText: promptText,
    template: promptTemplate
  };
}

// Generate the full prompt text
function generatePromptText(promptObject) {
  const template = `You are a support assistant at ${COMPANY}. Use the provided JSON to generate a polite, professional, and QA-compliant email response.

The email must follow **exactly** this 4-paragraph structure:

1. GREET    
2. THANKS + INTRO + EMPATHY + EDUCATION    
3. EMPOWERMENT    
4. CLOSING  

Below is the JSON object to use:

${JSON.stringify(promptObject, null, 2)}`;

  return template;
}

// Render Mustache template
function renderMustache(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const value = key.trim().split('.').reduce((obj, prop) => obj?.[prop], data);
    return value !== undefined ? value : `[missing: ${key.trim()}]`;
  });
}


// Get recommended context keys
function getRecommendedContextKeys() {
  return [
    'case_description',
    'contact_reason',
    'action_required',
    'justification',
    'request_status',
    'pending_reason',
    'actions_taken',
    'recommendations',
    'empowerment_statement'
  ];
}

// Get recommended option keys
function getRecommendedOptionKeys() {
  return [
    'ticket_number',
    'user_name',
    'user_company'
  ];
}

// Get template editor data
function getTemplateEditorData(adminEid, promptId) {
  if (!isAdmin(adminEid)) {
    return { 
      success: false, 
      message: 'Unauthorized access.' 
    };
  }
  
  let template = null;
  
  if (promptId) {
    template = getPromptById(promptId);
    if (!template) {
      return { 
        success: false, 
        message: 'Template not found.' 
      };
    }
  }
  
  return {
    success: true,
    template: template,
    contextKeys: getRecommendedContextKeys(),
    optionKeys: getRecommendedOptionKeys(),
    categories: getPromptCategories()
  };
}