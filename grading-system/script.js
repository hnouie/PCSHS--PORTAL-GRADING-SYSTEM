document.addEventListener("DOMContentLoaded", function() {

    // Dummy student account
    const studentAccount = {
        username: "student",
        password: "1234",
        fullName: "John Louie Hernandez",
        lrn: "116205100062",
        gradeSection: "Grade 12-Justice",
        strand: "TechPro",
        schoolYear: "2025-2026",
        adviser: "Ms. Bonabel G. Bontoyan",
        profilePic: "images/juan.jpg"
    };

    // Sample grades
    const demoGrades = [
        {subject: "Math", q1: 93, q2: 97, q3:0, q4:0},
        {subject: "English", q1: 92, q2: 95, q3:0, q4:0},
        {subject: "Science", q1: 90, q2: 88, q3:0, q4:0},
        {subject: "Filipino", q1: 91, q2: 93, q3:0, q4:0},
        {subject: "PE", q1: 95, q2: 96, q3:0, q4:0},
        {subject: "TLE", q1: 89, q2: 91, q3:0, q4:0},
        {subject: "Music", q1: 94, q2: 92, q3:0, q4:0},
        {subject: "Edukasyon sa Pagpapakatao", q1: 96, q2: 97, q3:0, q4:0}
    ];

    const loginForm = document.getElementById("studentLoginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const alertMsg = document.getElementById("alertMsg");

    const MAX_ATTEMPTS = 5;
    const LOCK_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

    let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
    let blockedTime = parseInt(localStorage.getItem("blockedTime")) || 0;

    // ✅ Use form submit instead of loginBtn click
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const now = Date.now();

        // Check if user is temporarily blocked
        if(blockedTime && now - blockedTime < LOCK_TIME){
            const remaining = Math.ceil((LOCK_TIME - (now - blockedTime)) / 1000);
            alertMsg.textContent = `Too many failed attempts. Please wait ${remaining} seconds before trying again.`;
            alertMsg.style.display = "block";
            return;
        } else if(blockedTime && now - blockedTime >= LOCK_TIME){
            // Reset after lock time
            attempts = 0;
            blockedTime = 0;
            localStorage.removeItem("loginAttempts");
            localStorage.removeItem("blockedTime");
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        usernameError.style.display = "none";
        passwordError.style.display = "none";
        alertMsg.style.display = "none";

        let valid = true;
        if(username === "") { 
            usernameError.textContent = "Username cannot be empty"; 
            usernameError.style.display = "block"; 
            valid = false; 
        }
        if(password === "") { 
            passwordError.textContent = "Password cannot be empty"; 
            passwordError.style.display = "block"; 
            valid = false; 
        }
        if(!valid) return;

        if(username === studentAccount.username && password === studentAccount.password){
            // ✅ Save student info in localStorage
            localStorage.setItem("loggedInStudent", JSON.stringify(studentAccount));
            localStorage.setItem("studentGrades", JSON.stringify(demoGrades));
            localStorage.removeItem("loginAttempts");
            localStorage.removeItem("blockedTime");
            window.location.href = "student-dashboard.html";
        } else {
            attempts++;
            localStorage.setItem("loginAttempts", attempts);

            if(attempts >= MAX_ATTEMPTS){
                blockedTime = Date.now();
                localStorage.setItem("blockedTime", blockedTime);
                alertMsg.textContent = "Too many failed attempts. Please wait 5 minutes before trying again.";
            } else {
                alertMsg.textContent = `Invalid username or password. Attempts: ${attempts} / ${MAX_ATTEMPTS}`;
            }

            alertMsg.style.display = "block";
        }
    });

});