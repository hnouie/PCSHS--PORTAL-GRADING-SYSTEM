document.addEventListener("DOMContentLoaded", function () {

    const teacherForm = document.getElementById("teacherForm");
    const loginBtn = teacherForm.querySelector(".login-btn"); // use teacher form login button

    loginBtn.addEventListener("click", function (e) {
        e.preventDefault(); // prevent form submission

        const username = teacherForm.querySelector('input[type="text"]').value;
        const password = teacherForm.querySelector('input[type="password"]').value;

        // FAKE TEACHER ACCOUNT
        if (username === "teacher" && password === "admin") {
            window.location.href = "http://127.0.0.1:5500/tc-dashboard.html";
        } else {
            alert("Invalid teacher login");
        }
    });

});
