import {
    Container,
    Typography,
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TestPage = () => {
    // Sample data for Wills
    const willData = [
        { id: 1, name: "John Doe1", date: "2025-05-20", status: "Draft" },
        { id: 2, name: "Jane Smith", date: "2024-11-14", status: "Finalized" },
        { id: 3, name: "Michael Johnson", date: "2023-03-10", status: "Draft" },
    ];

    const handleDelete = (id: number) => console.log(`Will deleted: ${id}`);
    const handleEdit = (id: number) => console.log(`Will edited: ${id}`);

    return (
        <Container sx={{ padding: "20px" }}>
            {/* Hero Section */}
            <Box textAlign="center" py={5}>
                <Typography variant="h3" gutterBottom>
                    TestPage Param-Ichha
                </Typography>
                <Typography variant="h6">
                    A platform to help you secure your legacy, easily and for free.
                </Typography>
            </Box>

            <Divider />

            {/* Story Section */}
            <Box py={5}>
                <Typography variant="h5" gutterBottom>
                    My Story: Creating Param-Ichha
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    Like many others, I have seen people struggle with the overwhelming process of creating a legally valid will,
                    and I wanted to provide a simple, free platform to help secure your legacy.
                </Typography>
            </Box>

            <Divider />

            {/* User Information Section */}
            <Box py={5}>
                <Typography variant="h5" gutterBottom>
                    User Information
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="user-info-table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Field</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Input</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[
                                { field: "Full Name", type: "text" },
                                { field: "Email", type: "email" },
                                { field: "Date of Birth", type: "date" },
                            ].map((row) => (
                                <TableRow key={row.field}>
                                    <TableCell>{row.field}</TableCell>
                                    <TableCell>
                                        <TextField fullWidth variant="outlined" type={row.type} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Divider />

            {/* List of Wills Section */}
            <Box py={5}>
                <Typography variant="h5" gutterBottom>
                    List of Wills
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="wills-table">
                        <TableHead>
                            <TableRow>
                                {["Name", "Creation Date", "Status", "Actions"].map((header) => (
                                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {willData.map((will) => (
                                <TableRow key={will.id}>
                                    <TableCell>{will.name}</TableCell>
                                    <TableCell>{will.date}</TableCell>
                                    <TableCell>{will.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(will.id)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(will.id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Divider />

            {/* Will Options List */}
            <Box py={2}>
                <Typography variant="h6" gutterBottom>
                    Will Options
                </Typography>
                <List>
                    {["Add Beneficiary", "Add Executor", "Add Guardian"].map((option) => (
                        <ListItem key={option}>
                            <ListItemText primary={option} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

// Divider Component
const Divider = () => <Box py={2}><hr /></Box>;

export default TestPage;