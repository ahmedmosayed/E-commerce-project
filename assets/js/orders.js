
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function displayOrders() {
    let orders = getData("orders");
    let orderList = document.getElementById("orderList");
    if (orders.length === 0) {
        orderList.innerHTML = "<p>No orders yet</p>";
        return;
    }
    orderList.innerHTML = orders.map(order => `
        <div class="order">
            <p><strong>order Id</strong> ${order.id}</p>
            <p><strong>Stutes :</strong> ${order.status}</p>
            <button class="accept" onclick="updateOrderStatus(${order.id}, 'Confirmed')"> Confirmed</button>
            <button class="reject" onclick="updateOrderStatus(${order.id}, 'Rejected')"> Rejected</button>
        </div>
    `).join("");
}

function updateOrderStatus(id, status) {
    let orders = getData("orders").map(order => 
        order.id === id ? { ...order, status } : order
    );

    saveData("orders", orders);
    displayOrders();
}

window.onload = displayOrders;

localStorage.setItem("orders", JSON.stringify([
    { id: 1, status: "Pending" },
    { id: 2, status: "Pending" },
    { id: 3, status: "Pending" }
]));