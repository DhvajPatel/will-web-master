import { CircularProgress, Backdrop } from "@mui/material";
import { useApiFlow } from "../context/ApiFlowContext";

const LoadingOverlay = () => {
  const { loading } = useApiFlow(); // Use the loading state from the context

  if (!loading) return null;

  return (
    <Backdrop
      open={loading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure the overlay is above other content
        color: "white", // Text color
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
