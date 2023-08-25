import React, { useEffect, useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
} from "@mui/material";

import FavoriteIcons from "./FavoriteIcons";

import SpecialAds from "./SpecialAds";
import CheckIcon from "@mui/icons-material/Check";
import NorthIcon from "@mui/icons-material/North";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import PaginationAds from "./PaginationAds";
import SkeleltonSpeacialAds from "../Loading/SkeleltonSpeacialAds";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslation } from "react-i18next";

import "./tabs.module.css";

import useDataFetcher from "../../api/useDataFetcher ";

const icons = [
  {
    icon: <FavoriteIcons />,
    number: 1,
  },
  {
    icon: <TwitterIcon />,
    number: 2,
  },
  {
    icon: <LinkIcon />,
    number: 3,
  },
];
const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const TabsFilter = ({
  data,
  userLocation,
  setFilterProps,
  FilterProps,
  isLoading,
}) => {
  // console.log(userLocation);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isListOrderOpen, setListOrderOpen] = React.useState(false);
  const [isBoxShown, setBoxShown] = React.useState(false);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);
  console.log(userLocation);

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // const { data, isLoading, get } = useDataFetcher();
  // const [current_page, set_current_page] = useState();
  // const [pre_page, set_per_page] = useState();

  // useEffect(() => {
  //   get("/api/ads/get_all_ads");
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     set_current_page(data?.ads?.current_page);
  //     set_per_page(data?.ads?.per_page);
  //   }
  // }, [data]);

  // console.log(current_page, pre_page);

  const tabData = [
    { label: t("filtersTab.default_btn"), content: "Content 1" },
    { label: t("filtersTab.Closest_btn"), content: "Content 2" },
    { label: t("filtersTab.top_rated"), content: "Content 3" },
    { label: t("filtersTab.top_viewings"), content: "Content 4" },
    { label: t("filtersTab.lowest_price"), content: "Content 5" },
    { label: t("filtersTab.highest_price"), content: "Content 6" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleOrderList = () => {
    setListOrderOpen(!isListOrderOpen);
  };
  const toggleBox = () => {
    setBoxShown(!isBoxShown);
  };

  const commonButtonStyles = {
    borderRadius: "26px",
    padding: "13px 22px",
    fontSize: "14px",
    position: "relative",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    "&:before": {
      content: '""',
      display: "block",
      width: "4px",
      height: "4px",
      backgroundColor: "rgba(0, 0, 0, 0.16)",
      borderRadius: "50%",
      position: "absolute",
      right: "2px",
      top: "50%",
      transform: "translateX(50%)",
    },
  };
  const firstButtonStyles = {
    "&:before": {
      content: "none",
    },
  };
  return (
    <>
      <div
        style={{ position: "relative" }}
        onClick={() => {
          if (isBoxShown) {
            toggleBox();
          }
        }}
      >
        {isBoxShown && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
            }}
          />
        )}

        {!isMdScreen && (
          <Box
            sx={{
              padding: "4px",
              border: "1px solid rgba(121, 141, 174, 0.16)",
              // justifyContent: "center",
              display: "flex",
              borderRadius: "30px",
              // width: "80%",
              width: "100%",
              justifyContent: "center",
              // maxWidth: "47rem",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              className="custom-tabs"
              sx={{
                width: "100%",
                display: "flex",

                // backgroundColor: "red",
                justifyContent: "space-around ",
                "& .MuiTabs-flexContainer": {
                  width: "100%",
                  justifyContent: "space-around !important",
                  // backgroundColor:"red"
                },
                "& .custom-tabs .css-heg063-MuiTabs-flexContainer ": {
                  width: "100%",
                  justifyContent: "space-around !important",
                },
                "& .css-heg063-MuiTabs-flexContainer": {
                  width: "100%",
                  justifyContent: "space-around ",

                  // backgroundColor: "blue",
                },
                "& .css-k008qs": {
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                },

                justifyContent: "space-around !important",
                "& .css-heg063-MuiTabs-flexContainer": {
                  justifyContent: "space-around !important",
                },

                "& .MuiTabs-indicator": {
                  display: "none",
                },
                padding: "4px",

                borderRadius: "30px",
              }}
            >
              <Button
                sx={{
                  ...commonButtonStyles,
                  ...firstButtonStyles,
                  backgroundColor:
                    !FilterProps.lat &
                    !FilterProps.lng &
                    !FilterProps.topPrice &
                    !FilterProps.minPrice &
                    !FilterProps.topRate &
                    !FilterProps.topView
                      ? "var(--green-color)"
                      : "white",
                  color:
                    !FilterProps.lat &
                    !FilterProps.lng &
                    !FilterProps.topPrice &
                    !FilterProps.minPrice &
                    !FilterProps.topRate &
                    !FilterProps.topView
                      ? "white"
                      : "black",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.default_btn")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.lat
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.lat ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.lat
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.lat ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    lat: userLocation?.latitude,
                    lng: userLocation?.longitude,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.Closest_btn")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.topView
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.topView ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.topView
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.topView ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: true,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.top_viewings")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.topRate
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.topRate ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.topRate
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.topRate ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topRate: true,
                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                  }))
                }
              >
                {t("filtersTab.top_rated")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.topPrice
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.topPrice ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.topPrice
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.topPrice ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topPrice: true,
                    topView: null,
                    lat: null,
                    lng: null,

                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {" "}
                {t("filtersTab.highest_price")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.minPrice
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.minPrice ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.minPrice
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.minPrice ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    minPrice: true,
                    topPrice: null,
                    topView: null,
                    lat: null,
                    lng: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.lowest_price")}
              </Button>
            </Tabs>
          </Box>
        )}
        {isMdScreen && isListOrderOpen && isBoxShown && (
          <Box
            sx={{
              position: "fixed",
              top: "10rem",
              left: "20px",
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 3px",
              width: "18rem",
              maxWidth: "317px",
              borderRadius: "24px",
              zIndex: "220000000",
              border: "1px solid rgb(90, 64, 155)",
              padding: "1rem",
            }}
          >
            <Typography variant="h6">رتب أماكن الاقامة حسب</Typography>

            <ul
              style={{
                listStyle: "none",
                padding: "1rem",
                fontFamily: "Tajawal,Arial,sans-serif",
              }}
            >
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.default_btn")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: true,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.top_viewings")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    lat: userLocation.latitude,
                    lng: userLocation.longitude,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.Closest_btn")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: true,
                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.highest_price")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: true,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.lowest_price")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topRate: true,
                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                  }))
                }
              >
                {t("filtersTab.top_rated")}
              </li>
            </ul>
          </Box>
        )}
        {isMdScreen && (
          <Button
            onClick={() => {
              toggleBox();
              toggleOrderList();
            }}
            sx={{
              display: "flex",
              margin: "1rem auto",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
              backgroundColor: "var(--green-color)",
              color: "white",
              left: "50%",
              transform: "translate(-50%,-50%)",
              position: "absolute",
              top: "-1rem",
              zIndex: 11111,
              "&:hover": {
                backgroundColor: "var(--green-color)",
              },
            }}
          >
            <NorthIcon />
            <NorthIcon
              sx={{ transform: "rotate(180deg)", marginRight: "1px" }}
            />
            {lang === "ar" ? "ترتيب" : "order"}
          </Button>
        )}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SkeleltonSpeacialAds key={index} />
          ))
        ) : data.length > 0 ? (
          data.map((ad, i) => <SpecialAds key={ad.id} ad={ad} />)
        ) : (
          <Box
            sx={{
              width: "90%",
              backgroundColor: "rgb(253, 236, 234)",
              display: "flex",
              padding: "6px 16px",
              margin: "auto",
              borderRadius: "4px",
              marginTop: "2rem",
            }}
          >
            <ErrorOutlineIcon sx={{ color: "red", marginLeft: "10px" }} />
            <Box>
              <Typography sx={{ color: "red", marginBottom: "10px" }}>
                {lang === "ar"
                  ? " عذرا لايوجد نتائج"
                  : " sorry there is no result"}
              </Typography>
              <Typography sx={{ marginBottom: "1rem" }}>
                {lang === "ar"
                  ? " لا يوجد نتائج متاحة في الوقت الحالي، من فضلك حاول مرة أخري"
                  : "sorry , there is no result now ... please try again"}
              </Typography>
            </Box>
          </Box>
        )}
      </div>
    </>
  );
};

export default TabsFilter;
