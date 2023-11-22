import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddItem = ({ onClick, hintText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <button
      className="rounded-full bg-yellow h-10 w-10 flex items-center justify-center mx-4 cursor-pointer relative"
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <span className="absolute left-full ml-2 w-max bg-yellow text-white px-3 py-2 rounded text-xs  font-normal duration-100">
          {hintText}
        </span>
      )}
      <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} size="lg" />
    </button>
  );
};
export default AddItem;
