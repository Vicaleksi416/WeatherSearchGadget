export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name"
          name="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoCorrect="on"
        />
        <button className="search-btn" id="search-btn" onClick={handleSearch}>
          Search
        </button>
      </form>
    </div>
  );
}
