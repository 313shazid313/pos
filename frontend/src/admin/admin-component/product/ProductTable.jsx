import Loading from "../../../component/Loading";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetAllProductsQuery,
  useSearchProductsQuery,
} from "../../../redux/rtk/productApi";
import { useGetAllStocksQuery } from "../../../redux/additionals-state/stockApi";

//icons
import { FaEdit } from "react-icons/fa";

const ProductTable = () => {
  const { data, isLoading, refetch } = useGetAllProductsQuery();
  const { data: stockData, refetch: stockRefetch } = useGetAllStocksQuery();

  console.log(stockData);

  // ?search utility -----------
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchData } = useSearchProductsQuery(searchQuery);

  // console.log(searchData);
  // console.log(searchQuery);

  // Auto-refresh on component mount
  useEffect(() => {
    refetch(); // Automatically refresh data
    stockRefetch();
  }, [refetch, stockRefetch]); // Dependency ensures it runs only when `refetch` changes

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {searchQuery == [] ? (
        <div>
          <p className="text-2xl py-4 text-center">Manage Products</p>
          <div className="flex justify-between">
            <div>
              {/* seaarch bar */}
              <div className="flex items-center max-w-sm mx-auto">
                {/* <label className="sr-only">Search</label> */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search with name..."
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* new item */}
            <div>
              <Link
                to="product-form"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Add +
                </span>
              </Link>
            </div>
          </div>

          <div>
            {/* table  */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 py-3">
                      Index
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Sell Price
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Unit
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Vat
                    </th>
                    <th scope="col" className="px-3 py-3">
                      status
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Sell Type
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((item, index) => (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={item._id}
                    >
                      <td className="px-3 py-3">{index + 1}</td>
                      <td className="px-3 py-3">{item?.name}</td>
                      <td className="px-3 py-3">{item?.brandId?.name}</td>
                      <td className="px-3 py-3">
                        {stockData?.find(
                          (stock) => stock.productNameId?._id === item?._id
                        )?.quantity || "0"}
                      </td>

                      {/* <td className="px-6 py-4">{item?.categoryId?.name}</td> */}
                      <td className="px-3 py-3">{item.price}</td>
                      <td className="px-3 py-3">{item.typeId?.name}</td>
                      <td className="px-3 py-3">{item.unitId?.name}</td>
                      <td className="px-3 py-3">
                        {item.vat ? (
                          <span className="text-green-600">Applicable</span>
                        ) : (
                          <span className="text-red-600">Not Applicable</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {item.isPublished ? (
                          <span className="text-green-600">Publish</span>
                        ) : (
                          <span className="text-red-600">not</span>
                        )}
                      </td>
                      <td className="px-3 py-3">{item.sellType}</td>
                      <td className="px-3 py-3 flex space-x-2">
                        <div className="flex flex-row ">
                          <Link to={`product-update/${item.id}`}>
                            <FaEdit className="text-xl text-blue-500" />
                          </Link>
                          {/* modals */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-2xl py-4 text-center">Manage Products</p>
          <div className="flex justify-between">
            <div>
              {/* seaarch bar */}
              <div className="flex items-center max-w-sm mx-auto">
                {/* <label className="sr-only">Search</label> */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search with name..."
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* new item */}
            <div>
              <Link
                to="product-form"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Add +
                </span>
              </Link>
            </div>
          </div>

          <div>
            {/* table  */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 py-3">
                      Index
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Sell Price
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Unit
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Vat
                    </th>
                    <th scope="col" className="px-3 py-3">
                      status
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Sell Type
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {searchData?.map((item, index) => (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={item._id}
                    >
                      <td className="px-3 py-3">{index + 1}</td>
                      <td className="px-3 py-3">{item?.name}</td>
                      <td className="px-3 py-3">{item?.brandId?.name}</td>
                      <td className="px-3 py-3">
                        {stockData?.find(
                          (stock) => stock.productName?._id === item?._id
                        )?.quantity || "0"}
                      </td>

                      {/* <td className="px-6 py-4">{item?.categoryId?.name}</td> */}
                      <td className="px-3 py-3">{item.price}</td>
                      <td className="px-3 py-3">{item.typeId?.name}</td>
                      <td className="px-3 py-3">{item.unitId?.name}</td>
                      <td className="px-3 py-3">
                        {item.vat ? (
                          <span className="text-green-600">Applicable</span>
                        ) : (
                          <span className="text-red-600">Not Applicable</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {item.isPublished ? (
                          <span className="text-green-600">Publish</span>
                        ) : (
                          <span className="text-red-600">not</span>
                        )}
                      </td>
                      <td className="px-3 py-3">{item.sellType}</td>
                      <td className="px-3 py-3 flex space-x-2">
                        <div className="flex flex-row ">
                          <Link to={`product-update/${item.id}`}>
                            <FaEdit className="text-xl text-blue-500" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
