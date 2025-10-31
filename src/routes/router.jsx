import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";

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
            }
        ]
    }
])

export default router;