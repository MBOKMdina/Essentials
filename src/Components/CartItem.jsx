import React from "react";
import {formatWithSpaces, findItem} from "./SharedCode/SharedCode.jsx";

export default function CartItem(props)
{
    const [selected, setSelected] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    let newCart;
    let cartItem = props.cartItem;
    const [delivery, setDelivery] = React.useState(cartItem.deliveryOption);
    const [quantity, setQuantity] = React.useState(cartItem.quantity);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let intInput = parseInt(inputValue);

    function setCart()
    {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    if(intInput < 0)
    {
        error = true;
        errorMessage = "cart quantity must be positive";
    }

    console.log(cart);

    function toggleQUI()
    {
        setSelected(prevValue => !prevValue);
    }

    function inputEvaluation(event)
    {
        event.preventDefault();
        if(inputValue === "")
        {
            console.log("Nope");
        }
        else
        if(intInput <= 0)
        {
            
        }
        else
        {
            /*props.changeCartQTY(prevValue => prevValue + intInput);*/
            cart.forEach((item)=>
            {
                if(cartItem.productId === item.productId)
                {
                    item.quantity = intInput;
                }    
            })
            setCart();
            setQuantity(intInput);
            props.setKey();
            setSelected(prevValue => !prevValue); 
        }
        
    }
    
    function inputHandler(e)
    {
        const value = e.target.value;
        if(value < 0)
        {
            setInputValue(0)
        }
        else
        {
            setInputValue(value)
        }
    }

    function removeItem()
    {
        newCart = cart.filter(item => item.productId !== cartItem.productId);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    let item = findItem(cartItem, props.products);

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

    

    let priceR =((item.price*quantity)*18.56).toFixed(2);

    let priceREach = (item.price*18.56).toFixed(2);

    let priceRFormatted = formatWithSpaces(priceR);

    /*console.log(`This is the total price from cartItem ${priceRFormatted}`)*/

    let priceRandsFormatted = formatWithSpaces(priceREach);

    function deliveryOption(e)
    {
        cart.forEach((item)=>
        {
            if(cartItem.productId === item.productId)
            {
                item.deliveryOption = Number(e.target.value);
            }    
        })
        setCart();
        setDelivery(Number(e.target.value));
        props.setKey();
    }

    return(
    <div key={cartItem.productId} className="cart-item-container">
        <div className="canvas-container">
            <div className="canvas-cart">
                <img className="item-image" src={item.images[0]}/>
            </div>
            <div className="delivery-div">
                <div className="delivery-otpions">Delivery options</div>
                <div className="radio-options">
                    <div className="radio-individual-1">
                        <input 
                            checked = {delivery === 50}
                            name={item.title} 
                            className="radio" 
                            type="radio"
                            value= {50}
                            id = {`${item.title}-standard-delivery`}
                            onChange={deliveryOption}
                        />
                        <label htmlFor={`${item.title}-standard-delivery`} className="radio-explanation">
                            <div>Standard delivery</div>
                            <div className="delivery-cost">R 50</div>
                        </label>
                    </div>
                    <div className="radio-individual-2">
                        <input
                            checked={delivery === 100}
                            className="radio" 
                            name={item.title} 
                            type="radio"
                            value={100}
                            id = {`${item.title}-express-delivery`}
                            onChange={(e)=>{deliveryOption(e)}}
                        />
                        <label htmlFor={`${item.title}-express-delivery`} className="radio-explanation">
                            <div>Express delivery</div>
                            <div className="delivery-cost">R 100</div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-information">
            <div className="cart-item-name">{item.title} </div>
            <div className="item-quantity">Quantity: {`${quantity} `}
                <button onClick={toggleQUI} className="edit-button">Edit</button>
                {selected && <><form onSubmit={inputEvaluation} className="edit-quantity-wrapper">
                    <input onChange={inputHandler} value={inputValue} className="input-edit-quantity" type="number" />
                    <button className="enter-edited-quantity">Enter</button>
                </form></>}
            </div>
            <div className="price">Price: <span className="pricexquantity">R {priceRFormatted}</span>{` (R ${priceRandsFormatted} each)`}</div>
            <div 
                onClick={()=>{
                    removeItem() 
                    props.clicked(rerender())
                }}

                className="remove-item"

            >Remove item from Cart</div>
        </div>
    </div>)
}