import React, { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "./swipermap.module.css";
import { house } from "../../assets";
import FavoriteIcons from "../Filter/FavoriteIcons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { DefaultImage } from "../../assets";

const AdsListSmall = ({
  data,
  isBoxVisible,
  setBoxVisible,
  activeMarkerIndex,
}) => {
  // const [isBoxVisible, setBoxVisible] = useState(true);
  const navigate = useNavigate();

  const handleBoxClose = () => {
    setBoxVisible(false);
  };

  if (!isBoxVisible) {
    return null; // Return null when the Box is not visible
  }
  // Find the index of the ad that matches the activeMarkerIndex
  const activeAdIndex = data.findIndex((ad) => ad.id === activeMarkerIndex);

  // Move the active ad to the beginning of the array
  if (activeAdIndex !== -1) {
    const [activeAd] = data.splice(activeAdIndex, 1);
    data.unshift(activeAd);
  }
  console.log(data);
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgb(255, 255, 255)",
        position: "absolute",
        zIndex: "100000000",
        maxHeight: "90vh",
        bottom: "0px",
        borderRadius: "20px 20px 0px 0px",
        boxShadow: "rgba(0, 0, 0, 0.51) 0px 6px 10px",
        height: "280px",
        display: { md: "none" },
      }}
    >
      <Box sx={{ marginTop: "20px" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "rgb(132, 132, 132)",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 6px 6px",
            transform: "scale(0.8)",
            padding: "3px",
          }}
          onClick={handleBoxClose}
        >
          <CloseIcon sx={{ color: "white", fontSize: "1.25rem" }} />
        </IconButton>
        <Typography
          sx={{ marginRight: "15px", fontSize: "15px", fontWeight: "700" }}
        >
          المزيد من وحدات هذا العقار
        </Typography>
      </Box>
      <Box sx={{ marginTop: "20px", width: "100%" }}>
        <Swiper
          navigation
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          className={Styles.swiper_container}
        >
          {data.map((ad, index) => (
            <SwiperSlide className={Styles.swiper_slide} key={index}>
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <Link
                  to={`/details/${ad.id}`}
                  state={{
                    ad,
                  }}
                  style={{
                    textDecoration: "none",
                    height: "130px",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 6px",
                    overflow: "hidden",
                    position: "relative",
                    display: "block",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Box
                      sx={{
                        width: "117px",
                        height: "130px",
                        overflow: "hidden",
                        position: "relative",
                        borderRadius: "0px",
                      }}
                    >
                      <img
                        src={ad.thumbnail? `https://www.dashboard.aqartik.com/assets/images/ads/image/${ad.thumbnail.name}` : DefaultImage}
                        alt="home"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          objectFit: "cover",
                          color: "transparent",
                        }}
                      />
                    </Box>
                    <Box sx={{ padding: "9px" }}>
                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",
                          flexDirection: "row",
                          marginBottom: "10px",
                        }}
                      >
                        <StarIcon
                          sx={{
                            marginLeft: "5px",
                            color: "var(--green-color)",
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          9.3 تقييم
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          marginBottom: "10px",
                          color: "black",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {ad.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "var(--green-color)",
                          fontWeight: "700",
                          fontSize: "14px",
                        }}
                      >
                        {ad.price} ر.س
                      </Typography>
                    </Box>
                    <Box
                      sx={{ position: "absolute", top: "10px", left: "10px" }}
                    >
                      <FavoriteIcons />
                    </Box>
                  </Box>
                </Link>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default AdsListSmall;
