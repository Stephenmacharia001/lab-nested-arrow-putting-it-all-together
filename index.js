/**
 * Step 1: Define the createLoginTracker Function (Outer Function)
 * Initializes tracking for a specific user and returns a secure login attempt tracker.
 */
function createLoginTracker(userInfo) {
    // Initialize Login Tracking (scoped within this outer function for security)
    let attemptCount = 0;

    // Define and Return an Inner Arrow Function to handle each login attempt
    return (passwordAttempt) => {
        // Increment the attempt count immediately when the function is called
        attemptCount++;

        // Strict Enforcement: If the user has already failed 3 times or more, block immediately
        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }

        // Check if the provided password matches the stored userInfo.password
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            // If this was the 3rd attempt and it failed, trigger the lockout string immediately
            if (attemptCount === 3) {
                return "Account locked due to too many failed login attempts";
            }
            // Matches Jest expectations: "Attempt 1: Login failed"
            return `Attempt ${attemptCount}: Login failed`;
        }
    };
}
module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};