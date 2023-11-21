import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <>
      <div className="searchbar px-4 py-2 rounded-lg border-blue border-4 w-fit">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ color: "#7A989A", marginRight: "12px" }}
        />
        <input className="" placeholder="SEARCH" />
      </div>
    </>
  );
};
export default SearchBar;
