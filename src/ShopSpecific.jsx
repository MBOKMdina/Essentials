import { useParams, useOutletContext } from "react-router-dom";
import Item from "./Components/Item.JSX";
import React from "react";

export default function ShopSpecific()
{
    /*const [itemsCat, setItemsCat] = React.useState([]);*/
    const params = useParams();
    let { reload, productData, setCartQuantity} = useOutletContext();
    let category = params.category;
    let render;
    if(category === 'all' || !category)
    {
        render = productData.map(product => 
        <Item
            key={`${product.id}${reload}`}
            id={product.id}
            image={product.images[0]}
            price={product.price}
            name={product.title}
            changeCartQTY = {setCartQuantity}
        />)
    }
    else
    {
        render = productData.filter(product => product.category === category).map(product => 
        <Item
            key={`${product.id}${reload}`}
            id={product.id}
            image={product.images[0]}
            price={product.price}
            name={product.title}
            changeCartQTY = {setCartQuantity}             
        />)
    }
    
    return (
    <div className="main-shop-display">
        {/*<div className="cover-page"></div>*/}
        <div className="top-bar-APK">
            <img alt="Johannesburg CBD" className="johannesburg-APK" src={`./Images/Joburg(CBD).jpg`} />
        </div>
        <div className="items-catalog">
            {render}
        </div>
    </div>)
}