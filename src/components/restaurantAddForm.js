import { useState } from "react";
import styles from "../styles/form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";

const RestaurantAddForm = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [opentime, setOpentime] = useState("");
  const [menu, setMenu] = useState("");

  // TODO
  const handleSave = () => {
    // 檢查表單是否有效
    if (name && address && telephone) {
      onSave({ name, address, telephone });
      setName("");
      setAddress("");
      setTelephone("");
      setOpentime("");
      setMenu("");
    } else {
      // 可以添加錯誤訊息或顯示錯誤提示
      console.log("請填寫所有必填欄位！");
    }
  };

  const handleMenuUpload = () => {
    console.log("handleMenuUpload");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="restaurant_form_container w-full h-full flex justify-center items-center">
      <div className="w-4/5 border-8 border-blue p-4 rounded shadow flex flex-col items-center bg-slate-50 relative">
        {/* <div className="flex justify-between w-full"> */}
        <div className="cursor-pointer absolute top-0 right-0 px-6 py-4" onClick={()=>handleClose()}>
          <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#7A989A"}}/>
        </div>
        <div className="flex justify-center text-3xl font-semibold text-blue my-4">
          Add Restaurant
        </div>
       
        <div className="input_container text-lg mt-4 mx-14 flex flex-col items-center">
          <table className="table-auto">
            <tbody>
              <tr className="border-b">
                <td className={`${styles.form_name}`}>Restaurant Name*</td>
                <td>
                  <input
                    className={`${styles.form_input}`}
                    placeholder="MacDonald's"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className={`${styles.form_name}`}>Address</td>
                <td>
                  <input
                    className={`${styles.form_input}`}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className={`${styles.form_name}`}>Telephone</td>
                <td>
                  <input
                    className={`${styles.form_input}`}
                    placeholder="Phone Number"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className={`${styles.form_name}`}>Open Time</td>
                <td>
                  <input
                    className={`${styles.form_input}`}
                    placeholder="Open Time"
                    value={opentime}
                    onChange={(e) => setOpentime(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className={`${styles.form_name}`}>Menu</td>
                <td>
                  <button
                    className="bg-green hover:bg-yellow text-white font-bold py-2 px-3 rounded text-center text-base"
                    onClick={() => handleMenuUpload()}
                  >
                    <FontAwesomeIcon icon={faUpload} className="pr-3" />
                    Upload
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="bg-yellow hover:bg-green text-white font-bold py-2 px-6 my-6 rounded text-center"
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default RestaurantAddForm;
