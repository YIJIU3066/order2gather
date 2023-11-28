import { Link } from "react-router-dom";
import HistoryTable from "./historyTable";

const HistoryNotHost = ({ history, order_items, totalPrice }) => {
  return (
    <>
      <div className="history_container flex flex-col justify-center items-center ">
        <div className="flex justify-center text-3xl font-semibold text-blue my-6">
          Your Order
        </div>
        <div className="order_basic_info flex justify-between my-4 text-gray-900">
          <div className="px-4">Order Time: {history.orderTime}</div>
          <div className="px-4">Restaurant: {history.restaurant}</div>
          <div className="px-4">Host: {history.host}</div>
        </div>
        <HistoryTable order_items={order_items} totalPrice={totalPrice} notHost={true}/>
        <div className="buttonContainer mt-8">
          <Link to="/history">
            <button className="bg-blue hover:bg-red text-white font-bold py-2 px-6 rounded text-center">
              Back
            </button>
          </Link>
          <Link to="/report/write/0">
            <button className="bg-yellow hover:bg-green text-white font-bold py-2 px-6 ml-6 rounded text-center">
              Report
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HistoryNotHost;
