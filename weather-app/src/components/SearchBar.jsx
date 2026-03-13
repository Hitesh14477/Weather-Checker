import React, { useState } from "react";

function SearchBar({ onSearch }) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (city.trim()=="") return;
        onSearch(city);
        setCity("");
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;