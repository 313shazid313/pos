import Loading from "../../../../component/Loading";
import { Link } from "react-router-dom";
import { useGetAllDamagesQuery } from "../../../../redux/additionals-state/damageApi";
import { useGetAllStocksQuery } from "../../../../redux/additionals-state/stockApi";
//icons

const DamageTable = () => {
  const { data: damageData, isLoading } = useGetAllDamagesQuery();
  const { data: stockData } = useGetAllStocksQuery();
  console.log(stockData);
  console.log(damageData);

  if (isLoading) {
    return <Loading />;
  }

  let serial = 0;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-6">Manage Damage</p>
        </div>
        <div className="">
          <Link
            to="Damage-form"
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
                Batch No
              </th>
              <th scope="col" className="px-3 py-3">
                Damage Quantity
              </th>
              <th scope="col" className="px-3 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-3 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {damageData?.map((item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <td className="px-3 py-3">{(serial = serial + 1)}</td>
                <td className="px-3 py-3">{item?.batchNo}</td>
                <td className="px-3 py-3">{item?.damageQAT}</td>
                <td className="px-3 py-3">
                  {stockData?.find((stock) => stock?.batchNo === item?.batchNo)
                    ?.productNameId?.price || "0"}
                </td>
                <td className="px-3 py-3">
                  {item?.damageQAT *
                    (stockData?.find(
                      (stock) => stock?.batchNo === item?.batchNo
                    )?.productNameId?.price || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DamageTable;
