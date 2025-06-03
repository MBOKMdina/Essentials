import { formatWithSpaces } from "./SharedCode/SharedCode.jsx";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid"
let order;

export default function OrderBox(props)
{
    let cart = props.cart;
    let subPrice = 0;
    let deliveryFee = 0;
    cart.forEach((item)=>
    {
        props.products.forEach((product)=>
        {
            if(item.productId === product.id)
            {
                subPrice += Number(((item.quantity*product.price)*18.56).toFixed(2));
                deliveryFee += Number(item.deliveryOption.toFixed(2))
                deliveryFee = Number(deliveryFee.toFixed(2));
            }
        })
    })

    let subPriceFormatted = formatWithSpaces(subPrice);

    let deliveryFeeFormatted = formatWithSpaces(deliveryFee);

    const VAT = formatWithSpaces((0.15*subPrice).toFixed(2));

    let totalFormatted = formatWithSpaces(Number((0.15*subPrice).toFixed(2)) + subPrice + deliveryFee)

    function placeOrder()
    {
        order = 
        {
            totalPrice: totalFormatted,
            id: '056798',
            cart: cart
        }
        localStorage.setItem("order", JSON.stringify(order));
        localStorage.removeItem("cart");
    }

    console.log(totalFormatted)
    
    return(<div className="place-order-container">
        <div className="line items-total">Subtotal <span className="end"> R {subPriceFormatted}</span></div>
        <div className="line delivery-fee">Delivery fee <span className="end">R {deliveryFeeFormatted}</span></div>
    <div className="line vat">VAT(15%) <span className="end">R {VAT}</span></div>
        <div className="line decorative-stripe"></div>
        <div className="line total-cost">Total <span className="end">R {totalFormatted}</span></div>
        <Link to="/order+confirmation" className="place-order" onClick={placeOrder}>Place Order</Link>
    </div>)
}