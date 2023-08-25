import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";

const GreenCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    "& .MuiIconButton-label": {
      backgroundColor: "white",
      border: "1px solid gray",
    },
    "& svg": {
      color: "white",
      width: "20px",
      height: "20px",
      backgroundColor: "var(--green-color)",
      border: "1px solid gray",
    },
  },
  "& .MuiIconButton-label": {
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    backgroundColor: "white",
    border: "1px solid gray",
  },
  "& svg": {
    borderRadius: "50%",
    color: "white",
    border: "1px solid gray",
    width: "20px", // Increase the width
    height: "20px", // Increase the height
  },
}));

const ChecBoxPlusFeature = ({ setFilterProps, FilterProps }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, get } = useDataFetcher();
  const [selectedItem, setSelectedItems] = useState([]);

  const [checkboxeshome, setcheckboxeshome] = useState([]);
  useEffect(() => {
    get(`/api/ads/info/${FilterProps?.category_id}`);
  }, [FilterProps?.category_id]);
  useEffect(() => {
    if (data) {
      setcheckboxeshome(data?.categoryBool);
    }
  }, [data]);
  useEffect(() => {
    if (!FilterProps?.categoryBool) {
      setSelectedItems([]);
    }
  }, [!FilterProps?.categoryBool]);

  const handleChange = (event, id) => {
    const { name, checked } = event.target;

    if (checked) {
      // Add the selected item to the array
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, name]);
    } else {
      // Remove the unselected item from the array
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== name)
      );
    }
    setFilterProps((prev) => ({
      ...prev,
      categoryBool: selectedItem,
    }));

    // setFilterProps((prev) => ({
    //   ...prev,
    //   category_id: id,
    // }));
  };
  // useEffect(() => {

  // }, [setFilterProps]);

  return (
    <div>
      {checkboxeshome?.map((checkbox) => (
        <FormControlLabel
          key={checkbox?.id}
          control={
            <GreenCheckbox
              checked={selectedItem.includes(checkbox?.bool_featurea.en_name)}
              onChange={(event) =>
                handleChange(event, checkbox.bool_featurea.id)
              }
              name={checkbox?.bool_featurea.en_name}
              icon={<CheckIcon />}
              checkedIcon={<CheckIcon />}
            />
          }
          label={
            lang === "ar"
              ? checkbox?.bool_featurea.ar_name
              : checkbox?.bool_featurea.en_name
          }
        />
      ))}
    </div>
  );
};

export default ChecBoxPlusFeature;
