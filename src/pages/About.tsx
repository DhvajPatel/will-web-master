/**
 * About Component: Highlights the story, purpose, and mission of Param-Ichha.
 */
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
      <Container sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>About Param-Ichha</Typography>
        <Typography variant="h6" paragraph>
          A platform to help you secure your legacy, easily and for free.
        </Typography>

        <Typography variant="h5" gutterBottom>My Story: Creating Param-Ichha</Typography>
        <Typography variant="body1" paragraph>
          Like many others, I have seen people struggle with the overwhelming process of creating a legally valid will. I remember a close family member who passed away without a will, leaving behind an uncertain future for their loved ones. It was a painful and complicated process for everyone involved. That's when I realized that this is something I could help change.
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Param-Ichha</b> is born out of a desire to make will creation simple, accessible, and completely free for everyone. I’ve experienced firsthand how difficult it can be to get a legally binding will done. It’s not just about legal paperwork; it’s about taking control of your future and ensuring your final wishes are respected.
        </Typography>
        <Typography variant="body1" paragraph>
          With <b>Param-Ichha</b>, I want to give people the power to write their own wills at their convenience, ensuring that their wishes are legally recognized and honored. I believe everyone deserves to have control over their legacy, no matter their background or financial situation.
        </Typography>

        <Typography variant="h5" gutterBottom>The Impact We’re Making</Typography>
        <Typography variant="body1" paragraph>
          Did you know that over 50% of adults don’t have a will? And of those who do, many find the process complex, expensive, and overwhelming.
        </Typography>
        <Typography variant="body1" paragraph>
          By simplifying the process of will creation and making it completely free, we’re aiming to change that. Our mission is to empower millions of individuals to take charge of their future by providing an easy, secure, and legal way to write their will.
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Param-Ichha</b> ensures that no one has to face the uncertainty of the future without having their final wishes in place.
        </Typography>

        <Typography variant="h5" gutterBottom>The Meaning Behind "Param-Ichha"</Typography>
        <Typography variant="body1" paragraph>
          The name <b>Param-Ichha</b> is derived from the Sanskrit words "Param" meaning supreme, and "Ichha" meaning wish. Together, it represents the ultimate wish – your final wish.
        </Typography>
        <Typography variant="body1" paragraph>
          This platform exists to help you document that ultimate wish — your will. With <b>Param-Ichha</b>, you can ensure that your final wishes are respected and your legacy is protected.
        </Typography>

        <Typography variant="h5" gutterBottom>Take Control of Your Future</Typography>
        <Typography variant="body1" paragraph>
          It’s time to secure your legacy. Create your will today with <b>Param-Ichha</b>. Simple, secure, and free.
        </Typography>
        <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>Login</Button>
        <Button component={Link} to="/register" variant="contained" color="primary">Register</Button>
      </Container>
  );
};

export default About;