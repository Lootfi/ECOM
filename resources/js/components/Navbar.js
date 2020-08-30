import React from "react";
import { NavLink, Link } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";

import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Avatar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BackspaceIcon from "@material-ui/icons/Backspace";
import BuildIcon from "@material-ui/icons/Build";

import classnames from "classnames";
import { AuthenticatedUserContext } from "./Contexts/AuthenticatedUserContext";
import { CartContext } from "./Contexts/CartContext";
import Search from "./Search";

const useStyles = makeStyles(theme => ({
    hiddenMenu: {
        top: "-70px",
        transition: "top 0.5s"
    },
    bgC: {
        backgroundColor: theme.palette.primary.main
    },
    whiteEm: {
        color: fade(theme.palette.common.white, 1),
        "&:hover": {
            color: fade(theme.palette.common.white, 1)
        }
    },
    blackEm: {
        color: fade(theme.palette.common.black, 0.8),
        "&:hover": {
            color: fade(theme.palette.common.black, 0.7)
        }
    },
    grow: {
        flexGrow: 1,
        [theme.breakpoints.down("xs")]: {
            backgroundColor: "red"
        }
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        // display: "none",
        cursor: "pointer",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    "MuiListItemText-secondary": {
        color: "red"
    },
    searchMD: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    },
    searchXS: {
        color: fade(theme.palette.common.white, 1),
        "&:hover": {
            color: fade(theme.palette.common.white, 1)
        },
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

export default function Navbar({ toggleDrawer }) {
    const authContext = React.useContext(AuthenticatedUserContext);
    const cartContext = React.useContext(CartContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [scrollPos, setScrollPos] = React.useState(window.pageYOffset);
    const [visible, setVisible] = React.useState(true);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = scrollPos > currentScrollPos;
        setScrollPos(currentScrollPos);
        setVisible(visible);
    };
    const goHome = () => {
        window.location = "/";
    };
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link
                onClick={handleMenuClose}
                className={classes.blackEm}
                to="/client/account"
            >
                <MenuItem>Mon Compte</MenuItem>
            </Link>
            <MenuItem
                onClick={() => {
                    authContext.handleLogOut();
                    handleMenuClose();
                }}
            >
                Logout
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {authContext.isLoggedIn ? (
                <div>
                    <MenuItem>
                        <IconButton
                            aria-label="show 11 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={11} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <p>Notifications</p>
                    </MenuItem>
                    {authContext.isAdmin ? (
                        <NavLink to="/admin" className={classes.blackEm}>
                            <MenuItem>
                                <IconButton color="inherit">
                                    <BuildIcon />
                                </IconButton>
                                <p>Dashboard</p>
                            </MenuItem>
                        </NavLink>
                    ) : (
                        <MenuItem onClick={toggleDrawer("right", true)}>
                            <IconButton
                                aria-label="show 11 new notifications"
                                color="inherit"
                            >
                                <Badge
                                    badgeContent={
                                        Object.keys(cartContext.cart).length
                                    }
                                    color="secondary"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            <p>Cart</p>
                        </MenuItem>
                    )}
                    <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <p>Profile</p>
                    </MenuItem>
                </div>
            ) : (
                <div>
                    <MenuItem onClick={toggleDrawer("right", true)}>
                        <IconButton
                            aria-label="show 11 new notifications"
                            color="inherit"
                        >
                            <Badge
                                badgeContent={
                                    Object.keys(cartContext.cart).length
                                }
                                color="secondary"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <p>Cart</p>
                    </MenuItem>
                    <Link className={classes.blackEm} to="/login">
                        <MenuItem>
                            <IconButton color="inherit">
                                <VpnKeyIcon />
                            </IconButton>
                            <p>Login</p>
                        </MenuItem>
                    </Link>
                    <Link className={classes.blackEm} to="/register">
                        <MenuItem>
                            <IconButton color="inherit">
                                <ExitToAppIcon />
                            </IconButton>
                            <p>Register</p>
                        </MenuItem>
                    </Link>
                </div>
            )}
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={classnames(
                    classes.bgC,
                    !visible ? classes.hiddenMenu : ""
                )}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={toggleDrawer("left", true)}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box p={1}>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                            onClick={goHome}
                        >
                            ECOM
                        </Typography>
                    </Box>
                    <div className={classes.searchMD}>
                        <Search />
                    </div>
                    <Link className={classes.searchXS} to="/search">
                        <SearchIcon />
                    </Link>
                    <div className={classes.grow} />
                    {authContext.isLoggedIn ? (
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            {!authContext.isAdmin && (
                                <IconButton
                                    color="inherit"
                                    onClick={toggleDrawer("right", true)}
                                >
                                    <Badge
                                        badgeContent={
                                            Object.keys(cartContext.cart).length
                                        }
                                        color="secondary"
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            )}
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar
                                    src={`/storage/${authContext.authUser.avatar}`}
                                    className={classes.small}
                                />
                            </IconButton>
                            {authContext.isAdmin && (
                                <NavLink
                                    className={classes.whiteEm}
                                    to="/admin"
                                >
                                    <IconButton
                                        color="inherit"
                                        aria-label="leads to the admin panel"
                                    >
                                        <BuildIcon />
                                    </IconButton>
                                </NavLink>
                            )}
                        </div>
                    ) : (
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                color="inherit"
                                onClick={toggleDrawer("right", true)}
                            >
                                <Badge
                                    badgeContent={
                                        Object.keys(cartContext.cart).length
                                    }
                                    color="secondary"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            <Box p={1}>
                                <Typography
                                    className={classes.title}
                                    variant="h6"
                                    noWrap
                                >
                                    <Link
                                        className={classes.whiteEm}
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </Typography>
                            </Box>
                            <Box p={1}>
                                <Typography
                                    className={classes.title}
                                    variant="h6"
                                    noWrap
                                >
                                    <Link
                                        className={classes.whiteEm}
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </Typography>
                            </Box>
                        </div>
                    )}
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
