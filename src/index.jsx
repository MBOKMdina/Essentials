import React from 'react';
import ReactDOM from 'react-dom/client';
import Shop from "./Shop.jsx"
import ShopSpecific from "./ShopSpecific.jsx";
import ShopSearched from "./ShopSearched.jsx";
import Cart from "./Cart.jsx";
import OrderPage from './OrderPage.jsx';
import Attribution from './Attribution.jsx';
import { createBrowserRouter, RouterProvider, useLocation} from 'react-router-dom'
import "./Styles/sideBar.css"
import "./Styles/topBars/topBar.css"
import "./Styles/displays/shopDisplay.css"
import "./Styles/displays/cartDisplay.css"
import "./Styles/topBars/topBarCart.css"
import "./Styles/displays/OrderPage.css"
import "./Styles/topBars/topBarOrder.css"
import "./Styles/displays/attributions.css"

const router = createBrowserRouter([
{
    path: '/',
    element: <Shop />,
    errorElement: <div>404 not found</div>,
    children: [
    {
        index: true, // 👈 This is the default route
        element: <ShopSpecific/> // Replace with your default JSX component
    },
    {
        path: '/category/:category',
        element: <ShopSpecific/>
    },
    {
        path: '/searched/:text',
        element: <ShopSearched/>
    }]
},
{
    path: '/order+confirmation',
    element: <OrderPage/>,
    errorElement: <div>404 not found</div>
},
{
    path: '/cart',
    element: <Cart/>
},
{
    path: '/attribution',
    element: <Attribution/>
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
