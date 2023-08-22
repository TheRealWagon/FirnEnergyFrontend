// import { Link } from "react-router-dom";

import Navbar from "../Navbar/navbar";
import Body from '../body/bodyContainer';
import Login from '../Authentication/login';
import WebHomePage from '../HomePage/WebHomePage';
import AdminPage from '../body/admin/adminPage';

export const LoginPage = () => (

    <div>
        <Login></Login>
    </div>

);

export const HomePage = () => (

    <div>
        <Navbar/>
        <Body/>
    </div>

);

export const WebsiteHomePage = () => (
    <div>
        <WebHomePage />
    </div>
)

export const WebAdminPage = () => (
    <div>
        <Navbar></Navbar>
        <AdminPage></AdminPage>
    </div>
)

// export const Products = () => (

//     <div>
//         <Navbar/>
//         <BodyContainer/>
//     </div>

// );

// export const AddProducts = () => (

//     <div>
//         <Navbar/>
//         <AddProductPage/>
//     </div>

// );

// export const EditProducts = () => (

//     <div>
//         <Navbar/>
//         <EditProductPage/>
//     </div>

// );

// export const NotFound = () => {
//     return (
//         <div>
//             <Link to="/over">Over ons</Link>
//         </div>
//     )
// }