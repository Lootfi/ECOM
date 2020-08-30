import React, { forwardRef } from "react";
import { makeStyles, Tooltip, Button } from "@material-ui/core";

import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
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
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 0 10px 0"
        }
    },
    shippingIcon: {
        color: theme.palette.primary.main
    },
    overloadShippingIcon: {
        color: theme.palette.warning.main
    },
    shipAllText: {
        fontWeight: "bolder"
    },
    bgr: {
        backgroundColor: "#BBB"
    }
}));

let dataColumns = [
    {
        title: "ID",
        field: "id",
        render: rowData => <p>#{rowData.id}</p>
    },
    {
        title: "Date",
        field: "date_commande"
    },
    {
        title: "Client Name",
        field: "clientName"
    },
    {
        title: "State",
        field: "status",
        render: rowData => {
            if (rowData.status == "shipped")
                return (
                    <Tooltip title="Shipped">
                        <Check style={{ color: "green" }} />
                    </Tooltip>
                );
            else if (rowData.status == "waiting")
                return (
                    <Tooltip title="Requested">
                        <HourglassEmptyIcon />
                    </Tooltip>
                );
        }
    }
];

export default function NewCommandes() {
    const classes = useStyles();
    const [commandes, setCommandes] = React.useState([]);
    const [shipped, setShipped] = React.useState(undefined);
    const { isAdmin } = React.useContext(AuthenticatedUserContext);

    React.useEffect(() => {
        axios
            .get("/api/commandes/requested")
            .then(res => {
                let cmds = res.data.slice();
                cmds.forEach((cmd, i) => {
                    cmds[i] = {
                        ...cmd,
                        status: cmd.status,
                        overload: false,
                        clientName:
                            cmd.commande.client.lastName +
                            " " +
                            cmd.commande.client.firstName,
                        ...cmd.commande
                    };
                    //
                    for (let prod of cmd.commande.products) {
                        if (prod.quantity > prod.product.stock) {
                            cmds[i].overload = true;
                            break;
                        }
                    }
                    console.log(cmds[0]);
                    delete cmds[i].client;
                    delete cmds[i].commande;
                    return cmds;
                });
                console.log("again");
                setCommandes(cmds);
            })
            .catch(err => console.log(err));
    }, [shipped]);

    let shipOne = id => {
        axios
            .post("/api/livraisons/ship-one", { id })
            .then(res => {
                console.log(res.data);
                setShipped(id);
                let cmdsCopy = commandes.slice();
                _.remove(cmdsCopy, cmd => {
                    return cmd.livraison_id == id;
                });
                setTimeout(() => {
                    setCommandes(cmdsCopy);
                }, 1000);
            })
            .catch(err => console.log(err));
    };
    return (
        <div className={classes.root}>
            <MaterialTable
                columns={dataColumns}
                data={commandes}
                title="New Oders"
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
                        disabled: rowData.overload != [],
                        icon: () => {
                            return (
                                <LocalShippingIcon
                                    className={
                                        rowData.overload
                                            ? classes.overloadShippingIcon
                                            : classes.shippingIcon
                                    }
                                />
                            );
                        },
                        tooltip: rowData.overload
                            ? "Product quantity overload"
                            : "Livrer La Commande",
                        onClick: (event, rowData) =>
                            shipOne(rowData.livraison_id)
                    })
                ]}
                components={{
                    Row: props => (
                        <MTableBodyRow
                            {...props}
                            className={
                                props.data.livraison_id == shipped &&
                                classes.bgr
                            }
                        />
                    )
                }}
            />
        </div>
    );
}
