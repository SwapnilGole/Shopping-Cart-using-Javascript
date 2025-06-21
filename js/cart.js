
let cartBtnList =JSON.parse(localStorage.getItem("productsCart")) || [];
console.log("cartBtnList:"+cartBtnList)


let calculateTotalQuantity = ()=>{
    console.log("calculateTotalQuantity",cartBtnList);
    let cartProduct = JSON.parse(localStorage.getItem("productsCart"));
    let totalQuantity = cartBtnList.map((x)=>x.quantity).reduce((x,y)=> x+y,0);
    console.log("totalQuantity",totalQuantity)
    console.log(cartBtnList.map((x)=>x.quantity))
    document.querySelector(".cartValue").innerHTML=totalQuantity

}

calculateTotalQuantity();

let cartBox = document.getElementById("cartBox");
let label = document.getElementById("label");


let cartEmpty = false;
// let fetchProductsList = ()=>{

// }
console.log("before fetch")
// let productList=[]
// let fetchProductsList = async()=>{
//     console.log("before fetch")
//     fetch('./products.json').then(response => response.json()).then(data => {
//         console.log("data",data.products)
//         productList.push(data.products[0])
//     }).catch(error => console.error('Failed to fetch products:',error));
// }     
console.log("productsList");
// console.log(productList)



let generateCartItem = ()=>{
    console.log("generateCartItem")
    if(cartBtnList.length!==0){
        console.log("if length is 0")
        return cartBox.innerHTML= cartBtnList.map((product)=>{
            console.log("before map:",product.id);
            // console.log(productList)
            let search = products.find((x)=> x.id === product.id);
            console.log(search)
            label.innerHTML=`
                        <div class="totalAmount">
                <p class="totalBill">Total Bill: ₹ <span class="billAmt" id="totalBillableAmtSpan">0</span> </p>
            </div>
            <div class="cartPageBtnBox">
                <button class="checkoutBtn">Checkout</button>
                <button class="clearCart" onclick="clearCart()">Clear Cart</button>
            </div>`

            return `
            <div class="productBox" id="productBox">
                <div class="productImg">
                    <img src=${search.imageUrl} alt="" width="100px" height="100px">
                </div>
                <div class="productDetails">
                    <div class="productInfo">
                        <div class="productName"><h3>${search.name}</h3></div>
                        <div class="price"><p>₹${search.price}</p></div>
                    </div>
                    <div class="productQuantity">
                        
                        <div class="quantityBox">
                            <button class="minQuant" onclick="decrement(${product.id})"><i class="fa-solid fa-minus"></i></button>
                            <span class="quantity" id=${product.id}>${product.quantity}</span>
                            <button class="minQuant" onclick="increment(${product.id})"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="totalPrice"><span id="priceMultiQuant" >₹${search.price*product.quantity}</span></div>
                    </div>
                    <div class="removeProduct">
                        <button class="deleteProductBtn" onclick="removeProdfromCart(${product.id})"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>
            `
            
        }).join("")
    }
    else{
        cartBox.innerHTML="";
        label.innerHTML=`
        <h2>Cart is empty</h2>
            <button><a href="index.html">Add products</a></button>
        `
    }
}
// fetchProductsList();
generateCartItem();

// let calculatePriceMultiQuantity = ((product)=>{
//     console.log(product)
//     console.log("calculatePriceMultiQuantity",product.id)
//     let search = cartBtnList.find((x)=> x.id === id);
//     console.log(search)
//     let totalAmtOfProduct = search.quantity*search.price;
//     console.log("totalAmtOfProduct",totalAmtOfProduct)
//     document.getElementById("priceMultiQuant").innerHTML=totalAmtOfProduct;

// });


