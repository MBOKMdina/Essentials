import React from "react";
import { Link } from "react-router-dom";

export default function Attribution()
{
    React.useEffect(() => {
    document.body.classList.add('body-attributions');
    return () => {
        document.body.classList.remove('body-attributions');
    };
    }, []);

    function BackLink() 
    {
        window.history.back();
    }
    
    return(<div className="credits">
        <div className="credits-heading">Credits/sources</div>
        <a href="https://commons.wikimedia.org/wiki/File:Johannesburg_Skyline.jpg">Johannesburg CBD</a>
        <a href="https://www.flaticon.com/free-icon/search_17216943?term=search&page=1&position=23&origin=tag&related_id=17216943">Magnifying glass icon</a>
        <a href="https://www.flaticon.com/free-icon/shopping-cart_10252872?term=basket&page=1&position=26&origin=search&related_id=10252872">Cart icon</a>
        <a href="https://www.flaticon.com/free-icon/cancel_722133?term=close&page=1&position=78&origin=tag&related_id=722133">Close x</a>
        <a href="https://www.flaticon.com/free-icon/shop_5178544?term=shop&page=1&position=30&origin=search&related_id=5178544">Shop icon</a>
        <a href="https://www.flaticon.com/free-icon/arrow_5772124?term=back+arrow&page=2&position=7&origin=search&related_id=5772124">Previouse page icon</a>
        <div onClick={BackLink} className="link-back"><img className="previouse-page"src="/Images/previouse-page.png"/> Previouse page</div>
    </div>)
}