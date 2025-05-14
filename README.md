# Cal Prompt Generator - Complete App Specification (v1.0)

---

# 🌟 Overview

**App Name:** Cal Prompt Generator  
 **Purpose:** Support agents in generating structured, context-rich prompts to feed into "Cal," the company's Zendesk-embedded AI tool for writing email responses. This ensures outputs are personalized, coherent, and QA-compliant.  
 
 **Platform:** Google Apps Script Web App bound to a Google Spreadsheet  
 
 **Audience:** Internal use by Customer Solutions Tech Team
 
 **Status:** In active development. Release coming soon
---

# ✨ Core Features

## 1. Login & Session Management

* One input field requesting the Employee ID (EID).

* EID must be a 7-digit number (configurable).

* Valid EIDs are looked up in the `user_data` sheet.

* If found, the agent’s `first_name`, `division`, and `role` are extracted and stored in browser session.

* If not found: display message + option to sign up.

### **2. User Roles**

* `agent`: Can view/generate prompts.

* `admin`: Can manage templates and users.

* Only trusted people with access to the source can promote someone to admin.

* Sign-up requests are added to a `pending_users` sheet (no Gmail-based onboarding).

---

## **📃 Spreadsheet Structure**

### **Sheet: `user_data` (no header)**

| Column | Description |
| ----- | ----- |
| A | agent_eid (7-digit) |
| B | agent_name ("Last, First") |
| C | agent_division |
| D | agent_role ("agent" or "admin") |

### **Sheet: `prompt_data` (no header)**

| Column | Description |
| ----- | ----- |
| A | prompt_id (unique random number) |
| B | inquiry_reason |
| C | topic_name |
| D | case_name (unique within topic) |
| E | backend_log (optional) |
| F | email_subject (optional) |
| G | context (stringified JSON) |
| H | options (stringified JSON) |

### **Sheet: `pending_users`**

| Column | Description |
| ----- | ----- |
| A | EID |
| B | First Name |
| C | Last Name |
| D | Email |
| E | Status (pending/approved/denied) |

---

## **🔐 Configuration Constants (Code.gs)**

const COMPANY = "Blond";  
const DOMAIN_NAME = "domain.com";  
const OWNER_NAME = "Fabian";  
const OWNER_EMAIL = "fabian.cortes@domain.com";  
const EID_LENGTH = 7;

---

## **🎨 App Interface (HTML Emmet Overview)**

### **Base Structure**
```HTML 
<body>  
  <div id="login-section">  
    <div id="login-container">  
      <form>  
        <input type="number" id="eid-input" />  
        <button id="login" disabled>Login</button>  
      </form>  
      <p id="eid-alert">EID not found. <span>Click here to sign up!</span></p>  
      <div id="sign-up-form">...</div>  
    </div>  
  </div>

  <div id="dashboard">  
    <header>  
      <div class="header-content">  
        <h1 id="home">Prompt Generator</h1>  
        <div class="user-options">  
          <span id="greet">Hello, {{agent_name}}</span>  
          <button id="about">[?]</button>  
          <button id="add">[+]</button> <!-- visible if admin -->  
          <button id="logout">[x]</button>  
        </div>  
      </div>  
    </header>

    <main>  
      <div class="container">  
        <div class="sidebar" id="navigation-bar"></div>  
        <div class="content" id="main-board">  
          <div class="welcome-message">Select a case to generate a prompt.</div>  
          <div id="prompt-area" hidden>  
            <form id="options-form">...</form>  
            <div id="prompt-preview" contenteditable="true"></div>  
            <button id="copy-prompt">Copy Prompt</button>  
          </div>  
          <div id="crud" hidden>  
            <div class="add-user">...</div>  
            <div class="add-template">...</div>  
            <div class="edit-template">...</div>  
          </div>  
          <div id="about" hidden>...</div>  
        </div>  
      </div>  
    </main>  
  </div>  
</body>
```
---

## **🔧 Prompt Generation Logic**

### **Prompt Template A:**

You are a support assistant at Blond. Use the provided JSON to generate a polite, professional, and QA-compliant email response.

The email must follow **exactly** this 4-paragraph structure:

1. GREET    
2. THANKS + INTRO + EMPATHY + EDUCATION    
3. EMPOWERMENT    
4. CLOSING  

Below is the JSON object to use:

--- INSERT prompt_object here ---

### **prompt_object Schema**

{  
  "agent_details": {  
    "agent_name": "Fabian", // required  
    "agent_team": "Customer Solutions Tech Team"  
  },  
  "context": {  
    "case_description": "...",  // required  
    "contact_reason": "...",     // required  
    "action_required": "...",    // optional  
    "justification": "...",      // optional  
    "request_status": "pending", // required  
    "pending_reason": "...",     // optional  
    "actions_taken": "...",      // optional  
    "recommendations": "...",    // required  
    "empowerment_statement": "..." // required  
  },  
  "options": {  
    "ticket_number": 12345678,  
    "user_name": "Mary Sue",  
    "user_company": "Spotify"  
  }  
}

### **Education Block Logic**

| Condition | Output |
| ----- | ----- |
| pending + action_required + justification | 2 paragraphs |
| pending + pending_reason only | 1 paragraph |
| completed + actions_taken + recommendations | 2 paragraphs |

---

## **🔍 Mustache-Style Template Engine**

function renderMustache(template, data) {  
  return template.replace(/{{(.*?)}}/g, (_, key) => {  
    const value = key.trim().split('.').reduce((obj, prop) => obj?.[prop], data);  
    return value ?? `[missing: ${key.trim()}]`;  
  });  
}

Used to generate live prompt previews with real-time form updates.

---

## **🕊️ Admin Features**

* Add/Edit Template

* Fields: inquiry_reason, topic_name, case_name, context, options, backend_log, subject

* Context Builder:

  * Key-value entry

  * Autocomplete from recommended keys

* Options Builder:

  * Name + type selector (text, number)

* "Preview Prompt" button to visualize final output before saving

---

## **⛓ Security & Access**

* No OAuth required

* EID-based login only

* Prompt preview + copy functionality for agents

* Full CRUD features gated by `agent_role === 'admin'`

* No external API calls; only Apps Script + Google Sheets

---

## **🌐 Output Behavior**

* The copy-to-clipboard function copies the full prompt template + JSON

* Placeholder fields are replaced in real time in preview

---

## **📊 Future Enhancements (Optional)**

* QA rubric mention embedding in context

* Prompt rating system for admins (delayed due to spreadsheet write constraints)

* Export prompt directly to Cal's input field (if API access ever becomes possible)

---