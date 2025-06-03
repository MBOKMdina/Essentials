import React from "react";
import ItemOrder from "./Components/ItemOrder.jsx";
import Logo from "./Components/Logo.jsx";
import Attribution from "./Components/AttributionButton.jsx";
import ShopButton from "./Components/shopButton.jsx";

export default function OrderPage()
{
    const [items, setItems] = React.useState([]);
    let order = JSON.parse(localStorage.getItem("order")) || [];
    const [productData, setProductData] = React.useState([]);
    React.useEffect(() => {
    document.body.classList.add('body-order');
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

            const Items = order.cart.map(item =>
                <ItemOrder
                    key={item.productId}
                    item={item}
                    products={combinedIdentyArr}
                />)

            setItems(Items);
        })
        return () => {
            document.body.classList.remove('body-order');
        };
    }, []);

    return(
    <>
        <div className="top-bar-order">
            <Logo className="logo-contents-order" />
            <ShopButton/>
            <Attribution className="attribution-order"/>
        </div>
        <div className="receipt-display">
            <div className="order-confirmation">Order confirmed</div>
            <div className="encouragement">Thank you for purchasing from K-essentials online store!</div>
            <div className="order-number"><span>Order ID:</span> {order.id}</div>
            <div className="total-paid"><span>Toal paid:</span> R {order.totalPrice}</div>
            <div className="border"></div>
            <div className="item-details">
                <div className="your-items">Your items</div>
                {items}
            </div>
        </div>
    </>)
}