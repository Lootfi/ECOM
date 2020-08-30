import React from "react";
import {
    makeStyles,
    List,
    Box,
    Divider,
    CircularProgress
} from "@material-ui/core";
import CategoryItem from "./CategoryItem";
import NewCategory from "./NewCategory";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: "60px 0 0 0",
        [theme.breakpoints.down("sm")]: {
            padding: "100px 5px 10px 5px"
        },
        display: "flex",
        justifyContent: "center"
    },
    NewCat: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(50),
        color: "white"
    },
    input: {
        color: "white"
    }
}));
export default function ManageCategories() {
    const classes = useStyles();
    const [categories, setCategories] = React.useState(null);

    React.useEffect(() => {
        axios
            .get("/api/categories/get")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Box className={classes.root} height="100%">
            {categories ? (
                <List>
                    <NewCategory
                        categories={categories}
                        setCategories={setCategories}
                    />
                    {categories.map(category => (
                        <React.Fragment key={category.id}>
                            <CategoryItem category={category} />
                            <Divider light variant="middle" />
                        </React.Fragment>
                    ))}
                </List>
            ) : (
                <CircularProgress size={100} />
            )}
        </Box>
    );
}
