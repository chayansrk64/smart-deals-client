import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import MyBids from "../pages/MyBids/MyBids";
import MyProducts from "../pages/MyProducts/MyProducts";
import PrivateRoutes from "./PrivateRoutes";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

const router = createBrowserRouter([
    {
        path: "/", 
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/all-products",
                Component: AllProducts
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/my-products",
                element: <PrivateRoutes> <MyProducts></MyProducts> </PrivateRoutes>
            },
            {
                path: "/my-bids",
                element: <PrivateRoutes> <MyBids></MyBids> </PrivateRoutes>
            },
            {
                path: "/create-product",
                element: <PrivateRoutes> <CreateProduct></CreateProduct> </PrivateRoutes>
            },
            {
                path: "/product-details/:id",
                loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
                element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>,
                hydrateFallbackElement: <p>LOADING...</p>
            }
        ]
    }
])

export default router;