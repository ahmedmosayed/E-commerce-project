document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!users.some(user => user.email === "admin@example.com")) {
        const adminUser = {
            id: 1,
            firstName: "Admin",
            lastName: "User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin"
        };
        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));
    }

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            loginError.textContent = "Invalid email or password!";
            return;
        }
        
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        
        alert(`Login successful as ${user.role}!`);
        
        
        if (user.role === "admin") {
            window.location.href = "/admin/products.html";
        } else {
            window.location.href = "index.html";
        }
        
});
});
