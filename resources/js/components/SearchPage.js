import React from "react";
import { Grid, InputBase, Divider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SearchResultItem from "./SearchResultItem";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("sm")]: {
            padding: "100px 10px 10px 10px"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "100px 10px 10px 10px"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.common.white,
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: theme.spacing(3),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("xs")]: {
            width: theme.spacing(1),
            left: 0,
            cursor: "pointer",
            pointerEvents: "auto"
        }
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 200
        }
    }
}));

export default function SearchPage() {
    const classes = useStyles();
    const [search, setSearch] = React.useState("");
    const [products, setProducts] = React.useState([]);
    const [count, setCount] = React.useState(0);
    let handleSearch = e => {
        setSearch(e.target.value);
        if (_.includes([37, 38, 39, 40, 13], e.keyCode)) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();
            }

            selectProduct(e.keyCode);
        } else {
            getProducts();
        }
    };

    let getProducts = () => {
        setProducts([]);
        setCount(0);

        if (search.trim() != "") {
            axios
                .post("/api/products/search", {
                    search: search
                })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    let selectProduct = keyCode => {
        if (keyCode == 40 && count < products.length) {
            setCount(count + 1);
        }
        if (keyCode == 38 && count > 1) {
            setCount(count - 1);
        }
        if (keyCode == 13) {
            document.getElementById(parseInt(count)).click();
        }
    };

    let clearData = e => {
        if (e.target.id != "search") {
            setProducts([]);
            setCount(0);
        }
    };

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search for a Product"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                        id="search"
                        onKeyUp={handleSearch}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                {products &&
                    products.map((product, index) => (
                        <a
                            key={index}
                            id={index + 1}
                            href={`/categories/${product.category_id}/products/${product.id}`}
                        >
                            <Divider variant="middle" />

                            <SearchResultItem
                                image={
                                    product.imageurls.split(",").slice(0, -1)[0]
                                }
                                name={product.name}
                                index={index + 1}
                                focused={count}
                            />
                        </a>
                    ))}
            </Grid>
        </Grid>
    );
}
