import React from "react";
import { Box } from "@mui/material";
import { Visa } from "../../assets";

const LoaderHome = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        zIndex: "1000000000000000000000000",
      }}
    >
      <img
        src={Visa}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          width: "100px",
          height: "100px",
        }}
        alt="logo"
      />
    </Box>
  );
};

export default LoaderHome;
