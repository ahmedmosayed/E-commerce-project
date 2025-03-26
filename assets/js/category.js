

let categoryId = document.getElementById("categoryId");
let categoryName = document.getElementById("categoryName");

if (localStorage.getItem("myCategories") == null) {
    var categoryItems = [];
} else {
    categoryItems = JSON.parse(localStorage.getItem("myCategories"));
    viewCategories();
}

function validateInputs() {
    if (categoryId.value.trim() === "" || categoryName.value.trim() === "") {
        alert("Please add all fields");
        return false;
    }
    return true;
}

function addCategory() {
    if (!validateInputs()) return;
    let category = {
        id: categoryId.value,
        name: categoryName.value,
    };
    categoryItems.push(category);
    localStorage.setItem("myCategories", JSON.stringify(categoryItems));
    viewCategories();
    clearForm();
}

function viewCategories() {
    let container = "";
    for (let i = 0; i < categoryItems.length; i++) {
        container += `
        <tr>
            <td>${categoryItems[i].id}</td>
            <td>${categoryItems[i].name}</td>
            <td><button onclick="loadCategory(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteCategory(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = container;
}

function clearForm() {
    categoryId.value = "";
    categoryName.value = "";
}

function deleteCategory(index) {
    categoryItems.splice(index, 1);
    localStorage.setItem("myCategories", JSON.stringify(categoryItems));
    viewCategories();
}

function loadCategory(index) {
    let category = categoryItems[index];
    categoryId.value = category.id;
    categoryName.value = category.name;
    addButton.style.display = "none";
    updateButton.style.display = "block";
    currentIndex = index;
}

function updateCategory() {
    if (!validateInputs()) return;
    let updatedCategory = {
        id: categoryId.value,
        name: categoryName.value,
    };
    categoryItems[currentIndex] = updatedCategory;
    localStorage.setItem("myCategories", JSON.stringify(categoryItems));
    viewCategories();
    clearForm();
}
