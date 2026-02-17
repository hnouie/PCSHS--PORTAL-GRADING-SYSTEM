document.getElementById("loginBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter username and password.");
    } else {
        alert("Login button clicked! (Logic coming soon)");
    }
});
