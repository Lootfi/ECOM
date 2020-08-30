import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import ProductCard from "./ProductCard";
import { CartContext } from "../Contexts/CartContext";

export default function SimilarProducts({ productId }) {
    const { add, alreadyIn } = React.useContext(CartContext);
    const [products, setProducts] = React.useState(undefined);
    React.useEffect(() => {
        axios
            .get(`/api/products/${productId}/similar`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <Grid container spacing={2}>
            {products && (
                <React.Fragment>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Similar Products
                        </Typography>
                    </Grid>
                    {products.map((product, index) => (
                        <>
                            {product.stock > 0 && (
                                <Grid key={index} item md={3} sm={6} xs={8}>
                                    <ProductCard
                                        add={add}
                                        product={product}
                                        alreadyIn={alreadyIn}
                                    />
                                </Grid>
                            )}
                        </>
                    ))}
                </React.Fragment>
            )}
        </Grid>
    );
}
