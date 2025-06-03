import { Link } from "react-router-dom"
export default function ShopButton(props)
{
    return( 
    <Link to="/" className={props.className}>
        <img className="shop-icon" src="/Images/shop.png" />
        <div className="shop">Shop</div>
    </Link>)
}