import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import PriceTag from "./PriceTag";
import { Button, Tooltip, Snackbar, Slide } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.primary,
        "&:hover": {
            boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.75)"
        },
        position: "relative"
    },
    whiteEm: {
        color: theme.palette.text.dark
    }
}));

export default function ProductCard({ add, product, alreadyIn, isAdmin }) {
    const classes = useStyles();
    let imgs = product.imageurls.split(",");
    const [open, setOpen] = React.useState(false);
    const handleOpenConfirm = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Paper className={classes.paper}>
                <PriceTag price={product.prices.prix_vente + " DA"} />
                <img src={`/storage/${imgs[0]}`} alt="no image" height="100" />
                <Tooltip title={product.name}>
                    <Link
                        to={{
                            pathname: `/categories/${product.category_id}/products/${product.id}`
                        }}
                    >
                        <Typography>
                            {product.name.slice(0, 22) + "..."}
                        </Typography>
                    </Link>
                </Tooltip>
                <React.Fragment>
                    {!alreadyIn(product.id) ? (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleOpenConfirm();
                                add(product.id, product.prices.prix_vente, 1);
                            }}
                        >
                            Add to Cart
                        </Button>
                    ) : (
                        <Typography variant="h6">Added!</Typography>
                    )}
                </React.Fragment>
            </Paper>
        </div>
    );
}
