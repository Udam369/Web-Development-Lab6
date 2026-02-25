// --- 1. Cookie Helper Function ---
function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// --- 2. Page Load Logic (Check Auth & Set Welcome Name) ---
window.onload = function() {
    let username = getCookie("username");
    
    if (username !== "") {
        // Find the span in the HTML and inject the username!
        document.getElementById("logged-in-user").innerText = username;
        
        // Load the data table
        renderTable(); 
    } else {
        // Kick them back to login if no cookie is found
        window.location.href = "index.html";
    }
};

// --- 3. Logout Logic ---
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Delete the cookie by setting an expiration date in the past
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "index.html";
});

// --- 4. Handle Form Submission ---
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Gather data
    let newUser = {
        fullName: document.getElementById('fname').value + " " + document.getElementById('lname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value
    };

    // Get existing data from local storage, or start an empty array
    let usersArray = JSON.parse(localStorage.getItem('userDatabase')) || [];
    
    // Add the new user and save back to local storage
    usersArray.push(newUser);
    localStorage.setItem('userDatabase', JSON.stringify(usersArray));

    // Reset UI
    this.reset();
    renderTable();
});

// --- 5. Render Data to Table ---
function renderTable() {
    let usersArray = JSON.parse(localStorage.getItem('userDatabase')) || [];
    let tbody = document.querySelector('#usersTable tbody');
    
    tbody.innerHTML = ""; // Clear old rows

    usersArray.forEach(function(user, index) {
        let row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${user.fullName}</strong></td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.gender}</td>
            <td><button class="btn-danger" onclick="deleteUser(${index})">Delete</button></td>
        `;
        
        tbody.appendChild(row);
    });
}

// --- 6. Delete User Logic ---
function deleteUser(index) {
    let usersArray = JSON.parse(localStorage.getItem('userDatabase')) || [];
    usersArray.splice(index, 1); 
    localStorage.setItem('userDatabase', JSON.stringify(usersArray)); 
    renderTable(); 
}