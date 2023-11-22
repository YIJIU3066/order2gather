const HistoryTable = ({ order_items, totalPrice, notHost }) => {
  console.log(order_items);
  return (
    <>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-base font-normal text-gray-900">
              <thead className="border-b font-semibold text-blue">
                <tr>
                  <th scope="col" className="px-12 py-4">
                    #
                  </th>
                  <th scope="col" className="px-12 py-4">
                    Food
                  </th>
                  <th scope="col" className="px-12 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-12 py-4">
                    Note
                  </th>
                  <th scope="col" className="px-12 py-4">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {order_items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b"
                    // onClick={() => handleRowClick(history.id, history)}
                  >
                    <td className="whitespace-nowrap px-12 py-4 font-medium">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      {item.food}
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      $ {item.price}
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      {item.note}
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
                <tr className="">
                  <td
                    colSpan="4"
                    className="whitespace-nowrap px-12 py-4 font-medium"
                  ></td>
                  <td
                    // colSpan="5"
                    className="text-right px-12 pt-4 font-semibold text-blue text-lg"
                  >
                    Total : ${totalPrice}
                  </td>
                </tr>

                {notHost && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-right px-12 text-sm text-gray-700"
                    >
                      The price may be modified by the host to ensure it is
                      correct.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryTable;
