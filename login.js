// --- 1. Page Load Logic (Auto-Redirect) ---
window.onload = function() {
    // Check if the "username" cookie already exists
    if (document.cookie.includes("username=")) {
        // The user is already logged in! 
        // Do not let them log in again; send them straight to the dashboard.
        window.location.href = "../registration.html";
    }
};

// --- 2. Login Button Logic ---
document.getElementById('loginBtn').addEventListener('click', function() {
    let username = document.getElementById('loginUsername').value;
    
    if(username.trim() !== "") {
        // Save username into cookie (expires in 1 day)
        document.cookie = "username=" + encodeURIComponent(username) + "; path=/; max-age=86400";
        
        // Redirect to registration page
        window.location.href = "../registration.html";
    } else {
        alert("Please enter a valid username.");
    }
});