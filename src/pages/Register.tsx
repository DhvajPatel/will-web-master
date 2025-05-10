import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

const Register = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError(""); // Clear error if passwords match
    console.log("Registration successful", formData); // Handle registration logic
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <Box textAlign="center" py={3}>
        <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
          Create Your Account
        </Typography>
      </Box>
      <Box py={3} component="form" onSubmit={handleSubmit}>
        {[
          { label: "Full Name", name: "fullName", type: "text", value: formData.fullName },
          { label: "Email Address", name: "email", type: "email", value: formData.email },
          { label: "Password", name: "password", type: "password", value: formData.password },
          { label: "Confirm Password", name: "confirmPassword", type: "password", value: formData.confirmPassword },
        ].map((field, i) => (
          <Box mb={2} key={i}>
            <TextField fullWidth required label={field.label} id={field.name} name={field.name} type={field.type} value={field.value} onChange={handleChange} />
          </Box>
        ))}
        {error && <Typography variant="body2" color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Box textAlign="center">
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;