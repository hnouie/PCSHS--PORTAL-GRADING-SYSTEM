document.addEventListener("DOMContentLoaded", function () {

    const teacherContainer = document.getElementById("teacherForm");

    if (teacherContainer) {

        const loginBtn = teacherContainer.querySelector(".login-btn");

        if (loginBtn) {
            loginBtn.addEventListener("click", function (e) {

                e.preventDefault();

                const usernameInput = teacherContainer.querySelector('input[type="text"]');
                const passwordInput = teacherContainer.querySelector('input[type="password"]');

                const username = usernameInput ? usernameInput.value : "";
                const password = passwordInput ? passwordInput.value : "";

                if (username === "teacher" && password === "admin") {
                    window.location.href = "tc-dashboard.html";
                } else {
                    alert("Invalid teacher login");
                }

            });
        }
    }

});