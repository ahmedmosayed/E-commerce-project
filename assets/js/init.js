document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const adminExists = users.some(user => user.email === "admin@example.com");

    if (!adminExists) {
        const adminUser = {
            id: "100001", 
            firstName: "Admin",
            lastName: "User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin"
        };

        users.push(adminUser);
        localStorage.setItem("Admin", JSON.stringify(users));
    }
});
