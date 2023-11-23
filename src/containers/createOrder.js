import { useState } from "react";
import NavBar from "../components/navbar";
import Picker from "../components/dateTimePicker";
import styles from "../styles/form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

const CreateOrder = () => {
  const handleSave = () => {
    console.log("handleSave");
  };

  const handleDelete = () => {
    console.log("handleDelete");
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-3xl font-semibold text-blue my-6">
        ORDER EVENT
      </div>

      <div className="createOrderSetting text-lg my-10 mx-14 flex flex-col items-center">
        <table className="table-auto">
          <tbody>
            <tr className="border-b">
              <td className={`${styles.form_name}`}>Order Deadline</td>
              <td>
                <Picker />
              </td>
            </tr>
            <tr className="border-b">
              <td className={`${styles.form_name}`}>Estimated Arrival</td>
              <td>
                <Picker />
              </td>
            </tr>
            <tr className="border-b">
              <td className={`${styles.form_name}`}>Order End</td>
              <td>
                <Picker />
              </td>
            </tr>
            <tr className="border-b">
              <td className={`${styles.form_name}`}>Restaurant</td>
              <td>
                <label className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "#7A989A", marginRight: "12px" }}
                  />
                  <input
                    className={`${styles.form_input}`}
                    placeholder="Search a Restaurant..."
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td className={`${styles.form_name}`}>Orderers</td>
              <td>
                <label className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#7A989A", marginRight: "12px" }}
                  />
                  <input
                    className={`${styles.form_input}`}
                    placeholder="Add Group or Friends"
                  />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttonContainer mt-8">
          <button
            className="bg-yellow hover:bg-green text-white font-bold py-2 px-3 rounded text-center"
            onClick={() => handleSave()}
          >
            Save & Launch
          </button>
          <button
            className="bg-red hover:bg-yellow text-white font-bold py-2 px-3 ml-4 rounded text-center"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
export default CreateOrder;
