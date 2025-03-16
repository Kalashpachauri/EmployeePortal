import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function DeleteModal({ show, handleClose, handleDelete, employeeName }) {

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

    return (
        <>            
            <ThemeProvider theme={darkTheme}>
                <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete record for <strong>{employeeName}</strong> ?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} variant="contained" color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>
    )
}