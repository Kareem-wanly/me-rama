import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Container, Button, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import TabsFilter from "./TabsFilter";
import AccordinFilters from "./AccordinFilters";
import PaginationAds from "./PaginationAds";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SpecialAds from "./SpecialAds";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SelectCity from "../selectnav/SelectCity";
import HomeType from "./HomeType";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Location } from "../../assets";
import useDataFetcher from "../../api/useDataFetcher ";
import { AdsClick } from "@mui/icons-material";
import SkeleltonSpeacialAds from "../Loading/SkeleltonSpeacialAds";
import { myAxios } from "../../api/myAxios";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Create a custom styled component
const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    maxWidth: "none !important",
    margin: 0,
    padding: theme.spacing(2),
  },
  maxWidth: "1280px !important",
  margin: "3rem auto",
}));

const HomeFilter = ({ userLocation }) => {
  const [per_page, set_per_page] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const linkParams = new URLSearchParams(location.search);
  // const [current_page, set_current_page] = useState();
  // const [ads, setAds] = useState([]);
  const [maplat, setLat] = useState();
  const [maplng, setLng] = useState();
  const [mapzoom, setZoom] = useState();
  const [last_page, set_last_page] = useState();
  // const { data, isLoading, get } = useDataFetcher();
  const [FilterProps, setFilterProps] = useState({ page: 1 });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // this for filter or xs screens small screens
  const {
    data: filterData,
    isLoading: filterIsLoading,
    get: getFilterData,
  } = useDataFetcher();
  const [cities, setCities] = useState([]);
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    getFilterData(`api/settings/search_data`);
  }, []);
  useEffect(() => {
    if (linkParams) {
      setFilterProps((prev) => ({
        ...prev,
        city: linkParams.get("city") || cities[0],
        neighborhood: linkParams.get("neighborhood"),
        category_id: linkParams.get("category_id"),
        min_price: linkParams.get("min_price"),
        max_price: linkParams.get("max_price"),
      }));
    }
  }, [location.search]);
  useEffect(() => {
    if (filterData) {
      setCities(filterData?.cities);
      filterData?.cities[0] && setSelectedCity(filterData?.cities[0]);
      const categoriesArray = Object.values(filterData?.categories);
      setHomes(categoriesArray);
      categoriesArray[0].id && setSelectedHome(categoriesArray[0].id);
    }
  }, [filterData]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    myAxios
      .get(`/api/ads/get_all_ads`, { params: FilterProps })
      .then((res) => {
        // console.log(res)
        setData(res.data.ads.data);
        if (res.data) {
          set_per_page(res.data.ads.per_page);
          // setAds(data.ads.data);
          set_last_page(res.data.ads.last_page);

          if (res.data.ads.data.length > 0) {
            const firstAd = data.ads.data[0];
            setLat(firstAd.lat);
            setLng(firstAd.lng);
            setZoom(firstAd.zoom);
            console.log(firstAd.lng);
          }
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      });
  }, [
    FilterProps.page,
    FilterProps?.topView,
    FilterProps?.topPrice,
    FilterProps?.minPrice,
    FilterProps?.topRate,
    FilterProps?.lat,
    FilterProps?.lng,
    FilterProps?.title,
    FilterProps?.space,
    FilterProps?.min_price,
    FilterProps?.max_price,
    FilterProps?.category_id,
    FilterProps?.city,
    FilterProps?.neighborhood,
    FilterProps?.interface_id,
    FilterProps?.categoryBool,
  ]);
  // useEffect(
  //   () => {
  //     console.log("dont play with me");
  //     const queryParams = new URLSearchParams({
  //       city: FilterProps?.city,
  //       neighborhood: FilterProps?.neighborhood,
  //       min_price: FilterProps?.min_price,
  //       max_price: FilterProps?.max_price,
  //       category_id: FilterProps?.category_id,
  //     });
  //     const newPath = `/ads?${queryParams.toString()}`;
  //     navigate(newPath);
  //   },
  //   [

  //     // FilterProps?.city,
  //     // FilterProps?.neighborhood,
  //     // FilterProps?.min_price,
  //     // FilterProps?.max_price,
  //     // FilterProps?.category_id,
  //   ]
  // );
  const renderFilterSection = (FilterProps) => {
    let counter = 0;
    if (FilterProps?.title) {
      counter++;
    }
    if (FilterProps?.space) {
      counter++;
    }
    if (FilterProps?.city) {
      counter++;
    }
    if (FilterProps?.min_price) {
      counter++;
    }
    if (FilterProps?.category_id) {
      counter++;
    }
    if (FilterProps?.neighborhood) {
      counter++;
    }
    if (FilterProps?.interface_id) {
      counter++;
    }
    if (FilterProps?.interface_id) {
      counter++;
    }
    if (FilterProps?.categoryBool) {
      counter++;
    }
    if (
      FilterProps?.topView ||
      FilterProps?.topPrice ||
      FilterProps?.minPrice ||
      FilterProps?.topRate ||
      FilterProps?.lat
    ) {
      counter++;
    }
    return counter;
  };
  const handleFiltertoDefault = () => {
    setFilterProps({ page: 1 });
  };
  //dashboard.aqartik.com/api/ads/get_all_ads?lat=10000&lng=000&topView=true&topPrice=true&minPrice=true&topRate=true&title&space=10&city&neighborhood&interface_id&min_price&max_price&category_id
  // useEffect(() => {
  //   if (data) {
  //     // set_current_page(data.ads.current_page);
  //     setFilterProps((prev) => ({ ...prev, page: data.ads.current_page }));
  //     set_per_page(data.ads.per_page);
  //     setAds(data.ads.data);
  //     set_last_page(data.ads.last_page);

  //     if (data.ads.data.length > 0) {
  //       const firstAd = data.ads.data[0];
  //       setLat(firstAd.lat);
  //       setLng(firstAd.lng);
  //       setZoom(firstAd.zoom);
  //       console.log(firstAd.lng);
  //     }
  //   }
  // }, [data]);

  const handlePageChange = (event, new_page) => {
    // set_current_page(new_page);
    setFilterProps((prev) => ({ ...prev, page: new_page }));
  };

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showSearchBox, setShowSearchBox] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityIsOpen, setCityIsOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [homeIsOpen, setHomeIsOpen] = useState(false);
  const cityRef = useRef(null);
  const HomeRef = useRef(null);
  const handleCitySelection = (city) => {
    setSelectedCity(city);
    setCityIsOpen(false);
    setFilterProps((prev) => ({
      ...prev,
      city: city,
    }));
  };
  const handleHomeSelection = (home) => {
    setSelectedHome(home);
    setHomeIsOpen(false);
    setFilterProps((prev) => ({
      ...prev,
      category_id: home,
    }));
  };
  // useEffect(() => {
  //   setFilterProps((prev) => ({
  //     ...prev,
  //     city: selectedHome,
  //   }));
  // }, [selectedHome]);

  const handleBoxClick = () => {
    setCityIsOpen(true);
  };
  const handleBoxHomeClick = () => {
    setHomeIsOpen(true);
  };

  const handleToggleSearchBox = () => {
    setShowSearchBox((prevShow) => !prevShow);
  };
  const handleOutsideClick = (event) => {
    if (cityRef.current && !cityRef.current.contains(event.target)) {
      setCityIsOpen(false);
    }
    if (HomeRef.current && !HomeRef.current.contains(event.target)) {
      setHomeIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <StyledContainer
        sx={{ display: { xs: "none", md: "block" }, marginTop: "15rem" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            <Box sx={{ margin: "3rem 0rem" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "2.25rem" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {FilterProps?.city}
              </Typography>
              {/* <Typography>الكل من 19 يونيو - 20 يونيو (ليلة واحدة)</Typography> */}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "start", sm: "end" },
              marginTop: { xs: "-3rem", sm: "0" },
              marginBottom: { xs: "1rem", sm: "0rem" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                to="/mappage"
                state={{
                  lat: 24.7136,
                  lng: 46.6753,
                  zoom: 10,
                }}
                style={{
                  display: "flex",
                  color: "#fff",
                  backgroundColor: "var( --green-color)",
                  height: "48px",
                  borderRadius: "24px",
                  padding: "6px 12px",
                  fontWeight: "bold",
                  alignItems: "center",
                  fontFamily: " Tajawal,Arial,sans-serif",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#0d8d68",
                  },
                }}
              >
                <Box>
                  <LocationOnIcon />
                </Box>
                {t("advertisements_page.sec1.map_button")}
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex" }}>
                <FilterListIcon
                  sx={{
                    border: "1px solid black",
                    borderRadius: "50%",
                    padding: "0.2rem",
                    margin: "0 0.5rem",
                  }}
                />
                {t("advertisements_page.filter_sec.title")}
                <Typography> {renderFilterSection(FilterProps)}</Typography>
              </Box>
              <Typography sx={{ marginX: "0.5rem" }}>|</Typography>
              <Button
                sx={{
                  textDecoration: "none",
                  color: "var( --green-color)",
                  fontEeight: "normal",
                  fontSize: "inherit",
                }}
                onClick={handleFiltertoDefault}
              >
                {t("advertisements_page.filter_sec.delete_button")}
              </Button>
            </Box>
            <Box>
              <AccordinFilters
                setFilterProps={setFilterProps}
                FilterProps={FilterProps}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <TabsFilter
              data={data}
              setFilterProps={setFilterProps}
              userLocation={userLocation}
              FilterProps={FilterProps}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
        {/* <PaginationAds></PaginationAds> */}
      </StyledContainer>
      {/* // this Box for xs small screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box
          sx={{
            boxShadow: "none",
            height: showSearchBox ? "70px" : "270px",
            marginBottom: "20px",
            position: "sticky",
            top: "0px",
            zIndex: "99",
            backgroundColor: "rgb(255, 255, 255)",
            transition: "height 0.3s ease-in-out 0s",
            marginTop: "0rem",
          }}
        >
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
              paddingRight: "13px",
              paddingLeft: "13px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
              height: "70px",
            }}
          >
            {showSearchBox ? (
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <ChevronRightIcon
                  onClick={handleToggleSearchBox}
                  sx={{
                    color: "var(--green-color)",
                    fontSize: "2.5rem",
                    cursor: "pointer",
                  }}
                />
              </Link>
            ) : (
              <CloseIcon
                onClick={handleToggleSearchBox}
                sx={{
                  color: "gray",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              />
            )}

            {showSearchBox ? (
              <Box
                sx={{
                  flex: "1 1 0%",
                  borderRadius: "18px",
                  maxWidth: "calc(100% - 80px)",
                  marginLeft: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleToggleSearchBox}
              >
                <Box
                  sx={{
                    height: "35px",
                    border: "1px solid rgba(112, 112, 112, 0.4)",
                    backgroundColor: "rgb(247, 247, 247)",
                    borderRadius: "18px",
                    padding: "0px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: "1 1 0%",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <SearchIcon
                      sx={{
                        color: "var(--green-color)",
                        marginLeft: "5px",
                        fontSize: "20px",
                      }}
                    />
                    <Typography>{selectedCity}</Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Typography sx={{ fontWeight: "700" }}>
                عدل معلومات بحثك
              </Typography>
            )}

            <Box
              sx={{
                backgroundColor: "var(--green-color)",
                height: "35px",
                width: "35px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to="/mappage"
                state={{
                  lat: 24.7136,
                  lng: 46.6753,
                  zoom: 10,
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <img src={Location} alt="location" /> */}
                <LocationOnIcon sx={{ color: "white", fontSize: "18px" }} />
              </Link>
            </Box>
          </Box>
          {!showSearchBox && (
            <Box sx={{ paddingX: "12px" }}>
              <Box
                sx={{
                  height: "148px",
                  border: "5px solid rgba(221, 223, 238, 0.4)",
                  borderRadius: "28px",
                  marginTop: "20px",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    border: "1px solid rgb(186, 189, 210)",
                    borderRadius: "23px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "rgb(255, 255, 255)",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    ref={cityRef}
                    sx={{
                      borderBottom: "1px solid rgb(186, 189, 210)",
                      width: "100%",
                      padding: "12px 16px",
                      cursor: "pointer",
                    }}
                    onClick={handleBoxClick}
                  >
                    <Typography
                      sx={{ color: "rgb(120, 120, 131)", fontSize: "13px" }}
                    >
                      المدينة
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {selectedCity}
                    </Typography>
                  </Box>

                  {cityIsOpen && (
                    <SelectCity
                      isOpen={cityIsOpen}
                      onClose={() => setCityIsOpen(false)}
                      onCitySelect={handleCitySelection}
                      selectedCity={selectedCity}
                      cities={cities}
                    />
                  )}

                  <Box
                    ref={HomeRef}
                    sx={{
                      width: "100%",
                      padding: "12px 16px",
                      cursor: "pointer",
                    }}
                    onClick={handleBoxHomeClick}
                  >
                    <Typography
                      sx={{ color: "rgb(120, 120, 131)", fontSize: "13px" }}
                    >
                      نوع العقار
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      {homes?.find((item) => item.id === selectedHome).ar_name}
                    </Typography>
                    {homeIsOpen && (
                      <HomeType
                        isOpen={homeIsOpen}
                        onClose={() => setHomeIsOpen(false)}
                        onHomeSelect={handleHomeSelection}
                        selectedHome={selectedHome}
                        homes={homes}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "95%", margin: "auto" }}>
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
              }}
            >
              <ErrorOutlineIcon sx={{ color: "red", marginLeft: "10px" }} />
              <Box>
                <Typography sx={{ color: "red", marginBottom: "10px" }}>
                  {lang === "ar"
                    ? " عذرا لايوجد نتائج"
                    : " sorry there is no result"}
                </Typography>
                <Typography>
                  {lang === "ar"
                    ? " لا يوجد نتائج متاحة في الوقت الحالي، من فضلك حاول مرة أخري"
                    : "sorry , there is no result now ... please try again"}
                </Typography>
              </Box>
            </Box>
          )}

          {/* <PaginationAds /> */}
        </Box>
      </Box>

      {isLoading ? (
        ""
      ) : (
        <PaginationAds
          handlePageChange={handlePageChange}
          current_page={FilterProps.page}
          per_page={per_page}
          last_page={last_page}
        />
      )}
    </>
  );
};

export default HomeFilter;
