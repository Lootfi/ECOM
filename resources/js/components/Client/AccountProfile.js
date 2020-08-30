import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    LinearProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {},
    details: {
        display: "flex"
    },
    avatar: {
        marginLeft: "auto",
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    progress: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    }
}));

const AccountProfile = ({ className, authUser, ...rest }) => {
    const classes = useStyles();
    const [image, setImage] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    let handlePicInput = e => {
        setImage(e.target.files);
    };

    React.useEffect(() => {
        setAvatar(authUser && authUser.avatar);
    }, [authUser]);

    React.useEffect(() => {
        if (image != null) {
            let fd = new FormData();
            fd.append("avatar", image[0]);
            axios
                .post(`/api/users/${authUser.id}/change-avatar`, fd)
                .then(res => {
                    setAvatar(res.data);
                    setImage(null);
                })
                .catch(err => console.log(err));
        }
    }, [image]);

    let handleUploadClick = () => {
        document.getElementById("avatarInput").click();
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            {authUser && (
                <CardContent>
                    <div className={classes.details}>
                        <div>
                            <Typography gutterBottom variant="h2">
                                {authUser.firstName + " " + authUser.lastName}
                            </Typography>
                            <Typography
                                className={classes.locationText}
                                color="textSecondary"
                                variant="body1"
                            >
                                {authUser.adress.commune},{" "}
                                {authUser.adress.wilaya}
                            </Typography>
                        </div>
                        <Avatar
                            className={classes.avatar}
                            src={`/storage/${avatar}`}
                        />
                    </div>
                </CardContent>
            )}
            <Divider />
            <CardActions>
                <form encType="multipart/form-data" files="true">
                    <input
                        type="file"
                        accept=".jpg,.png"
                        onChange={handlePicInput}
                        hidden
                        id="avatarInput"
                    />
                    <Button
                        className={classes.uploadButton}
                        color="primary"
                        variant="text"
                        onClick={handleUploadClick}
                    >
                        Upload picture
                    </Button>
                </form>
                <Link to="/client/commandes">
                    <Button variant="text">Mes Commandes</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

AccountProfile.propTypes = {
    className: PropTypes.string
};

export default AccountProfile;
