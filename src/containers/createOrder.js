import { useState } from "react";
import NavBar from "../components/navbar";
import Picker from "../components/dateTimePicker";
import styles from "../styles/createOrder.module.css";
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

      <div className="createOrderSetting text-lg my-14 mx-14 flex flex-col items-center">
        <table className="table-auto">
          <tbody>
            <tr className="border-b">
              <td className={`${styles.create_column_name}`}>Order Deadline</td>
              <td className={`${styles.create_column_content}`}>
                <Picker />
              </td>
            </tr>
            <tr className="border-b">
              <td className={`${styles.create_column_name}`}>
                Estimated Arrival
              </td>
              <td className={`${styles.create_column_content}`}>
                <Picker />
              </td>
            </tr>
            <tr className="border-b">
              <td className={`${styles.create_column_name}`}>Order End</td>
              <td className={`${styles.create_column_content}`}>
                <Picker />
              </td>
            </tr>
            <tr className="border-b">
              <td className={`${styles.create_column_name}`}>Restaurant</td>
              <td className={`${styles.create_column_content}`}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#7A989A", marginRight: "12px" }}
                />
                <input
                  className={`${styles.create_input}`}
                  placeholder="Search a Restaurant..."
                />
              </td>
            </tr>
            <tr>
              <td className={`${styles.create_column_name}`}>Orderers</td>
              <td className={`${styles.create_column_content}`}>
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: "#7A989A", marginRight: "12px" }}
                />
                <input
                  className={`${styles.create_input}`}
                  placeholder="Add Group or Friends"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttonContainer mt-14 p-4">
          <button
            className="bg-yellow hover:bg-green text-white font-bold py-3 px-4 rounded text-center"
            onClick={() => handleSave()}
          >
            Save & Launch
          </button>
          <button
            className="bg-red hover:bg-yellow text-white font-bold py-3 px-4 ml-4 rounded text-center"
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
