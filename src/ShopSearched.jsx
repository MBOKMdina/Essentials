import { useParams, useOutletContext } from "react-router-dom";
import Item from "./Components/Item.jsx"

export default function ShopSearched()
{
    let itemsSearch = [];
    const params = useParams();
    let text = params.text;
    let { reload, productData, setCartQuantity } = useOutletContext();
    if(["mens clothes", "mens shirts", "shirts", "shirt", "clothes"].includes(text))
    {
        text = "clothing";
    }
    else
    if(["shoe", "shoes", "mens shoes", "mens shoe", "men shoes", "men shoe"].includes(text))
    {
        text = "footwear";
    }
    else
    if(["make up", "makeup"].includes(text))
    {
        text = "beauty";
    }
    else
    if(["perfume", "body spray"].includes(text))
    {
        text = "fragrances";
    }
    else
    if(("earphones").includes(text) && text !== "")
    {
        text = "airpods";
    }
    else
    if(["computers", "computer"].includes(text))
    {
        text = "laptops";
    }
    else
    if(("electronics").includes(text) && text !== "")
    {
        text = "electronics";
    }
    else
    if(("technology").includes(text) && text !== "")
    {
        text = "technology";
    }
    let original = text;
    productData.forEach((product)=>
    {
        text = original;
        const tagsLowerCased = product.tags.map(tag => tag.toLowerCase())
        if (["food", "foods"].includes(original))
        {
            if(product.title === "Tissue Paper Box" || product.title === "Water")
            {

            }
            else
            {
                text = "groceries";
            }
        }

        if(text === "electronics")
        {
            let arrayOfTech = ["electronics", "laptops", "kitchen appliances"];
            if(arrayOfTech.includes(tagsLowerCased[0]))
            {
                text = tagsLowerCased[0];
            }
            else
            if(product.title === "Table Lamp")
            {
                text = tagsLowerCased[1];
            }
        }
        else
        if(text === "technology")
        {
            let arrayOfTech = ["electronics", "laptops", "kitchen appliances", "watches"];
            if(arrayOfTech.includes(tagsLowerCased[0]))
            {
                text = tagsLowerCased[0];
            }
            else
            if(product.title === "Table Lamp")
            {
                text = tagsLowerCased[1];
            }
        }

        if(product.title.toLowerCase().includes(text) && text !== "")
        {
            itemsSearch.push(
                <Item
                    key={`${product.id}${reload}`}
                    id={product.id}
                    image={product.images[0]}
                    price={product.price}
                    name={product.title}
                    changeCartQTY = {setCartQuantity}
                />
            )
        }
        else
        if(tagsLowerCased.includes(text))
        {
            itemsSearch.push(
                <Item
                    key={`${product.id}${reload}`}
                    id={product.id}
                    image={product.images[0]}
                    price={product.price}
                    name={product.title}
                    changeCartQTY = {setCartQuantity}
                />
            )
        }
        else 
        if(text === product.category)
        {
            itemsSearch.push(
                <Item
                    key={`${product.id}${reload}`}
                    id={product.id}
                    image={product.images[0]}
                    price={product.price}
                    name={product.title} 
                    changeCartQTY = {setCartQuantity}             
                />
            );              
        }
    })
    if(itemsSearch.length === 0)
    {
        itemsSearch = 
            <div key={reload} className="search-error-message">
                Sorry, unable to make out your search entry. Try:
                <ul className="search-solutions">
                    <li className="search-solution">Spelling correctly</li>
                    <li className="search-solution">Being more specific</li>
                    <li className="search-solution">Searching via provided category tabs</li>
                </ul>
            </div>;
    }
    console.log(itemsSearch)
    return (<div className="items-catalog">{itemsSearch}</div>)
}