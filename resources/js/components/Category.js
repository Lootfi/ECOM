import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
import ProductCard from "./Product/ProductCard";
import {
    Grid,
    LinearProgress,
    Breadcrumbs,
    Typography,
    Link as MuiLink
} from "@material-ui/core";
import { CartContext } from "./Contexts/CartContext";
import { AuthenticatedUserContext } from "./Contexts/AuthenticatedUserContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 0 10px 0"
        }
    },
    bread: {
        marginBottom: "20px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "10px"
        }
    }
}));

export default function Category() {
    const classes = useStyles();
    const { add, alreadyIn } = React.useContext(CartContext);
    const { isAdmin } = React.useContext(AuthenticatedUserContext);
    let { category } = useParams();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        axios
            .get(`/api/categories/${category}`)
            .then(res => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [category]);
    return (
        <div className={classes.root}>
            {products.length && (
                <Breadcrumbs className={classes.bread}>
                    <Link to="/">Homepage</Link>
                    <Typography>{products[0].category.name}</Typography>
                </Breadcrumbs>
            )}
            <Grid
                container
                wrap="wrap"
                spacing={3}
                justify="center"
                alignItems="center"
            >
                {products.length ? (
                    products.map((product, i) => {
                        return (
                            <>
                                {product.stock > 0 && (
                                    <Grid key={product.id} item>
                                        <ProductCard
                                            add={add}
                                            product={product}
                                            alreadyIn={alreadyIn}
                                            isAdmin={isAdmin}
                                        />
                                    </Grid>
                                )}
                            </>
                        );
                    })
                ) : (
                    <LinearProgress />
                )}
            </Grid>
        </div>
    );
}