let decrement=((element)=>{
    console.log("decrement")
    // console.log(element.id);
    // console.log(element)
    let search = cartBtnList.find((x)=> x.id=== element.id);
    console.log("decrement search",search)

    if(search=== undefined){
        return
    }
    else if(search.quantity===0){
        let search = cartBtnList.find((x)=> x.id=== element.id); 
        if(search===undefined){
            return
        }
    }
    else{
        search.quantity-=1;
    }
    // console.log(cart)
    updateQuantity(element.id);

    // if(search.quantity==0){
        // let checkIndex=((element)=>{
        //             console.log("checkIndex")
        //             return element.id==search.id
        //         })
        //         let index = cartBtnList.findIndex(checkIndex);
        //         cartBtnList.splice(index,1)
        cartBtnList = cartBtnList.filter((x)=> x.quantity !== 0)
        console.log(cartBtnList)
        generateCartItem();
    // }
    // cart = cart.filter((x)=> x.quantity!=0);
    localStorage.setItem("productsCart",JSON.stringify(cartBtnList));
    totalBillAmount()
})

const increment =((element)=>{
    console.log("increment",element)
    console.log("element name",element.name)
    let search = cartBtnList.find((x)=> x.id=== element.id);
    console.log(search)
    if(search=== undefined){
        cartBtnList.push({
            id:element.id,
            quantity:1
        })
    }
    else{
        search.quantity+=1;
    }
    generateCartItem();
    localStorage.setItem("productsCart",JSON.stringify(cartBtnList));
    updateQuantity(element.id);
    totalBillAmount()
})

let updateQuantity = (id)=>{
    console.log("update quantity",id,cartBtnList);
    let cartProduct = JSON.parse(localStorage.getItem("productsCart"));
    console.log("cartProduct",cartProduct)
    let searchProduct = cartBtnList.find((x)=>x.id === id);
    console.log("searchProduct",searchProduct)
    if(searchProduct){
        let quantity = searchProduct.quantity;
       document.getElementById(id).innerHTML=quantity
    }
    calculateTotalQuantity();
}

//remove complete product from cart at once
let removeProdfromCart = (element)=>{
    console.log("removeProdfromCart",element);
    console.log("deleteProductBtn",element.id)
    // let search = cartBtnList.find((x)=> x.id=== element.id);
    // console.log(search.id)
    // if(search!= undefined){
        // let checkIndex=((element)=>{
        //     console.log("checkIndex")
        //     return element.id==search.id
        // })
        // let index = cartBtnList.findIndex(checkIndex);

        // console.log("index",index)
        // cartBtnList.splice(index,1);
        cartBtnList = cartBtnList.filter((x)=> x.id !== element.id)
        console.log(cartBtnList)
        generateCartItem();
        localStorage.setItem("productsCart",JSON.stringify(cartBtnList));
        updateQuantity(element.id);
        totalBillAmount()
    // }
    
}

let totalBillAmount = ()=>{
    if(cartBtnList.length!==0){
    console.log("totalBillAmount")
    let totalBillableAmount=0;
    console.log(cartBtnList)
    let totalQuantity = cartBtnList.map((x)=>{
        console.log("inside totalQuantity")
        let id = x.id
        let quantity = x.quantity
        console.log("id",id)
    console.log("quantity",quantity)
    let search = products.find((x)=> x.id === id);
    console.log(search)
    console.log(typeof(parseInt(search.price)))
    totalBillableAmount+=parseInt(search.price)*quantity;
    // let totalBillableAmountString = totalBillableAmount.toString().length;
    // switch (totalBillableAmountString) {
    //     case totalBillableAmountString>3:
            
    //         break;
    
    //     default:
    //         break;
    // }
    });
    console.log("totalBillableAmount:"+totalBillableAmount)
    document.getElementById("totalBillableAmtSpan").innerHTML=totalBillableAmount;
    }
    else{
        return
    }
}

totalBillAmount();

let clearCart = ()=>{
    cartBtnList = [];
    generateCartItem();
    calculateTotalQuantity();
    localStorage.setItem("productsCart",JSON.stringify(cartBtnList))
}