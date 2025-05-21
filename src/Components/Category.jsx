import Item from "./Item.jsx"
export let itemsCat;
import { Link } from 'react-router-dom'
export default function Category(props)
{
    return(
        <Link 
            className="category"
            to={`/category/${props.category}`}
            onClick={props.clicked}
        >
            {props.label}
        </Link>)
}