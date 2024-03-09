import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const SearchComponent = () => {

    const [searchText, setSearchText] = useState("");

    const searchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 600,
                height: 70
            }}
        >
            <TextField
                sx={{
                    width: 580,
                }}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                autoFocus
                onChange={searchTextChange}
            />
        </div>
    );
};
export { SearchComponent };