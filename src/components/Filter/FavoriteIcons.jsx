import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useDataFetcher from "../../api/useDataFetcher ";
import LogInModal from "../selectnav/LogInModal";

const FavoriteIcons = ({ adInfo, isInFavorites }) => {
  const userToken = localStorage.getItem("user_token");

  const { data, isLoading, get } = useDataFetcher();
  const [isFavorite, setIsFavorite] = useState(isInFavorites);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // console.log(adInfo);
  // useEffect(() => {
  //   get(`api/user/get_office_details/${adInfo}`);
  // }, [adInfo]);
  const handleClickFavorite = () => {
    if (!userToken) {
      // If no token, show the login modal
      setShowLoginModal(true);
    } else {
      // If there is a token, toggle the favorite state and make the API request
      setIsFavorite(!isFavorite);
      get(`api/ads/add_fav/${adInfo}`);
    }
  };

  return (
    <div
      onClick={handleClickFavorite}
      style={{ alignItems: "center", display: "flex" }}
    >
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "black", marginLeft: "3px" }} />
      )}
      {showLoginModal && <LogInModal />}
    </div>
  );
};

export default FavoriteIcons;
