import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import Login from "./Auth/Login";
import Register from "./Auth/Register";

import CartContextProvider from "./Contexts/CartContext";
import AuthenticatedUserContextProvider from "./Contexts/AuthenticatedUserContext";
import CheckoutContextProvider from "./Contexts/CheckoutContext";
import ThemeContext from "./Contexts/Theme";

import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Category from "./Category";
import Product from "./Product/Product";
import Checkout from "./Checkout/Checkout";

import AdminHome from "./Admin/Dashboard/AdminHome";
import EditProduct from "./Admin/Products/EditProduct";
import AddProduct from "./Admin/Products/AddProduct";
import Clients from "./Admin/Clients/Clients";
import AdminRoute from "./routes/AdminRoute";
import Pagination from "./Pagination";
import NewCommandes from "./Admin/Commandes/NewCommandes";
import ShippingCommandes from "./Admin/Commandes/ShippingCommandes";
import ImportExcel from "./Admin/Products/ImportExcel";
import CategoryPagination from "./CategoryPagination";
import Products from "./Admin/Products/Products";
import SearchPage from "./SearchPage";
import Account from "./Client/Account";
import ClientCommandes from "./Client/ClientCommandes";
import ManageCategories from "./Admin/Categories/ManageCategories";
export default function RouterApp() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (side, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [side]: open });
    };

    return (
        <AuthenticatedUserContextProvider>
            <CartContextProvider>
                <CheckoutContextProvider>
                    <ThemeContext>
                        <Router>
                            <Navbar state={state} toggleDrawer={toggleDrawer} />
                            <LeftSidebar
                                state={state}
                                toggleDrawer={toggleDrawer}
                            />
                            <RightSidebar
                                state={state}
                                toggleDrawer={toggleDrawer}
                            />
                            <Switch>
                                <Route exact path="/" component={Pagination} />
                                <Route
                                    exact
                                    path="/register"
                                    component={Register}
                                />
                                <Route exact path="/login" component={Login} />
                                <Route
                                    exact
                                    path="/categories/:category"
                                    component={CategoryPagination}
                                />
                                <Route
                                    exact
                                    path="/categories/:category/products/:productId"
                                    component={Product}
                                />
                                <Route
                                    exact
                                    path="/checkout"
                                    component={Checkout}
                                />
                                <Route
                                    exact
                                    path="/search"
                                    component={SearchPage}
                                />
                                <Route
                                    exact
                                    path="/client/account"
                                    component={Account}
                                />
                                <Route
                                    exact
                                    path="/client/commandes"
                                    component={ClientCommandes}
                                />
                                {/* ADMIN PAGES */}
                                <AdminRoute
                                    exact
                                    path="/admin"
                                    component={AdminHome}
                                />
                                <AdminRoute
                                    path="/admin/products/create"
                                    component={AddProduct}
                                />
                                <AdminRoute
                                    path="/admin/products/:productId/edit"
                                    component={EditProduct}
                                />
                                <AdminRoute
                                    path="/admin/products"
                                    component={Products}
                                />
                                <AdminRoute
                                    path="/admin/products/import"
                                    component={ImportExcel}
                                />
                                <AdminRoute
                                    path="/admin/clients"
                                    component={Clients}
                                />
                                <AdminRoute
                                    path="/admin/commandes/requested"
                                    component={NewCommandes}
                                />
                                <AdminRoute
                                    exact
                                    path="/admin/commandes/shipping"
                                    component={ShippingCommandes}
                                />
                                <AdminRoute
                                    exact
                                    path="/admin/categories"
                                    component={ManageCategories}
                                />
                            </Switch>
                        </Router>
                    </ThemeContext>
                </CheckoutContextProvider>
            </CartContextProvider>
        </AuthenticatedUserContextProvider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<RouterApp />, document.getElementById("app"));
}
