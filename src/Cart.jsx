import CartItem from "./Components/CartItem.jsx";
import Logo from "./Components/Logo.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import React from "react";
import OrderBox from "./Components/orderBox.jsx";
import { Link } from 'react-router-dom'

export default function Cart()
{
    const [productData, setProductData] = React.useState([])
    const [cartItems, setCartItems ] = React.useState([]);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];;

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
                        cartItem={item}
                        products={combinedIdentyArr}
                        clicked={setCartItems}

                    />)

                
                setCartItems(Items);
            })
            return () => {
                document.body.classList.remove('body-cart');
            };
        }, []);
    return(
    <><div className="top-bar-cart">
        <div className="decorative-strip-container">
            <img src="./Images/Joburg(CBD).jpg" className="decorative-strip"/>
            <div className="decorative-cube"></div>
        </div>
        <div className="left-package">
            <Logo className="logo-contents-cart"/>
            <div className="link-enclosed">
                <Link to="/" className="home-page-link">
                    <img className="shop-icon" src="/Images/shop.png" />
                    <div className="shop">Shop</div>
                </Link>
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
            <div className="attribution-cart">Attributions</div>
        </div>
    </div>
    <div className="back-ground"></div>
    <div className="cart-display">
        <div className="section1">
            <div className="cart-heading">Cart</div>
            {cartItems}
        </div>
        <div className="section2">
            <OrderBox 
                cart={cart}
                products={productData}
            />
        </div>
    </div></>)
}