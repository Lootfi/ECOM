import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { fade, makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { AuthenticatedUserContext } from "../../Contexts/AuthenticatedUserContext";
import EditableImage from "./EditableImage";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 10px 10px 10px"
        },
        [theme.breakpoints.down("sm")]: {
            padding: "100px 10px 10px 10px"
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    editButton: {
        border: "2px solid",
        borderColor: fade(theme.palette.primary.main, 0.8),
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main
    },
    inputFile: {
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        padding: "15px 0",
        cursor: "pointer",
        width: "180px"
    },
    labelFile: {
        border: "1px solid",
        borderRadius: "5px",
        padding: "16px 14px"
    },
    divider: {
        margin: "20px 0",
        border: "1px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "10px"
    }
}));

export default function EditImages({ images, productId, setImages }) {
    const classes = useStyles();
    const [imgNumber, setImgNumber] = React.useState(0);
    const [imgs, setImgs] = React.useState(null);
    const [tooMuch, setTooMuch] = React.useState(false);
    const { register, handleSubmit, watch, errors } = useForm();

    let handlePicInput = e => {
        if (images.length + e.target.files.length > 3) {
            setImgNumber(0);
            setImgs(null);
            setTooMuch(true);
            return;
        }
        setTooMuch(false);
        setImgs(e.target.files);
        setImgNumber(e.target.files.length);
    };

    const onSave = data => {
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            data[i] = img;
        }
        let fd = new FormData();
        for (let field in data) {
            fd.append(field, data[field]);
        }
        fd.append("imgNum", imgs.length);
        axios
            .post(`/api/products/${productId}/updateImages`, fd)
            .then(res => {
                setImages(res.data.split(",").slice(0, -1));
            })
            .catch(err => console.log(err));
    };

    function deleteImage(index) {
        let imagesArr = images.slice();
        let deleted = _.remove(imagesArr, function(n, i) {
            return i == index;
        });

        axios
            .post(`/api/products/${productId}/delete-image`, {
                images: imagesArr,
                deletedImage: deleted[0]
            })
            .then(res => {
                console.log(res.data);
                setImages(imagesArr);
            })
            .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Edit Pictures
            </Typography>
            <Grid container spacing={3}>
                {images.map((image, index) => (
                    <EditableImage
                        key={index}
                        imageSrc={`/storage/${image}`}
                        index={index}
                        deleteImage={deleteImage}
                    />
                ))}
            </Grid>
            {images.length < 3 ? (
                <React.Fragment>
                    <form
                        onSubmit={handleSubmit(onSave)}
                        encType="multipart/form-data"
                        files="true"
                    >
                        <input
                            type="file"
                            name="picture[]"
                            label="Product Picture"
                            ref={register({
                                required: true
                            })}
                            onChange={handlePicInput}
                            className={classes.inputFile}
                            multiple
                            accept=".jpg,.png,.jpeg"
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={3}>
                                <label
                                    htmlFor="picture[]"
                                    className={classes.labelFile}
                                >
                                    <CloudUploadIcon />
                                    {imgNumber ? (
                                        <span style={{ padding: "0 4px" }}>
                                            {imgNumber} images selected
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                padding: "0 10px"
                                            }}
                                        >
                                            Choose a picture
                                        </span>
                                    )}
                                </label>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <Button
                                    variant="contained"
                                    className={classes.editButton}
                                    size="large"
                                    startIcon={<EditIcon />}
                                    type="submit"
                                >
                                    Save Images
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {tooMuch && "A product can't have more than 3 images"}
                </React.Fragment>
            ) : (
                <Typography variant="subtitle2">
                    *Maximum of 3 Images per Product
                </Typography>
            )}
        </React.Fragment>
    );
}
