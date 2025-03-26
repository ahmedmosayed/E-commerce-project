document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const usernameElement = document.getElementById("username");
    const adminActions = document.getElementById("admin-actions");
    const logoutBtn = document.getElementById("logout-btn");

    if (!loggedInUser) {
        window.location.href = "/pages/auth/login.html";
        return;
    }

    usernameElement.textContent = loggedInUser.firstName + " " + loggedInUser.lastName;

    if (loggedInUser.role === "admin") {
        adminActions.style.display = "block";
    }

    logoutBtn.addEventListener("click", function () {
        localStorage.clear(); 
        window.location.href = "/pages/auth/login.html";
    });
});