import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    imageViewer: {
        display: "flex"
    },
    icons: {
        display: "flex",
        flexDirection: "column"
    },
    icon: {
        border: "2px solid white"
    },
    iconPicked: {
        border: "2px solid",
        borderColor: theme.palette.primary.main
    },
    mainImage: {
        maxWidth: "300px",
        maxHeight: "500px"
    }
}));

export default function ProductImages({ images }) {
    const classes = useStyles();
    const [shown, setShown] = React.useState(0);
    let handlePick = index => {
        setShown(parseInt(index));
    };

    return (
        <div className={classes.imageViewer}>
            <div className={classes.icons}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        onMouseEnter={() => handlePick(index)}
                        src={`/storage/${image}`}
                        width="55"
                        className={clsx(
                            classes.icon,
                            shown == index ? classes.iconPicked : ""
                        )}
                    />
                ))}
            </div>
            <div>
                <img
                    src={`/storage/${images[shown]}`}
                    className={classes.mainImage}
                />
            </div>
        </div>
    );
}
