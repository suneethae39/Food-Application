function addToCart(id, name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingFood = cart.find(food => food.id === id);

    if (existingFood) {

        existingFood.quantity += 1;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}
function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");

    let cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="alert alert-info text-center">
                Your cart is empty 🛒
            </div>
        `;

        cartTotal.innerText = 0;

        return;
    }


    cart.forEach(function(food, index) {

        let itemTotal = food.price * food.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="card mb-3">

                <div class="card-body">

                    <div class="row align-items-center">

                        <div class="col-md-4">

                            <h5>
                                ${food.name}
                            </h5>

                            <p>
                                ₹${food.price} each
                            </p>

                        </div>


                        <div class="col-md-4">

                            <button
                                class="btn btn-danger"
                                onclick="decreaseQuantity(${index})">

                                −

                            </button>


                            <span class="mx-3">

                                ${food.quantity}

                            </span>


                            <button
                                class="btn btn-success"
                                onclick="increaseQuantity(${index})">

                                +

                            </button>

                        </div>


                        <div class="col-md-2">

                            <strong>
                                ₹${itemTotal}
                            </strong>

                        </div>


                        <div class="col-md-2">

                            <button
                                class="btn btn-outline-danger"
                                onclick="removeFromCart(${index})">

                                Remove

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });


    cartTotal.innerText = total;
}
function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}
function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity -= 1;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}
function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}
if (document.getElementById("cartItems")) {

    displayCart();

}
function placeOrder(event) {

    event.preventDefault();

    let name = document.getElementById("customerName").value;

    let mobile = document.getElementById("customerMobile").value;

    let address = document.getElementById("customerAddress").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total = 0;

    cart.forEach(function(food) {

        total += food.price * food.quantity;

    });


    fetch("/place-order", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            mobile: mobile,
            address: address,
            total: total
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        localStorage.removeItem("cart");

        window.location.href = "/";

    })

    .catch(error => {

        console.log(error);

        alert("Something went wrong!");

    });

}
function displayCheckoutTotal() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(function(food) {

        total += food.price * food.quantity;

    });

    let checkoutTotal = document.getElementById("checkoutTotal");

    if (checkoutTotal) {

        checkoutTotal.innerText = total;

    }
}


if (document.getElementById("checkoutTotal")) {

    displayCheckoutTotal();

}