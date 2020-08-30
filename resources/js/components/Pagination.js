import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import ProductCard from "./Product/ProductCard";
import { AuthenticatedUserContext } from "./Contexts/AuthenticatedUserContext";
import { CartContext } from "./Contexts/CartContext";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Carousel from "./Carousel/Carousel";

const useStyles = theme => ({
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
    pagination: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginLeft: "-20px",
        marginTop: "20px",
        padding: 0,
        listStyle: "none",
        "& *": {
            cursor: "pointer",
            flex: "none",
            fontSize: "16px",
            marginLeft: "15px",
            padding: "8px 0",
            position: "relative",
            "&:hover": {
                color: theme.palette.primary.main
            },
            "&:focus": {
                color: theme.palette.primary.main
            }
        }
    },
    active: {
        marginTop: "-8px",
        "&>*": {
            display: "block",
            textAlign: "center",
            width: "45px",
            backgroundColor: theme.palette.gray.main,
            borderRadius: "50%"
        }
    }
});

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            products: [],
            completed: false,
            pageCount: 1,
            currentPage: 1
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    async componentDidMount() {
        await axios
            .post("/api/admins")
            .then(res => {
                window.location = "/admin";
            })
            .catch(err => console.log("Guest/Client"));
        const page = new URLSearchParams(document.location.search).get("page");
        await Promise.resolve(
            this.setState(() => ({ currentPage: page ? page : 1 }))
        );
        this.getProducts();
    }

    async handlePageClick(data) {
        const page = data.selected >= 0 ? data.selected + 1 : 0;
        await Promise.resolve(this.setState(() => ({ currentPage: page })));

        this.getProducts();
    }

    async getProducts() {
        // Progress.show();

        if (history.pushState) {
            const newUrl =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?page=" +
                this.state.currentPage;
            window.history.pushState({ path: newUrl }, "", newUrl);
            let apiUrl = "/api/products/" + "?page=" + this.state.currentPage;

            axios
                .get(apiUrl)
                .then(res => {
                    this.setState(() => ({
                        products: res.data.data,
                        currentPage: res.data.current_page,
                        pageCount: res.data.last_page
                    }));
                    // window.scrollTo(0, 0);
                    window.scrollTo(0, this.myRef.current.offsetTop);
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AuthenticatedUserContext.Consumer>
                    {user => (
                        <CartContext.Consumer>
                            {cart => (
                                <Grid
                                    container
                                    wrap="wrap"
                                    spacing={3}
                                    justify="center"
                                    alignItems="center"
                                >
                                    {this.state.products.length ? (
                                        <React.Fragment>
                                            <Grid
                                                item
                                                xs={12}
                                                ref={this.myRef}
                                            ></Grid>
                                            {this.state.products.map(
                                                (product, i) => {
                                                    return (
                                                        <>
                                                            {product.stock >
                                                                0 && (
                                                                <Grid
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    item
                                                                    md={3}
                                                                    sm={6}
                                                                    xs={8}
                                                                >
                                                                    <ProductCard
                                                                        add={
                                                                            cart.add
                                                                        }
                                                                        product={
                                                                            product
                                                                        }
                                                                        alreadyIn={
                                                                            cart.alreadyIn
                                                                        }
                                                                        isAdmin={
                                                                            user.isAdmin
                                                                        }
                                                                    />
                                                                </Grid>
                                                            )}
                                                        </>
                                                    );
                                                }
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        <CircularProgress size={100} />
                                    )}
                                </Grid>
                            )}
                        </CartContext.Consumer>
                    )}
                </AuthenticatedUserContext.Consumer>

                <ReactPaginate
                    pageCount={this.state.pageCount}
                    initialPage={this.state.currentPage - 1}
                    forcePage={this.state.currentPage - 1}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    previousLabel="&#x276E;"
                    nextLabel="&#x276F;"
                    onPageChange={this.handlePageClick}
                    disableInitialCallback={true}
                    containerClassName={classes.pagination}
                    activeClassName={classes.active}
                />
            </div>
        );
    }
}

Pagination.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Pagination);
