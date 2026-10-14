/**
 * Step 1: Define the createLoginTracker Function (Outer Function)
 * Initializes tracking for a specific user and returns a secure login attempt tracker.
 * 
 * @param {Object} userInfo - Contains the credentials.
 * @param {string} userInfo.username - The user's registered username.
 * @param {string} userInfo.password - The user's registered password.
 * @returns {Function} An inner arrow function that handles individual login attempts.
 */
function createLoginTracker(userInfo) {
    // Initialize Login Tracking (scoped within this outer function for security)
    let attemptCount = 0;

    // Define and Return an Inner Arrow Function to handle each login attempt
    return (passwordAttempt) => {
        // Increment the attempt count immediately when the function is called
        attemptCount++;

        // If the account was already locked, or this attempt pushes it past 3, lock it down
        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }

        // Check if the provided password matches the stored userInfo.password
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            // Check if this specific failed attempt triggers the lockout threshold
            if (attemptCount === 3) {
                return "Account locked due to too many failed login attempts";
            }
            return `Login failed. Attempt ${attemptCount} of 3.`;
        }
    };
}

// ==========================================
// TEST CASES & VERIFICATION (Step 2: Test and Refine)
// ==========================================

const testUser = {
    username: "user1",
    password: "password123"
};

// Scenario A: Successful login on the first attempt
console.log("--- Running Scenario A: Quick Success ---");
const trackUserA = createLoginTracker(testUser);
console.log(trackUserA("password123")); // Expected: "Login successful"

// Scenario B: Brute force lockout test
console.log("\n--- Running Scenario B: Brute Force Lockout ---");
const trackUserB = createLoginTracker(testUser);
console.log(trackUserB("wrongPass1"));  // Expected: "Login failed. Attempt 1 of 3."
console.log(trackUserB("wrongPass2"));  // Expected: "Login failed. Attempt 2 of 3."
console.log(trackUserB("wrongPass3"));  // Expected: "Account locked due to too many failed login attempts"
console.log(trackUserB("password123")); // Expected: "Account locked due to too many failed login attempts" (Even with correct pass)



module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};