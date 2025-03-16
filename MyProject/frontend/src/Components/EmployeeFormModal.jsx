import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PostEmpData } from "../Services";
import loader from "../Assets/loader.svg"

const EmployeeFormModal = ({ open, handleClose }) => {

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            background: {
                paper: "#333" // Dark background for modal
            },
            text: {
                primary: "#fff" // Light text color
            }
        }
    });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        department: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Remove error message on change
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

        if (name === "phone") {
            // Allow only numbers and limit to 10 characters
            if (!/^\d*$/.test(value) || value.length > 10) return;
        }

        setFormData({ ...formData, [name]: value });
    };

    // Validate form on submit
    const handleSubmit = async () => {
        let validationErrors = {};

        if (!formData.firstName) validationErrors.firstName = "First Name is required";
        if (!formData.lastName) validationErrors.lastName = "Last Name is required";
        if (!formData.email) validationErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = "Invalid email format";
        if (!formData.phone) validationErrors.phone = "Phone Number is required";
        else if (formData.phone.length > 10 || formData.phone.length < 10) validationErrors.phone = "Invalid phone format";
        if (!formData.position) validationErrors.position = "Position is required";
        if (!formData.department) validationErrors.department = "Designation is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await PostEmpData(formData);

            if (!response.status === 201) {
                alert("Some Error Occured");
            }
            else {
                setFormData({ firstName: "", lastName: "", email: "", phone: "", position: "", department: "" });
                setErrors({});
                handleClose();
                //handleSubmission(formData);
                window.location.reload();
            }
        }
        catch (err) {
            console.log(err.messsage);
        }
        finally {
            setLoading(false);
        }
        //console.log("Form Submitted Successfully", formData);
    };

    return (
        <>
            {/* {loading ?
                <div id={props.load ? "preloader" : "preloader-none"}></div>
                :
                null
            } */}
            <ThemeProvider theme={darkTheme}>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className="">
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className="p-2">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    //disabled={false}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 10 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Position"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        error={!!errors.position}
                                        helperText={errors.position}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        error={!!errors.department}
                                        helperText={errors.department}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="primary" disabled={loading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>
    );
};

export default EmployeeFormModal;