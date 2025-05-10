/**
 * Login Component: Facilitates email and password login, leverages app context for state handling.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { serviceRegistry } from "../services";
import { useAuth } from "../context/AuthContext";
import { useApiFlow } from "../context/ApiFlowContext";

const Login = () => {
  const [email, setEmail] = useState("linda.johnson@example.com"); // Default test email
  const [password, setPassword] = useState("password"); // Default test password
  const navigate = useNavigate();
  const { login } = useAuth();
  const loginService = serviceRegistry.getLoginService();
  const { setLoading } = useApiFlow();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = await loginService.login({ email, password });
      login(user);
      navigate("/dashboard/external");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Login to Your Account</Typography>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </Box>
          <Box mb={2}>
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
          <Box mt={2}>
            <Link to="/forgot-password" style={{ textDecoration: "none", color: "inherit" }}>Forgot Password?</Link>
            <br />
            <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>Don't have an account? Register</Link>
          </Box>
        </form>
      </Container>
  );
};

export default Login;