import { useGetAllProductsQuery } from "../../../../redux/rtk/productApi.js";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useGetAllStocksQuery } from "../../../../redux/additionals-state/stockApi.js";
import { useGetAllvatsQuery } from "../../../../redux/additionals-state/vatApi.js";
import { useGetAllCustomersQuery } from "../../../../redux/additionals-state/customerApi.js";

const SellForm = () => {
  const [items, setItems] = useState({
    invoiceNo: Date.now(),
  });
  const { data: productData } = useGetAllProductsQuery();
  const { data: stockData } = useGetAllStocksQuery();
  const { data: vatData } = useGetAllvatsQuery();
  const { data: customerData } = useGetAllCustomersQuery();


  // console.log(vatData);
  // console.log(stockData);
  console.log(customerData);


  const [tableData, setTableData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItems({
      ...items,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    // Check if the product is already in the table to avoid duplicates
    if (tableData.some((item) => item.productNameId === selectedOption.value))
      return;

    // Add selected product to tableData
    setTableData([
      ...tableData,
      {
        productNameId: selectedOption.value,
        name: selectedOption.label,
        price: selectedOption.price,
        quantity: 1, // Default quantity
        vat: vatData[0]?.vatAmount / 100,
      },
    ]);
  };

  console.log(tableData);
  const handleQuantityChange = (productNameId, increment) => {
    setTableData((prevTableData) =>
      prevTableData.map((item) =>
        item.productNameId === productNameId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + increment), // Ensure quantity is at least 1
            }
          : item
      )
    );
  };

  const handleRemoveItem = (productNameId) => {
    setTableData((prevTableData) =>
      prevTableData.filter((item) => item.productNameId !== productNameId)
    );
  };

  const optionsArrayProduct = [
    { label: "Select a Product", value: "", isDisabled: true },
    ...(productData?.map((item) => ({
      label: item.name,
      value: item._id,
      price: item.price,
    })) || []),
  ];

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center">Add New Sale</p>
      <div className="mt-6">
        <form className="max-w-4xl mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Product *
          </label>
          <Select
            options={optionsArrayProduct}
            onChange={handleSelectChange}
            className="basic-single"
            classNamePrefix="select"
            styles={{
              input: (base) => ({
                ...base,
                "input:focus": {
                  boxShadow: "none",
                },
              }),
            }}
          />

          <table className="mt-10 w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Product name
                </th>
                <th scope="col" className="px-3 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-3 py-3">
                  Vat
                </th>
                <th scope="col" className="px-3 py-3">
                  Vat Amount
                </th>
                <th scope="col" className="px-3 py-3">
                  Total Amount
                </th>
                <th scope="col" className="px-3 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => {
                const vatAmount = item.price * item.vat;
                const totalAmount = item.price * item.quantity + vatAmount;

                return (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={item.productNameId}
                  >
                    <td className="px-3 py-3">{item.name}</td>
                    <td className="px-3 py-3 flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.productNameId, -1)
                        }
                        disabled={item.quantity === 1}
                        className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.productNameId, 1)
                        }
                        className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-3 py-3">{item.price.toFixed(2)}</td>
                    <td className="px-3 py-3">
                      {(item.vat * 100).toFixed(0)}%
                    </td>
                    <td className="px-3 py-3">{vatAmount.toFixed(2)}</td>
                    <td className="px-3 py-3">{totalAmount.toFixed(2)}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.productNameId)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="space-y-12">
            <div className="">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      value={items.name}
                      onChange={handleInputChange}
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Invoice No.
                  </label>
                  <div className="mt-2">
                    <input
                      name="invoiceNo"
                      type="number"
                      value={items.invoiceNo}
                      disabled
                      onChange={handleInputChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;
