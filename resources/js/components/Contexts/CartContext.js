import React, { Component } from "react";

export const CartContext = React.createContext();

export default class CartContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cartProductsInfo: [],
            total: 0
        };
        this.calculateTotal = this.calculateTotal.bind(this);
        this.emptyCart = this.emptyCart.bind(this);
    }
    calculateTotal(cart) {
        let total = 0;
        cart.forEach(prod => (total = total + prod.price * prod.quantity));
        return total;
    }

    emptyCart() {
        this.setState({ cart: [], cartProductsInfo: [], total: 0 });
        localStorage.removeItem("cart");
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cart.length != this.state.cart.length) {
            axios
                .post("/api/cart-info", this.state.cart)
                .then(res => {
                    this.setState(prevState => {
                        let cart = prevState.cart.slice();
                        cart.forEach(prod => {
                            let matchedProduct = res.data.find(
                                elem => elem.id == prod.id
                            );
                            prod = _.assign(prod, matchedProduct);
                        });
                        return {
                            cart: this.state.cart,
                            cartProductsInfo: cart
                        };
                    });
                })
                .catch(err => console.log(err));
        }
    }
    componentDidMount() {
        this.setState(() => ({
            cart: JSON.parse(localStorage.getItem("cart")) || [],
            cartProductsInfo: [],
            total: parseInt(localStorage.getItem("cart_total")) || 0
        }));
    }

    render() {
        return (
            <CartContext.Provider
                value={{
                    total: this.state.total,
                    cart: this.state.cartProductsInfo,
                    emptyCart: this.emptyCart,
                    add: (newProductId, newProductPrice, newProductQtt) => {
                        let exists = false;
                        this.setState(prevState => {
                            let cart = prevState.cart.slice();
                            cart.map(product => {
                                if (product.id == newProductId) {
                                    //product already in cart
                                    exists = true;
                                    product.quantity += newProductQtt;
                                    return {
                                        cart,
                                        cartProductsInfo:
                                            prevState.cartProductsInfo
                                    };
                                }
                            });
                            if (!exists)
                                cart.push({
                                    id: newProductId,
                                    price: newProductPrice,
                                    quantity: newProductQtt
                                });
                            let total = this.calculateTotal(cart);
                            localStorage.setItem("cart", JSON.stringify(cart));
                            localStorage.setItem("cart_total", total);
                            return {
                                cart,
                                cartProductsInfo: prevState.cartProductsInfo,
                                total: total
                            };
                        });
                    },
                    remove: productId => {
                        this.setState(prevState => {
                            let cart = prevState.cart.slice();
                            _.remove(cart, function(prod) {
                                return prod.id == productId;
                            });
                            let total = this.calculateTotal(cart);
                            localStorage.setItem("cart", JSON.stringify(cart));
                            localStorage.setItem("cart_total", total);
                            return {
                                cart,
                                cartProductsInfo: prevState.cartProductsInfo,
                                total: total
                            };
                        });
                    },
                    clear: () => {
                        localStorage.removeItem("cart");
                        localStorage.removeItem("cart_total");
                        this.setState(prevState => {
                            let cart = prevState.cart.slice();
                            let cartProductsInfo = prevState.cartProductsInfo.slice();
                            cart = [];
                            cartProductsInfo = [];
                            let total = 0;
                            return {
                                cart,
                                cartProductsInfo,
                                total
                            };
                        });
                    },
                    alreadyIn: productId => {
                        let exists = false;
                        this.state.cart.forEach(product => {
                            if (product.id == productId) {
                                exists = true;
                            }
                        });
                        return exists;
                    }
                }}
            >
                {this.props.children}
            </CartContext.Provider>
        );
    }
}
