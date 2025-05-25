export const asyncSelectStyles = {
    control: (provided) => ({
        ...provided,
        margin: "1rem 0",
        padding: "0.7rem 1rem",
        borderRadius: "10px",
        border: "1px solid #353a5a",
        background: "#181c2f",
        color: "#e0e0e0",
        fontSize: "1rem",
        width: "100%",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#353a5a"
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "rgba(224, 224, 224, 0.7)"
    }),
    menu: (provided) => ({
        ...provided,
        background: "#181c2f",
        border: "1px solid #353a5a",
        borderRadius: "10px",
        marginTop: "0.5rem"
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? "rgba(255, 255, 255, 0.1)" : "#181c2f",
        color: "#e0e0e0",
        "&:active": {
            background: "rgba(255, 255, 255, 0.2)"
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#e0e0e0"
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#e0e0e0",
        "&:hover": {
            color: "#ffffff"
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: "#353a5a"
    }),
    input: (provided) => ({
        ...provided,
        color: "#e0e0e0"
    })
};