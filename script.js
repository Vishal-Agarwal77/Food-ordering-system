const menuContainer = document.getElementById("menu-container");
async function getMenu() {
    const response = await fetch(`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`);
    const data = response.json();
    // console.log(data);
    data.then((res) => {
        displayCards(res)
    }).catch((err) => {
        console.log(err);
    })
}
getMenu();
function displayCards(data) {
    for (let el of data) {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
        <img src="${el.imgSrc}">
            <div class="detail">
                <div class="card-info">
                    <p class="card-name">${el.name}</p>
                    <p class="card-price">$${el.price}/-</p>
                </div>
                <div class="add">
                    <img src="./images/add-logo.png">
                </div>
            </div>`
        menuContainer.appendChild(div);
        let item = document.getElementsByClassName("add");
        item[item.length - 1].addEventListener("click", () => {
            orderProcessing(el);
            // TakeOrder(el);
        });
    }
}
let cart = [];
async function orderProcessing(el) {
    try {
        let response1 = await TakeOrder();
        // console.log(data);
        let cartObj = {
            name: el.name,
            price: el.price,
            quantity: "1"

        }
        cart.push(cartObj);
        let response2 = await orderPrep();
        console.log(response2);
        if(response2.order_status){
            let response3 = await payOrder();
            if(response3.paid){
                thankyouFnc();
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function TakeOrder() {
    // console.log(el);
    return new Promise(
        resolve => {
            setTimeout(() => {
                resolve("added");
            }, 2500)
        },
        reject => {
            reject(new Error("not added"));
        }
    );
}
async function orderPrep() {
    return new Promise(
        resolve => {
            setTimeout(() => {
                // resolve("Order is Processed");
                let status = {
                    order_status: true,
                    paid: false
                }
                resolve(status);
            }, 1500)
        },
        reject => {
            reject("Cannot process order");
        }
    )
}
async function payOrder() {
    return new Promise(
        resolve => {
            setTimeout(() => {
                let status = {
                    order_status: true, 
                    paid: true
                }
                resolve(status);
            },1000)
        },
        reject => {
            reject("There is some problem with Payment");
        }
    )
}
function thankyouFnc(){
    alert("thank you for eating with us today!");
}