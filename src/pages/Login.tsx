/**
 * Login Component: Facilitates email and password login, leverages app context for state handling.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removed unused Link import
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { serviceRegistry } from "../services";
import { useAuth } from "../context/AuthContext";
import { useApiFlow } from "../context/ApiFlowContext";
import { UserType } from "../services/user/UserType";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const loginService = serviceRegistry.getLoginService();
  const { setLoading } = useApiFlow();

  const getDashboardRoute = (userType: UserType): string => {
    switch (userType) {
      case UserType.ACCOUNT_USER:
        return "/dashboard/account";
      case UserType.PARTNER_USER:
        return "/dashboard/partner";
      case UserType.ADMIN_USER:
        return "/dashboard/admin";
      default:
        return "/dashboard/account"; // Default fallback
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginService.login({ email, password });
      login(response.user);
      
      // Redirect based on user type
      const dashboardRoute = getDashboardRoute(response.user.userType);
      navigate(dashboardRoute);
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
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
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
            placeholder="Enter your password" 
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