import React from "react";
import { cart } from "../Shop";
let scrollY;

export default function Item(props)
{
    const [selected, setSelected] = React.useState(false);
    const background = React.useRef(null);
    const quantityUI = React.useRef(null);
    const [inputValue, setInputValue] = React.useState('');
    let intInput = parseInt(inputValue);

    if(intInput < 0)
    {
        error = true;
        errorMessage = "You cant do that, lol.";
    }

    React.useEffect(() => {
    if (selected) 
    {

        scrollY = window.scrollY;
        background.current.style.marginTop = `${scrollY}px`;
        quantityUI.current.style.marginTop = `${scrollY}px`;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`
    } 
    else 
    {
        document.body.style.top = ``;
        document.body.style.overflow = 'auto';
        document.body.style.position = '';
        window.scrollTo(0, scrollY);
    }
    }, [selected]);

    function toggleQUI()
    {
        setSelected(prevValue => !prevValue);
    }

    function evaluateInput(event)
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
                    quantity: intInput,
                    deliveryOption: 50
                }
                cart.push(newItem);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart);
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

    let rands = (props.price*18.56).toFixed(2);
    let delimiterP = rands.toString().split(".");
    let priceRand = delimiterP[0];
    let priceCents = delimiterP[1];
    return (
    <>
    <div key={props.id} className="item" data-item-id={props.id}>
        <div className="image-canvas">
            <img alt="product item" className="item-image" src={props.image}/>
        </div>
        <div className="item-information">
            <div className="item-price"><span className="rands">R</span>{priceRand}<span className="cents">.{priceCents}</span></div>
            <div className="item-title">{props.name}</div>
            <button onClick={toggleQUI} className="addToCart-btn">Add to cart</button>
        </div>
    </div>
    {selected && <><div ref={background} className="quantity-background"></div>
    <div ref= {quantityUI} className="quantity">
        <div onClick={toggleQUI} className="close-QUI">
            <img className="x" src="/Images/close.png"/>
        </div>
        <div className="quantity-contents">
            <div className="wrapper-QUI">
                <div className="item-title-QUI">{props.name}</div>
                <div className="canvas-QUI">
                    <img alt="product item" className="item-image" src={props.image}/>
                </div>
            </div>
            <form onSubmit={evaluateInput} className="data-handling">
                <label className="quantity-lbl">Enter the quantity you would like to add</label>
                <input onChange={inputHandler} value={inputValue} id="quantity" type="number" className="quantity-InptFld"/>
                <button className="submit-Qty">Submit</button>
            </form>
        </div>
    </div></>}</>)
}