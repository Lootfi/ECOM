import React, { Component } from "react";

import { Redirect } from "react-router-dom";
export const AuthenticatedUserContext = React.createContext();

export default class AuthenticatedUserContextProvider extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.checkIfAdmin = this.checkIfAdmin.bind(this);
        this.state = {
            isLoggedIn: undefined,
            isAdmin: undefined,
            token: localStorage.getItem("access_token") || null,
            authUser: undefined
        };
    }

    componentDidMount() {
        if (this.state.token) {
            axios
                .get("/api/user")
                .then(res => {
                    this.setState((prevState, prps) => ({
                        authUser: res.data,
                        isLoggedIn: true
                    }));
                })
                .catch(err => {
                    this.setState((prevState, prps) => ({
                        authUser: {},
                        isLoggedIn: false,
                        token: null
                    }));
                });
            this.checkIfAdmin();
        }
    }
    logOut() {
        axios
            .post("/api/logout")
            .then(res => {
                console.log("object");
                localStorage.removeItem("access_token");
                this.setState((prevState, prps) => ({
                    isLoggedIn: false,
                    isAdmin: false,
                    token: null,
                    authUser: {}
                }));
            })
            .catch(err => console.log("logout error", err))
            .then(res => {
                window.location = "/";
            });
    }

    checkIfAdmin() {
        axios
            .post(`/api/admins`)
            .then(res => {
                console.log("yes admin", res);
                this.setState({
                    isAdmin: true
                });
            })
            .catch(err => {
                console.log("no admin", err);
                this.setState({
                    isAdmin: false
                });
            });
    }

    render() {
        return (
            <AuthenticatedUserContext.Provider
                value={{
                    authUser: this.state.authUser,
                    isAdmin: this.state.isAdmin,
                    token: this.state.token,
                    isLoggedIn: this.state.isLoggedIn,
                    setAuthUser: user => {
                        this.setState((prevState, prps) => ({
                            authUser: user
                        }));
                    },
                    setAccessToken: access_token => {
                        this.setState((prevState, prps) => ({
                            token: access_token
                        }));
                    },
                    loginUser: (user, access_token) => {
                        localStorage.setItem("access_token", access_token);
                        this.setState((prevState, prps) => ({
                            authUser: user,
                            token: access_token
                        }));
                    },
                    handleLogOut: () => {
                        this.logOut();
                    }
                }}
            >
                {this.props.children}
            </AuthenticatedUserContext.Provider>
        );
    }
}
