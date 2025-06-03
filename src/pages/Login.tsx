import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { UserType } from "../services/user/UserType";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const getDashboardRoute = (userType: UserType): string => {
    switch (userType) {
      case UserType.ACCOUNT_USER:
        return "/dashboard/account";
      // Add other user types as needed
      default:
        return "/login";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      login(data.user); // Store user in context

      navigate(getDashboardRoute(data.user.userType));
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Login to Your Account
      </Typography>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
