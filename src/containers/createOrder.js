import { useState } from "react";
import NavBar from "../components/navbar";
import Picker from "../components/dateTimePicker";
import styles from "../styles/createOrder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
      <div className="flex justify-center text-3xl font-semibold text-blue my-4">
        ORDER EVENT
      </div>

      <div className="createOrderSetting p-4 text-lg my-10 mx-14">
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
                <input className={`${styles.create_input}`} placeholder="Search A Restaurant..."/>
              </td>
            </tr>
            <tr>
              <td className={`${styles.create_column_name}`}>Orderers</td>
              <td className={`${styles.create_column_content}`}>
                <input className={`${styles.create_input}`} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttonContainer mt-6 p-4">
          <button
            className="bg-yellow hover:bg-blue text-white font-bold py-3 px-4 rounded text-center"
            onClick={() => handleSave()}
          >
            Save & Launch
          </button>
          <button
            className="bg-red hover:bg-blue text-white font-bold py-3 px-4 ml-4 rounded text-center"
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
