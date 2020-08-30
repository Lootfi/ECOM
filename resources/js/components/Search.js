import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    InputBase,
    Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles, fade } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SearchResultItem from "./SearchResultItem";

const useStyles = theme => ({
    root: {
        position: "relative"
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
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
    inputRoot: {
        color: "inherit",
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 200
        }
    },
    searchResults: {
        position: "absolute",
        backgroundColor: fade(theme.palette.primary.main, 0.97),
        right: 0,
        borderRadius: "0 0 5px 5px"
    },
    mobileInputRoot: {
        border: "2px solid red",
        color: "inherit",
        position: "absolute",
        top: "29px"
    },
    mobileInputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 200
        }
    }
});

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            search: "",
            count: 0
        };

        this.handleSearch = this.handleSearch.bind(this);

        this.getProducts = _.debounce(this.getProducts, 500);
    }

    componentDidMount() {
        document.body.addEventListener("click", e => {
            this.clearData(e);
        });

        document.getElementById("search").addEventListener("keydown", e => {
            if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();
            }
        });
    }

    handleSearch(e) {
        console.log(e.target.value);
        this.setState({
            search: e.target.value
        });
        if (_.includes([37, 38, 39, 40, 13], e.keyCode)) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();
                console.log("up n down");
            }

            // if (e.keyCode === 40 && this.state.products == []) {
            //     this.getProducts();
            //     return;
            // }

            this.selectProduct(e.keyCode);
        } else {
            this.getProducts();
        }
    }

    getProducts() {
        this.setState(() => ({
            products: [],
            count: 0
            // search: this.refs.newSearch.value
        }));

        if (this.state.search.trim() != "") {
            axios
                .post("/api/products/search", {
                    search: this.state.search
                })
                .then(response => {
                    this.setState(() => ({ products: response.data }));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    selectProduct(keyCode) {
        if (keyCode == 40 && this.state.count < this.state.products.length) {
            this.setState(prevState => ({ count: prevState.count + 1 }));
        }
        if (keyCode == 38 && this.state.count > 1) {
            this.setState(prevState => ({ count: prevState.count - 1 }));
        }
        if (keyCode == 13) {
            document.getElementById(parseInt(this.state.count)).click();
        }
    }

    clearData(e) {
        if (e.target.id != "search") {
            this.setState(() => ({
                products: [],
                count: 0
            }));
        }
    }

    render() {
        const { classes } = this.props;

        const products = this.state.products.map((product, index) => (
            <a
                key={index}
                id={index + 1}
                href={`/categories/${product.category_id}/products/${product.id}`}
            >
                <Divider variant="middle" />

                <SearchResultItem
                    image={product.imageurls.split(",").slice(0, -1)[0]}
                    name={product.name}
                    index={index + 1}
                    focused={this.state.count}
                />
            </a>
        ));

        return (
            <div className={classes.root}>
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
                        ref="newSearch"
                        onKeyUp={this.handleSearch}
                    />
                </div>
                <div className={classes.searchResults}>
                    {this.state.products.length > 0 && <List>{products}</List>}
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Search);
