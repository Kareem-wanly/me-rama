import React, { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useDataFetcher from "../../../api/useDataFetcher ";

const FavoriteButton = ({ adInfo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data, isLoading, get } = useDataFetcher();

  const handleClick = () => {
    console.log(adInfo)
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    get(`api/ads/add_fav/${adInfo}`);
  };

  return (
    <Button onClick={handleClick} sx={{ marginLeft: "-20px" }}>
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "white" }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "white" }} />
      )}
    </Button>
  );
};

export default FavoriteButton;
