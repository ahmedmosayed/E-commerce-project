document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const registerError = document.getElementById("register-error");

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const repeatedPassword = document.getElementById("repeat-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            registerError.textContent = "This email is already registered!";
            return;
        }

        if (password !== repeatedPassword) {
            registerError.textContent = "Passwords do not match!";
            return;
        }

        let lastUserId = parseInt(localStorage.getItem("lastUserId")) || 1;

lastUserId++;

const newUser = {
    id: lastUserId, 
    firstName,
    lastName,
    email,
    password,
    role: "customer" 
};

localStorage.setItem("lastUserId", lastUserId.toString());
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! You can now login.");
        window.location.href = "/pages/auth/login.html";
    });
});
