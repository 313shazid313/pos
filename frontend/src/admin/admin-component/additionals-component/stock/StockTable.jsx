import Loading from "../../../../component/Loading";
import { Link } from "react-router-dom";
import { useGetAllStocksQuery } from "../../../../redux/additionals-state/stockApi";
import { useEffect } from "react";

//icons
import { FaEdit } from "react-icons/fa";

const StockTable = () => {
  const { data: stockData, isLoading, refetch } = useGetAllStocksQuery();

  // console.log(data);
  console.log(stockData);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loading />;
  }

  let serial = 0;
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-6">Manage Stocks</p>
        </div>
        <div className="">
          <Link
            to="stock-form"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add New Stock
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
                Product Name
              </th>
              <th scope="col" className="px-3 py-3">
                Supplier Name
              </th>
              <th scope="col" className="px-3 py-3">
                Quantity
              </th>
              <th scope="col" className="px-3 py-3">
                date
              </th>
              <th scope="col" className="px-3 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-3 py-3">
                Total Price
              </th>
              <th scope="col" className="px-3 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {stockData?.map((item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <td className="px-3 py-3">{(serial = serial + 1)}</td>
                <td className="px-3 py-3">{item?.productNameId?.name}</td>
                <td className="px-3 py-3">{item?.supplierId?.name}</td>
                <td className="px-3 py-3">{item?.quantity}</td>
                <td className="px-3 py-3">{item?.date}</td>
                <td className="px-3 py-3">{item?.unitPrice}</td>
                <td className="px-3 py-3">{item?.totalPrice}</td>
                <td className="px-3 py-3">
                  <Link to={`stock-update/${item._id}`}>
                    <FaEdit className="text-xl text-blue-500" />
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

export default StockTable;
