import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const theme = useTheme(); // Access the current theme dynamically

  return (
      <Container sx={{ padding: "20px" }}>
        {/* Hero Section */}
        <Box textAlign="center" py={5}>
          <Typography variant="h3" gutterBottom color={theme.palette.primary.main}>
            Welcome to Param-Ichha
          </Typography>
          <Typography variant="h6" color="text.primary">
            Your trusted platform for creating free, legally valid wills with ease and security.
          </Typography>
        </Box>

        {/* Features Section */}
        <Box py={5}>
          <Typography variant="h5" gutterBottom color={theme.palette.secondary.main}>
            Why Choose Param-Ichha?
          </Typography>
          <ul>
            {[
              {
                title: "Easy Will Creation",
                text: "A step-by-step guide to help you create your will effortlessly.",
              },
              {
                title: "Legal Compliance",
                text: "Your will follows legal standards, ensuring validity.",
              },
              {
                title: "Completely Free",
                text: "No hidden fees – create and manage your will at no cost.",
              },
              {
                title: "Secure & Private",
                text: "Your personal details remain confidential and protected.",
              },
            ].map((item, index) => (
                <li key={index}>
                  <Typography variant="body1" color="text.primary">
                    <strong>{item.title}:</strong> {item.text}
                  </Typography>
                </li>
            ))}
          </ul>
        </Box>

        {/* Testimonials Section */}
        <Box py={5}>
          <Typography variant="h5" gutterBottom color={theme.palette.primary.main}>
            What Our Users Say
          </Typography>
          {[
            {
              quote:
                  "Param-Ichha made creating my will simple and stress-free. I feel secure knowing my wishes are documented.",
              author: "- A Satisfied User",
            },
            {
              quote:
                  "The platform is intuitive and the support team is incredibly helpful. Highly recommend!",
              author: "- Another Happy User",
            },
          ].map((testimonial, index) => (
              <Box
                  key={index}
                  component="blockquote"
                  sx={{
                    borderLeft: `4px solid ${theme.palette.divider}`,
                    pl: 3,
                    fontStyle: "italic",
                    mt: index === 0 ? 0 : 3, // Add margin between testimonials
                  }}
              >
                <Typography variant="body1" color="text.primary">
                  "{testimonial.quote}"
                </Typography>
                <cite>{testimonial.author}</cite>
              </Box>
          ))}
        </Box>

        {/* Call to Action Section */}
        <Box textAlign="center" py={5}>
          <Typography variant="h5" gutterBottom color={theme.palette.secondary.main}>
            Get Started Today
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            Take control of your future by creating your will now. It's quick, easy, and secure.
          </Typography>
          <Box>
            <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>
              Login
            </Button>
            <Button component={Link} to="/register" variant="outlined" color="secondary">
              Register
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Home;