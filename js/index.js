console.log("index.js");
const electroicsBox = document.querySelector(".electroics");
console.log(electroicsBox)

let cart =JSON.parse(localStorage.getItem("productsCart")) || [];

let decrement=((element)=>{
    console.log("decrement")
    // console.log(element.id);
    // console.log(element)
    let search = cart.find((x)=> x.id=== element.id);
    console.log("decrement search",search)

    if(search=== undefined){
        return
    }
    else if(search.quantity===0){
        let search = cart.find((x)=> x.id=== element.id); 
        if(search===undefined){
            return
        }
    }
    else{
        search.quantity-=1;
        console.log("decrement else",search)
        // if(search.quantity==0){
        //     let checkIndex=((element)=>{
        //         console.log("checkIndex")
        //         return element.id==search.id
        //     })
        //     let index = cart.findIndex(checkIndex);
        //     console.log("index",index)
        //         cart.splice(index,1)
            
        // }  
      
    }
    // console.log(cart)
    updateQuantity(element.id);
    if(search.quantity==0){
        let checkIndex=((element)=>{
                    console.log("checkIndex")
                    return element.id==search.id
                })
                let index = cart.findIndex(checkIndex);
                console.log("index",index)
                    cart.splice(index,1)
    }
    // cart = cart.filter((x)=> x.quantity!=0);
    localStorage.setItem("productsCart",JSON.stringify(cart));

})

const increment =((element)=>{
    console.log("increment",element)
    console.log("element name",element.name)
    // console.log(element.id);
    // console.log(element)
    let search = cart.find((x)=> x.id=== element.id);
    console.log(search)
    if(search=== undefined){
        cart.push({
            id:element.id,
            quantity:1
            // name:element.name,
            // details:element.details,
            // price:element.price,
            // image:element.imageUrl
        })
    }
    else{
        search.quantity+=1;
    }
    console.log(cart);
    localStorage.setItem("productsCart",JSON.stringify(cart));
    updateQuantity(element.id);
})

const fetchProducts = ()=>{
    console.log('inside fetchProducts')
    // fetch('./products.json').then(response => response.json()).then(data => {
    //     console.log(data)
    //     console.log(data.products.length);
        
    //     let html="";
    //     if(data.products){
    //     data.products.forEach((element) => {
    //         let search = cart.find((x)=>x.id===element.id) || [];
    //         html+= `<div class="product-box" product_id=${element.id}>
    //             <div class="product_img">
    //                 <img src=${element.imageUrl} alt=${element.name}  >
    //             </div>
    //             <div class="product-info">
    //                 <div class="product-company">${element.name}</div>
    //                 <div class="product-details">${element.details}</div>
    //                 <div class="product-price-quantity">
    //                    <div class="product-price">₹ ${element.price}</div> 
    //                    <div class="product-quantity"><i class="fa-solid fa-minus minQuantBtn quantBtn" 
    //                    onclick="decrement(${element.id})"></i><span class="quantityValue" 
    //                    id=${element.id}>${search.quantity === undefined ? 0 : search.quantity}</span>
    //                    <button class="minQuantBtn quantBtn" onclick="increment(${element.id})"><i class="fa-solid fa-plus"></i></button></div>
    //                 </div>  
    //             </div>
    //         </div>`
    //     });
    // }
    // electroicsBox.innerHTML=`${html}`
    // })

        
        let html="";

        products.map((element) => {
            let search = cart.find((x)=>x.id===element.id) || [];
            html+= `<div class="product-box" product_id=${element.id}>
                <div class="product_img">
                    <img src=${element.imageUrl} alt=${element.name}  >
                </div>
                <div class="product-info">
                    <div class="product-company">${element.name}</div>
                    <div class="product-details">${element.details}</div>
                    <div class="product-price-quantity">
                       <div class="product-price">₹ ${element.price}</div> 
                       <div class="product-quantity"><i class="fa-solid fa-minus minQuantBtn quantBtn" 
                       onclick="decrement(${element.id})"></i><span class="quantityValue" 
                       id=${element.id}>${search.quantity === undefined ? 0 : search.quantity}</span>
                       <button class="minQuantBtn quantBtn" onclick="increment(${element.id})"><i class="fa-solid fa-plus"></i></button></div>
                    </div>  
                </div>
            </div>`
        });
    
    electroicsBox.innerHTML=`${html}`

}

fetchProducts();

// {
//     // if(response.ok){
//     //     throw new Error(`Http error ! ${response.status}`)
//     // }
//     return response.json
// }


let updateQuantity = (id)=>{
    console.log("update quantity",id,cart);
    let cartProduct = JSON.parse(localStorage.getItem("productsCart"));
    console.log("cartProduct",cartProduct)
    let searchProduct = cart.find((x)=>x.id === id);
    console.log("searchProduct",searchProduct)
    if(searchProduct){
        let quantity = searchProduct.quantity;
       document.getElementById(id).innerHTML=quantity
    }
    calculateTotalQuantity();
}

let calculateTotalQuantity = ()=>{
    console.log("calculateTotalQuantity",cart);
    let cartProduct = JSON.parse(localStorage.getItem("productsCart"));
    let totalQuantity = cart.map((x)=>x.quantity).reduce((x,y)=> x+y,0);
    console.log("totalQuantity",totalQuantity)
    console.log(cart.map((x)=>x.quantity))
    document.querySelector(".cartValue").innerHTML=totalQuantity

}

calculateTotalQuantity();