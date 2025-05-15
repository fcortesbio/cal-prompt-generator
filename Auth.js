// Validate user login
function validateLogin(eid) {
    if (!isValidEidFormat) {
        return {
            success: false,
            message: "Invalid eid format"
        };

    }
    else {
        return {
            success: true,
            message: "Login successful"

        };

    }
}