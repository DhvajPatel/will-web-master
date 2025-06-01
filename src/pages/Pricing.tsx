import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, Button } from "@mui/material";

const Pricing = () => {
  const theme = useTheme(); // Access the current theme dynamically

  const plans = ["Bronze (Free)", "Silver (One Will, Unlimited Modifications)", "Gold (Unlimited Will Creation)"];
  const features = [
    { feature: "Will Creation", values: ["Available", "Available", "Available"] },
    { feature: "Multiple Will Creation", values: ["Not Available", "Available", "Available"] },
    { feature: "Joint Will", values: ["Not Available", "Not Available", "Available"] },
    { feature: "Support", values: ["Email Support", "Priority Email Support", "24/7 Dedicated Support"] },
    { feature: "Professional Consultation", values: ["Not Available", "Available", "Available"] },
    { feature: "Legal Compliance", values: ["Available", "Available", "Available"] },
    { feature: "Price", values: ["Free", "$49/month", "$99/month"] },
  ];
  const experts = [
    "Dr. John Doe - Legal Consultant",
    "Dr. Jane Smith - Estate Planner",
    "Dr. Samuel Green - Will Specialist",
    "Dr. Maria Lewis - Senior Legal Advisor",
    "Dr. Tom White - Legal Consultant",
  ];

  return (
    <Container sx={{ padding: "20px" }}>
      {/* Header */}
      <Box textAlign="center" py={3}>
        <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
          Choose Your Plan
        </Typography>
        <Typography variant="body1" color="text.primary">Select the best plan for you</Typography>
      </Box>

      {/* Pricing Table */}
      <Box py={3}>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" sx={{ border: "1px solid #ddd", padding: "8px" }}>
                <Typography variant="h6" color={theme.palette.primary.main}>Feature</Typography>
              </Box>
              {plans.map((plan, i) => (
                <Box component="th" key={i} sx={{ border: "1px solid #ddd", padding: "8px" }}>
                  <Typography variant="h6" color={theme.palette.primary.main}>{plan}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {features.map(({ feature, values }, i) => (
              <Box component="tr" key={i}>
                <Box component="td" sx={{ border: "1px solid #ddd", padding: "8px" }}>{feature}</Box>
                {values.map((value, j) => (
                  <Box component="td" key={j} sx={{ border: "1px solid #ddd", padding: "8px" }}>{value}</Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box textAlign="center" mt={3}>
          <Button variant="contained" color="primary">Sign Up for Free (Bronze)</Button>
          <Button variant="outlined" color="secondary" sx={{ mx: 2 }}>Choose Silver Plan</Button>
          <Button variant="outlined" color="secondary">Choose Gold Plan</Button>
        </Box>
      </Box>

      {/* Experts Section */}
      <Box py={3}>
        <Typography variant="h5" gutterBottom color={theme.palette.primary.main}>
          Meet Our Experts
        </Typography>
        <Typography variant="body1" color="text.primary">
          We work with experienced legal consultants to help you create the perfect will.
        </Typography>
        <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
          {experts.map((expert, i) => (
            <Box component="li" key={i} sx={{ marginBottom: "8px" }}>{expert}</Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Pricing;