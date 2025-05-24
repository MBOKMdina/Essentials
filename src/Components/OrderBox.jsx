export default function OrderBox(props)
{
    let cartItem = props.cart;
    let subPrice = 0;
    cartItem.forEach((item)=>
    {
        props.products.forEach((product)=>
        {
            if(item.productId === product.id)
            {
                subPrice += Number(((item.quantity*product.price)*18.56).toFixed(2));
            }
        })
    })

    console.log(subPrice);

    function formatWithSpaces(number) {
        return new Intl.NumberFormat('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number).replace(/,/g, ' ');
    }

    let subPriceFormatted = formatWithSpaces(subPrice);

    const VAT = formatWithSpaces((0.15*subPrice).toFixed(2));

    let totalFormatted = formatWithSpaces(Number(VAT) + subPrice)
    
    return(<div className="place-order-container">
        <div className="line items-total">Subtotal <span className="end"> R {subPriceFormatted}</span></div>
        <div className="line delivery-fee">Delivery fee <span className="end">R 0</span></div>
    <div className="line vat">VAT(15%) <span className="end">R {VAT}</span></div>
        <div className="line decorative-stripe"></div>
        <div className="line total-cost">Total <span className="end">R {totalFormatted}</span></div>
        <button className="place-order">Place Order</button>
    </div>)
}