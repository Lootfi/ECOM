import React, { forwardRef } from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import MaterialTable from "material-table";

import { AuthenticatedUserContext } from "../../Contexts/AuthenticatedUserContext";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import BlockIcon from "@material-ui/icons/Block";
import SaveIcon from "@material-ui/icons/Save";
import Check from "@material-ui/icons/Check";
import AddBox from "@material-ui/icons/AddBox";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        maxWidth: "100%",
        [theme.breakpoints.down("xs")]: {
            padding: "100px 0 10px 0"
        }
    },
    editProduct: {
        color: theme.palette.primary.main
    }
}));

let dataColumns = [
    {
        title: "Image",
        field: "imageurls",
        render: rowData => (
            <img
                src={`/storage/${rowData.imageurls.split(",")[0]}`}
                style={{ width: 80 }}
            />
        )
    },
    { title: "Name", field: "name" },
    { title: "Stock", field: "stock" },
    { title: "Category", field: "category" }
];

export default function Products() {
    const classes = useStyles();
    const [products, setProducts] = React.useState();
    const { isAdmin } = React.useContext(AuthenticatedUserContext);

    React.useEffect(() => {
        axios
            .post("/api/products/all")
            .then(res => {
                let productsCopy = res.data.slice();
                productsCopy.forEach((product, i) => {
                    productsCopy[i] = {
                        ...product,
                        category: product.category.name
                    };
                    return productsCopy;
                });
                setProducts(productsCopy);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={classes.root}>
            <MaterialTable
                columns={dataColumns}
                data={products}
                title="Products"
                icons={{
                    Add: forwardRef((props, ref) => (
                        <AddBox {...props} ref={ref} />
                    )),
                    Check: forwardRef((props, ref) => (
                        <Check {...props} ref={ref} />
                    )),
                    Clear: forwardRef((props, ref) => (
                        <Clear {...props} ref={ref} />
                    )),
                    Delete: forwardRef((props, ref) => (
                        <DeleteOutline {...props} ref={ref} />
                    )),
                    DetailPanel: forwardRef((props, ref) => (
                        <ChevronRight {...props} ref={ref} />
                    )),
                    Edit: forwardRef((props, ref) => (
                        <Edit {...props} ref={ref} />
                    )),
                    Export: forwardRef((props, ref) => (
                        <SaveAlt {...props} ref={ref} />
                    )),
                    Filter: forwardRef((props, ref) => (
                        <FilterList {...props} ref={ref} />
                    )),
                    FirstPage: forwardRef((props, ref) => (
                        <FirstPage {...props} ref={ref} />
                    )),
                    LastPage: forwardRef((props, ref) => (
                        <LastPage {...props} ref={ref} />
                    )),
                    NextPage: forwardRef((props, ref) => (
                        <ChevronRight {...props} ref={ref} />
                    )),
                    PreviousPage: forwardRef((props, ref) => (
                        <ChevronLeft {...props} ref={ref} />
                    )),
                    ResetSearch: forwardRef((props, ref) => (
                        <Clear {...props} ref={ref} />
                    )),
                    Search: forwardRef((props, ref) => (
                        <Search {...props} ref={ref} />
                    )),
                    SortArrow: forwardRef((props, ref) => (
                        <ArrowDownward {...props} ref={ref} />
                    )),
                    ThirdStateCheck: forwardRef((props, ref) => (
                        <Remove {...props} ref={ref} />
                    )),
                    ViewColumn: forwardRef((props, ref) => (
                        <ViewColumn {...props} ref={ref} />
                    ))
                }}
                actions={[
                    rowData => ({
                        icon: props => (
                            <Link to={`/admin/products/${rowData.id}/edit`}>
                                <Edit
                                    {...props}
                                    className={classes.editProduct}
                                />
                            </Link>
                        )
                    })
                ]}
                detailPanel={[
                    {
                        tooltip: "Edit",
                        render: rowData => <EditProduct prodId={rowData.id} />
                    }
                ]}
            />
        </div>
    );
}
