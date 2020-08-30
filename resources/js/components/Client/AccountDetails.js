import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from "@material-ui/core";

export default function AccountDetails({ authUser }) {
    const [user, setUser] = useState({});

    React.useEffect(() => {
        if (authUser != undefined) {
            setUser({
                firstName: authUser.firstName,
                lastName: authUser.lastName,
                email: authUser.email,
                phone: authUser.phone,
                wilaya: authUser.adress.wilaya,
                commune: authUser.adress.commune
            });
        }
    }, [authUser]);

    let handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    let handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`/api/users/${authUser.id}/update-details`, user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    };

    return (
        <Card>
            {authUser && (
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <CardHeader title="Profile" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="First name"
                                    margin="dense"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={user.firstName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    margin="dense"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    value={user.lastName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    margin="dense"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={user.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    margin="dense"
                                    name="phone"
                                    onChange={handleChange}
                                    required
                                    type="tel"
                                    value={user.phone}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Wilaya"
                                    margin="dense"
                                    name="wilaya"
                                    onChange={handleChange}
                                    required
                                    value={user.wilaya}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Commune"
                                    margin="dense"
                                    name="commune"
                                    onChange={handleChange}
                                    required
                                    value={user.commune}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Save
                        </Button>
                    </CardActions>
                </form>
            )}
        </Card>
    );
}
