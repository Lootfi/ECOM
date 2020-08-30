import React from "react";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";
import { Route } from "react-router-dom";
import EditProduct from "../Admin/Products/EditProduct";
import AddProduct from "../Admin/Products/AddProduct";
import Clients from "../Admin/Clients/Clients";
import AdminHome from "../Admin/Dashboard/AdminHome";

export default function AdminRoutes() {
    const { isAdmin } = React.useContext(AuthenticatedUserContext);
    if (isAdmin)
        return (
            <React.Fragment>
                <Route exact path="/admin" component={AdminHome} />
                <Route
                    exact
                    path="/categories/:category/products/:productId/edit"
                    component={EditProduct}
                />
                <Route
                    exact
                    path="/admin/products/create"
                    component={AddProduct}
                />
                <Route exact path="/admin/clients" component={Clients} />
            </React.Fragment>
        );
    else {
        window.location = "/";
        return <h1>Nope</h1>;
    }
}
