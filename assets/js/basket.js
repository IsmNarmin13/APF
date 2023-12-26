let table = document.querySelector(".table");
let totalPrice = document.getElementById("totalPrice");
let emptyBasketImage = document.getElementById("emptyBasketImage");

if (localStorage.getItem("basket") != null) {
    let arr = JSON.parse(localStorage.getItem("basket"));
    if (arr.length == 0) {
        table.style.display = "none";
        emptyBasketImage.style.display = "block"; 
    } else {
        table.style.display = "block";
        emptyBasketImage.style.display = "none"; 
    }

    arr.forEach(pro => {
        let tr = `
        <tr data-id="${pro.id}">
                    <td>
                    <img src="${pro.imgUrl}" alt"" width="150px" height="150px">
                    </td>
                    <td>
                    ${pro.name}
                    </td>
                    <td>
                    ${pro.price.replace(/\D/g, '')}
                    </td>
                    <td>
                    <i class="fa-solid fa-circle-minus"></i>
                    ${pro.count}
                    <i class="fa-solid fa-circle-plus"></i>
                    </td>
                    <td>
                    <i class="fa-solid fa-trash"></i>
                    </td>
                </tr>
        `;
        table.lastElementChild.innerHTML += tr;
    });

    CalculateTotalPrice(arr);

    let removeBtns = document.querySelectorAll(".fa-trash");
    RemoveButton(removeBtns, arr);

    let plusCount = document.querySelectorAll(".fa-circle-plus");
    PlusCount(plusCount, arr);

    let minusCount = document.querySelectorAll(".fa-circle-minus");
    MinusCount(minusCount, arr);
}

function PlusCount(plusIcons, arr) {
    plusIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            let proName = this.parentNode.parentNode.children.item(1).innerText;
            let newArr = [];
            if (newArr == null) {
                table.style.display = "none";
            }
            arr.forEach(element => {
                if (element.name == proName) {
                    ++element.count;
                    newArr.push(element);
                } else {
                    newArr.push(element);
                }
            });
            localStorage.setItem("basket", JSON.stringify(newArr));
            location.reload();
        });
    });
}
function MinusCount(minusIcons, arr) {
    minusIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            let productId = this.parentNode.parentNode.getAttribute("data-id");
            let newArr = [];

            arr.forEach(element => {
                if (element.id == productId) {
                    element.count--;
                    if (element.count >= 1) {
                        newArr.push(element);
                    }
                    
                    else {
                        let index = arr.findIndex(val => val == element);
                        newArr.splice(index, 1);
                    }
                } else {
                    newArr.push(element);
                }
            });

            localStorage.setItem("basket", JSON.stringify(newArr));
            location.reload();
        });
    });
}

function RemoveButton(removeBtns, arr) {
    removeBtns.forEach(element => {
        element.addEventListener("click", function () {
            let proName = this.parentNode.parentNode.children.item(1).innerText;
            let newArr = arr.filter(element => element.name !== proName);

            localStorage.setItem("basket", JSON.stringify(newArr));
            location.reload();
        });
    });
}

function CalculateTotalPrice(arr) {
    let sum = arr.reduce((prev, next) => {
        return prev + (next.price.replace(/\D/g, '') * next.count);
    }, 0);
    totalPrice.innerHTML = `Total Price: $${sum.toFixed(2)}`;
}