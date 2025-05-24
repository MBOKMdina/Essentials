import React from "react";
import { cart } from "../Shop";
import QuantityUI from "./QuantityUI.jsx"

export default function Item(props)
{
    const [selected, setSelected] = React.useState(false);
    const background = React.useRef(null);
    const quantityUI = React.useRef(null);
    const [inputValue, setInputValue] = React.useState('');
    let errorMessage = "";
    let intInput = parseInt(inputValue);

    let error = false;

    if(intInput < 0)
    {
        error = true;
        errorMessage = "You cant do that, lol.";
    }

    React.useEffect(() => {
    if (selected) 
    {
        const scrollY = window.scrollY;
        background.current.style.marginTop = `${scrollY}px`;
        quantityUI.current.style.marginTop = `${scrollY}px`;
        document.body.style.overflow = 'hidden';
    } 
    else 
    {
        document.body.style.overflow = 'auto';
    }
    }, [selected]);

    function toggleQUI()
    {
        setSelected(prevValue => !prevValue);
    }

    function handleInput(event)
    {
        event.preventDefault();
        if(inputValue === "")
        {
            console.log("Nope");
        }
        else
        if(intInput < 0)
        {
            
        }
        else
        {
            props.changeCartQTY(prevValue => prevValue + intInput);
            let found = false;
            cart.forEach((item)=>
            {
                if(props.id === item.productId)
                {
                    found = true;
                    item.quantity = item.quantity + intInput;
                }    
            })

            if(!found)
            {
                let newItem = 
                {
                    productId: props.id,
                    quantity: intInput
                }
                cart.push(newItem);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart);
            setSelected(prevValue => !prevValue); 
        }
        
    }

    let rands = (props.price*18.56).toFixed(2);
    let delimiterP = rands.toString().split(".");
    let priceRand = delimiterP[0];
    let priceCents = delimiterP[1];
    return (
    <>
    <div key={props.key} className="item" data-item-id={props.id}>
        <div className="image-canvas">
            <img alt="product item" className="item-image" src={props.image}/>
        </div>
        <div className="item-price"><span className="rands">R</span>{priceRand}<span className="cents">.{priceCents}</span></div>
        <div className="item-title">{props.name}</div>
        <button onClick={toggleQUI} className="addToCart-btn">Add to basket</button>
    </div>
    { selected && <><div ref={background} className="quantity-background"></div>
    <div ref= {quantityUI} className="quantity">
        <div onClick={toggleQUI} className="close-QUI">
            <img className="x" src="Images/close.png"/>
        </div>
        <div className="quantity-contents">
            <div className="item-title-QUI">{props.name}</div>
            <div className="canvas-QUI">
                <img alt="product item" className="item-image" src={props.image}/>
            </div>
            <form onSubmit={handleInput} className="data-handling">
                <label className="quantity-lbl">Enter the quantity you would like to add</label>
                <input onChange={(e)=>setInputValue(e.target.value)} id="quantity" type="number" className="quantity-InptFld"/>
                { error && <div className="input-error">{errorMessage}</div> }
                <button className="submit-Qty">Submit</button>
            </form>
        </div>
    </div></>}</>)
}