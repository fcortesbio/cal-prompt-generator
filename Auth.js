// Validate user login
function validateLogin(eid) {
    if (!isValidEidFormat) {
        return {
            success: false,
            message: "Invalid eid format"
        };

    }

    // Look up for EID in "user_data"
    const user = getUserByEid(eid);
    if (!user) {
        return {
            success: false,
            message: "EID not found",
        };
    }

    // 
    return {
        success: true,
        message: "Login successful",
        user: user,
    };
}