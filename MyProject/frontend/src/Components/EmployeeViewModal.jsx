import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UpdateEmpData } from "../Services";

const EmployeeViewModal = ({ open, handleClose, employee, isEdit, handleSubmission }) => {

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            background: {
                paper: "#333"
            },
            text: {
                primary: "#fff"
            }
        }
    });

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        department: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (employee) {
            setFormData({
                id: employee.id || "",
                firstName: employee.firstName || "",
                lastName: employee.lastName || "",
                email: employee.email || "",
                phone: employee.phone || "",
                position: employee.position || "",
                department: employee.department || "",
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        debugger
        const { name, value } = e.target;

        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

        if (name === "phone") {
            // Allow only numbers and limit to 10 characters
            if (!/^\d*$/.test(value) || value.length > 10) return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            debugger
            const response = await UpdateEmpData(employee.id, formData);
            if (response.status === 200) {
                handleSubmission(formData);
                setFormData({ id: "", firstName: "", lastName: "", email: "", phone: "", position: "", department: "" });
                setErrors({});
                handleClose();
            }
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* {loading ?
                <div id={props.load ? "preloader" : "preloader-none"}></div>
                :
                null
            } */}
            <ThemeProvider theme={darkTheme}>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>{isEdit ? "Edit Employee" : "Employee Details"}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6} sx={{ display: "none" }}>
                                <TextField
                                    fullWidth
                                    label="Hidden Field"
                                    name="id"
                                    value={isEdit ? formData.id : employee?.id || ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={isEdit ? formData.firstName : employee?.firstName || ""}
                                    onChange={handleChange}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    disabled={!isEdit}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={isEdit ? formData.lastName : employee?.lastName || ""}
                                    onChange={handleChange}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    disabled={!isEdit}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={isEdit ? formData.email : employee?.email || ""}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    disabled={!isEdit}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    //value={employee?.phone || ""}
                                    value={isEdit ? formData.phone : employee?.phone || ""}
                                    onChange={handleChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    disabled={!isEdit}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Position"
                                    name="position"
                                    value={isEdit ? formData.position : employee?.position || ""}
                                    onChange={handleChange}
                                    error={!!errors.position}
                                    helperText={errors.position}
                                    disabled={!isEdit}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Department"
                                    name="department"
                                    value={isEdit ? formData.department : employee?.department || ""}
                                    onChange={handleChange}
                                    error={!!errors.department}
                                    helperText={errors.department}
                                    disabled={!isEdit}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="secondary">
                            {isEdit ? "Cancel" : "Close"}
                        </Button>
                        {isEdit && (
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Save Changes
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>
    );
};

export default EmployeeViewModal;