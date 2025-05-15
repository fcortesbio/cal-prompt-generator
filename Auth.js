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
    console.log("look up user in database")
    if (!user) {
        return {
            success: false,
            message: "EID not found",
        };
    }

    // 
    console.log("found user in database")
    console.log("user:", user)
    return {
        success: true,
        message: "Login successful",
        user: user,
    };
}