let  productId = document.getElementById("productId");
let  productName = document.getElementById("productName");
let  productPrice = document.getElementById("productPrice");
let  productCategory = document.getElementById("productCategory");
let  productDecription = document.getElementById("productDecription");
let  stockQuantity = document.getElementById("stockQuantity");
let  productImage = document.getElementById("productImage");



if (localStorage.getItem("myProducts")==null) {
let productItems=[];
    

}
else{
    productItems =JSON.parse(localStorage.getItem("myProducts")) ;
    viewProducts();

}

function validateInputs() {
    if (productId.value.trim() === "" ||
        productName.value.trim() === "" ||
        productPrice.value.trim() === "" ||
        productCategory.value.trim() === "" ||
        productDecription.value.trim() === "" ||
        stockQuantity.value.trim() === "") {
            alert("plase add all fildes");
        return false;
    }

    if (isNaN(productPrice.value) || Number(productPrice.value) <= 0) {
        alert("plese Add currect price");
        return false;
    }

    if (isNaN(stockQuantity.value) || Number(stockQuantity.value) < 1) {
        alert("plese Add currect quanaty");

        return false;
    }

  
    return true;
}
function addProduct(){
    if (!validateInputs()) return; 
    let product={
        id:productId.value,
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        decription:productDecription.value,
        quantity:stockQuantity.value,
        img:productImage.value,


    }
    productItems.push(product);
    localStorage.setItem("myProducts",JSON.stringify(productItems) );

    viewProducts();
    clearForm();
 }

function viewProducts() {

    let container ="";
    for (let i = 0; i < productItems.length; i++) {
        container += 
        `<tr>
        <td>`+productItems[i].id+`</td>
        <td>`+productItems[i].name+`</td>
       <td>`+productItems[i].price+`</td>
        <td>`+productItems[i].category+`</td>
        <td>`+productItems[i].decription+`</td>
        <td>`+productItems[i].quantity+`</td>
        <td><img src="${productItems[i].img}" alt="Product Image" width="50" height="50"></td>
        <td><button onclick="loadProduct(${i})" class="btn btn-warning">update</button></td>
    <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button></td>
    </tr>`;
        
    }

    document.getElementById("tableBody").innerHTML = container ; 
}


function clearForm() {
    productId.value="";
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productquantity.value="";
    productDecription.value="";
}


function deleteProduct(index) {

    productItems.splice(index,1);
    localStorage.setItem("myProducts",JSON.stringify(productItems) );

    viewProducts();
    
}



function loadProduct(index) {
    let product = productItems[index];
    productId.value = product.id;
    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productDecription.value = product.decription;
    stockQuantity.value = product.quantity;
    productImage.value = product.img;
    
    addButton.style.display = "none";
    updateButton.style.display = "block";
    
    currentIndex = index;
}

function updateProduct() {
    if (!validateInputs()) return;
    
    let updatedProduct = {
        id: productId.value,
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        decription: productDecription.value,
        quantity: stockQuantity.value,
        img: productImage.value,
    };
    
    productItems[currentIndex] = updatedProduct;
    localStorage.setItem("myProducts", JSON.stringify(productItems));
    
    viewProducts();
    clearForm();
}
