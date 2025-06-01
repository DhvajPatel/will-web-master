import { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button, MenuItem, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Types
interface FormData {
  email: string;
  country: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    email: "",
    country: "UK",
    verificationCode: "",
    password: "",
    confirmPassword: ""
  });

  // UI states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  // Timer for verification code
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      setShowVerification(false);
      setError("Code expired. Please request a new one.");
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Check if email is valid
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter (A-Z)";
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter (a-z)";
    }

    // Check for number
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number (0-9)";
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must include at least one special character (!@#$%^&*(),.?\":{}|<>)";
    }

    return "";
  };

  // Check if form is valid for verification code request
  const isFormValid = () => {
    return isEmailValid(formData.email) && formData.country === "UK";
  };

  // Check if register button should be enabled
  const isRegisterEnabled = () => {
    return (
      showVerification &&
      formData.verificationCode.length === 6 &&
      !passwordMessage && 
      formData.password === formData.confirmPassword &&
      isTimerActive
    );
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");

    if (name === "password") {
      setPasswordMessage(checkPasswordStrength(value));
    }
  };

  // Request verification code
  const handleRequestCode = async () => {
    if (!isFormValid()) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowVerification(true);
      setIsTimerActive(true);
      setTimeLeft(15 * 60);
      setSuccess("Verification code sent successfully!");
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API call for registration
  const mockRegisterAPI = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Only 123456 is valid
    if (data.verificationCode !== "123456") {
      return {
        success: false,
        message: "Invalid verification code. Please try again."
      };
    }

    return {
      success: true,
      message: "Registration successful"
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isRegisterEnabled()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await mockRegisterAPI({
        email: formData.email,
        country: formData.country,
        verificationCode: formData.verificationCode,
        password: formData.password
      });

      if (response.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      <Box textAlign="center" py={3}>
        <Typography variant="h4" gutterBottom color="primary">
          Create Your Account
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join Param Ichha to secure your final wishes
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
        <TextField
          fullWidth
          required
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={formData.email !== "" && !isEmailValid(formData.email)}
          helperText={formData.email !== "" && !isEmailValid(formData.email) ? "Please enter a valid email address" : ""}
          sx={{ mb: 2 }}
          disabled={showVerification}
        />

        <TextField
          select
          fullWidth
          required
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="UK">United Kingdom (UK)</MenuItem>
        </TextField>

        {!showVerification ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRequestCode}
            disabled={!isFormValid() || isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Request Verification Code"}
          </Button>
        ) : (
          <>
            <TextField
              fullWidth
              required
              label="Verification Code"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              error={formData.verificationCode !== "" && formData.verificationCode.length !== 6}
              helperText={formData.verificationCode !== "" && formData.verificationCode.length !== 6 ? "Code must be 6 digits" : ""}
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Time remaining: {formatTime(timeLeft)}
            </Typography>

            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!passwordMessage}
              helperText={passwordMessage}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              required
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formData.confirmPassword !== "" && formData.password !== formData.confirmPassword}
              helperText={
                formData.confirmPassword !== "" && formData.password !== formData.confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isRegisterEnabled() || isLoading}
              sx={{ mb: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Register;   