import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useApiFlow } from "../context/ApiFlowContext"; // Use correct hook

const ErrorDialog = () => {
    const { error, resetError } = useApiFlow(); // Use correct context hook

    if (!error) return null;

    return (
        <Dialog open={true} onClose={resetError}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>{error}</DialogContent>
            <DialogActions>
                <Button onClick={resetError} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
