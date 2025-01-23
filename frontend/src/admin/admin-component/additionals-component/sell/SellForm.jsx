// import { useGetAllProductsQuery } from "../../../../redux/rtk/productApi.js";
import Select from "react-select";
import { useState } from "react";
import { useGetAllStocksQuery } from "../../../../redux/additionals-state/stockApi.js";
import { useGetAllvatsQuery } from "../../../../redux/additionals-state/vatApi.js";
import { useGetAllCustomersQuery } from "../../../../redux/additionals-state/customerApi.js";
import { useGetAllPaymentTypeQuery } from "../../../../redux/additionals-state/paymentTypeApi.js";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {
  useCreateSellMutation,
  useGetAllSellsQuery,
} from "../../../../redux/additionals-state/sellApi.js";

const SellForm = () => {
  const { refetch } = useGetAllSellsQuery();
  const [createSell] = useCreateSellMutation();

  const navigate = useNavigate();
  const [items, setItems] = useState({
    customerName: "",
    invoiceNo: Date.now(),
    reference: "",
    date: new Date().toISOString().split("T")[0],
    paymentType: "",
    discount: "",
    discountType: "percentage",
    shipping: 4.99,
    note: "",
  });

  const [errors, setErrors] = useState({});

  // const { data: productData } = useGetAllProductsQuery();
  const { data: stockData } = useGetAllStocksQuery();
  const { data: vatData } = useGetAllvatsQuery();
  const { data: customerData } = useGetAllCustomersQuery();
  const { data: paymentTypeData } = useGetAllPaymentTypeQuery();
  // console.log(stockData);
  const [tableData, setTableData] = useState([]);
  // console.log(tableData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const today = new Date().toISOString().split("T")[0];

    if (name === "date") {
      // Correct date comparison
      if (value < today) {
        toast.error("You cannot choose a previous date");
        return; // Important: prevents state update
      }
    }

    setItems((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const calculateVatAmount = (price, quantity, vatRate) => {
    return price * quantity * vatRate;
  };

  const calculateTotalPrice = (price, quantity, vatAmount) => {
    return price * quantity + vatAmount;
  };

  const handleSelectChange = (selectedOption) => {
    if (!selectedOption) return;

    // Check if the product is already in the table
    if (tableData.some((item) => item.productNameId === selectedOption.value)) {
      alert("This product is already in the cart!");
      return;
    }

    const vatRate = vatData?.[0]?.vatAmount ? vatData[0].vatAmount / 100 : 0;
    const quantity = 1;
    const price = selectedOption.price;
    const vatAmount = calculateVatAmount(price, quantity, vatRate);
    const totalPrice = calculateTotalPrice(price, quantity, vatAmount);

    setTableData([
      ...tableData,
      {
        productNameId: selectedOption.value,
        name: selectedOption.label,
        price,
        quantity,
        vat: vatRate,
        vatPerProduct: vatAmount,
        totalPrice,
      },
    ]);
  };

  // console.log(tableData);

  const handleQuantityChange = (productNameId, increment) => {
    setTableData((prevTableData) =>
      prevTableData.map((item) => {
        if (item.productNameId === productNameId) {
          const newQuantity = Math.max(1, item.quantity + increment);
          const vatAmount = calculateVatAmount(
            item.price,
            newQuantity,
            item.vat
          );
          const totalPrice = calculateTotalPrice(
            item.price,
            newQuantity,
            vatAmount
          );

          return {
            ...item,
            quantity: newQuantity,
            vatPerProduct: vatAmount,
            totalPrice,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productNameId) => {
    setTableData((prevTableData) =>
      prevTableData.filter((item) => item.productNameId !== productNameId)
    );
  };

  const calculateDiscountAmount = (subtotal) => {
    if (!items.discount) return 0;

    if (items.discountType === "percentage") {
      return (subtotal * parseFloat(items.discount)) / 100;
    }
    return parseFloat(items.discount);
  };

  const calculateTotals = () => {
    const subtotal = tableData.reduce((acc, item) => acc + item.totalPrice, 0);
    const discountAmount = calculateDiscountAmount(subtotal);
    const shipping = parseFloat(items.shipping);
    const totalVat = tableData.reduce(
      (acc, item) => acc + item.vatPerProduct,
      0
    );
    const grandTotal = subtotal - discountAmount + shipping;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      shipping: shipping.toFixed(2),
      vat: totalVat.toFixed(2),
      total: grandTotal.toFixed(2),
    };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!items.customerName) {
      newErrors.customerName = "Customer is required";
    }

    if (tableData.length === 0) {
      newErrors.products = "At least one product is required";
    }

    if (items.discount && isNaN(items.discount)) {
      newErrors.discount = "Discount must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const totals = calculateTotals();
    const formData = {
      products: tableData,
      ...items,
      ...totals,
    };

    console.log("Submitting form data:", formData);

    try {
      await createSell(formData).unwrap();
      refetch();
      toast.success("Sell Created Successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

  const optionsArrayProduct = [
    { label: "Select a Product", value: "", isDisabled: true },
    ...(stockData?.map((item) => ({
      label: item.productNameId.name,
      value: item.productNameId._id,
      price: item.productNameId.price,
    })) || []),
  ];
  // console.log(optionsArrayProduct);
  // console.log(stockData);

  const optionsArrayCustomer = [
    { label: "Select a Customer", value: "", isDisabled: true },
    ...(customerData?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || []),
  ];

  // const optionsArrayPaymentType = [
  //   { label: "Select Payment Type", value: "", isDisabled: true },
  //   ...(paymentTypeData?.map((item) => ({
  //     label: item.name,
  //     value: item._id,
  //   })) || []),
  // ];

  const totals = calculateTotals();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Sale</h1>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Customer and Invoice Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Customer *
              </label>
              <Select
                options={optionsArrayCustomer}
                value={optionsArrayCustomer.find(
                  (option) => option.value === items.customerName
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
                    customerName: selectedOption?.value || "",
                  }))
                }
                className="basic-single"
                classNamePrefix="select"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.customerName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Invoice No.
              </label>
              <input
                name="invoiceNo"
                type="text"
                value={items.invoiceNo}
                disabled
                className="block w-full rounded-md border-gray-300 bg-gray-200 cursor-not-allowed shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
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

            <div>
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

          {/* Product Selection Section */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
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
            {errors.products && (
              <p className="mt-1 text-sm text-red-600">{errors.products}</p>
            )}
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Product name",
                    "Quantity",
                    "Unit Price",
                    "Vat",
                    "Vat Amount",
                    "Total Price",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((item) => {
                  const stockItem = stockData.find(
                    (stock) => stock.productNameId._id === item.productNameId
                  );
                  const isAddDisabled =
                    stockItem && item.quantity >= stockItem.quantity;

                  return (
                    <tr key={item.productNameId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(item.productNameId, -1)
                            }
                            className="px-2 py-1 text-sm bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(item.productNameId, 1)
                            }
                            className={`px-2 py-1 text-sm rounded ${
                              isAddDisabled
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gray-200"
                            }`}
                            disabled={isAddDisabled}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(item.vat * 100).toFixed(0)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.vatPerProduct.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.productNameId)}
                          className="text-red-600 hover:text-red-900"
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

          {/* Summary Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900">
                      Discount
                    </label>
                    <div className="mt-1">
                      <input
                        name="discount"
                        type="number"
                        value={items.discount}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    {errors.discount && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.discount}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900">
                      Discount Type
                    </label>
                    <select
                      name="discountType"
                      value={items.discountType}
                      onChange={handleInputChange}
                      className="mt-1 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Note
                  </label>
                  <textarea
                    name="note"
                    id="message"
                    value={items.note}
                    onChange={handleInputChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Payment Type
                  </label>
                  <Select
                    options={optionsArrayPaymentType}
                    value={optionsArrayPaymentType.find(
                      (option) => option.value === items.paymentType
                    )}
                    onChange={(selectedOption) =>
                      setItems((prev) => ({
                        ...prev,
                        paymentType: selectedOption?.value || "",
                      }))
                    }
                    styles={{
                      input: (base) => ({
                        ...base,
                        "input:focus": {
                          boxShadow: "none",
                        },
                      }),
                    }}
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </div> */}

                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Product Origin
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      name="paymentType"
                      value={items.paymentType}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600-600 sm:text-sm/6"
                    >
                      <option value="" disabled>
                        -----Select Payment Type-----
                      </option>
                      {paymentTypeData &&
                        paymentTypeData.map((Item) => (
                          <option key={Item._id} value={Item._id}>
                            {Item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900">
                  Sale Summary
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Discount</span>
                    <span>-${totals.discount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>${totals.shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>VAT</span>
                    <span>${totals.vat}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium text-gray-900">
                      <span>Total</span>
                      <span>${totals.total}</span>
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
  );
};

export default SellForm;
