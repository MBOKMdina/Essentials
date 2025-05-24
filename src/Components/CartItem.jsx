import React from "react";

export default function CartItem(props)
{
    const [selected, setSelected] = React.useState(false);
    let newCart;
    let cartItem = props.cartItem;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    console.log(cart);

    function toggleQUI()
    {
        setSelected(prevValue => !prevValue);
    }


    function removeItem()
    {
        newCart = cart.filter(item => item.productId !== cartItem.productId);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    let item;

    

    props.products.forEach((product)=>
    {
        if(cartItem.productId === product.id)
        {
            item = product;
            console.log(`Found it???`)
        }
    })

    function rerender()
    {
        let refresh = newCart.map(item=>
            <CartItem
                cartItem={item}
                products={props.products}
                onClick={props.onClick}
            />
        )
        return refresh
    }

    

    let priceR =((item.price*cartItem.quantity)*18.56).toFixed(2);

    let priceREach = (item.price*18.56).toFixed(2);

    function formatWithSpaces(number) {
        return new Intl.NumberFormat('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number).replace(/,/g, ' ');
    }

    let priceRFormatted = formatWithSpaces(priceR);

    let priceRandsFormatted = formatWithSpaces(priceREach);

    return(
    <div key={cartItem.productId} className="cart-item-container">
        <div className="canvas-cart">
            <img className="item-image" src={item.images[0]}/>
        </div>
        <div className="text-information">
            <div className="cart-item-name">{item.title} </div>
            <div className="item-quantity">Quantity: {cartItem.quantity} <button onCick={toggleQUI} className="edit-button">Edit</button></div>
            <div className="shipping">Free Shipping</div>
            <div 
                onClick={()=>{
                    removeItem() 
                    props.clicked(rerender())
                }} 
                className="remove-item"
            >Remove item from Cart</div>
        </div>
        <div className="cart-item-price">
            <div className="heading">Price</div>
            <div className="digit">R {priceRFormatted}</div>
            <div className="price-rands">R {priceRandsFormatted}</div>
        </div>
    </div>)
}