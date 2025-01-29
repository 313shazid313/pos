import { useGetAllSellsQuery } from "../../../../redux/additionals-state/sellApi";
import { Link } from "react-router-dom";

// icons

import { FaEye } from "react-icons/fa6";

const SellTable = () => {
  let serial = 0;
  const { data: sellData } = useGetAllSellsQuery();
  console.log(sellData);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-6">Manage Sell</p>
        </div>
        <div className="">
          <Link
            to="sell-form"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add New +
            </span>
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Id
              </th>
              <th scope="col" className="px-3 py-3">
                Name
              </th>
              <th scope="col" className="px-3 py-3">
                Phone
              </th>
              <th scope="col" className="px-3 py-3">
                date
              </th>
              <th scope="col" className="px-3 py-3">
                Sub Total
              </th>
              <th scope="col" className="px-3 py-3">
                Grand Total
              </th>
              <th scope="col" className="px-3 py-3">
                Invoice
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sellData?.map((item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <td className="px-3 py-3">{(serial = serial + 1)}</td>
                <td className="px-3 py-3">{item?.customerName}</td>
                <td className="px-3 py-3">{item?.customerPhone}</td>
                <td className="px-3 py-3">{item?.date}</td>
                <td className="px-3 py-3">{item?.subtotal}</td>
                <td className="px-3 py-3">{item?.total}</td>
                <td className="px-3 py-3">{item?.invoiceNo}</td>
                <td className="px-3 py-3">
                  <Link to={`sell-details/${item._id}`}>
                    <FaEye className="text-xl text-blue-500" />
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <Link to={`sell-return/${item._id}`}>
                    <FaEye className="text-xl text-blue-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellTable;
