export default function CartItem(props)
{
    let newCart;
    let cartItem = props.cartItem;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];;
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

    let subtotal = ((item.price*18.56)*cartItem.quantity).toFixed(2);

    let priceRands = (item.price*18.56).toFixed(2);

    function formatWithSpaces(number) {
        return new Intl.NumberFormat('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number).replace(/,/g, ' ');
    }

    let subtotalFormatted = formatWithSpaces(subtotal);
    let priceRandsFormatted = formatWithSpaces(priceRands);

    return(
    <div className="cart-item-container">
        <div className="canvas-cart">
            <img className="item-image" src={item.images[0]}/>
        </div>
        <div className="text-information">
            <div className="cart-item-name">{item.title} </div>
            <div className="item-quantity">Quantity: {cartItem.quantity} <button className="edit-button">Edit</button></div>
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
            <div className="heading">Subtotal</div>
            <div className="digit">{`R ${subtotalFormatted}`}</div>
            <div className="price-rands">({`R ${priceRands} each`})</div>
        </div>
    </div>)
}