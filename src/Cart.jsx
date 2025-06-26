import CartItem from "./Components/CartItem.jsx";
import Logo from "./Components/Logo.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import React from "react";
import OrderBox from "./Components/OrderBox.jsx";
import { Link } from 'react-router-dom'
import ShopButton from "./Components/shopButton.jsx";
import Attribution from "./Components/AttributionButton.jsx";

export default function Cart()
{
    const [productData, setProductData] = React.useState([])
    const [cartItems, setCartItems ] = React.useState([]);
    const [newKey, setKey] = React.useState(0);
    /*const [deliveryFee, setdeliveryFee] = React.useState(0);*/
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    React.useEffect(() => {
        document.body.classList.add('body-cart');
        fetch('https://dummyjson.com/products?limit=100')
            .then(res => res.json())
            .then((data) => {
                let lessDescriptiveArray = data.products.map(product => 
                product.title === "Essence Mascara Lash Princess" ? {...product, title: "Lash Princess Mascara"}:
                product.title === "Wooden Bathroom Sink With Mirror" ? {...product, title: "Wood Vanity Set"}:
                product.title === "Knoll Saarinen Executive Conference Chair" ? {...product, title: "Saarinen Conference Chair"}:
                product.title === "Asus Zenbook Pro Dual Screen Laptop" ? {...product, title: "Zenbook Pro Duo"}:
                product.title === "Apple MacBook Pro 14 Inch Space Grey" ? {...product, title: "MacBook Pro 14″ – Space Grey"}:
                product.title === "New DELL XPS 13 9300 Laptop" ? {...product, title: "DELL XPS 13 9300 Laptop"}:
                product.title === "Nike Air Jordan 1 Red And Black" ? {...product, title: "Nike Air Jordan 1"}:
                product.title === "Sports Sneakers Off White & Red" ? {...product, title: "Sports Sneakers Deluxe"}:
                product.title === "Sports Sneakers Off White Red" ? {...product, title: "Sports Sneakers"}: product);

                let combinedIdentyArr = lessDescriptiveArray.map(product=>
                ["furniture", "home-decoration", "kitchen-accessories"].includes(product.category) ? {...product, category: "home"}:
                ["mens-shirts", "mens-shoes"].includes(product.category) ? {...product, category: "clothes"}: product);
                
                setProductData(combinedIdentyArr);

                const Items = cart.map(item =>
                    <CartItem
                        key={item.productId}
                        setKey={newKeyGenerator}
                        cartItem={item}
                        products={combinedIdentyArr}
                        clicked={setCartItems}
                        /*setDeliveryFee={setdeliveryFee}*/
                    />)

                
                setCartItems(Items);
            })
            return () => {
                document.body.classList.remove('body-cart');
            };
        }, []);

    function newKeyGenerator()
    {
        setKey((prev)=>
        {
            if(prev === 1)
            {
                prev = prev - 1;
            }
            else
            if(prev === 0)
            {
                prev = prev + 1;
            }
            console.log(`This is the reload control variable: ${prev}`);
            return prev;
        })
    }

    return(
    <><div className="top-bar-cart">
        <div className="deco-2"></div>
        <div className="decorative-strip-container">
            <img src="/Images/Joburg(CBD).jpg" className="decorative-strip"/>
            <div className="decorative-cube"></div>
        </div>
        <div className="left-package">
            <Logo className="logo-contents-cart"/>
            <div className="link-enclosed">
                <ShopButton className="home-page-link"/>
            </div>
        </div>
        <div className="right-package">
            <SearchBar 
                products={productData}
                clicked={()=>
                {
                    /*reloadPage();*/
                }}
                className="search-bar-cart"
            />
            <Attribution className="attribution-cart"/>
        </div>
    </div>
    <div className="cart-display">
        {cart.length === 0 && <div className="empty-cart">items added to cart and total price summary will display here</div>}
        <div className="section1">
            <div className="cart-heading">Cart</div>
            {cartItems.length === 0 && cart.length !== 0 && 
            <>
                <div className="loading">Loading...</div>
                <div>Make sure your connected to the internet!</div>
            </>}
            {cartItems}
        </div>
        <div className="section2">
            {cart.length !== 0 && <OrderBox
                key={newKey}
                cart={cart}
                products={productData}
            />}
        </div>
    </div></>)
}