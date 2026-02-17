// Dummy student account & info
const studentAccount = {
    username: "student",
    password: "1234",
    fullName: "Juan Dela Cruz",
    lrn: "1234567890",
    gradeSection: "Grade 11-A",
    strand: "TechPro",
    adviser: "Mrs. Santos",
    profilePic: "profile-placeholder.png" // placeholder picture
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
let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
let blocked = localStorage.getItem("blocked") === "true";

loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(blocked){
        alertMsg.textContent = "You have been blocked after 5 failed attempts. Please consult the programmer.";
        alertMsg.style.display = "block";
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    usernameError.style.display = "none";
    passwordError.style.display = "none";
    alertMsg.style.display = "none";

    let valid = true;
    if(username === "") { usernameError.textContent="Username cannot be empty"; usernameError.style.display="block"; valid=false; }
    if(password === "") { passwordError.textContent="Password cannot be empty"; passwordError.style.display="block"; valid=false; }
    if(!valid) return;

    if(username === studentAccount.username && password === studentAccount.password){
        localStorage.setItem("loggedInStudent", JSON.stringify(studentAccount));
        localStorage.setItem("studentGrades", JSON.stringify(demoGrades));
        localStorage.setItem("loginAttempts", 0);
        window.location.href = "student-dashboard.html";
    } else {
        attempts++;
        localStorage.setItem("loginAttempts", attempts);
        if(attempts >= MAX_ATTEMPTS){
            blocked = true;
            localStorage.setItem("blocked","true");
            alertMsg.textContent = "You have been blocked after 5 failed attempts. Please consult the programmer.";
        } else {
            alertMsg.textContent = `Invalid username or password. Attempts: ${attempts} / ${MAX_ATTEMPTS}`;
        }
        alertMsg.style.display = "block";
    }
});
