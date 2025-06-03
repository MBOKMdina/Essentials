import { findItem } from "./SharedCode/SharedCode";

export default function ItemOrder(props)
{
    let item = props.item;

    let daysToAdd = item.deliveryOption  === 100 ? 5 : 2;

    let deliveryDate = new Date(); 
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    const  nameOfMonths = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = deliveryDate.getDate(); // Get the day of the month (1-31)
    let month = deliveryDate.getMonth(); // Get the month (0-11), add 1 to get (1-12)
    let year = deliveryDate.getFullYear();

    const dayName = days[deliveryDate.getDay()];

    let dateConversion = `${dayName}, ${day} ${nameOfMonths[month]} ${year}`;

    console.log(item);

    let productItem = findItem(item, props.products);

    return(
    <div className="item-order">
        <div className="canvas-order">
            <img className="order-image" src={productItem.images[0]}/>
        </div>
        <div className="details">
            <div>{productItem.title}</div>
            <div>Quantity: {item.quantity}</div>
            <div><span>Delivery date:</span> {dateConversion}</div>
        </div>
    </div>)
}