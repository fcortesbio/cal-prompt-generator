function validateLogin(eid) {
    console.log("start input validation")
    if (!isValidEidFormat(eid)) {
        return {
            success: false,
            message: 'Invalid EID format. EID must be ' + EID_LENGTH + ' digits.'
        };
    }

    // Look up for EID in "user_data"
    const userData = getUserByEid(eid);

    if (!userData) {
        return {
            success: false,
            message: 'EID not found in the system.'
        };
    }

    // Extract first name from "Last, First" format
    const nameParts = userData.agent_name.split(', ');
    const firstName = nameParts.length > 1 ? nameParts[1] : userData.agent_name;

    console.log(firstName)
    return {
        success: true,
        user: {
            eid: userData.agent_eid,
            first_name: firstName,
            division: userData.agent_division,
            role: userData.agent_role
        }
    };
}
