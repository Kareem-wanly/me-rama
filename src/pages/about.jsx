import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: "100%",
          maxHeight: "100vh",
          marginTop: "8rem",
          marginBottom: "13rem",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              color: "var(--green-color)",
              marginBottom: "2rem",
              fontWeight: "500",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            نبذة مختصرة عن منصة عقارتك
          </Typography>
          <FontAwesomeIcon
            icon={faQuoteLeft}
            style={{ color: "#fdc57b", fontSize: "25px", marginRight: "1rem" }}
          />
        </Box>
        <Typography sx={{ color: "gray" }}>
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem loremlorem lorem lorem
        </Typography>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          style={{
            color: "#fdc57b",
            fontSize: "25px",
            marginRight: "1rem",
            marginTop: "2rem",
          }}
        />
        <Typography sx={{ color: "gray", marginTop: "1rem" }}>
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem
        </Typography>
        <Typography
          sx={{
            color: "var(--green-color)",
            marginTop: "2rem",
            maxWidth: "700px",
          }}
        >
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
