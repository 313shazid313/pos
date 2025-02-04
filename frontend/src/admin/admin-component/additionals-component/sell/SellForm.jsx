//! selected product imports
import { useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  incrementProduct,
  decrementProduct,
} from "../../../../redux/feature/slectedProductSlice";

//!
import Select from "react-select";
import { useState } from "react";
import { useGetAllStocksQuery } from "../../../../redux/additionals-state/stockApi.js";
import { useGetAllvatsQuery } from "../../../../redux/additionals-state/vatApi.js";
import {
  useGetAllCustomersQuery,
  useSingleCustomerByPhoneQuery,
} from "../../../../redux/additionals-state/customerApi.js";
import { useGetAllPaymentTypeQuery } from "../../../../redux/additionals-state/paymentTypeApi.js";
import { useCreateCustomerMutation } from "../../../../redux/additionals-state/customerApi.js";
import toast from "react-hot-toast";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom";

import {
  useCreateSellMutation,
  useGetAllSellsQuery,
} from "../../../../redux/additionals-state/sellApi.js";

import { useSelector } from "react-redux";

const SellForm = () => {
  const selectedProductData = useSelector((state) => state.slectedproducts);

  // ! fetching data ---------->
  const dispatch = useDispatch();
  const { data: stockData } = useGetAllStocksQuery();
  const { data: vatData } = useGetAllvatsQuery();
  const { data: customerData } = useGetAllCustomersQuery();
  const { data: paymentTypeData } = useGetAllPaymentTypeQuery();
  const { refetch } = useGetAllSellsQuery();
  const [createSell] = useCreateSellMutation();
  const [createCustomer] = useCreateCustomerMutation();

  //! react router dom ----------->
  const navigate = useNavigate();

  //! ----------------
  // console.log({ selectedProducts: selectedProductData });

  const selectedProductsWithadditionalData = selectedProductData.map(
    (product) => ({
      ...product,
      originalQuantity: product.quantity,
      vat: vatData[0]?.vatAmount / 100,
      vatPerProduct:
        product.quantity * product.price * (vatData[0]?.vatAmount / 100),
      totalPrice:
        product.price * product.quantity +
        product.quantity * product.price * (vatData[0]?.vatAmount / 100),
    })
  );

  // console.log(selectedProductsWithadditionalData);

  //! ----------------

  //! Making Hooks ---------->
  const [items, setItems] = useState({
    customerName: "",
    customerPhone: "",
    invoiceNo: Date.now(),
    reference: "",
    date: new Date().toISOString().split("T")[0],
    paymentType: "",
    discount: "",
    discountType: "percentage",
    shipping: 4.99,
    note: "",
    disCountPercentage: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!items.customerName) {
      newErrors.customerName = "Customer is required";
    }

    if (selectedProductsWithadditionalData.length === 0) {
      newErrors.products = "At least one product is required";
    }

    if (items.discount && isNaN(items.discount)) {
      newErrors.discount = "Discount must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //! auto suggestion code start----------------------------------------->
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    return inputValue === ""
      ? []
      : customerData.filter((data) =>
          data.phone.toLowerCase().includes(inputValue)
        );
  };

  const renderSuggestion = (suggestion) => (
    <div className="px-2 py-2 w-96 hover:bg-gray-100">
      {suggestion.phone} (Name : {suggestion.name})
    </div>
  );

  const inputProps = {
    placeholder: "+8801XXXXXXXXX",
    value,
    className: "w-full p-2 border rounded",
    onChange: (event, { newValue, method }) => {
      // Allow only numbers
      const numericValue = newValue.replace(/\D/g, ""); // Remove non-numeric characters
      setValue(numericValue);

      setItems((prev) => ({
        ...prev,
        customerPhone: numericValue,
      }));

      // If it's from suggestion, update customer name too
      if (method === "click" || method === "enter") {
        const customer = customerData?.find((c) => c.phone === numericValue);
        if (customer) {
          setItems((prev) => ({
            ...prev,
            customerName: customer.name,
            customerPhone: customer.phone,
          }));
        }
      }
    },
    onBlur: () => {
      setItems((prev) => ({
        ...prev,
        customerPhone: value,
      }));
    },
    inputMode: "numeric", // Mobile keyboard optimization
  };

  //! auto suggestion code ends----------------------------------------->

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const today = new Date().toISOString().split("T")[0];

    if (name === "date" && value < today) {
      toast.error("You cannot choose a previous date");
      return;
    }

    setItems((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    dispatch(addProduct(selectedOption));
  };

  const handleQuantityIncrese = (id) => {
    dispatch(incrementProduct(id));
  };
  const handleQuantityDecrese = (id) => {
    dispatch(decrementProduct(id));
  };

  const handleRemoveItem = (value) => {
    dispatch(removeProduct(value));
  };

  const calculateDiscountAmount = (subtotal) => {
    if (!items.discount) return 0;

    if (items.discountType === "percentage") {
      return (subtotal * parseFloat(items.discount)) / 100;
    }
    return parseFloat(items.discount);
  };

  const calculateTotals = () => {
    const subtotal = selectedProductsWithadditionalData.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    const discountAmount = calculateDiscountAmount(subtotal);
    const totalVat = selectedProductsWithadditionalData.reduce(
      (acc, item) => acc + item.vatPerProduct,
      0
    );
    const grandTotal = subtotal - discountAmount;
    return {
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      vat: totalVat.toFixed(2),
      total: grandTotal.toFixed(2),
      disCountPercentage:
        items.discountType === "percentage" ? items.discount : null, // Use a ternary operator
    };
  };
  const totals = calculateTotals();

  // ! submitting sell data start----------------------------------------------->
  const { data } = useSingleCustomerByPhoneQuery(items?.customerPhone);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const totals = calculateTotals();
    const formData = {
      products: selectedProductsWithadditionalData,
      ...items,
      ...totals,
    };

    console.log("Submitting form data:", formData);

    // ! new sell submit
    try {
      const customerData = {
        name: items?.customerName,
        phone: items?.customerPhone,
      };

      // console.log(customerData);

      if (!data) {
        await createCustomer(customerData).unwrap();
      }

      await createSell(formData).unwrap();
      refetch();
      toast.success("Sell Created Successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };
  // ! submitting sell data end ------------------------------>

  //! options for products ---------------------------->
  const optionsArrayProduct = [
    { label: "Select a Product", value: "", isDisabled: true },
    ...(stockData?.map((item) => ({
      label: item.productNameId.name,
      value: item.productNameId._id,
      price: item.productNameId.price,
    })) || []),
  ];

  //! options for products ----------------------------->

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Sale</h1>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* ----------------- auto suggestion ------------- */}
            <div className="relative w-xs">
              <label className="block text-sm/6 font-medium text-gray-900">
                Customer Phone *
              </label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={({ value }) =>
                  setSuggestions(getSuggestions(value))
                }
                onSuggestionsClearRequested={() => setSuggestions([])}
                getSuggestionValue={(suggestion) => suggestion.phone}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={{
                  container: "relative",
                  suggestionsContainer:
                    "absolute top-full left-0 z-10 border rounded shadow-lg bg-white",
                  suggestionsList: "max-h-60 overflow-y-auto",
                  suggestion: "cursor-pointer",
                  suggestionHighlighted: "bg-gray-200",
                }}
              />
              {errors.customerPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerPhone}
                </p>
              )}
            </div>
            {/* ----------------- auto suggestion ------------- */}

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Customer Name
              </label>
              <input
                name="customerName"
                placeholder="Enter Customer Name"
                type="text"
                value={items.customerName}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
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
                {selectedProductsWithadditionalData?.map((item) => {
                  const stockItem = stockData.find(
                    (stock) => stock.productNameId._id === item.value
                  );
                  const isAddDisabled =
                    stockItem && item.quantity >= stockItem.quantity;
                  return (
                    <tr key={item.value}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleQuantityDecrese(item.value)}
                            className="px-2 py-1 text-sm bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityIncrese(item.value)}
                            className={`px-2 py-1 text-sm rounded ${
                              isAddDisabled
                                ? "bg-gray-400 cursor-not-allowed"
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
                          onClick={() => handleRemoveItem(item.value)}
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
                  {/* <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>${totals.shipping}</span>
                  </div> */}
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
            type="submit"
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
