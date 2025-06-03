import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags"; // <-- Import Flag component here

// Types
interface FormData {
  email: string;
  country: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

// Use correct country codes for react-world-flags (GB for UK, not UK)
const countries = [
  { value: "IN", label: "India" },
  { value: "GB", label: "United Kingdom (UK)" },
  { value: "US", label: "United States (US)" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
];

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    country: "IN",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  // Timer effect
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkPasswordStrength = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Must include an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must include a lowercase letter";
    if (!/[0-9]/.test(password)) return "Must include a number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Must include a special character";
    return "";
  };

  const isFormValid = () =>
    isEmailValid(formData.email) && formData.country.length > 0;

  const isRegisterEnabled = () =>
    showVerification &&
    formData.verificationCode.length === 6 &&
    !passwordMessage &&
    formData.password === formData.confirmPassword &&
    isTimerActive;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");

    if (name === "password") {
      setPasswordMessage(checkPasswordStrength(value));
    }
  };

  const handleRequestCode = async () => {
    if (!isFormValid()) {
      setError("Please enter a valid email address and select a country.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          setSuccess("Verification code sent! Check your email.");
          setShowVerification(true);
          setTimeLeft(15 * 60);
          setIsTimerActive(true);
        } else {
          setError(data.message || "Failed to send verification code.");
        }
      } else {
        setError(data.message || "Server error occurred.");
      }
    } catch (err) {
      console.error("Error sending verification code:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const mockRegisterAPI = async (data: FormData): Promise<RegisterResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.verificationCode !== "123456") {
      return { success: false, message: "Invalid verification code. Please try again." };
    }

    return { success: true, message: "Registration successful" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRegisterEnabled()) return;

    setIsLoading(true);
    try {
      const response = await mockRegisterAPI(formData);
      if (response.success) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch {
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
          helperText={formData.email !== "" && !isEmailValid(formData.email) ? "Invalid email" : ""}
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
          SelectProps={{
            renderValue: (selected) => {
              const selectedCountry = countries.find((c) => c.value === selected);
              return (
                <>
                  {selectedCountry && (
                    <Flag
                      code={selectedCountry.value}
                      style={{ width: 24, height: 16, marginRight: 8, verticalAlign: 'middle' }}
                    />
                  )}
                  {selectedCountry?.label}
                </>
              );
            },
          }}
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Flag
                code={option.value}
                style={{ width: 24, height: 16, marginRight: 8, verticalAlign: 'middle' }}
              />
              {option.label}
            </MenuItem>
          ))}
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
              helperText={
                formData.verificationCode !== "" && formData.verificationCode.length !== 6
                  ? "Code must be 6 digits"
                  : ""
              }
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
              error={
                formData.confirmPassword !== "" &&
                formData.password !== formData.confirmPassword
              }
              helperText={
                formData.confirmPassword !== "" &&
                formData.password !== formData.confirmPassword
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
