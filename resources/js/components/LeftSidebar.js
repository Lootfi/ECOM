import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";

import CategoryBar from "./CategoryBar";

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    },
    close: {}
});

export default function LeftSidebar({ state, toggleDrawer }) {
    const classes = useStyles();

    const sideList = side => (
        <div className={classes.list} role="presentation">
            <CloseIcon
                className={classes.close}
                onClick={toggleDrawer(side, false)}
            />
            <CategoryBar toggleDrawer={toggleDrawer} />
        </div>
    );

    return (
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
            {sideList("left")}
        </Drawer>
    );
}
