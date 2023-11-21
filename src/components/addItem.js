import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddItem = () => {
  return (
    <div className="rounded-full bg-yellow h-10 w-10 flex items-center justify-center mx-4 cursor-pointer">
      <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} size="lg"/>
    </div>
  );
};
export default AddItem;

