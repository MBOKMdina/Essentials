export default function OrderBox()
{
    return(<div className="place-order-container">
        <div className="line items-total">Subtotal: R 1 600.80</div>
        <div className="line delivery-fee">Delivery fee: R 0</div>
        <div className="line vat">VAT(15%): R 240</div>
        <div className="line decorative-stripe"></div>
        <div className="line total-cost">Total: R 1 840.00</div>
        <button className="place-order">Place Order</button>
        <div></div>
    </div>)
}