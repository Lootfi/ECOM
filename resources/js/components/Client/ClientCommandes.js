import React from "react";
import {
    makeStyles,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress
} from "@material-ui/core";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 5px 10px 5px"
        }
    }
}));
export default function ClientCommandes() {
    const { authUser } = React.useContext(AuthenticatedUserContext);
    const classes = useStyles();
    const [commandes, setCommandes] = React.useState();
    React.useEffect(() => {
        if (authUser != undefined)
            axios
                .post(`/api/users/${authUser.id}/commandes`)
                .then(res => {
                    setCommandes(Object.values(res.data));
                })
                .catch(err => console.log(err));
    }, [authUser]);
    return (
        <div className={classes.root}>
            <List subheader={<ListSubheader>Mes Commandes</ListSubheader>}>
                {commandes ? (
                    commandes.map(commande => (
                        <ListItem>
                            <ListItemText
                                primary={`#${commande.id}`}
                                secondary={commande.date_commande}
                            />
                            <Typography>{commande.total} DA</Typography>
                        </ListItem>
                    ))
                ) : (
                    <CircularProgress size={100} />
                )}
            </List>
        </div>
    );
}
