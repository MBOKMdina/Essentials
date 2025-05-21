import Category from "./Components/Category.jsx"
import React from "react"
import Item from "./Components/Item.jsx"
import { itemsCat } from "./Components/Category.jsx";
import { itemsSearch } from "./Components/SearchBar.jsx";
import Logo from "./Components/Logo.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { Link, Outlet} from 'react-router-dom'
export let cart

export default function Shop()
{
    const [productData, setProductData] = React.useState([]);
    const [display, setDisplay] = React.useState([]);
    const [reload, reloadIndicator] = React.useState(0);
    const [cartQuantity, setCartQuantity] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(()=>
    {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        let quantity = 0
        cart.forEach((item)=>
        {
            quantity =+ item.quantity;
        })
        setCartQuantity(quantity);
    }, []);

    console.log(cart);
    
    function reloadPage()
    {
        reloadIndicator((prev)=>
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

    React.useEffect(() => {
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

            const initialitemsCat = combinedIdentyArr.map(product => 
                <Item
                    key={product.id}
                    id={product.id}
                    image={product.images[0]}
                    price={product.price}
                    name={product.title}
                    changeCartQTY = {setCartQuantity}
                />)
            
            setDisplay(initialitemsCat);
            setLoading(!loading);
        })
    }, []);

    /*productData.forEach((product)=>
    {
        console.log(product.category);
    })*/


    /*console.log(productData);*/

    return (<>
        <div className="sideBar">
            <img alt="Johannesburg CBD" className="Johannesburg" src="Images/Joburg(CBD).jpg"/>
        </div>
        <div className="topBar">
            <div className="top-section">
                <Logo className="logo-contents"/>
                <SearchBar 
                    products={productData}
                    clicked={()=>
                    {
                        reloadPage();
                    }}
                    className="search-bar"
                />
                <div className="attribution">Attributions</div>
                <Link to="/cart" className="cart-container">
                    <img alt="Cart-icon" className="cart-icon" src="Images/cart-basket-icon.png"/>
                    <div className="cart">Cart</div>
                    {cartQuantity !== 0 && <div className="cart-quantity">{cartQuantity}</div>}
                </Link>
            </div>
            <div className="categoryContainer">
                { !loading && <><Category
                    category="all"
                    label= "All"
                    clicked={()=>
                    {
                        reloadPage();
                    }}
                />
                <Category
                    category="beauty"
                    label="Beauty"
                    clicked={()=>
                    {
                        reloadPage();
                    }}             
                />
                <Category
                    category="fragrances"
                    label="Fragrances"
                    reload={reload}                    
                    products = {productData}
                    clicked={()=>
                    {
                        reloadPage();
                    }}              
                />

                <Category
                    category="groceries"
                    label="Groceries"
                    clicked={()=>
                    {
                        reloadPage();
                    }}                            
                />
                <Category
                    category="home"
                    label="Home"
                    clicked={()=>
                    {
                        reloadPage();
                    }}                 
                />
                <Category
                    category="laptops"
                    label="Laptops"
                    clicked={()=>
                    {
                        setDisplay(itemsCat);
                        reloadPage();
                    }}          
                />
                <Category
                    category="clothes"
                    label="Mens Clothes"
                    clicked={()=>
                    {

                        reloadPage();
                    }}             
                />
                <Category
                    category="mens-watches"
                    label="Mens Watches"
                    clicked={()=>
                    {
                        reloadPage();
                    }}       
                />

                <Category
                    category="mobile-accessories"
                    label="Mobile Accessories"
                    clicked={()=>
                    {
                        reloadPage();
                    }}                  
                /></>}             
            </div>
        </div>
        {/*<div className="items-catalog">
            {display}
        </div>*/}
        <Outlet context={{reload, productData, setCartQuantity}}/>
    </>)
}