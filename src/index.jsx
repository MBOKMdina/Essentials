import React from 'react';
import ReactDOM from 'react-dom/client';
import Shop from "./Shop.jsx"
import ShopSpecific from "./ShopSpecific.jsx";
import ShopSearched from "./ShopSearched.jsx";
import Cart from "./Cart.jsx";
import CheckOut from './Checkout.jsx';
import { createBrowserRouter, RouterProvider, useLocation} from 'react-router-dom'
import "./Styles/sideBar.css"
import "./Styles/topBar.css"
import "./Styles/shopDisplay.css"
import "./Styles/cartDisplay.css"
import "./Styles/topBarCart.css"

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
    path: '/checkout',
    element: <CheckOut/>,
    errorElement: <div>404 noot found</div>
},
{
    path: '/cart',
    element: <Cart/>
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);