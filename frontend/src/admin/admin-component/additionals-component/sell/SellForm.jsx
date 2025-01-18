import { useGetAllProductsQuery } from "../../../../redux/rtk/productApi.js";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useGetAllStocksQuery } from "../../../../redux/additionals-state/stockApi.js";
import { useGetAllvatsQuery } from "../../../../redux/additionals-state/vatApi.js";
import { useGetAllCustomersQuery } from "../../../../redux/additionals-state/customerApi.js";
import { useGetAllPaymentTypeQuery } from "../../../../redux/additionals-state/paymentTypeApi.js";
import { useNavigate } from "react-router-dom";

const SellForm = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({
    customerName: "",
    invoiceNo: Date.now(),
    reference: "",
    date: "",
    paymentType: null,
  });
  const { data: productData } = useGetAllProductsQuery();
  const { data: stockData } = useGetAllStocksQuery();
  const { data: vatData } = useGetAllvatsQuery();
  const { data: customerData } = useGetAllCustomersQuery();
  const { data: paymentTypeData } = useGetAllPaymentTypeQuery();

  // console.log(vatData);
  // console.log(stockData);
  // console.log(customerData);
  // console.log(paymentTypeData);

  const [tableData, setTableData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItems((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    // Check if the product is already in the table to avoid duplicates
    if (tableData.some((item) => item.productNameId === selectedOption.value))
      return;

    const vatAmount = selectedOption.price * (vatData[0]?.vatAmount / 100);
    const quantity = 1;
    const price = selectedOption.price;

    setTableData([
      ...tableData,
      {
        productNameId: selectedOption.value,
        name: selectedOption.label,
        price,
        quantity,
        vat: vatData[0]?.vatAmount / 100,
        vatPerProduct: vatAmount,
        totalPrice: price * quantity + vatAmount,
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

  const optionsArrayCustomer = [
    { label: "Select a Product", value: "", isDisabled: true },
    ...(customerData?.map((item) => ({
      label: item.name,
      value: item._id,
      price: item.price,
    })) || []),
  ];

  return (
    <div className>
      <p className="text-2xl font-bold mb-6 text-center">Add New Sale</p>
      <div className="mt-6">
        <form className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block mb-2 text-sm/6 font-medium text-gray-900 dark:text-white">
                  Select Customer *
                </label>
                <Select
                  options={optionsArrayCustomer}
                  value={optionsArrayCustomer.find(
                    (option) => option.value === items.productNameId
                  )}
                  styles={{
                    input: (base) => ({
                      ...base,
                      "input:focus": {
                        boxShadow: "none",
                      },
                    }),
                  }}
                  onChange={(selectedOption) =>
                    setItems((prev) => ({
                      ...prev,
                      productNameId: selectedOption?.value || "",
                    }))
                  }
                  className="basic-single"
                  classNamePrefix="select"
                />
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
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Date *
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={items.date}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Reference
                </label>
                <div className="mt-2">
                  <input
                    name="reference"
                    type="text"
                    value={items.reference}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-5">
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
            </div>

            <div className="overflow-x-auto">
              <table className="mt-5 w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                      Total Price
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => {
                    const vatAmount = item.price * item.vat;
                    const totalPrice = item.price * item.quantity + vatAmount;

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
                        <td className="px-3 py-3">{totalPrice.toFixed(2)}</td>
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
            </div>

            <div className="min-h-screen py-12">
              <div className="mx-auto max-w-full">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* Main Form */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6 p-1 rounded-lg ">
                      {/* Contact Information */}
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Discount on All
                        </label>
                        <div className="mt-2">
                          <input
                            id="customerName"
                            name="customerName"
                            value={items.customerName}
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Discount Type
                        </label>
                        <div className="mt-2">
                          <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option disabled selected>
                              Choose Discount Type
                            </option>
                            <option value="US">Percentage %</option>
                            <option value="CA">Fixed</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Note
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                        ></textarea>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-sm/6 font-medium text-gray-900">
                          Payment Type
                        </label>
                        <div className="mt-2">
                          <select
                            name="paymentType"
                            value={items.paymentType}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600-600 sm:text-sm/6"
                          >
                            <option value="" disabled selected>
                              -----Select Payment Type-----
                            </option>
                            {paymentTypeData &&
                              paymentTypeData?.map((Item) => (
                                <option key={Item?._id} value={Item?._id}>
                                  {Item?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h2 className="text-xl font-medium text-gray-900">
                        Sell Summary
                      </h2>
                      <div className="mt-6 space-y-4">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>{}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span>$4.99</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Tax</span>
                          <span>$8.32</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-medium text-gray-900">
                            <span>Total</span>
                            <span>$112.31</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;
{
  /* <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Product Payment Type
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="paymentType"
                    value={items.paymentType || ""}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600-600 sm:text-sm/6"
                  >
                    <option value="" disabled>
                      -----Select Payment Type-----
                    </option>
                    {paymentTypeData &&
                      paymentTypeData?.map((Item) => (
                        <option key={Item?._id} value={Item?._id}>
                          {Item?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div> */
}
