import React from "react"
import Item from "./Item.jsx";
export let itemsSearch;
import { useNavigate } from "react-router-dom";
export default function SearchBar(props)
{
    const inputRef = React.useRef(null);
    const navigate = useNavigate();
    function getSearchResults(products)
    {
        itemsSearch = [];
        let text = inputRef.current.value;
        text = text.toLowerCase();
        text = text.trimEnd();
        text = text.trimStart();
        if(text === "")
        {
            
        }
        else
        {
            props.clicked();
            inputRef.current.blur();
            navigate(`/searched/${text}`);
        }
    }
    return(
        <div className={props.className}>
            <input 
                ref={inputRef} 
                className="input-element" 
                placeholder="Search item in stock"
                onKeyDown={(e)=>
                {
                    if(e.key === 'Enter')
                    {
                        getSearchResults(props.products);
                    }
                }}
            />
            <img  
                onClick={()=>
                {
                    getSearchResults(props.products);
                }} 
                className="magnifying-glass" 
                alt="Search-icon" 
                src="Images/magnifyingGlass-icon.png"
            />
        </div>)
}