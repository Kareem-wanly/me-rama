import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useDataFetcher from "../../api/useDataFetcher ";
import { useTranslation } from "react-i18next";

const FiveStars = ({ adInfo }) => {
  const userToken = localStorage.getItem("user_token");
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  // console.log(adInfo);
  const [rating, setRating] = useState(0);
  const { data, isLoading, post } = useDataFetcher();

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);

    // post(`/api/ads/rate_user/?rate=${selectedRating}`);
    const formData = new FormData();
    formData.append("rate", selectedRating);
    await fetch(`https:/dashboard.aqartik.com/api/ads/rate_user/${adInfo}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      body: formData,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 0 }}>
      {userToken ? (
        [1, 2, 3, 4, 5].map((star) => (
          <IconButton
            key={star}
            onClick={() => handleStarClick(star)}
            color={star <= rating ? "gold" : undefined}
          >
            {star <= rating ? (
              <StarIcon sx={{ color: "gold" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        ))
      ) : (
        <Typography variant="body2">
          {lang === "ar"
            ? "يرجى تسجيل الدخول من أجل التقيم"
            : "Please login to rate."}
        </Typography>
      )}
    </Box>
  );
};

export default FiveStars;
