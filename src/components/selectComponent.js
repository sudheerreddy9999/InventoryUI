import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "35px", 
    minHeight: '35px',
    fontSize: '14px', // Adjusted font size to match your default
    borderRadius: "9999px", // Round borders
    padding: "0px", // Removed any padding that might add extra space
    boxSizing: "border-box", // Ensures padding doesn't add extra width
  }),
  option: (provided) => ({
    ...provided,
    borderRadius: "8px", 
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px", 
  }),
};

const SelectComponent = (props) => {
  const mergedStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: props.minHeight || customStyles.control(provided).minHeight, 
      fontSize: props.fontSize || customStyles.control(provided).fontSize, 
      width: props.width || "100%", // Ensure width is set correctly
      borderRadius: props.borderRadius || customStyles.control(provided).borderRadius,
    }),
    option: customStyles.option,
    menu: customStyles.menu,
  };

  const handleChange = (selectedOption) => {
    props.onChange(selectedOption);
  };

  return (
    <div style={{ width: "100%" }}> {/* Make sure the parent div doesn't restrict width */}
      <Select
        options={props.options}
        placeholder="Select an option"
        defaultValue={props.options[0]} // This could be adjusted for your default behavior
        styles={mergedStyles}
        onChange={handleChange}
        isSearchable={false} // Remove the search bar if it's not necessary
      />
    </div>
  );
};

export default SelectComponent;
