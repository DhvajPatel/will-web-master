import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

const ContactUs = () => {
  const theme = useTheme(); // Access the current theme dynamically
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your message has been sent!'); // Replace with actual form submission logic
  };

  return (
      <Container sx={{ padding: "20px" }}>
        {/* Header Section */}
        <Box textAlign="center" py={3}>
          <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.primary">
            If you have any questions or feedback, feel free to reach out to us.
          </Typography>
        </Box>

        {/* Form Section */}
        <Box py={3}>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Your Name", id: "name", name: "name", type: "text", multiline: false },
              { label: "Your Email", id: "email", name: "email", type: "email", multiline: false },
              { label: "Your Message", id: "message", name: "message", type: "text", multiline: true, rows: 4 }
            ].map((field, index) => (
                <Box mb={2} key={index}>
                  <TextField
                      fullWidth
                      required
                      label={field.label}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      multiline={field.multiline}
                      rows={field.rows}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                  />
                </Box>
            ))}
            <Box textAlign="center">
              <Button type="submit" variant="contained" color="primary">
                Send Message
              </Button>
            </Box>
          </form>
        </Box>

        {/* Contact Information Section */}
        <Box py={3}>
          <Typography variant="h5" gutterBottom color={theme.palette.primary.main}>
            Contact Information
          </Typography>
          <Typography variant="body1" color="text.primary">
            If you prefer to reach out directly, you can use the following methods:
          </Typography>
          <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
            {[
              { label: "Email", value: "support@param-ichha.com" },
              { label: "Phone", value: "+1 (800) 123-4567" },
              { label: "Address", value: "123 Param-Ichha St., Cityville, 12345" }
            ].map((item, index) => (
                <Box component="li" sx={{ marginBottom: "8px" }} key={index}>
                  <strong>{item.label}:</strong> {item.value}
                </Box>
            ))}
          </Box>
        </Box>
      </Container>
  );
};

export default ContactUs;