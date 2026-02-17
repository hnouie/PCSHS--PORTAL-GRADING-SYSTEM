document.getElementById("loginBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // FAKE TEACHER ACCOUNT
    if (username === "teacher" && password === "admin") {
        window.location.href = "tc-dashboard.html";
    } else {
        alert("Invalid teacher login");
    }
});
