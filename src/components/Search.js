const Search = (props) => {
    return (
        <input
            type="text"
            onChange={(e) => props.onInputChange(e.target.value)}
            placeholder = "Search for a country..."
            className={`search--input ${props.isDarkMode ? "input--dark":""}`}
            value={props.searchInput}
        />
    )
}

export default Search;